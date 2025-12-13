import React, { useState, useEffect } from 'react';
import { Search, Calendar, Plus, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

interface Client {
  id: string;
  business_name: string;
  website_url?: string;
  booking_link?: string;
  google_review_link?: string;
  owner_email?: string;
  twilio_number?: string;
  forwarding_phone?: string;
  custom_sms_template?: string;
  review_sms_template?: string;
  auto_review_enabled?: boolean;
  created_at: string;
  subscription_status?: 'active' | 'inactive';
}

interface ClientFormData {
  id: string;
  business_name: string;
  website_url: string;
  booking_link: string;
  google_review_link: string;
  owner_email: string;
  twilio_number: string;
  forwarding_phone: string;
  custom_sms_template: string;
  review_sms_template: string;
  auto_review_enabled: boolean;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState<ClientFormData>({
    id: '',
    business_name: '',
    website_url: '',
    booking_link: '',
    google_review_link: '',
    owner_email: '',
    twilio_number: '',
    forwarding_phone: '',
    custom_sms_template: '',
    review_sms_template: '',
    auto_review_enabled: false,
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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
        (client.owner_email && client.owner_email.toLowerCase().includes(term))
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
      
      if (!data.ok) {
        throw new Error(data.error || 'Failed to load clients');
      }
      
      const clientsList = Array.isArray(data.clients) ? data.clients : [];
      setClients(clientsList);
      setFilteredClients(clientsList);
    } catch (err) {
      console.error('Error loading clients:', err);
      setError(err instanceof Error ? err.message : 'Failed to load clients');
    } finally {
      setLoading(false);
    }
  }

  const resetForm = () => {
    setFormData({
      id: '',
      business_name: '',
      website_url: '',
      booking_link: '',
      google_review_link: '',
      owner_email: '',
      twilio_number: '',
      forwarding_phone: '',
      custom_sms_template: '',
      review_sms_template: '',
      auto_review_enabled: false,
    });
    setFormError(null);
  };

  const handleAddClient = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setFormData({
      id: client.id,
      business_name: client.business_name,
      website_url: client.website_url || '',
      booking_link: client.booking_link || '',
      google_review_link: client.google_review_link || '',
      owner_email: client.owner_email || '',
      twilio_number: client.twilio_number || '',
      forwarding_phone: client.forwarding_phone || '',
      custom_sms_template: client.custom_sms_template || '',
      review_sms_template: client.review_sms_template || '',
      auto_review_enabled: client.auto_review_enabled || false,
    });
    setFormError(null);
    setShowEditModal(true);
  };

  const handleDeleteClient = (client: Client) => {
    setSelectedClient(client);
    setShowDeleteModal(true);
  };

  const validateForm = (isEdit: boolean = false): boolean => {
    setFormError(null);

    // Validate required fields
    if (!formData.business_name.trim()) {
      setFormError('Business Name is required');
      return false;
    }

    if (!isEdit && !formData.owner_email.trim()) {
      setFormError('Owner Email is required');
      return false;
    }

    // Basic email validation (only for add form)
    if (!isEdit && formData.owner_email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.owner_email)) {
        setFormError('Please enter a valid email address');
        return false;
      }
    }

    return true;
  };

  const handleSubmitAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(false)) {
      return;
    }

    setIsSaving(true);
    setFormError(null);

    try {
      const payload = {
        business_name: formData.business_name.trim(),
        owner_email: formData.owner_email.trim(),
        website_url: formData.website_url.trim() || undefined,
        booking_link: formData.booking_link.trim() || undefined,
        google_review_link: formData.google_review_link.trim() || undefined,
        twilio_number: formData.twilio_number.trim() || undefined,
        forwarding_phone: formData.forwarding_phone.trim() || undefined,
        custom_sms_template: formData.custom_sms_template.trim() || undefined,
        review_sms_template: formData.review_sms_template.trim() || undefined,
        auto_review_enabled: formData.auto_review_enabled,
      };

      const res = await (window as any).authFetch('/api/clients', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.ok) {
        throw new Error(data.error || 'Failed to create client');
      }

      // Success - close modal and reload
      setShowAddModal(false);
      await loadClients();
    } catch (err) {
      console.error('Error creating client:', err);
      setFormError(err instanceof Error ? err.message : 'Failed to create client');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(true)) {
      return;
    }

    setIsSaving(true);
    setFormError(null);

    try {
      const payload = {
        id: formData.id,
        business_name: formData.business_name.trim(),
        website_url: formData.website_url.trim() || undefined,
        booking_link: formData.booking_link.trim() || undefined,
        google_review_link: formData.google_review_link.trim() || undefined,
        twilio_number: formData.twilio_number.trim() || undefined,
        forwarding_phone: formData.forwarding_phone.trim() || undefined,
        custom_sms_template: formData.custom_sms_template.trim() || undefined,
        review_sms_template: formData.review_sms_template.trim() || undefined,
        auto_review_enabled: formData.auto_review_enabled,
      };

      const res = await (window as any).authFetch('/api/clients', {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.ok) {
        throw new Error(data.error || 'Failed to update client');
      }

      // Success - close modal and reload
      setShowEditModal(false);
      await loadClients();
    } catch (err) {
      console.error('Error updating client:', err);
      setFormError(err instanceof Error ? err.message : 'Failed to update client');
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedClient) return;

    setIsSaving(true);

    try {
      const res = await (window as any).authFetch(`/api/clients?id=${encodeURIComponent(selectedClient.id)}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!data.ok) {
        throw new Error(data.error || 'Failed to delete client');
      }

      // Success - close modal and reload
      setShowDeleteModal(false);
      setSelectedClient(null);
      await loadClients();
    } catch (err) {
      console.error('Error deleting client:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete client');
      setShowDeleteModal(false);
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  // Helper to check if client can be deleted
  const canDeleteClient = (client: Client) => {
    // Protect Sitrixx demo client - check by business name or specific ID
    const protectedBusinessNames = ['sitrixx', 'sitrixx demo', 'demo'];
    const businessNameLower = client.business_name?.toLowerCase() || '';
    
    if (protectedBusinessNames.some(name => businessNameLower.includes(name))) {
      return false;
    }

    // Protect by owner email if it's the Sitrixx admin
    if (client.owner_email?.toLowerCase() === 'admin@sitrixx.io') {
      return false;
    }

    return true;
  };

  // Get tooltip text for disabled delete buttons
  const getDeleteTooltip = (client: Client) => {
    if (!canDeleteClient(client)) {
      return 'Demo/System clients cannot be deleted';
    }
    return 'Delete client';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl md:text-6xl font-black mb-3 tracking-tight text-foreground">
            Clients
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your client accounts and subscriptions
          </p>
        </div>
        <Button size="lg" className="gap-2" onClick={handleAddClient}>
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-4xl font-black text-foreground">{totalClients}</CardTitle>
            <CardDescription className="font-medium">Total Clients</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-4xl font-black text-foreground">{activeClients}</CardTitle>
            <CardDescription className="font-medium">Active Subscriptions</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-4xl font-black text-foreground">{inactiveClients}</CardTitle>
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
                placeholder="Search by business name, email..."
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
      <Card className="border-0 shadow-none">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="text-foreground font-bold">Business Name</TableHead>
                  {clients.some(c => c.subscription_status) && <TableHead className="w-[140px] text-foreground font-bold">Status</TableHead>}
                  <TableHead className="w-[160px] text-foreground font-bold">Created</TableHead>
                  <TableHead className="w-[140px] text-foreground font-bold text-right">Actions</TableHead>
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
                    <TableRow key={client.id} className="border-b">
                      <TableCell>
                        <span className="font-semibold text-foreground">{client.business_name}</span>
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
                            <span className="text-sm text-foreground">{formatDate(client.created_at)}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClient(client)}
                            className="h-8 px-2 hover:bg-primary/10"
                            title="Edit client"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClient(client)}
                            disabled={!canDeleteClient(client)}
                            className="h-8 px-2 hover:bg-destructive/10 hover:text-destructive disabled:opacity-40 disabled:cursor-not-allowed"
                            title={getDeleteTooltip(client)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Client Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">Add Client</DialogTitle>
            <DialogDescription>
              Create a new client account. Required fields are marked with *.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitAdd}>
            <div className="space-y-4 py-4">
              {formError && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive font-medium">{formError}</p>
                </div>
              )}
              
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="business-name" className="text-foreground">
                    Business Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="business-name"
                    value={formData.business_name}
                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                    placeholder="e.g., Acme Corporation"
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="owner-email" className="text-foreground">
                    Owner Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="owner-email"
                    type="email"
                    value={formData.owner_email}
                    onChange={(e) => setFormData({ ...formData, owner_email: e.target.value })}
                    placeholder="owner@example.com"
                    disabled={isSaving}
                  />
                </div>
              </div>

              {/* Website & Links */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold text-foreground">Website & Links</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="website-url" className="text-foreground">Website URL</Label>
                  <Input
                    id="website-url"
                    type="url"
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                    placeholder="https://example.com"
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="booking-link" className="text-foreground">Booking Link</Label>
                  <Input
                    id="booking-link"
                    type="url"
                    value={formData.booking_link}
                    onChange={(e) => setFormData({ ...formData, booking_link: e.target.value })}
                    placeholder="https://calendly.com/..."
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="google-review-link" className="text-foreground">Google Review Link</Label>
                  <Input
                    id="google-review-link"
                    type="url"
                    value={formData.google_review_link}
                    onChange={(e) => setFormData({ ...formData, google_review_link: e.target.value })}
                    placeholder="https://g.page/..."
                    disabled={isSaving}
                  />
                </div>
              </div>

              {/* Phone Configuration */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold text-foreground">Phone Configuration</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="twilio-number" className="text-foreground">Twilio Number</Label>
                  <Input
                    id="twilio-number"
                    value={formData.twilio_number}
                    onChange={(e) => setFormData({ ...formData, twilio_number: e.target.value })}
                    placeholder="+1234567890"
                    disabled={isSaving}
                  />
                  <p className="text-xs text-muted-foreground">
                    The Twilio phone number for this client
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="forwarding-phone" className="text-foreground">Forwarding Phone</Label>
                  <Input
                    id="forwarding-phone"
                    value={formData.forwarding_phone}
                    onChange={(e) => setFormData({ ...formData, forwarding_phone: e.target.value })}
                    placeholder="+1234567890"
                    disabled={isSaving}
                  />
                  <p className="text-xs text-muted-foreground">
                    Where to forward missed calls
                  </p>
                </div>
              </div>

              {/* SMS Templates */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold text-foreground">SMS Templates</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="custom-sms-template" className="text-foreground">
                    Missed Call SMS Template
                  </Label>
                  <Textarea
                    id="custom-sms-template"
                    value={formData.custom_sms_template}
                    onChange={(e) => setFormData({ ...formData, custom_sms_template: e.target.value })}
                    placeholder="Hi! I missed your call. Click here to book: {booking_link}"
                    disabled={isSaving}
                    rows={3}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Template for auto-reply when a call is missed. Use {'{booking_link}'} as placeholder.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review-sms-template" className="text-foreground">
                    Review Request SMS Template
                  </Label>
                  <Textarea
                    id="review-sms-template"
                    value={formData.review_sms_template}
                    onChange={(e) => setFormData({ ...formData, review_sms_template: e.target.value })}
                    placeholder="Thanks for your business! Please leave us a review: {review_link}"
                    disabled={isSaving}
                    rows={3}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Template for requesting Google reviews. Use {'{review_link}'} as placeholder.
                  </p>
                </div>
              </div>

              {/* Automation Settings */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold text-foreground">Automation Settings</h3>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-review-enabled" className="text-foreground">
                      Auto Review Requests
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically send review requests after service completion
                    </p>
                  </div>
                  <Switch
                    id="auto-review-enabled"
                    checked={formData.auto_review_enabled}
                    onCheckedChange={(checked) => setFormData({ ...formData, auto_review_enabled: checked })}
                    disabled={isSaving}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddModal(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Creating...' : 'Create Client'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Client Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">Edit Client</DialogTitle>
            <DialogDescription>
              Update client information. Required fields are marked with *.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit}>
            <div className="space-y-4 py-4">
              {formError && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive font-medium">{formError}</p>
                </div>
              )}
              
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-client-id" className="text-foreground">Client ID</Label>
                  <Input
                    id="edit-client-id"
                    value={formData.id}
                    disabled
                    className="font-mono bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    Client ID cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-business-name" className="text-foreground">
                    Business Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="edit-business-name"
                    value={formData.business_name}
                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                    placeholder="e.g., Acme Corporation"
                    disabled={isSaving}
                  />
                </div>
              </div>

              {/* Website & Links */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold text-foreground">Website & Links</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-website-url" className="text-foreground">Website URL</Label>
                  <Input
                    id="edit-website-url"
                    type="url"
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                    placeholder="https://example.com"
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-booking-link" className="text-foreground">Booking Link</Label>
                  <Input
                    id="edit-booking-link"
                    type="url"
                    value={formData.booking_link}
                    onChange={(e) => setFormData({ ...formData, booking_link: e.target.value })}
                    placeholder="https://calendly.com/..."
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-google-review-link" className="text-foreground">Google Review Link</Label>
                  <Input
                    id="edit-google-review-link"
                    type="url"
                    value={formData.google_review_link}
                    onChange={(e) => setFormData({ ...formData, google_review_link: e.target.value })}
                    placeholder="https://g.page/..."
                    disabled={isSaving}
                  />
                </div>
              </div>

              {/* Phone Configuration */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold text-foreground">Phone Configuration</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-twilio-number" className="text-foreground">Twilio Number</Label>
                  <Input
                    id="edit-twilio-number"
                    value={formData.twilio_number}
                    onChange={(e) => setFormData({ ...formData, twilio_number: e.target.value })}
                    placeholder="+1234567890"
                    disabled={isSaving}
                  />
                  <p className="text-xs text-muted-foreground">
                    The Twilio phone number for this client
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-forwarding-phone" className="text-foreground">Forwarding Phone</Label>
                  <Input
                    id="edit-forwarding-phone"
                    value={formData.forwarding_phone}
                    onChange={(e) => setFormData({ ...formData, forwarding_phone: e.target.value })}
                    placeholder="+1234567890"
                    disabled={isSaving}
                  />
                  <p className="text-xs text-muted-foreground">
                    Where to forward missed calls
                  </p>
                </div>
              </div>

              {/* SMS Templates */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold text-foreground">SMS Templates</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-custom-sms-template" className="text-foreground">
                    Missed Call SMS Template
                  </Label>
                  <Textarea
                    id="edit-custom-sms-template"
                    value={formData.custom_sms_template}
                    onChange={(e) => setFormData({ ...formData, custom_sms_template: e.target.value })}
                    placeholder="Hi! I missed your call. Click here to book: {booking_link}"
                    disabled={isSaving}
                    rows={3}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Template for auto-reply when a call is missed. Use {'{booking_link}'} as placeholder.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-review-sms-template" className="text-foreground">
                    Review Request SMS Template
                  </Label>
                  <Textarea
                    id="edit-review-sms-template"
                    value={formData.review_sms_template}
                    onChange={(e) => setFormData({ ...formData, review_sms_template: e.target.value })}
                    placeholder="Thanks for your business! Please leave us a review: {review_link}"
                    disabled={isSaving}
                    rows={3}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Template for requesting Google reviews. Use {'{review_link}'} as placeholder.
                  </p>
                </div>
              </div>

              {/* Automation Settings */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold text-foreground">Automation Settings</h3>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="edit-auto-review-enabled" className="text-foreground">
                      Auto Review Requests
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically send review requests after service completion
                    </p>
                  </div>
                  <Switch
                    id="edit-auto-review-enabled"
                    checked={formData.auto_review_enabled}
                    onCheckedChange={(checked) => setFormData({ ...formData, auto_review_enabled: checked })}
                    disabled={isSaving}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowEditModal(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">Delete Client?</DialogTitle>
            <DialogDescription>
              This will remove <span className="font-semibold text-foreground">{selectedClient?.business_name}</span> from Sitrixx. This action can't be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isSaving}
            >
              {isSaving ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
