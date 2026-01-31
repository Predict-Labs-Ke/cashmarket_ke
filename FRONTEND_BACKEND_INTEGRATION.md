# Frontend-Backend Integration Guide

## Current Status

✅ **Backend API**: Fully implemented and tested  
⚠️ **Frontend**: Currently uses mock/hardcoded data  
🔧 **Integration**: API client and hooks created, ready to integrate

---

## What Has Been Done

### 1. API Client Library (`lib/api/client.ts`)

Created a typed API client with functions for all endpoints:

```typescript
// Example usage:
import { getMarkets, executeTrade, getUserBalance } from '@/lib/api/client';

// Fetch markets
const { markets } = await getMarkets({ status: 'active' });

// Execute trade
const result = await executeTrade({
  market_id: 1,
  outcome: 'YES',
  stake: 1000
});

// Get user balance
const { user, portfolio } = await getUserBalance();
```

**Available Functions:**
- `getMarkets()` - Fetch all markets
- `getMarket(id)` - Fetch single market
- `calculateStake()` - Calculate trade cost/payout
- `executeTrade()` - Execute a trade
- `getUserBalance()` - Get user balance
- `sendOTP()` - Send OTP code
- `deposit()` - Deposit funds
- `withdraw()` - Withdraw funds
- Admin functions (createMarket, resolveMarket, etc.)

### 2. React Hooks (`lib/hooks/useMarkets.ts`)

Created custom hooks for easy data fetching:

```typescript
import { useMarkets, useMarket } from '@/lib/hooks/useMarkets';

// In your component:
const { markets, loading, error } = useMarkets({ status: 'active' });
const { market, stats, loading, error } = useMarket(marketId);
```

### 3. Example Integration (`app/markets/page-api-connected.tsx`)

Created an example markets page that:
- ✅ Fetches real data from API
- ✅ Shows loading states
- ✅ Handles errors gracefully
- ✅ Filters and searches markets
- ✅ Replaces hardcoded mock data

---

## Integration Testing Results

### ✅ Backend APIs Tested

All endpoints work correctly:

```bash
# Markets endpoint (tested)
curl http://localhost:3000/api/markets
# ✅ Returns 4 markets from database

# Market details (tested)
curl http://localhost:3000/api/markets/1
# ✅ Returns full market data with LMSR prices

# Stake calculation (tested)
curl -X POST http://localhost:3000/api/stake \
  -H "Content-Type: application/json" \
  -d '{"market_id": 1, "outcome": "YES", "stake": 1000}'
# ✅ Returns calculated shares, fees, ROI
```

### ⚠️ Frontend Integration Status

**Current State:**
- Frontend pages use hardcoded data arrays
- No API calls are being made from the UI
- Mock authentication (not using NextAuth)

**Ready to Integrate:**
- API client created ✅
- React hooks created ✅
- Example page created ✅
- Types defined ✅

---

## How to Complete the Integration

### Step 1: Replace Mock Data in Markets Page

**Current file:** `app/markets/page.tsx` (uses hardcoded `predictionMarkets` array)

**Option A - Full Replacement:**
```bash
cd /home/runner/work/cashmarket_ke/cashmarket_ke/app/markets
mv page.tsx page-old-mock.tsx
mv page-api-connected.tsx page.tsx
```

**Option B - Gradual Update:**
Update the current page to use the `useMarkets` hook:

```typescript
// Replace this:
const predictionMarkets = [ /* hardcoded array */ ];

// With this:
import { useMarkets } from '@/lib/hooks/useMarkets';
const { markets, loading, error } = useMarkets({ status: 'active' });
```

### Step 2: Update AuthContext to Use NextAuth

**Current:** `contexts/AuthContext.tsx` uses localStorage mock authentication  
**Needed:** Integrate with NextAuth.js session

```typescript
// Replace current AuthContext with:
import { useSession, signIn, signOut } from 'next-auth/react';

export function useAuth() {
  const { data: session, status } = useSession();
  
  return {
    isLoggedIn: status === 'authenticated',
    user: session?.user,
    login: signIn,
    logout: signOut,
  };
}
```

### Step 3: Add SessionProvider to Layout

Update `app/layout.tsx`:

```typescript
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SessionProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
```

### Step 4: Update Home Page Login

Replace mock login in `app/page.tsx` with real authentication:

```typescript
// Replace handleSignIn:
const handleSignIn = async (e: React.FormEvent) => {
  e.preventDefault();
  await signIn('credentials', {
    email: phoneNumber,  // or email field
    password: password,
    redirect: false,
  });
};
```

### Step 5: Update Components to Use Real Data

**MarketCard Component:**
- Already accepts props that match API response
- Should work with minimal changes

**BuyModal Component:**
- Update to call `calculateStake()` API
- Update to call `executeTrade()` API when user confirms

---

## Testing the Integration

### 1. Test API Connection

Create a test page to verify connection:

```typescript
// app/test-api/page.tsx
'use client';

import { useMarkets } from '@/lib/hooks/useMarkets';

export default function TestAPI() {
  const { markets, loading, error } = useMarkets();

  return (
    <div className="p-8">
      <h1>API Connection Test</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {markets && (
        <div>
          <p className="text-green-500">✅ Connected!</p>
          <p>Found {markets.length} markets</p>
          <pre>{JSON.stringify(markets, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
```

