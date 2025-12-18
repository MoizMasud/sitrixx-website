import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, Calendar } from 'lucide-react';
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
import { Badge } from './ui/badge';

interface Client {
  id: string;
  business_name: string;
}

interface Lead {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  source: 'website_form' | 'missed_call';
  created_at: string;
  client_name?: string;
  client_id?: string;
}

export default function LeadsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Stats
  const totalLeads = filteredLeads.length;
  const websiteForms = filteredLeads.filter(l => l.source === 'website_form').length;
  const missedCalls = filteredLeads.filter(l => l.source === 'missed_call').length;

  // Load clients on mount
  useEffect(() => {
    loadClients();
  }, []);

  // Load leads when client selection changes
  useEffect(() => {
    if (selectedClient && selectedClient !== '') {
      loadLeadsForClient(selectedClient);
    } else {
      setAllLeads([]);
      setFilteredLeads([]);
    }
  }, [selectedClient]);

  // Filter leads when search term changes
  useEffect(() => {
    if (!searchTerm) {
      setFilteredLeads(allLeads);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = allLeads.filter(lead => {
      return (
        (lead.name && lead.name.toLowerCase().includes(term)) ||
        (lead.phone && lead.phone.includes(term)) ||
        (lead.email && lead.email.toLowerCase().includes(term)) ||
        (lead.message && lead.message.toLowerCase().includes(term))
      );
    });

    setFilteredLeads(filtered);
  }, [searchTerm, allLeads]);

  async function loadClients() {
    setInitialLoading(true);
    console.log('[LeadsPage] Loading clients...');
    
    try {
      // Check if authFetch exists
      if (!(window as any).authFetch) {
        throw new Error('authFetch not initialized. Please refresh the page.');
      }

      const path = '/api/admin/clients';
      console.log('[LeadsPage] Fetching from path:', path);
      
      const res = await (window as any).authFetch(path);
      console.log('[LeadsPage] Response status:', res.status);
      
      if (!res.ok) {
        const text = await res.text();
        console.error('[LeadsPage] Error response:', text);
        throw new Error(`Failed to load clients: ${res.status} ${res.statusText}`);
      }
      
      const data = await res.json();
      console.log('[LeadsPage] Clients data:', data);
      
      if (data.ok) {
        setClients(data.clients || []);
        console.log('[LeadsPage] Successfully loaded', data.clients?.length || 0, 'clients');
      } else {
        throw new Error(data.error || 'Failed to load clients');
      }
    } catch (err) {
      console.error('[LeadsPage] Error loading clients:', err);
      setError(err instanceof Error ? err.message : 'Failed to load clients');
    } finally {
      setInitialLoading(false);
    }
  }

  async function loadLeadsForClient(clientId: string) {
    setLoading(true);
    setError(null);
    console.log('[LeadsPage] Loading leads for client:', clientId);

    try {
      // Check if authFetch exists
      if (!(window as any).authFetch) {
        throw new Error('authFetch not initialized. Please refresh the page.');
      }

      if (clientId === 'all') {
        // Load leads for all clients
        console.log('[LeadsPage] Loading leads for all clients');
        const allClientLeads: Lead[] = [];
        
        for (const client of clients) {
          try {
            const path = `/api/leads?clientId=${encodeURIComponent(client.id)}`;
            console.log('[LeadsPage] Fetching leads from path:', path);
            
            const res = await (window as any).authFetch(path);
            console.log('[LeadsPage] Response status for', client.business_name, ':', res.status);
            
            if (!res.ok) {
              console.warn('[LeadsPage] Failed to fetch leads for', client.business_name);
              continue;
            }
            
            const data = await res.json();
            console.log('[LeadsPage] Leads data for', client.business_name, ':', data);
            
            const clientLeads = (data.leads || []).map((lead: Lead) => ({
              ...lead,
              client_name: client.business_name,
              client_id: client.id
            }));
            allClientLeads.push(...clientLeads);
          } catch (err) {
            console.error(`[LeadsPage] Error loading leads for ${client.business_name}:`, err);
          }
        }
        
        console.log('[LeadsPage] Total leads loaded:', allClientLeads.length);
        setAllLeads(allClientLeads);
        setFilteredLeads(allClientLeads);
      } else {
        // Load leads for single client
        const path = `/api/leads?clientId=${encodeURIComponent(clientId)}`;
        console.log('[LeadsPage] Fetching leads from path:', path);
        
        const res = await (window as any).authFetch(path);
        console.log('[LeadsPage] Response status:', res.status);
        
        if (!res.ok) {
          const text = await res.text();
          console.error('[LeadsPage] Error response:', text);
          throw new Error(`Failed to load leads: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log('[LeadsPage] Leads data:', data);
        
        const client = clients.find(c => c.id === clientId);
        const leads = (data.leads || []).map((lead: Lead) => ({
          ...lead,
          client_name: client?.business_name || 'Unknown',
          client_id: clientId
        }));
        
        console.log('[LeadsPage] Processed leads:', leads.length);
        setAllLeads(leads);
        setFilteredLeads(leads);
      }
    } catch (err) {
      console.error('[LeadsPage] Error loading leads:', err);
      setError(err instanceof Error ? err.message : 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (initialLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-black mb-3 tracking-tight text-foreground">
            Leads
          </h1>
          <p className="text-lg text-muted-foreground">
            Track and manage incoming leads from all clients
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
          Leads
        </h1>
        <p className="text-lg text-muted-foreground">
          Track and manage incoming leads from all clients
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-4xl font-black text-foreground">{totalLeads}</CardTitle>
            <CardDescription className="font-medium">Total Leads</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-4xl font-black text-foreground">{websiteForms}</CardTitle>
            <CardDescription className="font-medium">Website Forms</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-4xl font-black text-foreground">{missedCalls}</CardTitle>
            <CardDescription className="font-medium">Missed Calls</CardDescription>
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
                  placeholder="Name, phone, email..."
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

      {/* Leads Table */}
      <Card className="border-0 shadow-none">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="w-[180px] text-foreground font-bold">Date / Time</TableHead>
                  <TableHead className="text-foreground font-bold">Client</TableHead>
                  <TableHead className="w-[140px] text-foreground font-bold">Source</TableHead>
                  <TableHead className="text-foreground font-bold">Lead Name</TableHead>
                  <TableHead className="text-foreground font-bold">Contact Info</TableHead>
                  <TableHead className="min-w-[300px] text-foreground font-bold">Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <span className="ml-3 text-muted-foreground">Loading leads...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : !selectedClient ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      Select a client to view their leads
                    </TableCell>
                  </TableRow>
                ) : filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      No leads found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="border-b">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs font-mono text-foreground">
                            {formatDate(lead.created_at)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-foreground">{lead.client_name}</span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={lead.source === 'website_form' ? 'default' : 'secondary'}
                          className={
                            lead.source === 'website_form'
                              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                              : 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20'
                          }
                        >
                          {lead.source === 'website_form' ? '📝 Form' : '📞 Call'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {lead.name ? (
                          <span className="font-semibold text-foreground">{lead.name}</span>
                        ) : (
                          <span className="text-muted-foreground italic text-sm">No name</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1.5">
                          {lead.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                              <a
                                href={`tel:${lead.phone}`}
                                className="text-sm hover:text-primary hover:underline font-mono text-foreground"
                              >
                                {lead.phone}
                              </a>
                            </div>
                          )}
                          {lead.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                              <a
                                href={`mailto:${lead.email}`}
                                className="text-sm hover:text-primary hover:underline text-foreground"
                              >
                                {lead.email}
                              </a>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm line-clamp-2 max-w-md text-foreground">
                          {lead.message || 'No message'}
                        </p>
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
