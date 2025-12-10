import { useState } from 'react';
import { Search, Phone, Mail } from 'lucide-react';

type Lead = {
  id: string;
  created_at: string;
  client_id: string;
  client_name?: string;
  source: string;
  name: string;
  phone: string;
  email: string;
  message: string;
};

type Client = {
  id: string;
  business_name: string;
};

type LeadsPageProps = {
  initialData?: {
    clients: Client[];
    leads: Lead[];
    error: string | null;
  };
};

export default function LeadsPage({ initialData }: LeadsPageProps) {
  const [clients] = useState<Client[]>(initialData?.clients || []);
  const [selectedClient, setSelectedClient] = useState('all');
  const [allLeads] = useState<Lead[]>(initialData?.leads || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading] = useState(false);

  const filteredLeads = allLeads
    .filter(lead => selectedClient === 'all' || lead.client_id === selectedClient)
    .filter(lead => {
      const search = searchTerm.toLowerCase();
      return (
        lead.name.toLowerCase().includes(search) ||
        lead.phone.includes(search) ||
        (lead.email && lead.email.toLowerCase().includes(search)) ||
        lead.message.toLowerCase().includes(search)
      );
    });

  const currentClientName = selectedClient === 'all' 
    ? 'All Clients'
    : clients.find(c => c.id === selectedClient)?.business_name || 'Unknown';

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl md:text-6xl font-black mb-3 tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
          Leads
        </h1>
        <p className="text-lg text-muted-foreground">Track and manage incoming leads from all clients</p>
      </div>

      {initialData?.error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6">
          {initialData.error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-card border rounded-lg p-6 shadow-lg">
          <div className="text-4xl font-black mb-1 text-foreground">{filteredLeads.length}</div>
          <div className="text-sm text-muted-foreground font-medium">Total Leads</div>
        </div>
        <div className="bg-card border rounded-lg p-6 shadow-lg">
          <div className="text-4xl font-black mb-1 text-foreground">
            {filteredLeads.filter(l => l.source === 'website_form').length}
          </div>
          <div className="text-sm text-muted-foreground font-medium">Website Forms</div>
        </div>
        <div className="bg-card border rounded-lg p-6 shadow-lg">
          <div className="text-4xl font-black mb-1 text-foreground">
            {filteredLeads.filter(l => l.source === 'missed_call').length}
          </div>
          <div className="text-sm text-muted-foreground font-medium">Missed Calls</div>
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
            <label htmlFor="date-range" className="block text-sm font-semibold mb-3 text-foreground">
              Date Range
            </label>
            <div className="relative">
              <select
                id="date-range"
                className="w-full px-4 py-3.5 pr-12 rounded-xl border-2 bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none shadow-sm hover:shadow-md cursor-pointer"
                style={{
                  backgroundImage: 'none',
                }}
              >
                <option className="py-3 bg-background text-foreground">Last 7 days</option>
                <option className="py-3 bg-background text-foreground">Last 30 days</option>
                <option className="py-3 bg-background text-foreground">Last 90 days</option>
                <option className="py-3 bg-background text-foreground">All time</option>
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
                placeholder="Name, phone, email..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 bg-background text-foreground font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm hover:shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Debug Info */}
      {allLeads.length === 0 && clients.length > 0 && (
        <div className="bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 px-4 py-3 rounded-lg mb-6">
          Loaded {clients.length} clients but no leads found. This might be normal if there are no leads yet.
        </div>
      )}

      {/* Leads Table */}
      <div className="bg-card border rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b-2">
              <tr>
                <th className="pl-10 pr-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Date / Time</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Client</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Source</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Lead Name</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Contact Info</th>
                <th className="pl-6 pr-10 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Message</th>
              </tr>
            </thead>
            <tbody id="leads-table-body" className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    Loading leads...
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No leads found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                    <td className="pl-10 pr-6 py-5 whitespace-nowrap">
                      <span className="text-xs font-mono bg-muted px-2.5 py-1.5 rounded-lg text-foreground border">
                        {new Date(lead.created_at).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center font-bold text-primary flex-shrink-0 shadow-sm">
                          {(lead.client_name || currentClientName).charAt(0)}
                        </div>
                        <span className="font-semibold text-foreground text-[15px]">{lead.client_name || currentClientName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        lead.source === 'website_form' 
                          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                          : 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20'
                      }`}>
                        {lead.source === 'website_form' ? '📝 Website Form' : '📞 Missed Call'}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      {lead.name ? (
                        <span className="font-semibold text-foreground text-[15px]">{lead.name}</span>
                      ) : (
                        <span className="text-muted-foreground text-sm italic">No name provided</span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-green-600 dark:text-green-400" />
                          <a 
                            href={`tel:${lead.phone}`}
                            className="text-sm font-mono text-foreground hover:text-primary hover:underline"
                          >
                            {lead.phone}
                          </a>
                        </div>
                        {lead.email && (
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-blue-600 dark:text-blue-400" />
                            <a 
                              href={`mailto:${lead.email}`}
                              className="text-sm text-foreground hover:text-primary hover:underline"
                            >
                              {lead.email}
                            </a>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="pl-6 pr-10 py-5 text-sm max-w-md">
                      <p className="text-foreground line-clamp-2 text-[15px]">
                        {lead.message}
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
