# CashMarket Kenya - Prediction Markets Platform

A Next.js-based prediction market platform for Kenya, featuring LMSR (Logarithmic Market Scoring Rule) automated market making, secure authentication, and simulated M-Pesa integration.

## 🎯 Features

### Core Functionality
- **Prediction Markets**: Create and trade on real-world event outcomes
- **LMSR Pricing**: Automated market making with configurable liquidity parameters
- **User Trading**: Buy YES/NO shares with real-time price updates
- **Market Resolution**: Admin/Oracle resolution with automatic payouts

### Security & Authentication
- **NextAuth.js Integration**: Secure credential-based authentication
- **Role-Based Access Control (RBAC)**: Admin, Moderator, Oracle, and User roles
- **2FA/OTP**: Simulated SMS OTP for deposits and withdrawals
- **KYC Verification**: Required for withdrawals
- **Rate Limiting**: Brute force protection (5 attempts, 30-min lockout)
- **Session Logging**: Device and IP tracking for security monitoring
- **Audit Trail**: Complete logging of all admin actions

### Financial Features
- **Simulated M-Pesa**: Deposit/withdrawal system (ready for Daraja API integration)
- **Liquidity Pool**: Platform-wide insurance pool management
- **Fee Management**: Configurable global and per-market trading fees
- **Transaction History**: Complete audit trail of all user transactions

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Predict-Labs-Ke/cashmarket_ke.git
cd cashmarket_ke

# Install dependencies
npm install

# Seed the database with test data
npm run seed

# Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Test Credentials

After running `npm run seed`, you can use these credentials:

**Admin Users:**
- Admin: `admin@cashmarket.ke` / `admin123`
- Oracle: `oracle@cashmarket.ke` / `oracle123`

**Regular Users:**
- User 1: `john@test.com` / `user123` (KES 10,000, KYC verified)
- User 2: `jane@test.com` / `user123` (KES 15,000, KYC verified)
- User 3: `bob@test.com` / `user123` (KES 5,000, KYC unverified)

## 📚 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

### Quick API Examples

**List Markets:**
```bash
curl http://localhost:3000/api/markets
```

**Calculate Stake:**
```bash
curl -X POST http://localhost:3000/api/stake \
  -H "Content-Type: application/json" \
  -d '{"market_id": 1, "outcome": "YES", "stake": 1000}'
```

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: SQLite (better-sqlite3) with persistent storage
- **Authentication**: NextAuth.js
- **Password Hashing**: bcrypt
- **Styling**: Tailwind CSS
- **Market Making**: Custom LMSR implementation

## 📁 Project Structure

```
cashmarket_ke/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── admin/           # Admin endpoints
│   │   ├── auth/            # NextAuth configuration
│   │   ├── markets/         # Market endpoints
│   │   ├── trades/          # Trading endpoints
│   │   └── user/            # User account endpoints
│   └── [pages]/             # UI pages
├── lib/                      # Shared libraries
│   ├── db/                  # Database connection & schema
│   ├── middleware/          # Auth & rate limiting
│   ├── security/            # Password, OTP, KYC, sessions
│   ├── lmsr.ts             # Market making formulas
│   └── types.ts            # TypeScript definitions
├── scripts/
│   └── seed.ts             # Database seeding script
└── data/                    # SQLite database (gitignored)
```

## 🔐 Security Features

1. **Password Security**: bcrypt hashing with 10 salt rounds
2. **Session Management**: Device fingerprinting and IP tracking
3. **Rate Limiting**: Protection against brute force attacks
4. **OTP Verification**: Required for financial transactions
5. **KYC Compliance**: Mandatory for withdrawals
6. **Audit Logging**: All admin actions tracked
7. **RBAC**: Fine-grained permission control

## 💰 LMSR Configuration

- **Default Liquidity (b)**: 20,000 KES for standard markets
- **High-Volume Markets**: Custom b values (e.g., 50,000 KES for presidential election)
- **Initial Pricing**: 50/50 neutral odds
- **Trading Fee**: 2% default (configurable)
- **Withdrawal Fee**: 1% default
- **Max Platform Exposure**: b × ln(2) per market

## 🔄 Simulation Mode

**Currently all payments are SIMULATED:**
- ✅ OTP codes logged to console (not sent via SMS)
- ✅ Deposits/withdrawals update database balances only
- ✅ No actual M-Pesa/Daraja API integration yet

**When you get Daraja API access, update:**
1. `lib/security/otp.ts` - Replace console.log with SMS API
2. `app/api/user/deposit/route.ts` - Add M-Pesa STK Push
3. `app/api/user/withdraw/route.ts` - Add M-Pesa B2C API

## 📊 Database Schema

The platform uses SQLite with the following main tables:
- `users` - User accounts and balances
- `admin_users` - Admin/moderator/oracle accounts
- `markets` - Prediction markets
- `trades` - Individual trades
- `user_positions` - Aggregated user positions per market
- `transactions` - Financial transactions
- `otp_codes` - 2FA codes
- `sessions` - User sessions
- `login_attempts` - Rate limiting
- `audit_logs` - Admin action tracking
- `liquidity_pool` - Platform insurance pool
- `platform_controls` - Trading pause/resume
- `fee_config` - Fee configuration

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
npm run seed     # Seed database with test data
```

## 🚧 Production Readiness Checklist

Before deploying to production:

- [ ] Set up PostgreSQL database
- [ ] Configure environment variables (NEXTAUTH_SECRET, DATABASE_URL)
- [ ] Integrate Daraja API for M-Pesa
- [ ] Enable HTTPS
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure backup strategy
- [ ] Set up monitoring and alerts
- [ ] Implement rate limiting at infrastructure level
- [ ] Review and harden security settings
- [ ] Set up CI/CD pipeline

## 📝 License

This project is private and proprietary.
