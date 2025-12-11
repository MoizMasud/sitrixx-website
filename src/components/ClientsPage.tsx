import React, { useState, useEffect } from 'react';
import { Search, Calendar, Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface Client {
  id: string;
  business_name: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  website?: string;
  created_at: string;
  subscription_status?: 'active' | 'inactive';
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Stats
  const totalClients = filteredClients.length;
  const activeClients = filteredClients.filter(c => c.subscription_status === 'active').length;
  const inactiveClients = filteredClients.filter(c => c.subscription_status === 'inactive').length;

  // Load clients on mount
  useEffect(() => {
    loadClients();
  }, []);

  // Filter clients when search term changes
  useEffect(() => {
    if (!searchTerm) {
      setFilteredClients(clients);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = clients.filter(client => {
      return (
        (client.business_name && client.business_name.toLowerCase().includes(term)) ||
        (client.contact_name && client.contact_name.toLowerCase().includes(term)) ||
        (client.email && client.email.toLowerCase().includes(term)) ||
        (client.phone && client.phone.includes(term)) ||
        (client.id && client.id.toLowerCase().includes(term))
      );
    });

    setFilteredClients(filtered);
  }, [searchTerm, clients]);

  async function loadClients() {
    setLoading(true);
    setError(null);

    try {
      const res = await (window as any).authFetch('/api/clients');
      const data = await res.json();
      const clientsList = Array.isArray(data) ? data : (data.clients || []);
      
      // Log first client to see what fields are actually returned
      if (clientsList.length > 0) {
        console.log('Sample client data:', clientsList[0]);
        console.log('All fields:', Object.keys(clientsList[0]));
      }
      
      setClients(clientsList);
      setFilteredClients(clientsList);
    } catch (err) {
      console.error('Error loading clients:', err);
      setError(err instanceof Error ? err.message : 'Failed to load clients');
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl md:text-6xl font-black mb-3 tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Clients
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your client accounts and subscriptions
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-4xl font-black">{totalClients}</CardTitle>
            <CardDescription className="font-medium">Total Clients</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-4xl font-black">{activeClients}</CardTitle>
            <CardDescription className="font-medium">Active Subscriptions</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-4xl font-black">{inactiveClients}</CardTitle>
            <CardDescription className="font-medium">Inactive</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Search Clients</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by business name, ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
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

      {/* Clients Table */}
      <div className="bg-card rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Client ID</TableHead>
              <TableHead>Business Name</TableHead>
              {clients.some(c => c.subscription_status) && <TableHead className="w-[140px]">Status</TableHead>}
              <TableHead className="w-[160px]">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={clients.some(c => c.subscription_status) ? 4 : 3} className="h-32 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="ml-3 text-muted-foreground">Loading clients...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={clients.some(c => c.subscription_status) ? 4 : 3} className="h-32 text-center text-muted-foreground">
                  {searchTerm ? 'No clients found matching your search' : 'No clients yet'}
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-mono text-xs">
                    <div className="truncate max-w-[180px]" title={client.id}>
                      {client.id}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{client.business_name}</span>
                  </TableCell>
                  {clients.some(c => c.subscription_status) && (
                    <TableCell>
                      {client.subscription_status ? (
                        <Badge
                          variant={client.subscription_status === 'active' ? 'default' : 'secondary'}
                          className={
                            client.subscription_status === 'active'
                              ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
                              : 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20'
                          }
                        >
                          {client.subscription_status === 'active' ? '✓ Active' : '○ Inactive'}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </TableCell>
                  )}
                  <TableCell>
                    {client.created_at ? (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">{formatDate(client.created_at)}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
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
