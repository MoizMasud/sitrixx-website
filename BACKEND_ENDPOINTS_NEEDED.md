# Backend Endpoints Needed

Your frontend expects these API endpoints to exist on your backend at `https://sitrixx-website-backend.vercel.app`:

## 1. `/api/leads` (GET)
Query parameter: `?clientId=<uuid>`

**Expected Response:**
```json
{
  "ok": true,
  "leads": [
    {
      "id": "uuid",
      "name": "John Doe",
      "phone": "+1234567890",
      "email": "john@example.com",
      "message": "I'm interested in your services",
      "source": "website_form", // or "missed_call"
      "created_at": "2025-01-01T12:00:00Z"
    }
  ]
}
```

**Database Table Structure Needed:**
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT,
  phone TEXT,
  email TEXT,
  message TEXT,
  source TEXT CHECK (source IN ('website_form', 'missed_call')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 2. `/api/reviews` (GET)
Query parameter: `?clientId=<uuid>`

**Expected Response:**
```json
{
  "ok": true,
  "reviews": [
    {
      "id": "uuid",
      "customer_name": "Jane Smith",
      "customer_phone": "+1234567890",
      "rating": 5,
      "feedback": "Excellent service!",
      "created_at": "2025-01-01T12:00:00Z"
    }
  ]
}
```

**Database Table Structure Needed:**
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  customer_name TEXT,
  customer_phone TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 3. Endpoint Implementation Example

Create these files in your backend:

### `api/leads.ts`
```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from '../supabaseAdmin';
import { applyCors } from './_cors';

async function requireAuth(req: VercelRequest, res: VercelResponse): Promise<string | null> {
  const token = req.headers.authorization?.replace('Bearer ', '').trim();
  if (!token) {
    res.status(401).json({ ok: false, error: 'Missing auth header' });
    return null;
  }

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) {
    res.status(401).json({ ok: false, error: 'Invalid token' });
    return null;
  }

  return user.id;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;

  try {
    const userId = await requireAuth(req, res);
    if (!userId) return;

    if (req.method === 'GET') {
      const clientId = req.query.clientId as string;
      
      if (!clientId) {
        return res.status(400).json({ ok: false, error: 'clientId required' });
      }

      const { data: leads, error } = await supabaseAdmin
        .from('leads')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error);
        return res.status(500).json({ ok: false, error: 'Failed to fetch leads' });
      }

      return res.status(200).json({ ok: true, leads: leads || [] });
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (err: any) {
    console.error('leads error:', err);
    return res.status(500).json({ ok: false, error: err?.message || 'Internal server error' });
  }
}
```

### `api/reviews.ts`
```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from '../supabaseAdmin';
import { applyCors } from './_cors';

async function requireAuth(req: VercelRequest, res: VercelResponse): Promise<string | null> {
  const token = req.headers.authorization?.replace('Bearer ', '').trim();
  if (!token) {
    res.status(401).json({ ok: false, error: 'Missing auth header' });
    return null;
  }

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) {
    res.status(401).json({ ok: false, error: 'Invalid token' });
    return null;
  }

  return user.id;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;

  try {
    const userId = await requireAuth(req, res);
    if (!userId) return;

    if (req.method === 'GET') {
      const clientId = req.query.clientId as string;
      
      if (!clientId) {
        return res.status(400).json({ ok: false, error: 'clientId required' });
      }

      const { data: reviews, error } = await supabaseAdmin
        .from('reviews')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({ ok: false, error: 'Failed to fetch reviews' });
      }

      return res.status(200).json({ ok: true, reviews: reviews || [] });
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (err: any) {
    console.error('reviews error:', err);
    return res.status(500).json({ ok: false, error: err?.message || 'Internal server error' });
  }
}
```

## Summary

You need to:
1. ✅ Create the `leads` and `reviews` tables in Supabase
2. ✅ Create `/api/leads.ts` endpoint in your backend
3. ✅ Create `/api/reviews.ts` endpoint in your backend
4. Both endpoints should accept a `clientId` query parameter
5. Both endpoints should require authentication (Bearer token)

Once these are created, the dashboard, leads, and reviews pages will work properly!
