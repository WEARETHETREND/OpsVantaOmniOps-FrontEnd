// Autopilot Control Screen
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import * as hubApi from '../../lib/hubApi';
import AutopilotDial from '../../components/Hub/AutopilotDial';
import TrustChart from '../../components/Hub/TrustChart';
import { Clock, Shield, Package, Save, Info } from 'lucide-react';

export default function Autopilot() {
  const queryClient = useQueryClient();
  const [hasChanges, setHasChanges] = useState(false);
  const [localState, setLocalState] = useState(null);
  
  const { data, isLoading } = useQuery({
    queryKey: ['autopilot'],
    queryFn: hubApi.getAutopilot,
    onSuccess: (data) => {
      if (!localState) setLocalState(data);
    }
  });
  
  const updateMutation = useMutation({
    mutationFn: hubApi.updateAutopilot,
    onSuccess: () => {
      queryClient.invalidateQueries(['autopilot']);
      setHasChanges(false);
    }
  });
  
  const state = localState || data;
  
  const handleLevelChange = (newLevel) => {
    setLocalState({ ...state, level: newLevel });
    setHasChanges(true);
  };
  
  const handleTimeboxChange = (field, value) => {
    setLocalState({
      ...state,
      timebox: { ...state.timebox, [field]: value }
    });
    setHasChanges(true);
  };
  
  const handleProductToggle = (product) => {
    setLocalState({
      ...state,
      products: { ...state.products, [product]: !state.products[product] }
    });
    setHasChanges(true);
  };
  
  const handleGuardrailChange = (field, value) => {
    setLocalState({
      ...state,
      guardrails: { ...state.guardrails, [field]: value }
    });
    setHasChanges(true);
  };
  
  const handleSave = () => {
    updateMutation.mutate(state);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }
  
  if (!state) return null;
  
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Autopilot Control</h1>
          <p className="text-slate-600">Configure autonomous operation levels and guardrails</p>
        </div>
        
        {hasChanges && (
          <button
            onClick={handleSave}
            disabled={updateMutation.isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {updateMutation.isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>
      
      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5" />
        <div className="flex-1 text-sm text-blue-900">
          <p className="font-medium mb-1">Autopilot allows AI to take actions on your behalf</p>
          <p className="text-blue-700">
            Higher levels grant more autonomy. Start low and increase as trust builds over time.
          </p>
        </div>
      </div>
      
      {/* Autopilot Level */}
      <section>
        <AutopilotDial
          value={state.level}
          onChange={handleLevelChange}
          disabled={!state.enabled}
        />
      </section>
      
      {/* Timebox Controls */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Execution Timebox
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              checked={state.timebox.enabled}
              onChange={(e) => handleTimeboxChange('enabled', e.target.checked)}
              className="w-5 h-5 rounded border-slate-300"
            />
            <label className="font-medium text-slate-900">
              Restrict autonomous actions to specific time windows
            </label>
          </div>
          
          {state.timebox.enabled && (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={state.timebox.start}
                  onChange={(e) => handleTimeboxChange('start', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={state.timebox.end}
                  onChange={(e) => handleTimeboxChange('end', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Timezone
                </label>
                <select
                  value={state.timebox.timezone}
                  onChange={(e) => handleTimeboxChange('timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                >
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Product Scope */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Active Products
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: 'omniops', label: 'OMNIOPS' },
              { key: 'contentspark', label: 'ContentSpark' },
              { key: 'govcon', label: 'GovCon Connect' },
              { key: 'opsvanta', label: 'OpsVanta' }
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={state.products[key]}
                  onChange={() => handleProductToggle(key)}
                  className="w-5 h-5 rounded border-slate-300"
                />
                <span className="font-medium text-slate-900">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </section>
      
      {/* Guardrails */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Guardrails
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Maximum Spend Per Day ($)
            </label>
            <input
              type="number"
              value={state.guardrails.maxSpendPerDay}
              onChange={(e) => handleGuardrailChange('maxSpendPerDay', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Maximum PRs Per Day (per repo)
            </label>
            <input
              type="number"
              value={state.guardrails.maxPRsPerDay}
              onChange={(e) => handleGuardrailChange('maxPRsPerDay', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={state.guardrails.noFridayDeploys}
              onChange={(e) => handleGuardrailChange('noFridayDeploys', e.target.checked)}
              className="w-5 h-5 rounded border-slate-300"
            />
            <label className="font-medium text-slate-900">
              No production deploys on Fridays
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Require Approval for Actions Over ($)
            </label>
            <input
              type="number"
              value={state.guardrails.requireApprovalOver}
              onChange={(e) => handleGuardrailChange('requireApprovalOver', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      </section>
      
      {/* Trust Score Chart */}
      <section>
        <TrustChart data={state.trustHistory} />
      </section>
    </div>
  );
}