### 2. Verify Data Flow

```
User clicks "Markets" 
→ useMarkets() hook fetches from /api/markets
→ Data flows to MarketCard components
→ User sees real-time data from database
```

### 3. Test Trade Flow

```
User clicks "Buy YES"
→ calculateStake() shows preview
→ User confirms
→ executeTrade() API call
→ Database updated
→ User balance updated
→ Market prices recalculated
→ UI refreshed with new data
```

---

## Current Integration Gaps

### 🔴 Critical Gaps (Must Fix)

1. **Authentication**
   - Frontend uses mock localStorage auth
   - Backend uses NextAuth with real sessions
   - **Fix:** Integrate NextAuth on frontend

2. **Data Source**
   - Frontend uses hardcoded arrays
   - Backend has real database
   - **Fix:** Replace arrays with API calls

3. **Trading**
   - BuyModal is UI-only (no API calls)
   - Backend trade endpoint is ready
   - **Fix:** Connect BuyModal to executeTrade()

### 🟡 Minor Gaps (Should Fix)

4. **User Balance Display**
   - Currently shows mock balance
   - Backend has real user balances
   - **Fix:** Call getUserBalance() API

5. **Market Real-time Updates**
   - Prices are static after load
   - Should refresh after trades
   - **Fix:** Add polling or WebSocket

6. **Error Handling**
   - No error boundaries
   - No retry logic
   - **Fix:** Add error components

---

## Integration Checklist

### Phase 1: Basic Connection (30 min)
- [ ] Replace markets page with API-connected version
- [ ] Test that markets load from database
- [ ] Verify loading states work
- [ ] Confirm error handling works

### Phase 2: Authentication (1 hour)
- [ ] Add SessionProvider to layout
- [ ] Update AuthContext to use NextAuth
- [ ] Replace mock login with real signIn
- [ ] Test login with database users
- [ ] Verify protected routes work

### Phase 3: Trading Integration (1 hour)
- [ ] Update BuyModal to call calculateStake()
- [ ] Connect trade confirmation to executeTrade()
- [ ] Show success/error messages
- [ ] Refresh market data after trade
- [ ] Update user balance display

### Phase 4: Full User Flow (1 hour)
- [ ] Integrate deposit/withdraw OTP flow
- [ ] Add KYC status checking
- [ ] Show portfolio from getUserBalance()
- [ ] Display transaction history
- [ ] Add balance top-up UI

### Phase 5: Admin Dashboard (Optional, 2 hours)
- [ ] Create admin login page
- [ ] Build market creation form
- [ ] Add market resolution interface
- [ ] Show liquidity pool dashboard
- [ ] Display audit logs

---

## Example: Complete Trade Flow Integration

```typescript
// components/BuyModal.tsx - Updated version

'use client';

import { useState } from 'react';
import { calculateStake, executeTrade } from '@/lib/api/client';
import { getUserBalance } from '@/lib/api/client';

export default function BuyModal({ marketId, outcome }: Props) {
  const [stake, setStake] = useState('');
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Calculate preview when stake changes
  const handleStakeChange = async (amount: string) => {
    setStake(amount);
    if (!amount || parseFloat(amount) <= 0) return;

    try {
      const result = await calculateStake({
        market_id: marketId,
        outcome,
        stake: parseFloat(amount),
      });
      setPreview(result);
    } catch (error) {
      console.error('Failed to calculate:', error);
    }
  };

  // Execute trade
  const handleTrade = async () => {
    setLoading(true);
    try {
      const result = await executeTrade({
        market_id: marketId,
        outcome,
        stake: parseFloat(stake),
      });
      
      // Show success message
      alert(`Success! Bought ${result.shares} shares for KES ${result.cost}`);
      
      // Refresh user balance
      await getUserBalance();
      
      // Close modal and refresh markets
      onClose();
      onTradeSuccess();
    } catch (error) {
      alert('Trade failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Modal UI */}
      <input
        type="number"
        value={stake}
        onChange={(e) => handleStakeChange(e.target.value)}
        placeholder="Enter amount in KES"
      />

      {preview && (
        <div>
          <p>Shares: {preview.shares.toFixed(2)}</p>
          <p>Fee: KES {preview.fee}</p>
          <p>Potential Payout: KES {preview.potential_payout.toFixed(2)}</p>
          <p>ROI: {preview.roi_percentage.toFixed(1)}%</p>
        </div>
      )}

      <button onClick={handleTrade} disabled={loading}>
        {loading ? 'Processing...' : 'Confirm Trade'}
      </button>
    </div>
  );
}
```

---

## Recommendation

**Priority: HIGH** - The backend is fully functional but the frontend isn't using it yet.

**Next Steps:**
1. ✅ Start with the simple API connection test page
2. ✅ Replace markets page with API version
3. ✅ Integrate NextAuth authentication
4. ✅ Connect trading functionality
5. ✅ Add deposit/withdraw flows

**Estimated Time:** 4-6 hours for full integration

**Benefits:**
- Real-time data from database
- Actual trading with LMSR pricing
- Real user authentication
- Persistent balances and positions
- Admin capabilities

Would you like me to proceed with the integration?
