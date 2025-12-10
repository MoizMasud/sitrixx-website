import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

// Dummy data
const dummyLeads = [
  {
    id: '1',
    createdAt: '2025-01-10 14:32:15',
    clientId: 'galt-hair-studio',
    clientName: 'Galt Hair Studio',
    source: 'website_form',
    leadName: 'John Smith',
    phone: '+16475551111',
    email: 'john.smith@email.com',
    message: 'Looking to book a haircut for next week. Do you have any availability?',
  },
  {
    id: '2',
    createdAt: '2025-01-10 11:15:42',
    clientId: 'truetone-painting',
    clientName: 'TrueTone Painting',
    source: 'missed_call',
    leadName: '',
    phone: '+14165552222',
    email: '',
    message: 'Missed call - no voicemail',
  },
  {
    id: '3',
    createdAt: '2025-01-09 16:48:23',
    clientId: 'apex-fitness',
    clientName: 'Apex Fitness',
    source: 'website_form',
    leadName: 'Sarah Johnson',
    phone: '+19055553333',
    email: 'sarah.j@email.com',
    message: 'Interested in personal training packages. What are your rates?',
  },
  {
    id: '4',
    createdAt: '2025-01-09 09:21:07',
    clientId: 'galt-hair-studio',
    clientName: 'Galt Hair Studio',
    source: 'missed_call',
    leadName: '',
    phone: '+16475554444',
    email: '',
    message: 'Missed call - no voicemail',
  },
  {
    id: '5',
    createdAt: '2025-01-08 13:55:31',
    clientId: 'truetone-painting',
    clientName: 'TrueTone Painting',
    source: 'website_form',
    leadName: 'Mike Davis',
    phone: '+14165555555',
    email: 'mike.davis@email.com',
    message: 'Need a quote for interior painting of a 3-bedroom house.',
  },
];

const dummyClients = [
  { id: 'all', name: 'All Clients' },
  { id: 'galt-hair-studio', name: 'Galt Hair Studio' },
  { id: 'truetone-painting', name: 'TrueTone Painting' },
  { id: 'apex-fitness', name: 'Apex Fitness' },
];

export default function LeadsPage() {
  const [selectedClient, setSelectedClient] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredLeads = dummyLeads.filter(lead => {
    const matchesClient = selectedClient === 'all' || lead.clientId === selectedClient;
    const matchesSearch = 
      lead.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesClient && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2 tracking-tight">Leads</h1>
        <p className="text-muted-foreground">Track and manage incoming leads from all clients</p>
      </div>

      {/* Filters */}
      <div className="bg-card border-2 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <label htmlFor="date-range" className="block text-sm font-medium mb-2">
              Date Range
            </label>
            <select
              id="date-range"
              className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>All time</option>
            </select>
          </div>

          <div>
            <label htmlFor="search" className="block text-sm font-medium mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Name, phone, email..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-card border-2 rounded-2xl p-6">
          <div className="text-3xl font-black mb-1">{filteredLeads.length}</div>
          <div className="text-sm text-muted-foreground">Total Leads</div>
        </div>
        <div className="bg-card border-2 rounded-2xl p-6">
          <div className="text-3xl font-black mb-1">
            {filteredLeads.filter(l => l.source === 'website_form').length}
          </div>
          <div className="text-sm text-muted-foreground">Website Forms</div>
        </div>
        <div className="bg-card border-2 rounded-2xl p-6">
          <div className="text-3xl font-black mb-1">
            {filteredLeads.filter(l => l.source === 'missed_call').length}
          </div>
          <div className="text-sm text-muted-foreground">Missed Calls</div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-card border-2 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30 border-b-2">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold">Date / Time</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Client Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Source</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Lead Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Email</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 text-sm whitespace-nowrap font-mono">
                    {lead.createdAt}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium">{lead.clientName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                      lead.source === 'website_form' 
                        ? 'bg-blue-500/10 text-blue-500'
                        : 'bg-orange-500/10 text-orange-500'
                    }`}>
                      {lead.source === 'website_form' ? 'Website Form' : 'Missed Call'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {lead.leadName || <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono">{lead.phone}</td>
                  <td className="px-6 py-4 text-sm">
                    {lead.email || <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="px-6 py-4 text-sm max-w-xs">
                    <div className="line-clamp-2 text-muted-foreground">
                      {lead.message}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No leads found matching your filters.</p>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-muted/30 rounded-xl border">
        <p className="text-xs text-muted-foreground">
          <strong>Note:</strong> This page will be connected to GET /api/leads?clientId=... to fetch real-time lead data.
        </p>
      </div>
    </div>
  );
}
