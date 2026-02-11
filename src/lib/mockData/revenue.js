// Mock revenue and metrics data
export const generateRevenueData = () => {
  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
  
  // Generate daily revenue data for chart
  const dailyRevenue = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000);
    const baseRevenue = 45000;
    const variance = Math.random() * 3000 - 1500;
    const trend = (30 - i) * 100; // Upward trend
    
    dailyRevenue.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.round(baseRevenue + variance + trend),
      customers: Math.round(850 + (30 - i) * 2 + Math.random() * 10)
    });
  }
  
  return {
    summary: {
      mrr: 47800,
      mrr_growth: 8.4,
      arr: 573600,
      total_customers: 892,
      new_customers_30d: 47,
      churned_customers_30d: 12,
      churn_rate: 1.35,
      ltv: 8400,
      cac: 620,
      ltv_cac_ratio: 13.5
    },
    by_product: [
      {
        product: 'ContentSpark',
        mrr: 18900,
        customers: 342,
        growth: 12.3,
        arr: 226800
      },
      {
        product: 'OMNIOPS',
        mrr: 12400,
        customers: 198,
        growth: 6.8,
        arr: 148800
      },
      {
        product: 'GovCon Connect',
        mrr: 9200,
        customers: 156,
        growth: 4.2,
        arr: 110400
      },
      {
        product: 'OpsVanta',
        mrr: 4800,
        customers: 124,
        growth: 15.6,
        arr: 57600
      },
      {
        product: 'Other Products',
        mrr: 2500,
        customers: 72,
        growth: 2.1,
        arr: 30000
      }
    ],
    top_customers: [
      {
        id: 'cust-1',
        name: 'Acme Corporation',
        mrr: 1200,
        plan: 'Enterprise',
        joined: new Date(now - 380 * 24 * 60 * 60 * 1000).toISOString(),
        ltv: 15200,
        health_score: 92
      },
      {
        id: 'cust-2',
        name: 'TechStart Inc',
        mrr: 890,
        plan: 'Business',
        joined: new Date(now - 240 * 24 * 60 * 60 * 1000).toISOString(),
        ltv: 7120,
        health_score: 88
      },
      {
        id: 'cust-3',
        name: 'Global Dynamics',
        mrr: 780,
        plan: 'Enterprise',
        joined: new Date(now - 520 * 24 * 60 * 60 * 1000).toISOString(),
        ltv: 13520,
        health_score: 95
      },
      {
        id: 'cust-4',
        name: 'Innovate Labs',
        mrr: 650,
        plan: 'Business',
        joined: new Date(now - 180 * 24 * 60 * 60 * 1000).toISOString(),
        ltv: 3900,
        health_score: 78
      },
      {
        id: 'cust-5',
        name: 'DataFlow Systems',
        mrr: 590,
        plan: 'Pro',
        joined: new Date(now - 290 * 24 * 60 * 60 * 1000).toISOString(),
        ltv: 5690,
        health_score: 85
      }
    ],
    daily_revenue: dailyRevenue,
    recent_transactions: [
      {
        id: 'tx-1',
        customer: 'Acme Corporation',
        amount: 1200,
        type: 'subscription',
        status: 'succeeded',
        date: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'tx-2',
        customer: 'TechStart Inc',
        amount: 890,
        type: 'subscription',
        status: 'succeeded',
        date: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'tx-3',
        customer: 'New Customer Co',
        amount: 290,
        type: 'trial_conversion',
        status: 'succeeded',
        date: new Date(now - 4 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'tx-4',
        customer: 'Beta Industries',
        amount: 450,
        type: 'subscription',
        status: 'failed',
        date: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  };
};
