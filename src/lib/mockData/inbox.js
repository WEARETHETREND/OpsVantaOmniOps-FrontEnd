// Mock inbox/approval items
export const generateInboxItems = () => {
  return [
    {
      id: 'inbox-1',
      title: 'Approve: Deploy new AI model to production',
      description: 'GPT-4 based content generator ready for production deployment',
      type: 'deployment',
      priority: 'high',
      product: 'ContentSpark',
      requested_by: 'Autopilot Level 4',
      requested_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      estimated_impact: '+$500/month revenue',
      risk_level: 'medium',
      actions_required: [
        'Review model performance metrics',
        'Approve deployment to production',
        'Set monitoring alerts'
      ],
      details: {
        model_accuracy: '94%',
        training_cost: '$1,200',
        inference_cost: '$0.02 per request',
        expected_usage: '25,000 requests/month'
      },
      can_customize: true
    },
    {
      id: 'inbox-2',
      title: 'Approve: Increase Stripe subscription prices',
      description: 'Recommend 15% price increase across all ContentSpark plans',
      type: 'pricing',
      priority: 'medium',
      product: 'ContentSpark',
      requested_by: 'Revenue Optimization Playbook',
      requested_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      estimated_impact: '+$3,400 MRR',
      risk_level: 'high',
      actions_required: [
        'Review competitor pricing',
        'Approve price change',
        'Schedule customer communications'
      ],
      details: {
        current_pricing: { starter: 29, pro: 79, business: 199 },
        new_pricing: { starter: 34, pro: 89, business: 229 },
        affected_customers: 847,
        grandfather_existing: true
      },
      can_customize: true
    },
    {
      id: 'inbox-3',
      title: 'Review: Large infrastructure cost increase',
      description: 'Monthly AWS costs increased 40% due to traffic spike',
      type: 'cost_alert',
      priority: 'high',
      product: 'All Products',
      requested_by: 'Cost Monitoring System',
      requested_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      estimated_impact: '-$1,840/month',
      risk_level: 'low',
      actions_required: [
        'Review cost breakdown',
        'Approve continued usage or optimize'
      ],
      details: {
        previous_cost: '$4,600/month',
        current_cost: '$6,440/month',
        main_drivers: ['RDS instances (+$900)', 'EC2 compute (+$700)', 'Data transfer (+$240)'],
        traffic_increase: '+65%'
      },
      can_customize: false
    },
    {
      id: 'inbox-4',
      title: 'Approve: Send marketing campaign to churned users',
      description: 'Win-back campaign for 143 users who churned in last 90 days',
      type: 'marketing',
      priority: 'low',
      product: 'OpsVanta',
      requested_by: 'Marketing Automation',
      requested_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      estimated_impact: '+$580 MRR (estimated 8% reactivation)',
      risk_level: 'low',
      actions_required: [
        'Review email content',
        'Approve sending campaign'
      ],
      details: {
        target_users: 143,
        email_subject: 'We miss you! Here\'s 50% off to come back',
        offer: '50% off for 3 months',
        expected_reactivation_rate: '8%',
        estimated_cost: '$43 (email service)'
      },
      can_customize: true
    },
    {
      id: 'inbox-5',
      title: 'Approve: Create new GitHub repository',
      description: 'Autopilot wants to create new repo for microservice extraction',
      type: 'infrastructure',
      priority: 'medium',
      product: 'OMNIOPS',
      requested_by: 'Autopilot Level 3',
      requested_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      estimated_impact: 'Better code organization',
      risk_level: 'low',
      actions_required: [
        'Review repository structure',
        'Approve repository creation',
        'Set up CI/CD pipelines'
      ],
      details: {
        repo_name: 'omniops-notification-service',
        reason: 'Extract notification logic into standalone service',
        estimated_lines_moved: '~3,400 LOC',
        dependencies: ['AWS SNS', 'Twilio', 'SendGrid']
      },
      can_customize: true
    }
  ];
};

export const getInboxItemById = (id) => {
  return generateInboxItems().find(item => item.id === id);
};
