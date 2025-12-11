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

interface LeadsPageProps {
  clients: Client[];
}

export default function LeadsPage({ clients }: LeadsPageProps) {
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stats
  const totalLeads = filteredLeads.length;
  const websiteForms = filteredLeads.filter(l => l.source === 'website_form').length;
  const missedCalls = filteredLeads.filter(l => l.source === 'missed_call').length;

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

  async function loadLeadsForClient(clientId: string) {
    setLoading(true);
    setError(null);

    try {
      if (clientId === 'all') {
        // Load leads for all clients
        const allClientLeads: Lead[] = [];
        for (const client of clients) {
          try {
            const res = await (window as any).authFetch(`/api/leads?clientId=${encodeURIComponent(client.id)}`);
            const data = await res.json();
            const clientLeads = (data.leads || []).map((lead: Lead) => ({
              ...lead,
              client_name: client.business_name,
              client_id: client.id
            }));
            allClientLeads.push(...clientLeads);
          } catch (err) {
            console.error(`Error loading leads for ${client.id}:`, err);
          }
        }
        setAllLeads(allClientLeads);
        setFilteredLeads(allClientLeads);
      } else {
        // Load leads for single client
        const res = await (window as any).authFetch(`/api/leads?clientId=${encodeURIComponent(clientId)}`);
        const data = await res.json();
        const client = clients.find(c => c.id === clientId);
        const leads = (data.leads || []).map((lead: Lead) => ({
          ...lead,
          client_name: client?.business_name || 'Unknown',
          client_id: clientId
        }));
        setAllLeads(leads);
        setFilteredLeads(leads);
      }
    } catch (err) {
      console.error('Error loading leads:', err);
      setError(err instanceof Error ? err.message : 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-5xl md:text-6xl font-black mb-3 tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
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
            <CardTitle className="text-4xl font-black">{totalLeads}</CardTitle>
            <CardDescription className="font-medium">Total Leads</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-4xl font-black">{websiteForms}</CardTitle>
            <CardDescription className="font-medium">Website Forms</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-4xl font-black">{missedCalls}</CardTitle>
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
          </CardContent>
        </Card>
      )}

      {/* Leads Table */}
      <div className="bg-card rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Date / Time</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="w-[140px]">Source</TableHead>
              <TableHead>Lead Name</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead className="min-w-[300px]">Message</TableHead>
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
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-mono">
                        {formatDate(lead.created_at)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{lead.client_name}</span>
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
                      <span className="font-semibold">{lead.name}</span>
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
                            className="text-sm hover:text-primary hover:underline font-mono"
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
                            className="text-sm hover:text-primary hover:underline"
                          >
                            {lead.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm line-clamp-2 max-w-md">
                      {lead.message || 'No message'}
                    </p>
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
