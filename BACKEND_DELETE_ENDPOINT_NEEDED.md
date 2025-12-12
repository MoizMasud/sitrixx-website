# Backend DELETE Endpoint Required

The ClientsPage now has full CRUD functionality including a Delete feature. However, the backend API (`/api/clients.ts`) is missing the DELETE endpoint.

## Required Backend Addition

Add this to your `/api/clients.ts` file (or equivalent backend location):

```typescript
// -------------------------
// DELETE /api/clients/:id
// -------------------------
if (req.method === 'DELETE') {
  try {
    // Extract client ID from URL path or query params
    const clientId = req.query.id || req.url?.split('/').pop();

    if (!clientId) {
      return res.status(400).json({
        ok: false,
        error: 'Client ID is required for deletion',
      });
    }

    const { error } = await supabaseAdmin
      .from('clients')
      .delete()
      .eq('id', clientId);

    if (error) {
      console.error('Error deleting client:', error);
      return res
        .status(500)
        .json({ ok: false, error: 'Failed to delete client' });
    }

    return res.status(200).json({ ok: true, message: 'Client deleted successfully' });
  } catch (err) {
    console.error('Unexpected error deleting client:', err);
    return res
      .status(500)
      .json({ ok: false, error: 'Unexpected server error' });
  }
}
```

## Update the Allow Header

Change this line:
```typescript
res.setHeader('Allow', 'GET, POST, PUT, PATCH');
```

To:
```typescript
res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE');
```

## Frontend Implementation

The frontend is already configured to call:
```typescript
DELETE /api/clients/:client_id
```

Once you add the backend endpoint, the delete functionality will work automatically.

## Alternative: Use DELETE with body

If you prefer to pass the ID in the request body instead of the URL:

```typescript
if (req.method === 'DELETE') {
  try {
    const { id } = req.body || {};

    if (!id) {
      return res.status(400).json({
        ok: false,
        error: 'Client ID is required for deletion',
      });
    }

    const { error } = await supabaseAdmin
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting client:', error);
      return res
        .status(500)
        .json({ ok: false, error: 'Failed to delete client' });
    }

    return res.status(200).json({ ok: true, message: 'Client deleted successfully' });
  } catch (err) {
    console.error('Unexpected error deleting client:', err);
    return res
      .status(500)
      .json({ ok: false, error: 'Unexpected server error' });
  }
}
```

And update the frontend call to:
```typescript
const res = await (window as any).authFetch('/api/clients', {
  method: 'DELETE',
  body: JSON.stringify({ id: selectedClient.id }),
});
```
