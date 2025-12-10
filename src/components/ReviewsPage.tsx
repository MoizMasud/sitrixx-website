import { useState } from 'react';
import { Star, StarHalf } from 'lucide-react';

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
        <Star key={`full-${i}`} size={16} className="fill-yellow-500 text-yellow-500" />
      ))}
      {hasHalfStar && <StarHalf size={16} className="fill-yellow-500 text-yellow-500" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={16} className="text-muted-foreground" />
      ))}
      <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

export default function ReviewsPage() {
  const [selectedClient, setSelectedClient] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  
  const filteredReviews = dummyReviews.filter(review => {
    const matchesClient = selectedClient === 'all' || review.clientId === selectedClient;
    const matchesRating = 
      ratingFilter === 'all' ||
      (ratingFilter === '5' && review.rating === 5) ||
      (ratingFilter === '4-below' && review.rating < 5);
    
    return matchesClient && matchesRating;
  });

  const averageRating = filteredReviews.length > 0
    ? filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length
    : 0;

  const fiveStarCount = filteredReviews.filter(r => r.rating === 5).length;
  const fourStarCount = filteredReviews.filter(r => r.rating === 4).length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2 tracking-tight">Reviews</h1>
        <p className="text-muted-foreground">Monitor customer feedback and ratings across all clients</p>
      </div>

      {/* Filters */}
      <div className="bg-card border-2 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="client-filter" className="block text-sm font-medium mb-2">
              Client
            </label>
            <select
              id="client-filter"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            >
              {dummyClients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="rating-filter" className="block text-sm font-medium mb-2">
              Rating
            </label>
            <select
              id="rating-filter"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            >
              <option value="all">All Ratings</option>
              <option value="5">5★ Only</option>
              <option value="4-below">4★ and Below</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-card border-2 rounded-2xl p-6">
          <div className="text-3xl font-black mb-1">{filteredReviews.length}</div>
          <div className="text-sm text-muted-foreground">Total Reviews</div>
        </div>
        <div className="bg-card border-2 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="text-3xl font-black">{averageRating.toFixed(1)}</div>
            <Star size={24} className="fill-yellow-500 text-yellow-500" />
          </div>
          <div className="text-sm text-muted-foreground">Average Rating</div>
        </div>
        <div className="bg-card border-2 rounded-2xl p-6">
          <div className="text-3xl font-black mb-1">{fiveStarCount}</div>
          <div className="text-sm text-muted-foreground">5-Star Reviews</div>
        </div>
        <div className="bg-card border-2 rounded-2xl p-6">
          <div className="text-3xl font-black mb-1">{fourStarCount}</div>
          <div className="text-sm text-muted-foreground">4-Star Reviews</div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-card border-2 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30 border-b-2">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold">Date / Time</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Client Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Customer Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Comments</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredReviews.map((review) => (
                <tr key={review.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 text-sm whitespace-nowrap font-mono">
                    {review.createdAt}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium">{review.clientName}</span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {review.customerName}
                  </td>
                  <td className="px-6 py-4">
                    <StarRating rating={review.rating} />
                  </td>
                  <td className="px-6 py-4 text-sm max-w-md">
                    <p className="text-muted-foreground line-clamp-2">
                      {review.comments}
                    </p>
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

      <div className="mt-6 p-4 bg-muted/30 rounded-xl border">
        <p className="text-xs text-muted-foreground">
          <strong>Note:</strong> This page will be connected to GET /api/reviews?clientId=... to fetch real-time review data.
        </p>
      </div>
    </div>
  );
}
