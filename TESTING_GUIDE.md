# API Testing Guide

This guide provides step-by-step instructions for testing all CashMarket API endpoints.

## Prerequisites

1. Start the development server:
```bash
npm run seed  # Seed database with test data
npm run dev   # Start server on http://localhost:3000
```

2. The API endpoints are available at `http://localhost:3000/api/*`

---

## 1. Public Endpoints (No Authentication Required)

### Test Market Listing

```bash
# Get all markets
curl http://localhost:3000/api/markets

# Filter by status
curl "http://localhost:3000/api/markets?status=active"

# Filter by category
curl "http://localhost:3000/api/markets?category=Economy"
```

### Test Market Details

```bash
# Get specific market
curl http://localhost:3000/api/markets/1
```

### Test Stake Calculation

```bash
# Calculate cost for buying YES shares
curl -X POST http://localhost:3000/api/stake \
  -H "Content-Type: application/json" \
  -d '{
    "market_id": 1,
    "outcome": "YES",
    "stake": 1000
  }'

# Calculate cost for buying NO shares
curl -X POST http://localhost:3000/api/stake \
  -H "Content-Type: application/json" \
  -d '{
    "market_id": 1,
    "outcome": "NO",
    "stake": 2000
  }'
```

---

## 2. User Authentication Flow

### Step 1: Login with NextAuth

For testing authenticated endpoints, you'll need to:

1. Navigate to `http://localhost:3000` in a browser
2. Use the login functionality (if UI is implemented)
3. Or use API testing tools like Postman/Insomnia that support session cookies

**Test Credentials:**
- Email: `john@test.com`
- Password: `user123`
- Initial Balance: KES 10,000
- KYC Status: Verified

---

## 3. Authenticated User Endpoints

### Test User Balance

```bash
# Get user balance and portfolio
# Note: Requires authentication cookie/session
curl http://localhost:3000/api/user/balance \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

### Test OTP Flow

```bash
# Step 1: Request OTP for deposit
curl -X POST http://localhost:3000/api/user/otp/send \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "purpose": "deposit"
  }'

# Response will include _test_code (e.g., "123456")
# In production, this would be sent via SMS

# Step 2: Verify OTP
curl -X POST http://localhost:3000/api/user/otp/verify \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "code": "123456",
    "purpose": "deposit"
  }'
```

### Test Deposit (SIMULATED)

```bash
# Step 1: Get OTP (see above)

# Step 2: Deposit funds with OTP
curl -X POST http://localhost:3000/api/user/deposit \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "amount": 5000,
    "otp_code": "123456"
  }'
```

### Test Withdrawal (SIMULATED)

```bash
# Requires KYC verification
# User john@test.com is already KYC verified

# Step 1: Get OTP
curl -X POST http://localhost:3000/api/user/otp/send \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "purpose": "withdrawal"
  }'

# Step 2: Withdraw with OTP
curl -X POST http://localhost:3000/api/user/withdraw \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "amount": 2000,
    "otp_code": "123456"
  }'
```

### Test KYC Submission

```bash
# Submit KYC documents
curl -X POST http://localhost:3000/api/user/kyc \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "document_url": "https://example.com/national-id.jpg"
  }'

# Check KYC status
curl http://localhost:3000/api/user/kyc \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

### Test Trade Execution

```bash
# Execute a trade (buy YES shares)
curl -X POST http://localhost:3000/api/trades \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "market_id": 1,
    "outcome": "YES",
    "stake": 1000
  }'

# Check updated balance
curl http://localhost:3000/api/user/balance \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"

# Check market details (see updated prices)
curl http://localhost:3000/api/markets/1
```

---

## 4. Admin Endpoints

**Admin Credentials:**
- Email: `admin@cashmarket.ke`
- Password: `admin123`

### Test Market Creation

```bash
# Create a new market
curl -X POST http://localhost:3000/api/admin/markets \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=ADMIN_SESSION_TOKEN" \
  -d '{
    "question": "Will Bitcoin exceed $100k by end of 2026?",
    "description": "Market resolves YES if BTC trades above $100,000 USD",
    "category": "Crypto",
    "b": 30000,
    "initial_liquidity": 60000,
    "resolution_source": "CoinMarketCap",
    "resolution_time": "2026-12-31T23:59:59Z"
  }'
```

### Test Market Resolution

**Oracle Credentials:**
- Email: `oracle@cashmarket.ke`
- Password: `oracle123`

```bash
# Resolve a market
curl -X POST http://localhost:3000/api/admin/markets/1/resolve \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=ORACLE_SESSION_TOKEN" \
  -d '{
    "resolved_outcome": "YES",
    "resolution_evidence": "Official results published by Central Bank"
  }'
```

### Test Liquidity Pool Management

```bash
# Get liquidity pool data
curl http://localhost:3000/api/admin/liquidity \
  -H "Cookie: next-auth.session-token=ADMIN_SESSION_TOKEN"

# Deposit to liquidity pool
curl -X PATCH http://localhost:3000/api/admin/liquidity \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=ADMIN_SESSION_TOKEN" \
  -d '{
    "action": "deposit",
    "amount": 100000
  }'

# Withdraw from liquidity pool
curl -X PATCH http://localhost:3000/api/admin/liquidity \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=ADMIN_SESSION_TOKEN" \
  -d '{
    "action": "withdraw",
    "amount": 50000
  }'
```

