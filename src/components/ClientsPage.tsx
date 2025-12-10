import { useState } from 'react';
import { Plus, Edit, UserPlus, Star, ExternalLink, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { baseUrl } from '../lib/base-url';

// Dummy data
const dummyClients = [
  {
    id: 'galt-hair-studio',
    businessName: 'Galt Hair Studio',
    ownerEmail: 'owner@galthair.com',
    twilioNumber: '+16475551234',
    forwardingPhone: '+15195559876',
    bookingLink: 'https://calendly.com/galthair',
    googleReviewLink: 'https://g.page/r/galthair/review',
    websiteUrl: 'https://galthair.com',
    customSmsTemplate: '',
  },
  {
    id: 'truetone-painting',
    businessName: 'TrueTone Painting',
    ownerEmail: 'info@truetone.com',
    twilioNumber: '+16475552345',
    forwardingPhone: '+14165558765',
    bookingLink: 'https://calendly.com/truetone',
    googleReviewLink: 'https://g.page/r/truetone/review',
    websiteUrl: 'https://truetone.com',
    customSmsTemplate: '',
  },
  {
    id: 'apex-fitness',
    businessName: 'Apex Fitness',
    ownerEmail: 'contact@apexfit.com',
    twilioNumber: '+16475553456',
    forwardingPhone: '+19055557654',
    bookingLink: 'https://calendly.com/apexfit',
    googleReviewLink: 'https://g.page/r/apexfit/review',
    websiteUrl: 'https://apexfit.com',
    customSmsTemplate: '',
  },
];

type ClientData = {
  id: string;
  businessName: string;
  ownerEmail: string;
  websiteUrl: string;
  bookingLink: string;
  googleReviewLink: string;
  twilioNumber: string;
  forwardingPhone: string;
  customSmsTemplate: string;
};

export default function ClientsPage() {
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientData | null>(null);
  const [clients, setClients] = useState(dummyClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<ClientData>({
    id: '',
    businessName: '',
    ownerEmail: '',
    websiteUrl: '',
    bookingLink: '',
    googleReviewLink: '',
    twilioNumber: '',
    forwardingPhone: '',
    customSmsTemplate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (client: typeof dummyClients[0]) => {
    setEditingClient(client as ClientData);
    setFormData(client as ClientData);
    setShowEditForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Connect to POST /api/clients
    console.log('Creating new client:', formData);
    
    // For now, add to dummy data
    setClients(prev => [...prev, {
      id: formData.id,
      businessName: formData.businessName,
      ownerEmail: formData.ownerEmail,
      twilioNumber: formData.twilioNumber,
      forwardingPhone: formData.forwardingPhone,
      bookingLink: formData.bookingLink,
      googleReviewLink: formData.googleReviewLink,
      websiteUrl: formData.websiteUrl,
      customSmsTemplate: formData.customSmsTemplate,
    }]);
    
    // Reset form
    setFormData({
      id: '',
      businessName: '',
      ownerEmail: '',
      websiteUrl: '',
      bookingLink: '',
      googleReviewLink: '',
      twilioNumber: '',
      forwardingPhone: '',
      customSmsTemplate: '',
    });
    
    setShowNewClientForm(false);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Connect to PUT /api/clients/:id
    console.log('Updating client:', formData);
    
    // Update dummy data
    setClients(prev => prev.map(client => 
      client.id === formData.id ? { ...formData } : client
    ));
    
    setShowEditForm(false);
    setEditingClient(null);
  };

  const resetForm = () => {
    setFormData({
      id: '',
      businessName: '',
      ownerEmail: '',
      websiteUrl: '',
      bookingLink: '',
      googleReviewLink: '',
      twilioNumber: '',
      forwardingPhone: '',
      customSmsTemplate: '',
    });
  };

  // Filter clients based on search term
  const filteredClients = clients.filter(client => {
    const search = searchTerm.toLowerCase();
    return (
      client.businessName.toLowerCase().includes(search) ||
      client.id.toLowerCase().includes(search) ||
      client.ownerEmail.toLowerCase().includes(search) ||
      client.twilioNumber.includes(search) ||
      client.forwardingPhone.includes(search)
    );
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header - Made Bigger and More Prominent */}
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
                <th className="pl-10 pr-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Business Name</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Client ID</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Owner Email</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Twilio Number</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Forwarding Phone</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Booking Link</th>
                <th className="px-6 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Review Link</th>
                <th className="pl-6 pr-10 py-6 text-left text-xs font-bold uppercase tracking-widest text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-muted/30 transition-colors">
                  <td className="pl-10 pr-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center font-bold text-primary flex-shrink-0 shadow-sm">
                        {client.businessName.charAt(0)}
                      </div>
                      <span className="font-semibold text-foreground text-[15px]">{client.businessName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <code className="text-xs bg-muted px-2.5 py-1.5 rounded-lg font-mono text-foreground border">
                      {client.id}
                    </code>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-foreground">{client.ownerEmail}</td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="text-xs font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2.5 py-1.5 rounded-lg border border-blue-500/20">
                      {client.twilioNumber}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="text-xs font-mono bg-green-500/10 text-green-600 dark:text-green-400 px-2.5 py-1.5 rounded-lg border border-green-500/20">
                      {client.forwardingPhone}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    {client.bookingLink ? (
                      <a
                        href={client.bookingLink}
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
                    {client.googleReviewLink ? (
                      <a
                        href={client.googleReviewLink}
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
                  <td className="pl-6 pr-10 py-5 whitespace-nowrap">
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
              ))}
            </tbody>
          </table>
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchTerm ? 'No clients found matching your search.' : 'No clients found.'}
            </p>
          </div>
        )}
      </div>

      {/* New Client Form Dialog */}
      <Dialog open={showNewClientForm} onOpenChange={setShowNewClientForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black">Add New Client</DialogTitle>
          </DialogHeader>

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
                <label htmlFor="businessName" className="block text-sm font-medium mb-2 text-foreground">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  required
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Galt Hair Studio"
                />
              </div>

              <div>
                <label htmlFor="ownerEmail" className="block text-sm font-medium mb-2 text-foreground">
                  Owner Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="ownerEmail"
                  name="ownerEmail"
                  required
                  value={formData.ownerEmail}
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
                <label htmlFor="websiteUrl" className="block text-sm font-medium mb-2 text-foreground">
                  Website URL
                </label>
                <input
                  type="url"
                  id="websiteUrl"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="https://galthair.com"
                />
              </div>

              <div>
                <label htmlFor="bookingLink" className="block text-sm font-medium mb-2 text-foreground">
                  Booking Link URL <span className="text-muted-foreground text-xs">(Recommended)</span>
                </label>
                <input
                  type="url"
                  id="bookingLink"
                  name="bookingLink"
                  value={formData.bookingLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="https://calendly.com/galthair"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL where customers can book (Calendly, booking app, etc.)
                </p>
              </div>

              <div>
                <label htmlFor="googleReviewLink" className="block text-sm font-medium mb-2 text-foreground">
                  Google Review Link <span className="text-muted-foreground text-xs">(Recommended)</span>
                </label>
                <input
                  type="url"
                  id="googleReviewLink"
                  name="googleReviewLink"
                  value={formData.googleReviewLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="https://g.page/r/galthair/review"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL that leads to the business's Google reviews page
                </p>
              </div>

              <div>
                <label htmlFor="twilioNumber" className="block text-sm font-medium mb-2 text-foreground">
                  Twilio Number (Business Number)
                </label>
                <input
                  type="tel"
                  id="twilioNumber"
                  name="twilioNumber"
                  value={formData.twilioNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
                  placeholder="+1 647 555 1234"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Must be in E.164 format, e.g. +16475551234
                </p>
              </div>

              <div>
                <label htmlFor="forwardingPhone" className="block text-sm font-medium mb-2 text-foreground">
                  Forwarding Phone (Where calls ring)
                </label>
                <input
                  type="tel"
                  id="forwardingPhone"
                  name="forwardingPhone"
                  value={formData.forwardingPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
                  placeholder="+1 519 555 9876"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Business owner's real phone. Calls to the Twilio number will forward here.
                </p>
              </div>

              <div>
                <label htmlFor="customSmsTemplate" className="block text-sm font-medium mb-2 text-foreground">
                  Custom SMS Template
                </label>
                <textarea
                  id="customSmsTemplate"
                  name="customSmsTemplate"
                  rows={4}
                  value={formData.customSmsTemplate}
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
                onClick={() => setShowNewClientForm(false)}
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

          <form onSubmit={handleUpdate} className="space-y-6 mt-6">
            {/* Required Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Required Information</h3>
              
              <div>
                <label htmlFor="edit-id" className="block text-sm font-medium mb-2 text-foreground">
                  Client ID (Slug) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="edit-id"
                  name="id"
                  required
                  disabled
                  value={formData.id}
                  className="w-full px-4 py-3 rounded-lg border bg-muted text-muted-foreground cursor-not-allowed"
                  placeholder="galt-hair-studio"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Client ID cannot be changed after creation.
                </p>
              </div>

              <div>
                <label htmlFor="edit-businessName" className="block text-sm font-medium mb-2 text-foreground">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="edit-businessName"
                  name="businessName"
                  required
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Galt Hair Studio"
                />
              </div>

              <div>
                <label htmlFor="edit-ownerEmail" className="block text-sm font-medium mb-2 text-foreground">
                  Owner Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="edit-ownerEmail"
                  name="ownerEmail"
                  required
                  value={formData.ownerEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="owner@galthair.com"
                />
              </div>
            </div>

            {/* Optional Fields */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-lg font-bold text-foreground">Optional Information</h3>

              <div>
                <label htmlFor="edit-websiteUrl" className="block text-sm font-medium mb-2 text-foreground">
                  Website URL
                </label>
                <input
                  type="url"
                  id="edit-websiteUrl"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="https://galthair.com"
                />
              </div>

              <div>
                <label htmlFor="edit-bookingLink" className="block text-sm font-medium mb-2 text-foreground">
                  Booking Link URL
                </label>
                <input
                  type="url"
                  id="edit-bookingLink"
                  name="bookingLink"
                  value={formData.bookingLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="https://calendly.com/galthair"
                />
              </div>

              <div>
                <label htmlFor="edit-googleReviewLink" className="block text-sm font-medium mb-2 text-foreground">
                  Google Review Link
                </label>
                <input
                  type="url"
                  id="edit-googleReviewLink"
                  name="googleReviewLink"
                  value={formData.googleReviewLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="https://g.page/r/galthair/review"
                />
              </div>

              <div>
                <label htmlFor="edit-twilioNumber" className="block text-sm font-medium mb-2 text-foreground">
                  Twilio Number (Business Number)
                </label>
                <input
                  type="tel"
                  id="edit-twilioNumber"
                  name="twilioNumber"
                  value={formData.twilioNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
                  placeholder="+1 647 555 1234"
                />
              </div>

              <div>
                <label htmlFor="edit-forwardingPhone" className="block text-sm font-medium mb-2 text-foreground">
                  Forwarding Phone
                </label>
                <input
                  type="tel"
                  id="edit-forwardingPhone"
                  name="forwardingPhone"
                  value={formData.forwardingPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
                  placeholder="+1 519 555 9876"
                />
              </div>

              <div>
                <label htmlFor="edit-customSmsTemplate" className="block text-sm font-medium mb-2 text-foreground">
                  Custom SMS Template
                </label>
                <textarea
                  id="edit-customSmsTemplate"
                  name="customSmsTemplate"
                  rows={4}
                  value={formData.customSmsTemplate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Hey {name}, thanks for contacting {business}. You can book here: {booking}."
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6 border-t">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:scale-105 transition-all shadow-lg rounded-lg h-12"
              >
                Update Client
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowEditForm(false);
                  setEditingClient(null);
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
