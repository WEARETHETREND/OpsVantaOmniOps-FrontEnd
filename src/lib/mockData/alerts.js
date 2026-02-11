// Mock alert data generator
export const generateAlerts = () => {
  return [
    {
      id: 'alert-1',
      title: 'Security: Critical CVE-2024-1234 in Dependencies',
      severity: 'critical',
      one_line_why: 'High-severity vulnerability detected in react-dom package affecting 3 repositories',
      money_impact: -5000,
      confidence: 95,
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      product: 'OMNIOPS',
      type: 'security',
      details: 'CVE-2024-1234 allows remote code execution through malformed props. Upgrade to v19.2.1+ required.',
      actions: [
        { label: 'Auto-Patch', risk: 'low', eta: '5 minutes' },
        { label: 'View Details', risk: 'none', eta: null }
      ]
    },
    {
      id: 'alert-2',
      title: 'Performance: API Response Time Degraded',
      severity: 'high',
      one_line_why: 'Average API response time increased from 120ms to 850ms over last hour',
      money_impact: -1200,
      confidence: 88,
      deadline: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
      product: 'ContentSpark',
      type: 'performance',
      details: 'Database query optimization needed. Slow query detected on users table.',
      actions: [
        { label: 'Add Index', risk: 'low', eta: '2 minutes' },
        { label: 'Scale Up', risk: 'medium', eta: '10 minutes' }
      ]
    },
    {
      id: 'alert-3',
      title: 'Financial: Stripe Payment Failure Rate Spike',
      severity: 'medium',
      one_line_why: 'Payment failure rate jumped from 2% to 8% in last 24 hours',
      money_impact: -3400,
      confidence: 92,
      deadline: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
      product: 'OpsVanta',
      type: 'financial',
      details: 'Likely due to expired credit cards. Automated retry + email campaign recommended.',
      actions: [
        { label: 'Send Dunning Emails', risk: 'low', eta: '1 minute' },
        { label: 'Enable Auto-Retry', risk: 'low', eta: '30 seconds' }
      ]
    }
  ];
};

export const getAlertById = (id) => {
  return generateAlerts().find(alert => alert.id === id);
};
