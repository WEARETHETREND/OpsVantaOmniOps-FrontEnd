// Settings & API Key Vault Screen
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import * as hubApi from '../../lib/hubApi';
import { Key, Check, X, Eye, EyeOff, TestTube, Activity, Database, Globe } from 'lucide-react';

export default function Settings() {
  const queryClient = useQueryClient();
  const [showKeys, setShowKeys] = useState({});
  const [editingKey, setEditingKey] = useState(null);
  const [keyValue, setKeyValue] = useState('');
  
  const { data: keys, isLoading: keysLoading } = useQuery({
    queryKey: ['keys'],
    queryFn: hubApi.getKeys
  });
  
  const { data: health } = useQuery({
    queryKey: ['health'],
    queryFn: hubApi.getHealth,
    refetchInterval: 30000
  });
  
  const saveMutation = useMutation({
    mutationFn: hubApi.saveKey,
    onSuccess: () => {
      queryClient.invalidateQueries(['keys']);
      queryClient.invalidateQueries(['health']);
      setEditingKey(null);
      setKeyValue('');
    }
  });
  
  const toggleMutation = useMutation({
    mutationFn: hubApi.toggleKey,
    onSuccess: () => {
      queryClient.invalidateQueries(['keys']);
      queryClient.invalidateQueries(['health']);
    }
  });
  
  const testMutation = useMutation({
    mutationFn: hubApi.testKey,
    onSuccess: (data) => {
      alert(data.success ? 'Connection successful!' : `Connection failed: ${data.message}`);
    }
  });
  
  const handleSaveKey = (keyId) => {
    if (!keyValue.trim()) return;
    
    saveMutation.mutate({
      id: keyId,
      value: keyValue,
      enabled: true
    });
  };
  
  const handleToggle = (keyId) => {
    toggleMutation.mutate(keyId);
  };
  
  const handleTest = (keyId) => {
    testMutation.mutate(keyId);
  };
  
  if (keysLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">API keys, integrations, and system configuration</p>
      </div>
      
      {/* System Health */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          System Health
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <HealthCard
            icon={Globe}
            label="API Status"
            value={health?.api?.status || 'unknown'}
            details={health?.api?.responseTime ? `${health.api.responseTime}ms` : ''}
          />
          
          <HealthCard
            icon={Database}
            label="Database"
            value={health?.database?.status || 'unknown'}
            details={health?.database?.connections ? `${health.database.connections}/${health.database.maxConnections} conn` : ''}
          />
          
          <HealthCard
            icon={Key}
            label="GitHub"
            value={health?.services?.github || 'not_configured'}
          />
          
          <HealthCard
            icon={Key}
            label="Stripe"
            value={health?.services?.stripe || 'not_configured'}
          />
        </div>
      </section>
      
      {/* API Keys */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Key className="w-5 h-5" />
          API Key Vault
        </h2>
        
        <div className="space-y-4">
          {keys?.map((key) => (
            <div key={key.id} className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-1">{key.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      key.status === 'configured' ? 'bg-green-100 text-green-700' :
                      key.status === 'error' ? 'bg-red-100 text-red-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {key.status === 'configured' ? 'Configured' :
                       key.status === 'error' ? 'Error' :
                       'Not Configured'}
                    </span>
                    
                    {key.last_used && (
                      <span className="text-xs">
                        Last used: {new Date(key.last_used).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                
                {key.value && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={key.enabled}
                      onChange={() => handleToggle(key.id)}
                      className="w-5 h-5 rounded border-slate-300"
                    />
                    <span className="text-sm font-medium text-slate-700">Enabled</span>
                  </label>
                )}
              </div>
              
              {editingKey === key.id ? (
                <div className="space-y-3">
                  <input
                    type="password"
                    value={keyValue}
                    onChange={(e) => setKeyValue(e.target.value)}
                    placeholder="Enter API key..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-sm"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveKey(key.id)}
                      disabled={saveMutation.isLoading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingKey(null);
                        setKeyValue('');
                      }}
                      className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {key.value ? (
                    <>
                      <div className="flex-1 px-3 py-2 bg-slate-50 rounded-lg font-mono text-sm text-slate-600">
                        {showKeys[key.id] ? key.value : '••••••••••••••••••••••••'}
                      </div>
                      
                      <button
                        onClick={() => setShowKeys({ ...showKeys, [key.id]: !showKeys[key.id] })}
                        className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
                        title={showKeys[key.id] ? 'Hide' : 'Show'}
                      >
                        {showKeys[key.id] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                      
                      <button
                        onClick={() => handleTest(key.id)}
                        disabled={testMutation.isLoading}
                        className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
                      >
                        <TestTube className="w-4 h-4" />
                        Test
                      </button>
                      
                      <button
                        onClick={() => {
                          setEditingKey(key.id);
                          setKeyValue('');
                        }}
                        className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        Update
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingKey(key.id);
                        setKeyValue('');
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Configure
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      
      {/* Instructions */}
      <section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 mb-3">🔒 Security Notes</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• API keys are encrypted and stored securely</li>
          <li>• Keys are only used for authorized API requests</li>
          <li>• Disable a key to prevent it from being used without deleting it</li>
          <li>• Test connections to verify keys are working properly</li>
          <li>• Never share your API keys or commit them to version control</li>
        </ul>
      </section>
    </div>
  );
}

function HealthCard({ icon: Icon, label, value, details }) {
  const statusColor = 
    value === 'healthy' || value === 'connected' ? 'text-green-600 bg-green-50' :
    value === 'error' || value === 'failed' ? 'text-red-600 bg-red-50' :
    value === 'degraded' ? 'text-yellow-600 bg-yellow-50' :
    'text-slate-600 bg-slate-50';
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-5 h-5 text-slate-400" />
        <h3 className="font-bold text-slate-900">{label}</h3>
      </div>
      
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
        {value.replace('_', ' ')}
      </div>
      
      {details && (
        <div className="mt-2 text-xs text-slate-600">
          {details}
        </div>
      )}
    </div>
  );
}
