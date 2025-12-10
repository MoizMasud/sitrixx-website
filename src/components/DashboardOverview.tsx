import { useState, useEffect } from 'react';
import { Users, UserPlus, Star, TrendingUp } from 'lucide-react';

const API_BASE = 'https://sitrixx-website-backend.vercel.app';

type DashboardStats = {
  totalClients: number;
  totalLeads: number;
  totalReviews: number;
  fiveStarReviews: number;
  averageRating: string;
};

type RecentActivity = {
  type: 'lead' | 'review' | 'client';
  clientName: string;
  details: string;
  timestamp: string;
};

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    totalLeads: 0,
    totalReviews: 0,
    fiveStarReviews: 0,
    averageRating: '0.0',
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching clients...');
      
      // Fetch clients - API returns array directly
      const clientsRes = await fetch(`${API_BASE}/api/clients`);
      if (!clientsRes.ok) {
        throw new Error(`Failed to fetch clients: ${clientsRes.status}`);
      }
      const clients = await clientsRes.json();
      
      console.log('Clients fetched:', clients);

      if (!Array.isArray(clients)) {
        throw new Error('Invalid clients response format');
      }

      let allLeads: any[] = [];
      let allReviews: any[] = [];

      // Fetch leads and reviews for each client
      for (const client of clients) {
        try {
          console.log(`Fetching data for client: ${client.business_name}`);

          // Fetch leads
          const leadsRes = await fetch(`${API_BASE}/api/leads?clientId=${encodeURIComponent(client.id)}`);
          const leadsData = await leadsRes.json();
          const leads = (leadsData.leads || []).map((l: any) => ({ ...l, client_name: client.business_name }));
          allLeads = [...allLeads, ...leads];
          console.log(`Leads for ${client.business_name}:`, leads.length);

          // Fetch reviews
          const reviewsRes = await fetch(`${API_BASE}/api/reviews?clientId=${encodeURIComponent(client.id)}`);
          const reviewsData = await reviewsRes.json();
          const reviews = (reviewsData.reviews || []).map((r: any) => ({ ...r, client_name: client.business_name }));
          allReviews = [...allReviews, ...reviews];
          console.log(`Reviews for ${client.business_name}:`, reviews.length);
        } catch (err) {
          console.error(`Error fetching data for client ${client.id}:`, err);
        }
      }

      console.log('Total leads:', allLeads.length);
      console.log('Total reviews:', allReviews.length);

      // Calculate stats
      const fiveStarCount = allReviews.filter(r => r.rating === 5).length;
      const avgRating = allReviews.length > 0
        ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
        : '0.0';

      setStats({
        totalClients: clients.length,
        totalLeads: allLeads.length,
        totalReviews: allReviews.length,
        fiveStarReviews: fiveStarCount,
        averageRating: avgRating,
      });

      // Build recent activity
      const activity: RecentActivity[] = [];

      // Add recent leads (last 5)
      allLeads
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5)
        .forEach(lead => {
          activity.push({
            type: 'lead',
            clientName: lead.client_name,
            details: `${lead.name || 'Someone'} submitted a ${lead.source === 'website_form' ? 'contact form' : 'missed call'}`,
            timestamp: lead.created_at,
          });
        });

      // Add recent reviews (last 5)
      allReviews
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5)
        .forEach(review => {
          activity.push({
            type: 'review',
            clientName: review.client_name,
            details: `${review.rating}-star review: "${review.comments.slice(0, 50)}${review.comments.length > 50 ? '...' : ''}"`,
            timestamp: review.created_at,
          });
        });

      // Sort all activity by timestamp
      activity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      console.log('Recent activity:', activity);

      setRecentActivity(activity.slice(0, 10));
      setLoading(false);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return then.toLocaleDateString();
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lead':
        return (
          <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <UserPlus className="w-5 h-5 text-blue-500" />
          </div>
        );
      case 'review':
        return (
          <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
        );
      case 'client':
        return (
          <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-green-500" />
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-black mb-3 tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Overview
          </h1>
          <p className="text-lg text-muted-foreground">Welcome to your Sitrixx admin dashboard</p>
        </div>
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-3 text-muted-foreground">
            <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading dashboard data...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-black mb-3 tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Overview
          </h1>
          <p className="text-lg text-muted-foreground">Welcome to your Sitrixx admin dashboard</p>
        </div>
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
          <p className="text-destructive font-medium">Error loading dashboard:</p>
          <p className="text-sm text-muted-foreground mt-2">{error}</p>
          <button
            onClick={() => loadDashboardData()}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-5xl md:text-6xl font-black mb-3 tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
          Overview
        </h1>
        <p className="text-lg text-muted-foreground">Welcome to your Sitrixx admin dashboard</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="text-4xl font-black mb-1 text-foreground">{stats.totalClients}</div>
          <div className="text-sm text-muted-foreground font-medium">Total Clients</div>
        </div>

        <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="text-4xl font-black mb-1 text-foreground">{stats.totalLeads}</div>
          <div className="text-sm text-muted-foreground font-medium">Total Leads</div>
        </div>

        <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <div className="text-4xl font-black mb-1 text-foreground">{stats.fiveStarReviews}</div>
          <div className="text-sm text-muted-foreground font-medium">5-Star Reviews</div>
        </div>

        <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="text-4xl font-black mb-1 text-foreground">{stats.averageRating}</div>
          <div className="text-sm text-muted-foreground font-medium">Average Rating</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border rounded-xl p-6 shadow-xl">
        <h2 className="text-3xl font-black mb-6 tracking-tight text-foreground">Recent Activity</h2>
        
        {recentActivity.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No recent activity to display. Start by adding clients!
          </div>
        ) : (
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-[15px]">
                    {activity.type === 'lead' ? 'New lead from' : 
                     activity.type === 'review' ? 'Review posted for' : 
                     'New client registered:'} <strong>{activity.clientName}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{activity.details}</p>
                  <p className="text-xs text-muted-foreground mt-2">{formatTimeAgo(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
