// Mock autopilot execution logs
export const generateLogs = () => {
  const now = Date.now();
  
  return [
    {
      id: 'log-1',
      action: 'Merged PR #142: Fix memory leak in WebSocket handler',
      one_line_why: 'All tests passed, code review approved, security scan clean',
      playbook: 'Auto-merge approved PRs',
      money_impact: null,
      status: 'completed',
      created_at: new Date(now - 2 * 60 * 1000).toISOString(),
      product: 'OMNIOPS',
      level: 2,
      rollback_available: true
    },
    {
      id: 'log-2',
      action: 'Deployed hotfix to production',
      one_line_why: 'Critical bug fix for payment processing',
      playbook: 'Deploy hotfix',
      money_impact: '+$3,200',
      status: 'completed',
      created_at: new Date(now - 5 * 60 * 1000).toISOString(),
      product: 'ContentSpark',
      level: 3,
      rollback_available: true
    },
    {
      id: 'log-3',
      action: 'Sent dunning emails to 47 customers',
      one_line_why: 'Payment retry failed, automated email campaign triggered',
      playbook: 'Dunning campaign',
      money_impact: '+$1,840',
      status: 'completed',
      created_at: new Date(now - 8 * 60 * 1000).toISOString(),
      product: 'OpsVanta',
      level: 2,
      rollback_available: false
    },
    {
      id: 'log-4',
      action: 'Scaled up database instance',
      one_line_why: 'CPU usage exceeded 85% threshold for 10 minutes',
      playbook: 'Auto-scale infrastructure',
      money_impact: '-$45/month',
      status: 'completed',
      created_at: new Date(now - 15 * 60 * 1000).toISOString(),
      product: 'All Products',
      level: 3,
      rollback_available: false
    },
    {
      id: 'log-5',
      action: 'Created GitHub issue for failing test',
      one_line_why: 'Test suite failure detected in CI pipeline',
      playbook: 'Track failing tests',
      money_impact: null,
      status: 'completed',
      created_at: new Date(now - 22 * 60 * 1000).toISOString(),
      product: 'GovCon Connect',
      level: 1,
      rollback_available: false
    },
    {
      id: 'log-6',
      action: 'Paused low-converting ad campaign',
      one_line_why: 'CAC exceeded $120, conversion rate < 1%',
      playbook: 'Optimize ad spend',
      money_impact: '-$280/day',
      status: 'completed',
      created_at: new Date(now - 35 * 60 * 1000).toISOString(),
      product: 'ContentSpark',
      level: 2,
      rollback_available: true
    },
    {
      id: 'log-7',
      action: 'Updated API rate limits',
      one_line_why: 'Abuse detected from 3 IP addresses',
      playbook: 'Security: Rate limiting',
      money_impact: null,
      status: 'completed',
      created_at: new Date(now - 45 * 60 * 1000).toISOString(),
      product: 'OMNIOPS',
      level: 2,
      rollback_available: true
    },
    {
      id: 'log-8',
      action: 'Awaiting approval: Deploy new AI model',
      one_line_why: 'Significant model change requires manual review',
      playbook: 'Deploy ML model',
      money_impact: '+$500/month',
      status: 'pending',
      created_at: new Date(now - 55 * 60 * 1000).toISOString(),
      product: 'ContentSpark',
      level: 4,
      rollback_available: false
    },
    {
      id: 'log-9',
      action: 'Added database index',
      one_line_why: 'Query performance optimization identified',
      playbook: 'Optimize database',
      money_impact: null,
      status: 'completed',
      created_at: new Date(now - 70 * 60 * 1000).toISOString(),
      product: 'OpsVanta',
      level: 2,
      rollback_available: true
    },
    {
      id: 'log-10',
      action: 'Sent upgrade prompt to power users',
      one_line_why: '12 users hitting feature limits consistently',
      playbook: 'Upsell power users',
      money_impact: '+$840 potential',
      status: 'completed',
      created_at: new Date(now - 90 * 60 * 1000).toISOString(),
      product: 'GovCon Connect',
      level: 1,
      rollback_available: false
    }
  ];
};

export const getLogById = (id) => {
  return generateLogs().find(log => log.id === id);
};
