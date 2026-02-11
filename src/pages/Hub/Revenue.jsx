// Revenue Dashboard Screen
import { useQuery } from '@tanstack/react-query';
import * as hubApi from '../../lib/hubApi';
import MetricCard from '../../components/Hub/MetricCard';
import { DollarSign, TrendingUp, Users, UserMinus, Target, ExternalLink } from 'lucide-react';

export default function Revenue() {
  const { data, isLoading } = useQuery({
    queryKey: ['revenue'],
    queryFn: hubApi.getRevenue
  });
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }
  
  if (!data) return null;
  
  const { summary, by_product, top_customers, daily_revenue } = data;
  
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Revenue Dashboard</h1>
          <p className="text-slate-600">Financial metrics and customer insights</p>
        </div>
        
        <a
          href="https://dashboard.stripe.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Open Stripe
        </a>
      </div>
      
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Monthly Recurring Revenue"
          value={summary.mrr}
          change={summary.mrr_growth}
          format="currency"
          icon={DollarSign}
        />
        
        <MetricCard
          label="Annual Recurring Revenue"
          value={summary.arr}
          format="currency"
          icon={TrendingUp}
        />
        
        <MetricCard
          label="Total Customers"
          value={summary.total_customers}
          icon={Users}
        />
        
        <MetricCard
          label="Churn Rate"
          value={summary.churn_rate}
          format="percent"
          icon={UserMinus}
        />
      </div>
      
      {/* Revenue Chart */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Revenue Trend (30 Days)</h2>
        <SimpleLineChart data={daily_revenue} />
      </section>
      
      {/* Revenue by Product */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Revenue by Product</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {by_product.map((product) => (
            <div key={product.product} className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-2">{product.product}</h3>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-slate-900">
                    ${product.mrr.toLocaleString()}
                  </span>
                  <span className={`text-sm font-medium ${
                    product.growth > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.growth > 0 && '+'}{product.growth}%
                  </span>
                </div>
                <div className="text-sm text-slate-600">
                  {product.customers} customers • ${product.arr.toLocaleString()} ARR
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Top Customers */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Top Customers</h2>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Plan
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">
                  MRR
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">
                  LTV
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">
                  Health
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {top_customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {customer.plan}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 text-right">
                    ${customer.mrr.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 text-right">
                    ${customer.ltv.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      customer.health_score >= 80 ? 'bg-green-100 text-green-700' :
                      customer.health_score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {customer.health_score}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
      {/* Additional Metrics */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900">LTV / CAC Ratio</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">
            {summary.ltv_cac_ratio}x
          </div>
          <p className="text-sm text-slate-600">
            ${summary.ltv.toLocaleString()} LTV / ${summary.cac.toLocaleString()} CAC
          </p>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-5 h-5 text-green-600" />
            <h3 className="font-bold text-slate-900">New Customers (30d)</h3>
          </div>
          <div className="text-3xl font-bold text-green-700 mb-1">
            +{summary.new_customers_30d}
          </div>
          <p className="text-sm text-slate-600">
            {Math.round((summary.new_customers_30d / summary.total_customers) * 100)}% growth rate
          </p>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <UserMinus className="w-5 h-5 text-red-600" />
            <h3 className="font-bold text-slate-900">Churned (30d)</h3>
          </div>
          <div className="text-3xl font-bold text-red-700 mb-1">
            -{summary.churned_customers_30d}
          </div>
          <p className="text-sm text-slate-600">
            {summary.churn_rate}% monthly churn rate
          </p>
        </div>
      </section>
    </div>
  );
}

// Simple line chart component
function SimpleLineChart({ data }) {
  if (!data || data.length === 0) return null;
  
  const revenues = data.map(d => d.revenue);
  const minRevenue = Math.min(...revenues);
  const maxRevenue = Math.max(...revenues);
  const range = maxRevenue - minRevenue || 1;
  
  const width = 800;
  const height = 200;
  const padding = 40;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;
  
  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((d.revenue - minRevenue) / range) * chartHeight;
    return { x, y, revenue: d.revenue, date: d.date };
  });
  
  const pathD = points.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ');
  
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`;
  
  return (
    <div className="relative">
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
          const y = padding + chartHeight * (1 - pct);
          return (
            <line
              key={i}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}
        
        {/* Area fill */}
        <path d={areaD} fill="url(#revenueGradient)" opacity="0.2" />
        
        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Points */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#10b981"
            stroke="white"
            strokeWidth="2"
          >
            <title>${point.revenue.toLocaleString()} on {point.date}</title>
          </circle>
        ))}
        
        <defs>
          <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>{data[0]?.date}</span>
        <span>{data[data.length - 1]?.date}</span>
      </div>
    </div>
  );
}
