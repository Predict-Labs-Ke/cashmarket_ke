# CashMarket KE - Frontend-Only Application

This application has been converted to a **frontend-only** implementation, removing all backend dependencies and using mock data for demonstration purposes.

## Overview

The app now runs entirely in the browser with no backend server required. All API calls return simulated data, and authentication is handled via localStorage.

## Features

### ✅ Working Features

1. **Onboarding Flow**
   - Swipeable carousel with 3 informative slides
   - Displays on first visit only
   - Can be dismissed or reopened via "View Tutorial" button

2. **Authentication**
   - Mock login accepts any email/password
   - Session persists in localStorage
   - Logout functionality clears session

3. **Markets**
   - 8 sample prediction markets
   - Category filtering (Economy, Politics, Tech, Sports, etc.)
   - Status filtering (All, Active, Resolved)
   - Search functionality
   - Market detail pages

4. **Portfolio**
   - Mock balance display
   - Portfolio value tracking
   - Transaction history

## Mock Data

All data is defined in `lib/data/mockData.ts`:

- **Markets**: 8 realistic Kenyan prediction markets
- **User**: Demo user with balance and portfolio
- **Transactions**: Sample transaction history
- **Trades**: Recent trades for market pages

## Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

This app can be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Connect repository and deploy
- **GitHub Pages**: Build and deploy to `gh-pages` branch

## Architecture

### Authentication (`contexts/AuthContext.tsx`)
- localStorage-based session management
- No external authentication service required
- Simple mock login/logout

### API Client (`lib/api/client.ts`)
- All functions return mock data
- Simulated network delays (300-500ms)
- Type-safe responses

### Mock Data (`lib/data/mockData.ts`)
- Centralized data source
- Easy to modify and extend
- Realistic sample data

## Removed Components

The following backend components were removed:

- API routes (`app/api/*`)
- Database files (`lib/db/*`)
- Security modules (`lib/security/*`)
- Middleware (`lib/middleware/*`)
- Seed scripts (`scripts/*`)
- Backend dependencies (next-auth, bcrypt, better-sqlite3)

## Converting Back to Full-Stack

To add a real backend later:

1. Implement real API routes in `app/api/`
2. Update `lib/api/client.ts` to make real HTTP requests
3. Replace mock AuthContext with real authentication (e.g., NextAuth.js)
4. Add database integration
5. Update dependencies in `package.json`

## Notes

- All transactions are simulated
- No real money is involved
- Data resets on page reload (except auth session)
- Perfect for demos, testing, and development

## Support

For questions or issues, please refer to the main README or create an issue in the repository.
