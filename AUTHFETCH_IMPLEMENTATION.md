# authFetch Implementation Guide

## Overview

We've added a secure authentication helper called `authFetch` to all admin pages. This helper automatically attaches the Supabase JWT token to all API requests, ensuring secure communication with the backend.

## What Was Added

### 1. **Supabase Client Initialization**
All admin pages now include:
```html
<!-- Supabase JS CDN -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Initialize Supabase Client -->
<script>
  const { createClient } = window.supabase;
  const SUPABASE_URL = 'https://lmvymcncmmxtgfhkosmc.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_yeiYWuyhjZBBoSPcFRRKow__58efMlK';
  
  window.supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
</script>
```

### 2. **authFetch Helper Function**
```javascript
async function authFetch(path, options = {}) {
  const supabase = window.supabaseClient;
  if (!supabase) {
    console.error('Supabase client not found');
    throw new Error('Supabase not initialized');
  }

  // Get current session
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting session', error);
    throw error;
  }

  const session = data.session;
  if (!session) {
    // Not logged in → bounce them to login page
    window.location.href = '/admin/login';
    throw new Error('Not authenticated');
  }

  const token = session.access_token;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  return fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
}

// Expose globally so admin pages / custom code can call it
window.authFetch = authFetch;
```

## How to Use authFetch

### Example 1: Get All Clients
```javascript
const res = await window.authFetch('/api/clients');
const json = await res.json();
console.log(json.clients);
```

### Example 2: Get Leads for a Client
```javascript
const clientId = 'moiz-test';
const resLeads = await window.authFetch(`/api/leads?clientId=${clientId}`);
const { leads } = await resLeads.json();
console.log(leads);
```

### Example 3: Get Reviews for a Client
```javascript
const clientId = 'moiz-test';
const resReviews = await window.authFetch(`/api/reviews?clientId=${clientId}`);
const { reviews } = await resReviews.json();
console.log(reviews);
```

### Example 4: Update a Client
```javascript
await window.authFetch('/api/clients', {
  method: 'PUT',
  body: JSON.stringify({
    id: 'moiz-test',
    forwarding_phone: '+15195551234',
    custom_sms_template: 'Hey {name}, this is {business}, reply to confirm!',
  }),
});
```

### Example 5: Create a New Client
```javascript
await window.authFetch('/api/clients', {
  method: 'POST',
  body: JSON.stringify({
    id: 'new-client-slug',
    business_name: 'New Client Business',
    owner_name: 'John Doe',
    primary_phone: '+15195551234',
    email: 'john@example.com',
  }),
});
```

## Updated Pages

All admin pages now include the authFetch helper:

1. ✅ `/admin/login.astro` - Login page (initializes Supabase client + authFetch)
2. ✅ `/admin/index.astro` - Dashboard
3. ✅ `/admin/clients.astro` - Clients management
4. ✅ `/admin/leads.astro` - Leads management (uses authFetch in loadLeadsForClient function)
5. ✅ `/admin/reviews.astro` - Reviews management
6. ✅ `/admin/settings.astro` - Settings page

## Backend Routes That Require JWT

These routes now require the `Authorization: Bearer <token>` header:

### Protected Routes (Require JWT):
- `GET /api/clients` - List all clients
- `POST /api/clients` - Create a new client
- `PUT /api/clients` - Update a client
- `PATCH /api/clients` - Partial update a client
- `DELETE /api/clients` - Delete a client
- `GET /api/leads?clientId=<id>` - Get leads for a client
- `GET /api/reviews?clientId=<id>` - Get reviews for a client

### Public Routes (No JWT Required):
- `POST /api/leads` - Submit a new lead (for website forms)
- `POST /api/reviews` - Submit a new review (for customers)

## Important Notes

### DO NOT:
❌ Use regular `fetch()` for protected admin endpoints
```javascript
// ❌ WRONG - Missing authentication
fetch('https://sitrixx-website-backend.vercel.app/api/clients')
```

### DO:
✅ Use `window.authFetch()` for all admin API calls
```javascript
// ✅ CORRECT - Includes JWT token
window.authFetch('/api/clients')
```

## Authentication Flow

1. User logs in via `/admin/login`
2. Supabase creates a session and returns a JWT token
3. Token is stored in `localStorage` as `sitrixx_token`
4. Every admin page initializes the Supabase client
5. `authFetch` automatically:
   - Gets the current session from Supabase
   - Extracts the JWT token
   - Adds it to the `Authorization` header
   - Makes the API request
6. If no session exists, user is redirected to login

## Security Benefits

1. ✅ **Automatic Token Management**: No need to manually handle tokens
2. ✅ **Session Validation**: Checks if user is logged in before every request
3. ✅ **Auto-Redirect**: Redirects to login if session expires
4. ✅ **Consistent Headers**: All admin requests include proper authentication
5. ✅ **Backend Protection**: Backend verifies JWT before processing requests

## Example: Updated Leads Page

The leads page now uses `authFetch`:

```javascript
// OLD - No authentication
const res = await fetch(`${API_BASE}/api/leads?clientId=${clientId}`);

// NEW - With authentication
const res = await window.authFetch(`/api/leads?clientId=${encodeURIComponent(clientId)}`);
```

## Testing

To test if authFetch is working:

1. Log in to the admin dashboard
2. Open browser DevTools → Network tab
3. Navigate to the Leads page
4. Select a client from the dropdown
5. Check the Network request to `/api/leads`
6. Verify the request includes: `Authorization: Bearer eyJhbGc...`

## Troubleshooting

### Error: "Supabase not initialized"
- Make sure the Supabase CDN script is loaded before authFetch is called
- Check that `window.supabaseClient` exists

### Error: "Not authenticated"
- User session has expired
- User will be automatically redirected to `/admin/login`

### 401 Unauthorized from backend
- JWT token is invalid or expired
- Backend is not properly validating the token
- Check backend logs for JWT verification errors

## Next Steps

When creating new admin pages or updating existing ones:

1. Include the Supabase CDN script
2. Initialize the Supabase client
3. Include the authFetch helper
4. Replace all `fetch()` calls to protected endpoints with `window.authFetch()`
5. Keep public endpoints (like lead/review submission forms) using regular `fetch()`
