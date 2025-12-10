import { useState } from 'react';
import { Plus, Edit, Eye, Trash2, X } from 'lucide-react';
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
  },
  {
    id: 'truetone-painting',
    businessName: 'TrueTone Painting',
    ownerEmail: 'info@truetone.com',
    twilioNumber: '+16475552345',
    forwardingPhone: '+14165558765',
    bookingLink: 'https://calendly.com/truetone',
    googleReviewLink: 'https://g.page/r/truetone/review',
  },
  {
    id: 'apex-fitness',
    businessName: 'Apex Fitness',
    ownerEmail: 'contact@apexfit.com',
    twilioNumber: '+16475553456',
    forwardingPhone: '+19055557654',
    bookingLink: 'https://calendly.com/apexfit',
    googleReviewLink: 'https://g.page/r/apexfit/review',
  },
];

export default function ClientsPage() {
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [clients, setClients] = useState(dummyClients);
  const [formData, setFormData] = useState({
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

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Clients</h1>
          <p className="text-muted-foreground">Manage your client accounts and settings</p>
        </div>
        <Button
          onClick={() => setShowNewClientForm(true)}
          className="bg-gradient-to-r from-primary to-purple-600 hover:scale-105 transition-all shadow-lg rounded-xl"
        >
          <Plus size={20} className="mr-2" />
          Add New Client
        </Button>
      </div>

      {/* Clients Table */}
      <div className="bg-card border-2 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30 border-b-2">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold">Business Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Client ID</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Owner Email</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Twilio Number</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Forwarding Phone</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Booking Link</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Review Link</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium">{client.businessName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs bg-muted px-2 py-1 rounded">{client.id}</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{client.ownerEmail}</td>
                  <td className="px-6 py-4 text-sm font-mono">{client.twilioNumber}</td>
                  <td className="px-6 py-4 text-sm font-mono">{client.forwardingPhone}</td>
                  <td className="px-6 py-4">
                    {client.bookingLink ? (
                      <a
                        href={client.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {client.googleReviewLink ? (
                      <a
                        href={client.googleReviewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.location.href = `${baseUrl}/admin/leads?client=${client.id}`}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="View Leads"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => window.location.href = `${baseUrl}/admin/reviews?client=${client.id}`}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="View Reviews"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* Required Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Required Information</h3>
              
              <div>
                <label htmlFor="id" className="block text-sm font-medium mb-2">
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
                  className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="galt-hair-studio"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Used as a unique ID in the backend. Lowercase, hyphens only.
                </p>
              </div>

              <div>
                <label htmlFor="businessName" className="block text-sm font-medium mb-2">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  required
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Galt Hair Studio"
                />
              </div>

              <div>
                <label htmlFor="ownerEmail" className="block text-sm font-medium mb-2">
                  Owner Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="ownerEmail"
                  name="ownerEmail"
                  required
                  value={formData.ownerEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
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
                <label htmlFor="websiteUrl" className="block text-sm font-medium mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  id="websiteUrl"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="https://galthair.com"
                />
              </div>

              <div>
                <label htmlFor="bookingLink" className="block text-sm font-medium mb-2">
                  Booking Link URL <span className="text-muted-foreground text-xs">(Recommended)</span>
                </label>
                <input
                  type="url"
                  id="bookingLink"
                  name="bookingLink"
                  value={formData.bookingLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="https://calendly.com/galthair"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL where customers can book (Calendly, booking app, etc.)
                </p>
              </div>

              <div>
                <label htmlFor="googleReviewLink" className="block text-sm font-medium mb-2">
                  Google Review Link <span className="text-muted-foreground text-xs">(Recommended)</span>
                </label>
                <input
                  type="url"
                  id="googleReviewLink"
                  name="googleReviewLink"
                  value={formData.googleReviewLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="https://g.page/r/galthair/review"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL that leads to the business's Google reviews page
                </p>
              </div>

              <div>
                <label htmlFor="twilioNumber" className="block text-sm font-medium mb-2">
                  Twilio Number (Business Number)
                </label>
                <input
                  type="tel"
                  id="twilioNumber"
                  name="twilioNumber"
                  value={formData.twilioNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
                  placeholder="+1 647 555 1234"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Must be in E.164 format, e.g. +16475551234
                </p>
              </div>

              <div>
                <label htmlFor="forwardingPhone" className="block text-sm font-medium mb-2">
                  Forwarding Phone (Where calls ring)
                </label>
                <input
                  type="tel"
                  id="forwardingPhone"
                  name="forwardingPhone"
                  value={formData.forwardingPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
                  placeholder="+1 519 555 9876"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Business owner's real phone. Calls to the Twilio number will forward here.
                </p>
              </div>

              <div>
                <label htmlFor="customSmsTemplate" className="block text-sm font-medium mb-2">
                  Custom SMS Template
                </label>
                <textarea
                  id="customSmsTemplate"
                  name="customSmsTemplate"
                  rows={4}
                  value={formData.customSmsTemplate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
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
                className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:scale-105 transition-all shadow-lg rounded-xl h-12"
              >
                Create Client
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowNewClientForm(false)}
                className="px-8 rounded-xl h-12"
              >
                Cancel
              </Button>
            </div>

            <div className="p-4 bg-muted/30 rounded-xl border">
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> This form will POST to /api/clients with fields: id, business_name, owner_email, and all optional fields when connected.
              </p>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
