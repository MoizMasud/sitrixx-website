import { useState } from 'react';
import { Star, StarHalf, MessageSquare, Search } from 'lucide-react';

// Dummy data
const dummyReviews = [
  {
    id: '1',
    createdAt: '2025-01-10 16:20:15',
    clientId: 'galt-hair-studio',
    clientName: 'Galt Hair Studio',
    customerName: 'Emily Roberts',
    rating: 5,
    comments: 'Amazing service! The stylist really listened to what I wanted and delivered exactly that. Will definitely be back!',
  },
  {
    id: '2',
    createdAt: '2025-01-09 14:45:32',
    clientId: 'truetone-painting',
    clientName: 'TrueTone Painting',
    customerName: 'Mark Thompson',
    rating: 5,
    comments: 'Professional, punctual, and the quality is outstanding. They transformed our living room!',
  },
  {
    id: '3',
    createdAt: '2025-01-09 11:30:18',
    clientId: 'apex-fitness',
    clientName: 'Apex Fitness',
    customerName: 'Jessica Martinez',
    rating: 4,
    comments: 'Great gym with excellent equipment. The trainers are knowledgeable. Only wish the hours were a bit longer.',
  },
  {
    id: '4',
    createdAt: '2025-01-08 09:15:47',
    clientId: 'galt-hair-studio',
    clientName: 'Galt Hair Studio',
    customerName: 'David Chen',
    rating: 5,
    comments: 'Best haircut I\'ve had in years. The attention to detail is incredible.',
  },
  {
    id: '5',
    createdAt: '2025-01-07 17:22:55',
    clientId: 'truetone-painting',
    clientName: 'TrueTone Painting',
    customerName: 'Linda Wilson',
    rating: 5,
    comments: 'Highly recommend! They were careful with our furniture and cleaned up perfectly afterwards.',
  },
  {
    id: '6',
    createdAt: '2025-01-06 13:40:12',
    clientId: 'apex-fitness',
    clientName: 'Apex Fitness',
    customerName: 'Robert Garcia',
    rating: 3,
    comments: 'Good facilities but can get crowded during peak hours. Staff is friendly though.',
  },
];

const dummyClients = [
  { id: 'all', name: 'All Clients' },
  { id: 'galt-hair-studio', name: 'Galt Hair Studio' },
  { id: 'truetone-painting', name: 'TrueTone Painting' },
  { id: 'apex-fitness', name: 'Apex Fitness' },
];

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={18} className="fill-yellow-500 text-yellow-500" />
      ))}
      {hasHalfStar && <StarHalf size={18} className="fill-yellow-500 text-yellow-500" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={18} className="text-muted-foreground" />
      ))}
      <span className="ml-2 text-sm font-bold text-foreground">{rating.toFixed(1)}</span>
    </div>
  );
};

export default function ReviewsPage() {
  const [selectedClient, setSelectedClient] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredReviews = dummyReviews.filter(review => {
    const matchesClient = selectedClient === 'all' || review.clientId === selectedClient;
    const matchesRating = 
      ratingFilter === 'all' ||
      (ratingFilter === '5' && review.rating === 5) ||
      (ratingFilter === '4-below' && review.rating < 5);
    
    const search = searchTerm.toLowerCase();
    const matchesSearch = 
      review.customerName.toLowerCase().includes(search) ||
      review.comments.toLowerCase().includes(search) ||
      review.clientName.toLowerCase().includes(search);
    
    return matchesClient && matchesRating && matchesSearch;
  });

  const averageRating = filteredReviews.length > 0
    ? filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length
    : 0;

  const fiveStarCount = filteredReviews.filter(r => r.rating === 5).length;
  const fourStarCount = filteredReviews.filter(r => r.rating === 4).length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header - Made Bigger and More Prominent */}
      <div className="mb-10">
        <h1 className="text-5xl md:text-6xl font-black mb-3 tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
          Reviews
        </h1>
        <p className="text-lg text-muted-foreground">Monitor customer feedback and ratings across all clients</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-card border rounded-lg p-6 shadow-lg">
          <div className="text-4xl font-black mb-1 text-foreground">{filteredReviews.length}</div>
          <div className="text-sm text-muted-foreground font-medium">Total Reviews</div>
        </div>
        <div className="bg-card border rounded-lg p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <div className="text-4xl font-black text-foreground">{averageRating.toFixed(1)}</div>
            <Star size={28} className="fill-yellow-500 text-yellow-500" />
          </div>
          <div className="text-sm text-muted-foreground font-medium">Average Rating</div>
        </div>
        <div className="bg-card border rounded-lg p-6 shadow-lg">
          <div className="text-4xl font-black mb-1 text-foreground">{fiveStarCount}</div>
          <div className="text-sm text-muted-foreground font-medium">5-Star Reviews</div>
        </div>
        <div className="bg-card border rounded-lg p-6 shadow-lg">
          <div className="text-4xl font-black mb-1 text-foreground">{fourStarCount}</div>
          <div className="text-sm text-muted-foreground font-medium">4-Star Reviews</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border rounded-xl p-6 mb-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="client-filter" className="block text-sm font-semibold mb-3 text-foreground">
              Client
            </label>
            <div className="relative">
              <select
                id="client-filter"
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full px-4 py-3.5 pr-12 rounded-xl border-2 bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none shadow-sm hover:shadow-md cursor-pointer"
                style={{
                  backgroundImage: 'none',
                }}
              >
                {dummyClients.map(client => (
                  <option key={client.id} value={client.id} className="py-3 bg-background text-foreground">
                    {client.name}
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
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="w-full px-4 py-3.5 pr-12 rounded-xl border-2 bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none shadow-sm hover:shadow-md cursor-pointer"
                style={{
                  backgroundImage: 'none',
                }}
              >
                <option value="all" className="py-3 bg-background text-foreground">All Ratings</option>
                <option value="5" className="py-3 bg-background text-foreground">5★ Only</option>
                <option value="4-below" className="py-3 bg-background text-foreground">4★ and Below</option>
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
                placeholder="Customer, client, or comment..."
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
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Customer</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Rating</th>
                <th className="pl-6 pr-10 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Comments</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredReviews.map((review) => (
                <tr key={review.id} className="hover:bg-muted/30 transition-colors">
                  <td className="pl-10 pr-6 py-5 whitespace-nowrap">
                    <span className="text-xs font-mono bg-muted px-2.5 py-1.5 rounded-lg text-foreground border">
                      {review.createdAt}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center font-bold text-primary flex-shrink-0 shadow-sm">
                        {review.clientName.charAt(0)}
                      </div>
                      <span className="font-semibold text-foreground text-[15px]">{review.clientName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="font-semibold text-foreground text-[15px]">{review.customerName}</span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <StarRating rating={review.rating} />
                  </td>
                  <td className="pl-6 pr-10 py-5 text-sm max-w-md">
                    <div className="flex items-start gap-2">
                      <MessageSquare size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                      <p className="text-foreground line-clamp-2 text-[15px]">
                        {review.comments}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No reviews found matching your filters.</p>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-muted/30 rounded-lg border">
        <p className="text-xs text-muted-foreground">
          <strong>Note:</strong> This page will be connected to GET /api/reviews?clientId=... to fetch real-time review data.
        </p>
      </div>
    </div>
  );
}