### Test Platform Controls

```bash
# Pause trading platform-wide
curl -X POST http://localhost:3000/api/admin/controls/pause \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=ADMIN_SESSION_TOKEN" \
  -d '{
    "paused": true,
    "reason": "System maintenance"
  }'

# Resume trading
curl -X POST http://localhost:3000/api/admin/controls/pause \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=ADMIN_SESSION_TOKEN" \
  -d '{
    "paused": false
  }'

# Pause specific market
curl -X POST http://localhost:3000/api/admin/controls/pause \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=ADMIN_SESSION_TOKEN" \
  -d '{
    "paused": true,
    "market_id": 1,
    "reason": "Under investigation"
  }'
```

### Test Fee Management

```bash
# Update global trading fee
curl -X PATCH http://localhost:3000/api/admin/fees \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=ADMIN_SESSION_TOKEN" \
  -d '{
    "fee_percentage": 2.5
  }'

# Update market-specific fee
curl -X PATCH http://localhost:3000/api/admin/fees \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=ADMIN_SESSION_TOKEN" \
  -d '{
    "market_id": 4,
    "fee_percentage": 1.5
  }'
```

### Test Audit Logs

```bash
# Get all audit logs
curl http://localhost:3000/api/admin/logs \
  -H "Cookie: next-auth.session-token=ADMIN_SESSION_TOKEN"

# Filter by action type
curl "http://localhost:3000/api/admin/logs?action_type=create_market" \
  -H "Cookie: next-auth.session-token=ADMIN_SESSION_TOKEN"

# Filter by date range
curl "http://localhost:3000/api/admin/logs?start_date=2026-01-01&end_date=2026-12-31" \
  -H "Cookie: next-auth.session-token=ADMIN_SESSION_TOKEN"
```

---

## 5. Complete Trading Workflow Test

```bash
# 1. Check available markets
curl http://localhost:3000/api/markets

# 2. View specific market details
curl http://localhost:3000/api/markets/1

# 3. Calculate potential trade
curl -X POST http://localhost:3000/api/stake \
  -H "Content-Type: application/json" \
  -d '{"market_id": 1, "outcome": "YES", "stake": 1000}'

# 4. Login as user (use browser or Postman)
# Email: john@test.com, Password: user123

# 5. Check balance before trade
curl http://localhost:3000/api/user/balance \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN"

# 6. Execute trade
curl -X POST http://localhost:3000/api/trades \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN" \
  -d '{"market_id": 1, "outcome": "YES", "stake": 1000}'

# 7. Check balance after trade
curl http://localhost:3000/api/user/balance \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN"

# 8. View updated market (prices should have changed)
curl http://localhost:3000/api/markets/1
```

---

## 6. Security Testing

### Test Rate Limiting

```bash
# Attempt multiple failed logins
# After 5 failures, account should be locked for 30 minutes

for i in {1..6}; do
  curl -X POST http://localhost:3000/api/auth/signin \
    -H "Content-Type: application/json" \
    -d '{
      "email": "john@test.com",
      "password": "wrongpassword"
    }'
  echo "\nAttempt $i"
done
```

### Test Authorization

```bash
# Try accessing admin endpoint without admin role
# Should return 403 Forbidden
curl -X POST http://localhost:3000/api/admin/markets \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=USER_TOKEN" \
  -d '{"question": "Test", "initial_liquidity": 10000}'
```

### Test KYC Requirements

```bash
# Login as bob@test.com (KYC unverified)
# Attempt withdrawal - should fail

# Step 1: Request OTP
curl -X POST http://localhost:3000/api/user/otp/send \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=BOB_TOKEN" \
  -d '{"purpose": "withdrawal"}'

# Step 2: Try to withdraw (should fail due to KYC)
curl -X POST http://localhost:3000/api/user/withdraw \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=BOB_TOKEN" \
  -d '{"amount": 1000, "otp_code": "123456"}'

# Expected response: "KYC verification required for withdrawals"
```

---

## 7. Database Inspection

```bash
# Install SQLite CLI if not already installed
# Ubuntu/Debian: sudo apt-get install sqlite3
# macOS: brew install sqlite3

# Access database
sqlite3 data/cashmarket.db

# Useful queries:
.tables                              # List all tables
SELECT * FROM users;                 # View all users
SELECT * FROM markets;               # View all markets
SELECT * FROM trades;                # View all trades
SELECT * FROM liquidity_pool;        # View liquidity pool
SELECT * FROM audit_logs;            # View admin actions
.exit                                # Exit SQLite
```

---

## Notes

1. **Simulated Features:**
   - OTP codes are logged to console (check terminal output)
   - M-Pesa deposits/withdrawals are database-only
   - No actual SMS or payment gateway integration

2. **Session Management:**
   - NextAuth uses HTTP-only cookies
   - Use browser dev tools or Postman to get session tokens
   - Sessions expire after 30 days

3. **Price Calculations:**
   - LMSR ensures prices always sum to 1.0
   - Higher trading volume = more stable prices
   - Market parameter `b` controls price sensitivity

4. **Testing Tools:**
   - **curl**: Command-line testing
   - **Postman/Insomnia**: GUI testing with session support
   - **Browser DevTools**: Inspect requests/responses
