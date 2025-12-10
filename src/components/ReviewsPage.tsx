import { useState, useEffect } from 'react';
import { Star, Search } from 'lucide-react';

type Review = {
  id: string;
  created_at: string;
  client_id: string;
  client_name?: string;
  name: string;
  rating: number;
  comments: string;
};

type Client = {
  id: string;
  business_name: string;
};

type ReviewsPageProps = {
  initialData?: {
    clients: Client[];
    reviews: Review[];
    error: string | null;
  };
};

export default function ReviewsPage({ initialData }: ReviewsPageProps) {
  const [clients] = useState<Client[]>(initialData?.clients || []);
  const [selectedClient, setSelectedClient] = useState('all');
  const [allReviews] = useState<Review[]>(initialData?.reviews || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading] = useState(false);

  // Check URL params for client context on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const clientParam = urlParams.get('client');
    
    if (clientParam) {
      console.log('🔗 Reviews page: Pre-selecting client from URL:', clientParam);
      setSelectedClient(clientParam);
    }
  }, []);

  const filteredReviews = allReviews
    .filter(review => selectedClient === 'all' || review.client_id === selectedClient)
    .filter(review => {
      const search = searchTerm.toLowerCase();
      return (
        review.name.toLowerCase().includes(search) ||
        review.comments.toLowerCase().includes(search)
      );
    });

  const averageRating = filteredReviews.length > 0 
    ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1)
    : '0';

  const currentClientName = selectedClient === 'all'
    ? 'All Clients'
    : clients.find(c => c.id === selectedClient)?.business_name || 'Unknown';

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            className={star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300 dark:text-gray-600'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl md:text-6xl font-black mb-3 tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
          Reviews
        </h1>
        <p className="text-lg text-muted-foreground">Monitor and manage customer reviews across all clients</p>
      </div>

      {initialData?.error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6">
          {initialData.error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-card border rounded-lg p-6 shadow-lg">
          <div className="text-4xl font-black mb-1 text-foreground">{filteredReviews.length}</div>
          <div className="text-sm text-muted-foreground font-medium">Total Reviews</div>
        </div>
        <div className="bg-card border rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="text-4xl font-black text-foreground">{averageRating}</div>
            <Star className="fill-yellow-500 text-yellow-500" size={24} />
          </div>
          <div className="text-sm text-muted-foreground font-medium">Average Rating</div>
        </div>
        <div className="bg-card border rounded-lg p-6 shadow-lg">
          <div className="text-4xl font-black mb-1 text-foreground">
            {filteredReviews.filter(r => r.rating === 5).length}
          </div>
          <div className="text-sm text-muted-foreground font-medium">5-Star Reviews</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border rounded-xl p-6 mb-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="client-select" className="block text-sm font-semibold mb-3 text-foreground">
              Client
            </label>
            <div className="relative">
              <select
                id="client-select"
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full px-4 py-3.5 pr-12 rounded-xl border-2 bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none shadow-sm hover:shadow-md cursor-pointer"
                style={{
                  backgroundImage: 'none',
                }}
              >
                <option value="all" className="py-3 bg-background text-foreground">
                  All Clients
                </option>
                {clients.map(client => (
                  <option key={client.id} value={client.id} className="py-3 bg-background text-foreground">
                    {client.business_name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-foreground">
                <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="rating-filter" className="block text-sm font-semibold mb-3 text-foreground">
              Rating
            </label>
            <div className="relative">
              <select
                id="rating-filter"
                className="w-full px-4 py-3.5 pr-12 rounded-xl border-2 bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none shadow-sm hover:shadow-md cursor-pointer"
                style={{
                  backgroundImage: 'none',
                }}
              >
                <option className="py-3 bg-background text-foreground">All ratings</option>
                <option className="py-3 bg-background text-foreground">5 stars</option>
                <option className="py-3 bg-background text-foreground">4 stars</option>
                <option className="py-3 bg-background text-foreground">3 stars</option>
                <option className="py-3 bg-background text-foreground">2 stars</option>
                <option className="py-3 bg-background text-foreground">1 star</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-foreground">
                <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="search" className="block text-sm font-semibold mb-3 text-foreground">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or comment..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 bg-background text-foreground font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm hover:shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-card border rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b-2">
              <tr>
                <th className="pl-10 pr-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Date / Time</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Client</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Customer Name</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Rating</th>
                <th className="pl-6 pr-10 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Comments</th>
              </tr>
            </thead>
            <tbody id="reviews-table-body" className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    Loading reviews...
                  </td>
                </tr>
              ) : filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No reviews found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-muted/30 transition-colors">
                    <td className="pl-10 pr-6 py-5 whitespace-nowrap">
                      <span className="text-xs font-mono bg-muted px-2.5 py-1.5 rounded-lg text-foreground border">
                        {new Date(review.created_at).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center font-bold text-primary flex-shrink-0 shadow-sm">
                          {(review.client_name || currentClientName).charAt(0)}
                        </div>
                        <span className="font-semibold text-foreground text-[15px]">{review.client_name || currentClientName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="font-semibold text-foreground text-[15px]">{review.name}</span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {renderStars(review.rating)}
                        <span className="text-sm font-bold text-foreground">{review.rating}.0</span>
                      </div>
                    </td>
                    <td className="pl-6 pr-10 py-5 text-sm max-w-md">
                      <p className="text-foreground line-clamp-2 text-[15px]">
                        {review.comments}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
