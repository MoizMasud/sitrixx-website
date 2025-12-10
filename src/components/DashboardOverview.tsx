import { useState, useEffect } from 'react';
import { Users, UserPlus, Star, TrendingUp } from 'lucide-react';

type Client = {
  id: string;
  business_name: string;
};

type Lead = {
  id: string;
  name: string;
  source: string;
  created_at: string;
};

type Review = {
  id: string;
  rating: number;
  comments: string;
  created_at: string;
};

type DashboardData = {
  clients: Client[];
  leads: Lead[];
  reviews: Review[];
  error: string | null;
};

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

interface DashboardOverviewProps {
  initialData: DashboardData;
}

export default function DashboardOverview({ initialData }: DashboardOverviewProps) {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    totalLeads: 0,
    totalReviews: 0,
    fiveStarReviews: 0,
    averageRating: '0.0',
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  useEffect(() => {
    if (initialData.error) {
      return; // Show error state
    }

    // Calculate stats from initial data
    const fiveStarCount = initialData.reviews.filter(r => r.rating === 5).length;
    const avgRating = initialData.reviews.length > 0
      ? (initialData.reviews.reduce((sum, r) => sum + r.rating, 0) / initialData.reviews.length).toFixed(1)
      : '0.0';

    setStats({
      totalClients: initialData.clients.length,
      totalLeads: initialData.leads.length,
      totalReviews: initialData.reviews.length,
      fiveStarReviews: fiveStarCount,
      averageRating: avgRating,
    });

    // Build recent activity
    const activity: RecentActivity[] = [];

    // Add recent leads (last 5)
    initialData.leads
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5)
      .forEach(lead => {
        activity.push({
          type: 'lead',
          clientName: 'Client', // We'll need to match this if needed
          details: `${lead.name || 'Someone'} submitted a ${lead.source === 'website_form' ? 'contact form' : 'missed call'}`,
          timestamp: lead.created_at,
        });
      });

    // Add recent reviews (last 5)
    initialData.reviews
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5)
      .forEach(review => {
        activity.push({
          type: 'review',
          clientName: 'Client',
          details: `${review.rating}-star review: "${review.comments.slice(0, 50)}${review.comments.length > 50 ? '...' : ''}"`,
          timestamp: review.created_at,
        });
      });

    // Sort all activity by timestamp
    activity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    setRecentActivity(activity.slice(0, 10));
  }, [initialData]);

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

  if (initialData.error) {
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
          <p className="text-sm text-muted-foreground mt-2">{initialData.error}</p>
          <button
            onClick={() => window.location.reload()}
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
