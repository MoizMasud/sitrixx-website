import React, { useState, useEffect } from 'react';
import { UserPlus, Pencil, Trash2, X, Mail, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { Badge } from './ui/badge';

const BACKEND_URL = 'https://sitrixx-website-backend.vercel.app';

interface User {
  id: string;
  email?: string;
  display_name?: string;
  phone?: string;
  role: string;
  needs_password_change?: boolean;
  created_at: string;
}

interface Client {
  id: string;
  business_name: string;
}

export default function MobileUsersPage() {
  // Users table state
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Clients state
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoadingClients, setIsLoadingClients] = useState(false);

  // Create modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    email: '',
    tempPassword: '',
    role: 'client',
    clientId: '',
    display_name: '',
    phone: '',
  });
  const [isCreating, setIsCreating] = useState(false);
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);

  // Edit modal state
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState({
    userId: '',
    display_name: '',
    phone: '',
    role: 'client',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Delete modal state
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Sending reset state
  const [sendingResetForEmail, setSendingResetForEmail] = useState<string | null>(null);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const getAccessToken = async () => {
    const supabase = (window as any).supabaseClient;
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No active session');
    }

    return session.access_token;
  };

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    setError(null);

    try {
      const token = await getAccessToken();

      const res = await fetch(`${BACKEND_URL}/api/admin/users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Failed to fetch users');
      }

      setUsers(data.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const fetchClients = async () => {
    setIsLoadingClients(true);
    try {
      const res = await (window as any).authFetch('/api/clients');
      const data = await res.json();
      
      if (!data.ok) {
        throw new Error(data.error || 'Failed to load clients');
      }
      
      const clientsList = Array.isArray(data.clients) ? data.clients : [];
      setClients(clientsList);
    } catch (err) {
      console.error('Error loading clients:', err);
      setError(err instanceof Error ? err.message : 'Failed to load clients');
    } finally {
      setIsLoadingClients(false);
    }
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
    setError(null);
    setCreatedSuccessfully(false);
    setCreateFormData({
      email: '',
      tempPassword: '',
      role: 'client',
      clientId: '',
      display_name: '',
      phone: '',
    });
    // Fetch clients when opening modal
    fetchClients();
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setCreateFormData({
      email: '',
      tempPassword: '',
      role: 'client',
      clientId: '',
      display_name: '',
      phone: '',
    });
    setCreatedSuccessfully(false);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!createFormData.email.trim()) {
      setError('Email is required');
      return;
    }

    if (!createFormData.tempPassword.trim()) {
      setError('Temporary password is required');
      return;
    }

    if (createFormData.tempPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (!createFormData.clientId) {
      setError('Business is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(createFormData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsCreating(true);

    try {
      const token = await getAccessToken();

      const payload = {
        email: createFormData.email.trim(),
        tempPassword: createFormData.tempPassword,
        role: createFormData.role,
        clientId: createFormData.clientId,
      };

      const res = await fetch(`${BACKEND_URL}/api/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Failed to create user');
      }

      // Show success state
      setCreatedSuccessfully(true);

      // Refresh users list
      await fetchUsers();

      // Reset form
      setCreateFormData({
        email: '',
        tempPassword: '',
        role: 'client',
        clientId: '',
        display_name: '',
        phone: '',
      });

    } catch (err) {
      console.error('Error creating user:', err);
      setError(err instanceof Error ? err.message : 'Failed to create user');
    } finally {
      setIsCreating(false);
    }
  };

  const openEditModal = (user: User) => {
    setEditUser(user);
    setEditFormData({
      userId: user.id,
      display_name: user.display_name || '',
      phone: user.phone || '',
      role: user.role,
    });
    setError(null);
  };

  const closeEditModal = () => {
    setEditUser(null);
    setEditFormData({
      userId: '',
      display_name: '',
      phone: '',
      role: 'client',
    });
    setError(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser || !editFormData.userId) {
      setError('User ID is required');
      return;
    }

    setIsEditing(true);
    setError(null);

    try {
      const token = await getAccessToken();

      const payload: any = {
        userId: editFormData.userId,
        role: editFormData.role,
      };

      if (editFormData.display_name.trim()) {
        payload.display_name = editFormData.display_name.trim();
      }

      if (editFormData.phone.trim()) {
        payload.phone = editFormData.phone.trim();
      }

      const res = await fetch(`${BACKEND_URL}/api/admin/users`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Failed to update user');
      }

      closeEditModal();
      await fetchUsers();

    } catch (err) {
      console.error('Error updating user:', err);
      setError(err instanceof Error ? err.message : 'Failed to update user');
    } finally {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteUserId) return;

    setIsDeleting(true);
    setError(null);

    try {
      const token = await getAccessToken();

      const res = await fetch(`${BACKEND_URL}/api/admin/users`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: deleteUserId
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Failed to delete user');
      }

      setDeleteUserId(null);
      await fetchUsers();

    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete user');
      setDeleteUserId(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResendInvite = async (email: string) => {
    if (!email) {
      setError('No email address available for this user');
      return;
    }

    setSendingResetForEmail(email);
    setError(null);

    try {
      const token = await getAccessToken();

      const supabase = (window as any).supabaseClient;
      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }

      const res = await fetch(`${BACKEND_URL}/api/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          action: 'send_reset',
          email: email,
        }),
      });

      const responseData = await res.json();

      if (!res.ok || !responseData.ok) {
        throw new Error(responseData.error || 'Failed to send password reset email');
      }

      // Show success toast
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-right';
      toast.textContent = 'Password reset email sent successfully';
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('animate-out', 'slide-out-to-right');
        setTimeout(() => toast.remove(), 300);
      }, 3000);

    } catch (err) {
      console.error('Error sending password reset:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to send password reset email';
      setError(errorMessage);
      
      // Show error toast
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-right';
      toast.textContent = errorMessage;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('animate-out', 'slide-out-to-right');
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    } finally {
      setSendingResetForEmail(null);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-5xl md:text-6xl font-black mb-3 tracking-tight text-foreground">
            Mobile Users
          </h1>
          <p className="text-lg text-muted-foreground">
            Create and manage mobile app user accounts
          </p>
        </div>
        <Button onClick={openCreateModal} size="lg" className="self-start sm:self-auto">
          <UserPlus className="h-5 w-5 mr-2" />
          Create User
        </Button>
      </div>

      {/* Error Banner */}
      {error && (
        <Card className="border-red-500/50 bg-red-500/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users Table */}
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">
            All Mobile Users
          </CardTitle>
          <CardDescription>
            View and manage existing mobile app user accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingUsers ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No users found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead className="whitespace-nowrap">Email / ID</TableHead>
                    <TableHead className="whitespace-nowrap">Display Name</TableHead>
                    <TableHead className="whitespace-nowrap">Phone</TableHead>
                    <TableHead className="whitespace-nowrap">Role</TableHead>
                    <TableHead className="whitespace-nowrap">Password Status</TableHead>
                    <TableHead className="whitespace-nowrap">Created At</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="border-b">
                      <TableCell className="font-medium">
                        {user.email || <span className="text-muted-foreground text-xs font-mono">{user.id}</span>}
                      </TableCell>
                      <TableCell>{user.display_name || '—'}</TableCell>
                      <TableCell>{user.phone || '—'}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? 'default' : user.role === 'staff' ? 'secondary' : 'outline'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.needs_password_change ? (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">
                            Using Temp Password
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                            Password Set
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{formatDate(user.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => user.email && handleResendInvite(user.email)}
                            disabled={!user.email || sendingResetForEmail === user.email}
                            className="h-8 w-8 p-0"
                            title={user.needs_password_change ? "Resend invite" : "Send password reset"}
                          >
                            {sendingResetForEmail === user.email ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                            ) : (
                              <Mail className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditModal(user)}
                            className="h-8 w-8 p-0"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteUserId(user.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create User Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={(open) => !open && closeCreateModal()}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Mobile User</DialogTitle>
            <DialogDescription>
              Add a new mobile app user and link them to a business
            </DialogDescription>
          </DialogHeader>

          {createdSuccessfully ? (
            // Show success message
            <div className="py-6 space-y-4">
              <div className="text-center space-y-2">
                <div className="text-5xl">✅</div>
                <h3 className="text-xl font-semibold text-foreground">User Created Successfully!</h3>
                <p className="text-sm text-muted-foreground">
                  User created and linked to business. Temporary password must be changed on first login.
                </p>
              </div>

              <Button onClick={closeCreateModal} className="w-full">
                Done
              </Button>
            </div>
          ) : (
            // Show create form
            <form onSubmit={handleCreateSubmit}>
              <div className="space-y-4 py-4">
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive font-medium">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="create-email" className="text-foreground">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="create-email"
                      type="email"
                      value={createFormData.email}
                      onChange={(e) => setCreateFormData({ ...createFormData, email: e.target.value })}
                      placeholder="user@example.com"
                      disabled={isCreating}
                      autoComplete="off"
                    />
                  </div>

                  {/* Temporary Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="create-temp-password" className="text-foreground">
                      Temporary Password <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="create-temp-password"
                      type="text"
                      value={createFormData.tempPassword}
                      onChange={(e) => setCreateFormData({ ...createFormData, tempPassword: e.target.value })}
                      placeholder="Minimum 8 characters"
                      disabled={isCreating}
                      autoComplete="new-password"
                    />
                    <p className="text-xs text-muted-foreground">
                      This is a temporary password. The user will be required to change it after logging in.
                    </p>
                  </div>

                  {/* Business Dropdown */}
                  <div className="space-y-2">
                    <Label htmlFor="create-client-id" className="text-foreground">
                      Business <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={createFormData.clientId}
                      onValueChange={(value) => setCreateFormData({ ...createFormData, clientId: value })}
                      disabled={isCreating || isLoadingClients}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isLoadingClients ? "Loading businesses..." : "Select a business"} />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.length === 0 ? (
                          <div className="px-2 py-3 text-sm text-muted-foreground text-center">
                            No businesses available
                          </div>
                        ) : (
                          clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.business_name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Select the business this user will be linked to
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeCreateModal}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating || isLoadingClients}>
                  {isCreating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Create User
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={!!editUser} onOpenChange={(open) => !open && closeEditModal()}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and permissions
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="space-y-4 py-4">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive font-medium">{error}</p>
                </div>
              )}

              {/* Display Name */}
              <div className="space-y-2">
                <Label htmlFor="edit-display-name">Display Name</Label>
                <Input
                  id="edit-display-name"
                  value={editFormData.display_name}
                  onChange={(e) => setEditFormData({ ...editFormData, display_name: e.target.value })}
                  placeholder="John Doe"
                  disabled={isEditing}
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  disabled={isEditing}
                />
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  value={editFormData.role}
                  onValueChange={(value) => setEditFormData({ ...editFormData, role: value })}
                  disabled={isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={closeEditModal}
                disabled={isEditing}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isEditing}>
                {isEditing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={!!deleteUserId} onOpenChange={(open) => !open && setDeleteUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this user?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
