// Mock recommended moves data
export const generateMoves = () => {
  return [
    {
      id: 'move-1',
      title: 'Enable AI Content Bundle for High-Value Customers',
      one_line_why: '23 enterprise customers showing high engagement with AI features but not subscribed',
      expected_impact: '+$2,400 MRR',
      confidence: 87,
      risk: 'low',
      product: 'ContentSpark',
      type: 'revenue',
      actions: [
        'Send personalized email campaign',
        'Offer 30-day trial',
        'Enable features automatically after trial'
      ],
      estimated_time: '2 hours',
      rollback_plan: 'Disable features and send apology email if negative feedback',
      success_metrics: ['15+ trial activations', '5+ conversions within 30 days']
    },
    {
      id: 'move-2',
      title: 'Optimize Database Indexes for Common Queries',
      one_line_why: 'Analysis shows 3 frequently-used queries missing optimal indexes',
      expected_impact: '-40% response time',
      confidence: 95,
      risk: 'low',
      product: 'OMNIOPS',
      type: 'performance',
      actions: [
        'Add composite index on users(email, created_at)',
        'Add index on projects(owner_id, status)',
        'Add covering index on activities table'
      ],
      estimated_time: '15 minutes',
      rollback_plan: 'Drop indexes if any performance regression detected',
      success_metrics: ['p95 latency < 200ms', 'No query timeout errors']
    },
    {
      id: 'move-3',
      title: 'Deploy Security Patch to Production',
      one_line_why: 'Critical security fix ready in staging, all tests passing',
      expected_impact: 'Eliminates XSS vulnerability',
      confidence: 98,
      risk: 'medium',
      product: 'GovCon Connect',
      type: 'security',
      actions: [
        'Create production backup',
        'Deploy patch to production',
        'Run security scan',
        'Monitor error rates for 1 hour'
      ],
      estimated_time: '30 minutes',
      rollback_plan: 'Automatic rollback if error rate > 1%',
      success_metrics: ['Zero XSS vulnerabilities', 'Error rate < 0.5%']
    }
  ];
};

export const getMoveById = (id) => {
  return generateMoves().find(move => move.id === id);
};
