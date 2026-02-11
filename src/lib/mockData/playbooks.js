// Mock playbooks data
export const generatePlaybooks = () => {
  return [
    {
      id: 'playbook-1',
      name: 'Security Patch Critical CVE',
      description: 'Automatically detect, test, and deploy critical security patches',
      enabled: true,
      trigger_type: 'event',
      trigger_config: {
        events: ['security_alert_critical'],
        conditions: ['CVE score >= 8.0']
      },
      actions: [
        { step: 1, action: 'Scan all repositories for vulnerable dependencies' },
        { step: 2, action: 'Create PRs with security patches' },
        { step: 3, action: 'Run full test suite' },
        { step: 4, action: 'If tests pass, auto-merge' },
        { step: 5, action: 'Deploy to staging' },
        { step: 6, action: 'If staging healthy, deploy to production' }
      ],
      rollback_plan: 'Revert to previous version if error rate > 1%',
      success_metrics: ['Vulnerability patched', 'No increase in error rate', 'Tests passing'],
      execution_count: 23,
      last_execution: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      avg_execution_time: '12 minutes',
      success_rate: 96
    },
    {
      id: 'playbook-2',
      name: 'Fix Failing CI Build',
      description: 'Investigate and fix failing CI/CD pipelines automatically',
      enabled: true,
      trigger_type: 'event',
      trigger_config: {
        events: ['ci_failed'],
        conditions: ['Same test failing 3+ times', 'No manual commits in last hour']
      },
      actions: [
        { step: 1, action: 'Analyze error logs and stack traces' },
        { step: 2, action: 'Check for common issues (dependencies, syntax, imports)' },
        { step: 3, action: 'Generate fix PR with AI assistance' },
        { step: 4, action: 'Run tests locally' },
        { step: 5, action: 'If passing, push fix and notify team' }
      ],
      rollback_plan: 'Revert commit if issue persists',
      success_metrics: ['Build passes', 'No new failures introduced'],
      execution_count: 67,
      last_execution: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      avg_execution_time: '8 minutes',
      success_rate: 78
    },
    {
      id: 'playbook-3',
      name: 'Deploy Hotfix',
      description: 'Fast-track critical bug fixes to production',
      enabled: true,
      trigger_type: 'manual',
      trigger_config: null,
      actions: [
        { step: 1, action: 'Create production backup' },
        { step: 2, action: 'Deploy to staging first' },
        { step: 3, action: 'Run smoke tests' },
        { step: 4, action: 'Deploy to production' },
        { step: 5, action: 'Monitor error rates for 1 hour' },
        { step: 6, action: 'Send deployment notification' }
      ],
      rollback_plan: 'Automatic rollback if error rate > 2%',
      success_metrics: ['Zero critical errors', 'Error rate < 0.5%'],
      execution_count: 31,
      last_execution: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      avg_execution_time: '18 minutes',
      success_rate: 100
    },
    {
      id: 'playbook-4',
      name: 'Scale Infrastructure on Traffic Spike',
      description: 'Automatically scale up resources when traffic increases',
      enabled: true,
      trigger_type: 'event',
      trigger_config: {
        events: ['high_traffic_detected'],
        conditions: ['Requests/sec > 1000', 'CPU usage > 80%']
      },
      actions: [
        { step: 1, action: 'Analyze traffic patterns' },
        { step: 2, action: 'Scale up appropriate services' },
        { step: 3, action: 'Monitor performance' },
        { step: 4, action: 'Scale down after traffic normalizes' }
      ],
      rollback_plan: 'Manual intervention if costs exceed $100/hour',
      success_metrics: ['Response time < 500ms', 'Zero timeouts'],
      execution_count: 12,
      last_execution: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      avg_execution_time: '5 minutes',
      success_rate: 100
    },
    {
      id: 'playbook-5',
      name: 'Pause Low-Converting Ads',
      description: 'Automatically pause ad campaigns with poor performance',
      enabled: true,
      trigger_type: 'schedule',
      trigger_config: {
        schedule: 'daily',
        time: '08:00 AM',
        timezone: 'America/Los_Angeles'
      },
      actions: [
        { step: 1, action: 'Analyze all active campaigns' },
        { step: 2, action: 'Identify campaigns with conversion rate < 1%' },
        { step: 3, action: 'Pause campaigns where CAC > $100' },
        { step: 4, action: 'Send report to marketing team' }
      ],
      rollback_plan: 'Campaigns can be manually re-enabled',
      success_metrics: ['CAC reduced', 'Budget reallocated to better campaigns'],
      execution_count: 89,
      last_execution: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      avg_execution_time: '3 minutes',
      success_rate: 100
    },
    {
      id: 'playbook-6',
      name: 'Auto-Upsell High-Value Users',
      description: 'Identify and prompt power users to upgrade plans',
      enabled: true,
      trigger_type: 'schedule',
      trigger_config: {
        schedule: 'weekly',
        day: 'Monday',
        time: '09:00 AM',
        timezone: 'America/Los_Angeles'
      },
      actions: [
        { step: 1, action: 'Identify users hitting plan limits 5+ times/week' },
        { step: 2, action: 'Calculate potential revenue from upgrades' },
        { step: 3, action: 'Send personalized upgrade email' },
        { step: 4, action: 'Offer limited-time discount' },
        { step: 5, action: 'Track conversion rate' }
      ],
      rollback_plan: 'N/A - non-invasive communication',
      success_metrics: ['10%+ conversion rate', 'Positive email sentiment'],
      execution_count: 15,
      last_execution: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      avg_execution_time: '10 minutes',
      success_rate: 93
    }
  ];
};

export const getPlaybookById = (id) => {
  return generatePlaybooks().find(playbook => playbook.id === id);
};
