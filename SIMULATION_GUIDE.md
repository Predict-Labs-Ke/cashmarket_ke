# Simulation Mode Guide

## Overview

CashMarket KE includes a comprehensive simulation mode for testing all features before launch. All data, transactions, and payments are **completely simulated** - no real money is involved.

## Quick Start

### 1. Setup

```bash
# Install dependencies
npm install

# Initialize simulation database with demo markets
npm run seed

# Start development server
npm run dev
```

Visit `http://localhost:3000` - you'll see a yellow simulation banner at the top.

### 2. Create Your Test Accounts

**Admin Access (Pre-created):**
- Email: `admin@cashmarket.ke`
- Password: `admin123`

**Create Your Own User Accounts:**
1. Click "Sign Up" on the homepage
2. Enter your test details (use fake data)
3. Create multiple accounts to test different scenarios

### 3. Testing Workflow

#### A. User Registration & Login
- ✅ Sign up with your own test credentials
- ✅ Log in/out functionality
- ✅ Test password requirements

#### B. Deposits (Simulated M-Pesa)
- ✅ Request deposit
- ✅ Enter amount
- ✅ OTP will show in console logs (use `123456`)
- ✅ Balance updates instantly

#### C. Trading
- ✅ Browse markets
- ✅ Calculate potential returns
- ✅ Execute trades (YES/NO)
- ✅ See LMSR price adjustments
- ✅ View your positions

#### D. Withdrawals (Simulated)
- ✅ Request withdrawal
- ✅ OTP verification (use `654321`)
- ✅ KYC status check (you can test both verified/unverified states)
- ✅ Balance deduction with fees

#### E. Admin Functions
- ✅ Log in as admin
- ✅ Create new markets
- ✅ Resolve markets
- ✅ View audit logs
- ✅ Manage liquidity pool

### 4. Simulation Features

**What's Simulated:**
- 💰 All payments (deposits/withdrawals)
- 📱 SMS OTP codes (shown in console)
- 💳 M-Pesa integration (no Daraja API)
- 🎭 All market data
- 👥 User accounts you create

**What Works (Real Functionality):**
- ✅ User registration and authentication
- ✅ Password hashing (bcrypt)
- ✅ Database persistence (SQLite)
- ✅ LMSR price calculations
- ✅ Trade execution
- ✅ Position tracking
- ✅ Admin controls
- ✅ Audit logging

## Reset Simulation Data

To start fresh testing:

```bash
npm run reset-simulation
```

This will:
- ❌ Delete all user accounts (except admins)
- ❌ Clear all trades and positions
- ❌ Remove all transactions
- ✅ Keep demo markets
- ✅ Preserve admin accounts
- ✅ Reset liquidity pool

## Environment Configuration

### Development (Default)
File: `.env.local`
```env
NEXT_PUBLIC_SIMULATION_MODE=true
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=development-secret-key
```

### Production
File: `.env.production`
```env
NEXT_PUBLIC_SIMULATION_MODE=false
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secure-secret-key
# Add real M-Pesa credentials
# Add real SMS provider credentials
```

## Simulation Indicators

### Visual Indicators
- 🟡 Yellow banner at top: "SIMULATION MODE"
- 🧪 "DEMO MODE" badge visible
- ⚠️ Warnings on financial transactions

### API Responses
All API responses include:
```json
{
  "data": {...},
  "_simulation": true,
  "_data_source": "SIMULATED"
}
```

## Testing Scenarios

### Scenario 1: New User Journey
1. Sign up for an account
2. Deposit KES 10,000 (use OTP: 123456)
3. Browse markets
4. Buy YES shares on a market
5. Check portfolio
6. Try to withdraw (test KYC requirement)

### Scenario 2: Trading & Pricing
1. Login as first user
2. Buy YES shares (e.g., KES 2,000)
3. Note the new price
4. Login as second user
5. Buy NO shares (e.g., KES 2,000)
6. See how LMSR adjusts prices

### Scenario 3: Admin Operations
1. Login as admin
2. Create a new market
3. Users trade on it
4. Admin resolves market
5. Check payouts distributed correctly

### Scenario 4: KYC Flow
1. Create user without KYC
2. Try to withdraw (should fail)
3. Submit KYC document URL
4. Admin approves KYC
5. Retry withdrawal (should succeed)

## Testing Checklist

Before considering the app ready:

**User Features:**
- [ ] Sign up / Sign in / Sign out
- [ ] Deposit with OTP
- [ ] View markets list
- [ ] View market details with LMSR prices
- [ ] Execute trades (YES/NO)
- [ ] View portfolio and positions
- [ ] Withdraw with KYC + OTP
- [ ] Submit KYC documents

**Admin Features:**
- [ ] Admin login
- [ ] Create market
- [ ] Pause/resume trading
- [ ] Resolve market
- [ ] View audit logs
- [ ] Manage liquidity pool
- [ ] Update fees

**Edge Cases:**
- [ ] Insufficient balance for trade
- [ ] Withdraw without KYC
- [ ] Invalid OTP code
- [ ] Market already resolved
- [ ] Trading while paused

## OTP Codes for Testing

Since SMS is simulated, use these codes:

| Action | OTP Code |
|--------|----------|
| Deposit | `123456` |
| Withdrawal | `654321` |
| Login (2FA) | `111111` |

**Note:** In simulation mode, OTP codes are also logged to the console for your reference.

## Troubleshooting

### Database Issues
```bash
# Check if database exists
ls -la data/

# Reset everything
rm -rf data/
npm run seed
```

### OTP Not Working
- Check browser console for OTP code
- Check server console (terminal) for logs
- Use the standard codes: 123456 for deposit, 654321 for withdrawal

### Can't Login
- Verify you used the exact email/password you created
- Try admin account: admin@cashmarket.ke / admin123
- Check browser console for errors

### Prices Not Updating
- Ensure you're in simulation mode (check banner)
- Hard refresh the page (Ctrl+Shift+R)
- Check API responses include `_simulation: true`

## Switching to Production

When ready to launch:

1. **Disable Simulation Mode**
   ```env
   NEXT_PUBLIC_SIMULATION_MODE=false
   ```

2. **Integrate Real Services**
   - M-Pesa Daraja API
   - SMS provider (Africa's Talking, Twilio)
   - Production database (PostgreSQL recommended)

3. **Clear Simulation Data**
   ```bash
   npm run reset-simulation
   # Or delete data/ folder entirely
   ```

4. **Update Configuration**
   - Set production NEXTAUTH_SECRET
   - Configure real payment credentials
   - Set up production database
   - Enable HTTPS

5. **Remove Simulation Code** (Optional)
   - Keep for staging environment
   - Or remove `lib/data/simulation.ts`
   - Remove SimulationBanner component

## Support

For issues or questions during testing:
- Check console logs (browser + server)
- Review API_DOCUMENTATION.md for endpoint details
- Check TESTING_GUIDE.md for API testing
- Verify .env.local configuration

## Security Notes

⚠️ **Simulation Mode Security:**
- Passwords are still hashed with bcrypt
- Session tokens are real
- Rate limiting is active
- All security features work normally
- The only difference: no real money involved

⚠️ **Production Checklist:**
- [ ] SIMULATION_MODE disabled
- [ ] Strong NEXTAUTH_SECRET set
- [ ] Real payment gateway configured
- [ ] HTTPS enabled
- [ ] Database backed up
- [ ] Error monitoring enabled
- [ ] Rate limiting tuned for production
- [ ] Admin accounts secured
