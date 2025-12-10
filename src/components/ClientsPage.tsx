import { useState } from 'react';
import { Plus, Edit, UserPlus, Star, ExternalLink, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { baseUrl } from '../lib/base-url';

const API_BASE = 'https://sitrixx-website-backend.vercel.app';

type ClientData = {
  id: string;
  business_name: string;
  owner_email: string;
  website_url: string;
  booking_link: string;
  google_review_link: string;
  twilio_number: string;
  forwarding_phone: string;
  custom_sms_template: string;
};

interface ClientsPageProps {
  initialData: {
    clients: ClientData[];
    error: string | null;
  };
}

export default function ClientsPage({ initialData }: ClientsPageProps) {
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientData | null>(null);
  const [clients, setClients] = useState<ClientData[]>(initialData.clients);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(initialData.error);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<ClientData>({
    id: '',
    business_name: '',
    owner_email: '',
    website_url: '',
    booking_link: '',
    google_review_link: '',
    twilio_number: '',
    forwarding_phone: '',
    custom_sms_template: '',
  });

  const loadClients = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/clients`);
      if (!res.ok) throw new Error('Failed to fetch clients');
      const data = await res.json();
      setClients(Array.isArray(data) ? data : data.clients || []);
      setError(null);
    } catch (err) {
      console.error('Error loading clients:', err);
      setError(err instanceof Error ? err.message : 'Failed to load clients');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (client: ClientData) => {
    setEditingClient(client);
    setFormData(client);
    setSaveError(null);
    setSaveSuccess(null);
    setShowEditForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    setSaveSuccess(null);
    
    try {
      const res = await fetch(`${API_BASE}/api/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Failed to create client');
      }
      
      await loadClients();
      setSaveSuccess('Client created successfully!');
      
      // Reset form after short delay
      setTimeout(() => {
        setFormData({
          id: '',
          business_name: '',
          owner_email: '',
          website_url: '',
          booking_link: '',
          google_review_link: '',
          twilio_number: '',
          forwarding_phone: '',
          custom_sms_template: '',
        });
        setShowNewClientForm(false);
        setSaveSuccess(null);
      }, 1500);
    } catch (err) {
      console.error('Error creating client:', err);
      setSaveError(err instanceof Error ? err.message : 'Failed to create client');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    setSaveSuccess(null);
    
    try {
      const res = await fetch(`${API_BASE}/api/clients`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: formData.id,
          business_name: formData.business_name,
          owner_email: formData.owner_email,
          website_url: formData.website_url,
          booking_link: formData.booking_link,
          google_review_link: formData.google_review_link,
          twilio_number: formData.twilio_number,
          forwarding_phone: formData.forwarding_phone,
          custom_sms_template: formData.custom_sms_template,
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Failed to update client');
      }
      
      await loadClients();
      setSaveSuccess('Client updated successfully!');
      
      // Close form after short delay
      setTimeout(() => {
        setShowEditForm(false);
        setEditingClient(null);
        setSaveSuccess(null);
      }, 1500);
    } catch (err) {
      console.error('Error updating client:', err);
      setSaveError(err instanceof Error ? err.message : 'Failed to update client. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      business_name: '',
      owner_email: '',
      website_url: '',
      booking_link: '',
      google_review_link: '',
      twilio_number: '',
      forwarding_phone: '',
      custom_sms_template: '',
    });
    setSaveError(null);
    setSaveSuccess(null);
  };

  // Filter clients based on search term
  const filteredClients = clients.filter(client => {
    const search = searchTerm.toLowerCase();
    return (
      client.business_name.toLowerCase().includes(search) ||
      client.id.toLowerCase().includes(search) ||
      client.owner_email.toLowerCase().includes(search) ||
      client.twilio_number.includes(search) ||
      client.forwarding_phone.includes(search)
    );
  });

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-black mb-3 tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Clients
          </h1>
          <p className="text-lg text-muted-foreground">Manage your client accounts and settings</p>
        </div>
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
          <p className="text-destructive font-medium">Error loading clients:</p>
          <p className="text-sm text-muted-foreground mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-5xl md:text-6xl font-black mb-3 tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Clients
          </h1>
          <p className="text-lg text-muted-foreground">Manage your client accounts and settings</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setShowNewClientForm(true);
          }}
          className="bg-gradient-to-r from-primary to-purple-600 hover:scale-105 transition-all shadow-lg rounded-xl text-base font-semibold px-6 py-6"
        >
          <Plus size={22} className="mr-2" />
          Add New Client
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-card border rounded-xl p-6 mb-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label htmlFor="client-search" className="block text-sm font-semibold mb-3 text-foreground">
              Search Clients
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                id="client-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, ID, email, or phone..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 bg-background text-foreground font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm hover:shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-card border rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b-2">
              <tr>
                <th className="pl-8 pr-4 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Business Name</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Client ID</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Owner Email</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Twilio Number</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Forwarding Phone</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Booking Link</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Review Link</th>
                <th className="pl-4 pr-8 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody id="clients-table-body" className="divide-y divide-border">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground">
                    {searchTerm ? 'No clients found matching your search.' : 'No clients found.'}
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-muted/30 transition-colors">
                    <td className="pl-8 pr-4 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center font-bold text-primary flex-shrink-0 shadow-sm">
                          {client.business_name.charAt(0)}
                        </div>
                        <span className="font-semibold text-foreground text-[15px]">{client.business_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <code className="text-xs bg-muted px-2.5 py-1.5 rounded-lg font-mono text-foreground border">
                        {client.id}
                      </code>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-foreground">{client.owner_email}</td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-xs font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2.5 py-1.5 rounded-lg border border-blue-500/20">
                        {client.twilio_number || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-xs font-mono bg-green-500/10 text-green-600 dark:text-green-400 px-2.5 py-1.5 rounded-lg border border-green-500/20">
                        {client.forwarding_phone || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      {client.booking_link ? (
                        <a
                          href={client.booking_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-primary hover:underline text-sm font-medium"
                        >
                          View
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      {client.google_review_link ? (
                        <a
                          href={client.google_review_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-primary hover:underline text-sm font-medium"
                        >
                          View
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </td>
                    <td className="pl-4 pr-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.location.href = `${baseUrl}/admin/leads?client=${client.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white dark:text-white rounded-lg transition-all font-semibold text-sm shadow-sm"
                          title="View Leads"
                        >
                          <UserPlus size={16} className="text-white dark:text-white" strokeWidth={2.5} />
                          <span className="text-white dark:text-white">Leads</span>
                        </button>
                        <button
                          onClick={() => window.location.href = `${baseUrl}/admin/reviews?client=${client.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white dark:text-white rounded-lg transition-all font-semibold text-sm shadow-sm"
                          title="View Reviews"
                        >
                          <Star size={16} className="text-white dark:text-white" strokeWidth={2.5} />
                          <span className="text-white dark:text-white">Reviews</span>
                        </button>
                        <button
                          onClick={() => handleEdit(client)}
                          className="p-2.5 hover:bg-muted rounded-lg transition-colors border-2 border-white/20 dark:border-white/20 hover:border-white/40 dark:hover:border-white/40"
                          title="Edit Client"
                        >
                          <Edit size={18} className="text-white dark:text-white" strokeWidth={2.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Client Form Dialog */}
      <Dialog open={showNewClientForm} onOpenChange={setShowNewClientForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black">Add New Client</DialogTitle>
          </DialogHeader>

          {saveError && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
              {saveError}
            </div>
          )}

          {saveSuccess && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg">
              {saveSuccess}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* Required Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Required Information</h3>
              
              <div>
                <label htmlFor="id" className="block text-sm font-medium mb-2 text-foreground">
                  Client ID (Slug) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  required
                  pattern="[a-z0-9-]+"
                  value={formData.id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="galt-hair-studio"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Used as a unique ID in the backend. Lowercase, hyphens only.
                </p>
              </div>

              <div>
                <label htmlFor="business_name" className="block text-sm font-medium mb-2 text-foreground">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="business_name"
                  name="business_name"
                  required
                  value={formData.business_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Galt Hair Studio"
                />
              </div>

              <div>
                <label htmlFor="owner_email" className="block text-sm font-medium mb-2 text-foreground">
                  Owner Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="owner_email"
                  name="owner_email"
                  required
                  value={formData.owner_email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="owner@galthair.com"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Used for sending internal review notifications.
                </p>
              </div>
            </div>

            {/* Optional Fields */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-lg font-bold text-foreground">Optional Information</h3>

              <div>
                <label htmlFor="website_url" className="block text-sm font-medium mb-2 text-foreground">
                  Website URL
                </label>
                <input
                  type="url"
                  id="website_url"
                  name="website_url"
                  value={formData.website_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="https://galthair.com"
                />
              </div>

              <div>
                <label htmlFor="booking_link" className="block text-sm font-medium mb-2 text-foreground">
                  Booking Link URL <span className="text-muted-foreground text-xs">(Recommended)</span>
                </label>
                <input
                  type="url"
                  id="booking_link"
                  name="booking_link"
                  value={formData.booking_link}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="https://calendly.com/galthair"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL where customers can book (Calendly, booking app, etc.)
                </p>
              </div>

              <div>
                <label htmlFor="google_review_link" className="block text-sm font-medium mb-2 text-foreground">
                  Google Review Link <span className="text-muted-foreground text-xs">(Recommended)</span>
                </label>
                <input
                  type="url"
                  id="google_review_link"
                  name="google_review_link"
                  value={formData.google_review_link}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="https://g.page/r/galthair/review"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL that leads to the business's Google reviews page
                </p>
              </div>

              <div>
                <label htmlFor="twilio_number" className="block text-sm font-medium mb-2 text-foreground">
                  Twilio Number (Business Number)
                </label>
                <input
                  type="tel"
                  id="twilio_number"
                  name="twilio_number"
                  value={formData.twilio_number}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
                  placeholder="+1 647 555 1234"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Must be in E.164 format, e.g. +16475551234
                </p>
              </div>

              <div>
                <label htmlFor="forwarding_phone" className="block text-sm font-medium mb-2 text-foreground">
                  Forwarding Phone (Where calls ring)
                </label>
                <input
                  type="tel"
                  id="forwarding_phone"
                  name="forwarding_phone"
                  value={formData.forwarding_phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
                  placeholder="+1 519 555 9876"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Business owner's real phone. Calls to the Twilio number will forward here.
                </p>
              </div>

              <div>
                <label htmlFor="custom_sms_template" className="block text-sm font-medium mb-2 text-foreground">
                  Custom SMS Template
                </label>
                <textarea
                  id="custom_sms_template"
                  name="custom_sms_template"
                  rows={4}
                  value={formData.custom_sms_template}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Hey {name}, thanks for contacting {business}. You can book here: {booking}."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use placeholders: {'{name}'}, {'{business}'}, {'{booking}'}
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6 border-t">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:scale-105 transition-all shadow-lg rounded-lg h-12"
              >
                Create Client
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowNewClientForm(false);
                  resetForm();
                }}
                className="px-8 rounded-lg h-12"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Client Form Dialog */}
      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black">Edit Client</DialogTitle>
          </DialogHeader>

          {saveError && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
              {saveError}
            </div>
          )}

          {saveSuccess && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg">
              {saveSuccess}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-6 mt-6">
            {/* Client ID - Read Only */}
            <div>
              <label htmlFor="edit-id" className="block text-sm font-medium mb-2 text-foreground">
                Client ID (Cannot be changed)
              </label>
              <input
                type="text"
                id="edit-id"
                value={formData.id}
                disabled
                className="w-full px-4 py-3 rounded-lg border bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>

            {/* Editable Fields */}
            <div className="space-y-4">
              <div>
                <label htmlFor="edit-business_name" className="block text-sm font-medium mb-2 text-foreground">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="edit-business_name"
                  name="business_name"
                  required
                  value={formData.business_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label htmlFor="edit-owner_email" className="block text-sm font-medium mb-2 text-foreground">
                  Owner Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="edit-owner_email"
                  name="owner_email"
                  required
                  value={formData.owner_email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label htmlFor="edit-website_url" className="block text-sm font-medium mb-2 text-foreground">
                  Website URL
                </label>
                <input
                  type="url"
                  id="edit-website_url"
                  name="website_url"
                  value={formData.website_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label htmlFor="edit-booking_link" className="block text-sm font-medium mb-2 text-foreground">
                  Booking Link URL
                </label>
                <input
                  type="url"
                  id="edit-booking_link"
                  name="booking_link"
                  value={formData.booking_link}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label htmlFor="edit-google_review_link" className="block text-sm font-medium mb-2 text-foreground">
                  Google Review Link
                </label>
                <input
                  type="url"
                  id="edit-google_review_link"
                  name="google_review_link"
                  value={formData.google_review_link}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label htmlFor="edit-twilio_number" className="block text-sm font-medium mb-2 text-foreground">
                  Twilio Number (Business Number)
                </label>
                <input
                  type="tel"
                  id="edit-twilio_number"
                  name="twilio_number"
                  value={formData.twilio_number}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
                />
              </div>

              <div>
                <label htmlFor="edit-forwarding_phone" className="block text-sm font-medium mb-2 text-foreground">
                  Forwarding Phone
                </label>
                <input
                  type="tel"
                  id="edit-forwarding_phone"
                  name="forwarding_phone"
                  value={formData.forwarding_phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
                />
              </div>

              <div>
                <label htmlFor="edit-custom_sms_template" className="block text-sm font-medium mb-2 text-foreground">
                  Custom SMS Template
                </label>
                <textarea
                  id="edit-custom_sms_template"
                  name="custom_sms_template"
                  rows={4}
                  value={formData.custom_sms_template}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6 border-t">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:scale-105 transition-all shadow-lg rounded-lg h-12"
              >
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowEditForm(false);
                  setEditingClient(null);
                  resetForm();
                }}
                className="px-8 rounded-lg h-12"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
