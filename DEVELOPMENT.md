# Development Guide

This document provides guidance for developers working on the CashMarket KE platform.

## Quick Reference

### Test Credentials

After running `npm run seed`, use these credentials:

**Admin:**
- Email: `admin@cashmarket.ke`
- Password: `admin123`

**Oracle:**
- Email: `oracle@cashmarket.ke`
- Password: `oracle123`

**Regular Users:**
- Email: `john@test.com` / Password: `user123` (KES 10,000, KYC verified)
- Email: `jane@test.com` / Password: `user123` (KES 15,000, KYC verified)
- Email: `bob@test.com` / Password: `user123` (KES 5,000, KYC unverified)

### Common Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run seed         # Seed database with test data
```

## Architecture Overview

### Frontend (Next.js App Router)

```
app/
├── api/              # Backend API routes
│   ├── auth/         # NextAuth authentication
│   ├── markets/      # Market endpoints
│   ├── trades/       # Trading endpoints
│   ├── user/         # User account endpoints
│   └── admin/        # Admin endpoints
├── markets/          # Markets listing page (API-connected)
├── portfolio/        # User portfolio page (API-connected)
└── admin/            # Admin dashboard
```

### Data Flow

1. **Authentication**: NextAuth.js → Session → useAuth hook
2. **Markets**: API → useMarkets hook → MarketCard components
3. **Trading**: BuyModal → calculateStake → executeTrade → API
4. **Portfolio**: API → useUserBalance hook → Portfolio page

### Key Components

#### AuthContext
Wraps NextAuth's `useSession` for easier consumption:

```typescript
const { isLoggedIn, user, status, login, logout } = useAuth();
```

#### useMarkets Hook
Fetches markets from the API:

```typescript
const { markets, loading, error } = useMarkets({ 
  status: 'active',
  category: 'Economy' 
});
```

#### useUserBalance Hook
Fetches user balance and portfolio:

```typescript
const { data, loading, error, refetch } = useUserBalance();
// data: { balance, total_invested, active_positions, total_shares }
```

#### BuyModal
Trading interface with real-time calculations:
- Fetches stake preview from `/api/stake`
- Executes trades via `/api/trades`
- Shows shares, fees, ROI, and potential payout

## API Integration

### Making API Calls

Use the API client in `lib/api/client.ts`:

```typescript
import { getMarkets, executeTrade, calculateStake } from '@/lib/api/client';

// Fetch markets
const { markets } = await getMarkets({ status: 'active' });

// Calculate trade preview
const preview = await calculateStake({
  market_id: 1,
  outcome: 'YES',
  stake: 1000
});

// Execute trade
const result = await executeTrade({
  market_id: 1,
  outcome: 'YES',
  stake: 1000
});
```

### Protected Routes

For admin-only pages:

```typescript
const { isLoggedIn, user, status } = useAuth();

useEffect(() => {
  if (status !== 'loading' && (!isLoggedIn || user?.role !== 'admin')) {
    router.push('/');
  }
}, [isLoggedIn, user, status, router]);
```

## Database Schema

The platform uses SQLite with the following key tables:

- `users` - User accounts and balances
- `admin_users` - Admin/moderator/oracle accounts
- `markets` - Prediction markets
- `trades` - Individual trades
- `user_positions` - Aggregated positions per market
- `transactions` - Financial transactions
- `sessions` - User sessions (with device tracking)
- `audit_logs` - Admin action logs

## LMSR Pricing

The platform uses Logarithmic Market Scoring Rule (LMSR) for automated market making:

```typescript
import { calculateLMSRPrice, calculateLMSRCost } from '@/lib/lmsr';

// Get current market price
const yesPrice = calculateLMSRPrice(q_yes, q_no, b);

// Calculate cost for buying shares
const cost = calculateLMSRCost(q_yes_before, q_yes_after, q_no, b);
```

**Key Parameters:**
- `b` (liquidity parameter): Controls price sensitivity (default: 20,000 KES)
- `q_yes`, `q_no`: Quantity of YES/NO shares outstanding
- Higher `b` = more stable prices, less volatility

## Security Features

### Authentication
- NextAuth.js with credential provider
- bcrypt password hashing (10 rounds)
- Session-based authentication with JWT

### Rate Limiting
- 5 failed login attempts → 30-minute lockout
- Tracked by email and IP address

### Authorization
- Role-based access control (admin, oracle, moderator, user)
- Protected API endpoints with `requireAuth` middleware
- Protected admin routes with role checking

### Audit Trail
- All admin actions logged to `audit_logs` table
- Includes action type, user, IP, timestamp, and metadata

### OTP/2FA
- Required for deposits and withdrawals
- Currently simulated (logs to console)
- Ready for SMS integration via Daraja API

### KYC
- Required for withdrawals
- Status tracked per user
- Admin approval workflow available via API

## Testing

### Manual Testing

1. Start the dev server: `npm run dev`
2. Seed the database: `npm run seed`
3. Login with test credentials
4. Test trading flow:
   - Browse markets
   - Click "Buy YES" or "Buy NO"
   - Enter stake amount
   - Review preview (shares, fees, ROI)
   - Confirm trade
   - Check updated balance in portfolio

### API Testing

Use curl or tools like Postman:

```bash
# Get markets
curl http://localhost:3000/api/markets

# Calculate stake (no auth required)
curl -X POST http://localhost:3000/api/stake \
  -H "Content-Type: application/json" \
  -d '{"market_id": 1, "outcome": "YES", "stake": 1000}'
```

For authenticated endpoints, login via browser first and use session cookies.

## Future Enhancements

### Pending Implementation

1. **Admin UI Pages**
   - Market creation/management forms
   - User management and KYC approval interface
   - Liquidity pool dashboard
   - Audit logs viewer with filtering

2. **User Features**
   - Deposit/withdrawal UI with OTP flow
   - Transaction history view
   - Position detail pages
   - Market search and advanced filters

3. **Testing**
   - Integration tests for frontend-backend
   - API endpoint tests
   - E2E tests for critical flows

4. **Production Readiness**
   - Daraja API integration for real M-Pesa
   - SMS gateway for OTP delivery
   - PostgreSQL migration
   - Redis for session storage
   - CDN setup for static assets

## Contributing

1. Create a feature branch
2. Make minimal, focused changes
3. Test thoroughly (manual + automated)
4. Run linter: `npm run lint`
5. Build: `npm run build`
6. Commit with descriptive messages
7. Push and create PR

## Troubleshooting

### Build Errors

**TypeScript errors:**
- Check type definitions in `lib/types.ts`
- Ensure API responses match interface definitions

**Module not found:**
- Run `npm install`
- Check import paths use `@/` alias

### Runtime Errors

**Authentication fails:**
- Check database has seeded users
- Verify NextAuth configuration
- Check session cookies

**API returns 401:**
- User not authenticated
- Login and retry

**API returns 403:**
- User lacks required role (e.g., not admin)
- Check user role in database

### Database Issues

**Database not found:**
- Run `npm run seed` to create and populate database

**Stale data:**
- Delete `data/cashmarket.db`
- Run `npm run seed` again

## Support

For questions or issues:
1. Check this guide and README.md
2. Review API_DOCUMENTATION.md
3. Check existing code examples in the codebase
4. Create an issue in the repository
