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
  customer_name?: string;
  customer_phone?: string;
  rating: number;
  feedback?: string;
  created_at: string;
  client_name?: string;
  client_id?: string;
}

interface ReviewsPageProps {
  clients: Client[];
}

export default function ReviewsPage({ clients }: ReviewsPageProps) {
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stats
  const totalReviews = filteredReviews.length;
  const fiveStarReviews = filteredReviews.filter(r => r.rating === 5).length;
  const averageRating = filteredReviews.length > 0
    ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1)
    : '0.0';

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
        (review.customer_name && review.customer_name.toLowerCase().includes(term)) ||
        (review.customer_phone && review.customer_phone.includes(term)) ||
        (review.feedback && review.feedback.toLowerCase().includes(term))
      );
    });

    setFilteredReviews(filtered);
  }, [searchTerm, allReviews]);

  async function loadReviewsForClient(clientId: string) {
    setLoading(true);
    setError(null);

    try {
      if (clientId === 'all') {
        // Load reviews for all clients
        const allClientReviews: Review[] = [];
        for (const client of clients) {
          try {
            const res = await (window as any).authFetch(`/api/reviews?clientId=${encodeURIComponent(client.id)}`);
            const data = await res.json();
            const clientReviews = (data.reviews || []).map((review: Review) => ({
              ...review,
              client_name: client.business_name,
              client_id: client.id
            }));
            allClientReviews.push(...clientReviews);
          } catch (err) {
            console.error(`Error loading reviews for ${client.id}:`, err);
          }
        }
        setAllReviews(allClientReviews);
        setFilteredReviews(allClientReviews);
      } else {
        // Load reviews for single client
        const res = await (window as any).authFetch(`/api/reviews?clientId=${encodeURIComponent(clientId)}`);
        const data = await res.json();
        const client = clients.find(c => c.id === clientId);
        const reviews = (data.reviews || []).map((review: Review) => ({
          ...review,
          client_name: client?.business_name || 'Unknown',
          client_id: clientId
        }));
        setAllReviews(reviews);
        setFilteredReviews(reviews);
      }
    } catch (err) {
      console.error('Error loading reviews:', err);
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

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-5xl md:text-6xl font-black mb-3 tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
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
            <CardTitle className="text-4xl font-black">{totalReviews}</CardTitle>
            <CardDescription className="font-medium">Total Reviews</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-4xl font-black">{fiveStarReviews}</CardTitle>
            <CardDescription className="font-medium">5-Star Reviews</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-4xl font-black">{averageRating}</CardTitle>
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
          </CardContent>
        </Card>
      )}

      {/* Reviews Table */}
      <div className="bg-card rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Date / Time</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="w-[140px]">Rating</TableHead>
              <TableHead className="min-w-[300px]">Feedback</TableHead>
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
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-mono">
                        {formatDate(review.created_at)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{review.client_name}</span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {review.customer_name ? (
                        <div className="font-semibold">{review.customer_name}</div>
                      ) : (
                        <div className="text-muted-foreground italic text-sm">Anonymous</div>
                      )}
                      {review.customer_phone && (
                        <div className="text-xs text-muted-foreground font-mono">
                          {review.customer_phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {renderStars(review.rating)}
                  </TableCell>
                  <TableCell>
                    {review.feedback ? (
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-sm line-clamp-3 max-w-md">{review.feedback}</p>
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
    </div>
  );
}
