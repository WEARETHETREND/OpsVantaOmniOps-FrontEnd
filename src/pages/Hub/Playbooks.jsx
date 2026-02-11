// Playbooks Management Screen
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as hubApi from '../../lib/hubApi';
import PlaybookCard from '../../components/Hub/PlaybookCard';
import EmptyState from '../../components/Hub/EmptyState';
import { Book, Plus } from 'lucide-react';

export default function Playbooks() {
  const queryClient = useQueryClient();
  
  const { data: playbooks, isLoading } = useQuery({
    queryKey: ['playbooks'],
    queryFn: hubApi.getPlaybooks
  });
  
  const executeMutation = useMutation({
    mutationFn: hubApi.executePlaybook,
    onSuccess: (data) => {
      alert(`Playbook execution started!\n\nExecution ID: ${data.executionId}\nEstimated completion: ${new Date(data.estimatedCompletion).toLocaleTimeString()}`);
      queryClient.invalidateQueries(['playbooks']);
    }
  });
  
  const toggleMutation = useMutation({
    mutationFn: hubApi.togglePlaybook,
    onSuccess: () => {
      queryClient.invalidateQueries(['playbooks']);
    }
  });
  
  const handleExecute = (playbookId) => {
    const playbook = playbooks.find(p => p.id === playbookId);
    if (!playbook) return;
    
    if (confirm(`Execute "${playbook.name}"?\n\nThis will start the playbook immediately.`)) {
      executeMutation.mutate(playbookId);
    }
  };
  
  const handleToggle = (playbookId) => {
    toggleMutation.mutate(playbookId);
  };
  
  const handleCreateNew = () => {
    alert('Playbook creation interface would open here.\n\nYou would be able to:\n- Define triggers (events, schedule, manual)\n- Build action steps\n- Configure rollback plan\n- Set success criteria');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }
  
  const sortedPlaybooks = playbooks || [];
  
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Playbooks</h1>
          <p className="text-slate-600">
            {sortedPlaybooks.length} automation playbook{sortedPlaybooks.length !== 1 ? 's' : ''} configured
          </p>
        </div>
        
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Playbook
        </button>
      </div>
      
      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Playbooks</strong> are reusable automation workflows that execute when triggered by events, schedules, or manually.
          They can be enabled/disabled individually and include rollback plans for safety.
        </p>
      </div>
      
      {/* Playbooks Grid */}
      {sortedPlaybooks.length === 0 ? (
        <EmptyState
          icon={Book}
          title="No playbooks yet"
          description="Create your first playbook to automate common tasks and workflows."
          action={
            <button
              onClick={handleCreateNew}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Create Your First Playbook
            </button>
          }
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {sortedPlaybooks.map((playbook) => (
            <PlaybookCard
              key={playbook.id}
              playbook={playbook}
              onExecute={handleExecute}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
