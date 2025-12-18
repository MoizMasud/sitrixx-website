import React, { useState, useEffect } from 'react';
import { Search, Star, Calendar, MessageSquare } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface Client {
  id: string;
  business_name: string;
}

interface Review {
  id: string;
  name?: string;
  phone?: string;
  rating: number;
  comments?: string;
  created_at: string;
  client_name?: string;
  client_id?: string;
}

export default function ReviewsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Stats
  const totalReviews = filteredReviews.length;
  const fiveStarReviews = filteredReviews.filter(r => r.rating === 5).length;
  const averageRating = filteredReviews.length > 0
    ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1)
    : '0.0';

  // Load clients on mount
  useEffect(() => {
    loadClients();
  }, []);

  // Load reviews when client selection changes
  useEffect(() => {
    if (selectedClient && selectedClient !== '') {
      loadReviewsForClient(selectedClient);
    } else {
      setAllReviews([]);
      setFilteredReviews([]);
    }
  }, [selectedClient]);

  // Filter reviews when search term changes
  useEffect(() => {
    if (!searchTerm) {
      setFilteredReviews(allReviews);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = allReviews.filter(review => {
      return (
        (review.name && review.name.toLowerCase().includes(term)) ||
        (review.phone && review.phone.includes(term)) ||
        (review.comments && review.comments.toLowerCase().includes(term))
      );
    });

    setFilteredReviews(filtered);
  }, [searchTerm, allReviews]);

  async function loadClients() {
    setInitialLoading(true);
    console.log('[ReviewsPage] Loading clients...');
    
    try {
      // Check if authFetch exists
      if (!(window as any).authFetch) {
        throw new Error('authFetch not initialized. Please refresh the page.');
      }

      const path = '/api/admin/clients';
      console.log('[ReviewsPage] Fetching from path:', path);
      
      const res = await (window as any).authFetch(path);
      console.log('[ReviewsPage] Response status:', res.status);
      
      if (!res.ok) {
        const text = await res.text();
        console.error('[ReviewsPage] Error response:', text);
        throw new Error(`Failed to load clients: ${res.status} ${res.statusText}`);
      }
      
      const data = await res.json();
      console.log('[ReviewsPage] Clients data:', data);
      
      if (data.ok) {
        setClients(data.clients || []);
        console.log('[ReviewsPage] Successfully loaded', data.clients?.length || 0, 'clients');
      } else {
        throw new Error(data.error || 'Failed to load clients');
      }
    } catch (err) {
      console.error('[ReviewsPage] Error loading clients:', err);
      setError(err instanceof Error ? err.message : 'Failed to load clients');
    } finally {
      setInitialLoading(false);
    }
  }

  async function loadReviewsForClient(clientId: string) {
    setLoading(true);
    setError(null);
    console.log('[ReviewsPage] Loading reviews for client:', clientId);

    try {
      // Check if authFetch exists
      if (!(window as any).authFetch) {
        throw new Error('authFetch not initialized. Please refresh the page.');
      }

      if (clientId === 'all') {
        // Load reviews for all clients
        console.log('[ReviewsPage] Loading reviews for all clients');
        const allClientReviews: Review[] = [];
        
        for (const client of clients) {
          try {
            const path = `/api/reviews?clientId=${encodeURIComponent(client.id)}`;
            console.log('[ReviewsPage] Fetching reviews from path:', path);
            
            const res = await (window as any).authFetch(path);
            console.log('[ReviewsPage] Response status for', client.business_name, ':', res.status);
            
            if (!res.ok) {
              console.warn('[ReviewsPage] Failed to fetch reviews for', client.business_name);
              continue;
            }
            
            const data = await res.json();
            console.log('[ReviewsPage] Reviews data for', client.business_name, ':', data);
            
            const clientReviews = (data.reviews || []).map((review: Review) => ({
              ...review,
              client_name: client.business_name,
              client_id: client.id
            }));
            allClientReviews.push(...clientReviews);
          } catch (err) {
            console.error(`[ReviewsPage] Error loading reviews for ${client.business_name}:`, err);
          }
        }
        
        console.log('[ReviewsPage] Total reviews loaded:', allClientReviews.length);
        setAllReviews(allClientReviews);
        setFilteredReviews(allClientReviews);
      } else {
        // Load reviews for single client
        const path = `/api/reviews?clientId=${encodeURIComponent(clientId)}`;
        console.log('[ReviewsPage] Fetching reviews from path:', path);
        
        const res = await (window as any).authFetch(path);
        console.log('[ReviewsPage] Response status:', res.status);
        
        if (!res.ok) {
          const text = await res.text();
          console.error('[ReviewsPage] Error response:', text);
          throw new Error(`Failed to load reviews: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log('[ReviewsPage] Reviews data:', data);
        
        const client = clients.find(c => c.id === clientId);
        const reviews = (data.reviews || []).map((review: Review) => ({
          ...review,
          client_name: client?.business_name || 'Unknown',
          client_id: clientId
        }));
        
        console.log('[ReviewsPage] Processed reviews:', reviews.length);
        setAllReviews(reviews);
        setFilteredReviews(reviews);
      }
    } catch (err) {
      console.error('[ReviewsPage] Error loading reviews:', err);
      setError(err instanceof Error ? err.message : 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
            }`}
          />
        ))}
      </div>
    );
  };

  if (initialLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-black mb-3 tracking-tight text-foreground">
            Reviews
          </h1>
          <p className="text-lg text-muted-foreground">
            Track customer feedback and ratings
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <span className="ml-3 text-muted-foreground">Loading clients...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-5xl md:text-6xl font-black mb-3 tracking-tight text-foreground">
          Reviews
        </h1>
        <p className="text-lg text-muted-foreground">
          Track customer feedback and ratings
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-4xl font-black text-foreground">{totalReviews}</CardTitle>
            <CardDescription className="font-medium">Total Reviews</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-4xl font-black text-foreground">{fiveStarReviews}</CardTitle>
            <CardDescription className="font-medium">5-Star Reviews</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-4xl font-black text-foreground">{averageRating}</CardTitle>
            <CardDescription className="font-medium">Average Rating</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Client</label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.business_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Date Range</label>
              <Select defaultValue="7">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Customer name, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="pt-6">
            <p className="text-destructive font-medium">{error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Check the browser console for more details.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Reviews Table */}
      <Card className="border-0 shadow-none">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="w-[180px] text-foreground font-bold">Date / Time</TableHead>
                  <TableHead className="text-foreground font-bold">Client</TableHead>
                  <TableHead className="text-foreground font-bold">Customer</TableHead>
                  <TableHead className="w-[140px] text-foreground font-bold">Rating</TableHead>
                  <TableHead className="min-w-[300px] text-foreground font-bold">Feedback</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <span className="ml-3 text-muted-foreground">Loading reviews...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : !selectedClient ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                      Select a client to view their reviews
                    </TableCell>
                  </TableRow>
                ) : filteredReviews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                      No reviews found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReviews.map((review) => (
                    <TableRow key={review.id} className="border-b">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs font-mono text-foreground">
                            {formatDate(review.created_at)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-foreground">{review.client_name}</span>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {review.name ? (
                            <div className="font-semibold text-foreground">{review.name}</div>
                          ) : (
                            <div className="text-muted-foreground italic text-sm">Anonymous</div>
                          )}
                          {review.phone && (
                            <div className="text-xs text-muted-foreground font-mono">
                              {review.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {renderStars(review.rating)}
                      </TableCell>
                      <TableCell>
                        {review.comments ? (
                          <div className="flex items-start gap-2">
                            <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <p className="text-sm line-clamp-3 max-w-md text-foreground">{review.comments}</p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground italic text-sm">No feedback provided</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
