// Inbox & Approvals Screen
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import * as hubApi from '../../lib/hubApi';
import InboxCard from '../../components/Hub/InboxCard';
import EmptyState from '../../components/Hub/EmptyState';
import { Inbox as InboxIcon, Filter } from 'lucide-react';

export default function Inbox() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    product: '',
    priority: '',
    type: ''
  });
  
  const { data: items, isLoading } = useQuery({
    queryKey: ['inbox', filters],
    queryFn: () => hubApi.getInbox(filters)
  });
  
  const approveMutation = useMutation({
    mutationFn: hubApi.approveInboxItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['inbox']);
    }
  });
  
  const rejectMutation = useMutation({
    mutationFn: hubApi.rejectInboxItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['inbox']);
    }
  });
  
  const handleApprove = (itemId) => {
    if (confirm('Approve this action?')) {
      approveMutation.mutate(itemId);
    }
  };
  
  const handleReject = (itemId) => {
    const reason = prompt('Reason for rejection (optional):');
    rejectMutation.mutate(itemId, { reason });
  };
  
  const handleCustomize = (itemId) => {
    alert('Customization interface would open here');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }
  
  const filteredItems = items || [];
  
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Inbox</h1>
          <p className="text-slate-600">
            {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} awaiting your approval
          </p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-slate-400" />
          
          <select
            value={filters.product}
            onChange={(e) => setFilters({ ...filters, product: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
          >
            <option value="">All Products</option>
            <option value="OMNIOPS">OMNIOPS</option>
            <option value="ContentSpark">ContentSpark</option>
            <option value="GovCon Connect">GovCon Connect</option>
            <option value="OpsVanta">OpsVanta</option>
          </select>
          
          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
          >
            <option value="">All Types</option>
            <option value="deployment">Deployment</option>
            <option value="pricing">Pricing</option>
            <option value="marketing">Marketing</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="cost_alert">Cost Alert</option>
          </select>
          
          {(filters.product || filters.priority || filters.type) && (
            <button
              onClick={() => setFilters({ product: '', priority: '', type: '' })}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
      
      {/* Items List */}
      {filteredItems.length === 0 ? (
        <EmptyState
          icon={InboxIcon}
          title="All clear!"
          description="No items requiring your approval right now. Check back later or autopilot will notify you when something needs attention."
        />
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <InboxCard
              key={item.id}
              item={item}
              onApprove={handleApprove}
              onReject={handleReject}
              onCustomize={handleCustomize}
            />
          ))}
        </div>
      )}
    </div>
  );
}
