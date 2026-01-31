#!/usr/bin/env tsx

/**
 * Seed script to populate the database with test data
 * Run with: npm run seed
 */

import db from '../lib/db';
import { hashPassword } from '../lib/security/passwordHash';
import { DEFAULT_B, initializeMarketQuantities } from '../lib/lmsr';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Create admin user
    console.log('Creating admin user...');
    const adminPasswordHash = await hashPassword('admin123');
    const adminStmt = db.prepare(`
      INSERT INTO admin_users (email, name, password_hash, role, is_active)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    try {
      adminStmt.run('admin@cashmarket.ke', 'Admin User', adminPasswordHash, 'admin', 1);
      console.log('✓ Admin user created: admin@cashmarket.ke / admin123');
    } catch (e) {
      console.log('⚠ Admin user already exists');
    }

    // Create oracle user
    const oraclePasswordHash = await hashPassword('oracle123');
    try {
      adminStmt.run('oracle@cashmarket.ke', 'Oracle User', oraclePasswordHash, 'oracle', 1);
      console.log('✓ Oracle user created: oracle@cashmarket.ke / oracle123');
    } catch (e) {
      console.log('⚠ Oracle user already exists');
    }

    // Create test users
    console.log('\nCreating test users...');
    const userPasswordHash = await hashPassword('user123');
    const userStmt = db.prepare(`
      INSERT INTO users (email, name, password_hash, phone_number, balance, kyc_status)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const testUsers = [
      ['john@test.com', 'John Doe', '+254712345678', 10000, 'verified'],
      ['jane@test.com', 'Jane Smith', '+254723456789', 15000, 'verified'],
      ['bob@test.com', 'Bob Johnson', '+254734567890', 5000, 'unverified'],
    ];

    for (const [email, name, phone, balance, kycStatus] of testUsers) {
      try {
        userStmt.run(email, name, userPasswordHash, phone, balance, kycStatus);
        console.log(`✓ User created: ${email} / user123 (Balance: KES ${balance}, KYC: ${kycStatus})`);
      } catch (e) {
        console.log(`⚠ User ${email} already exists`);
      }
    }

    // Create sample markets
    console.log('\nCreating sample markets...');
    const { q_yes, q_no } = initializeMarketQuantities();
    
    const marketStmt = db.prepare(`
      INSERT INTO markets (
        question, description, category, b, q_yes, q_no,
        initial_liquidity, status, resolution_source, resolution_time, created_by
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const markets = [
      {
        question: 'Will Kenya Shilling strengthen against USD by Q2 2026?',
        description: 'Market resolves YES if KES/USD exchange rate is below 125 by June 30, 2026',
        category: 'Economy',
        resolution_source: 'Central Bank of Kenya',
        resolution_time: '2026-06-30T23:59:59Z',
        liquidity: 50000,
      },
      {
        question: 'Will Nairobi host the 2027 Africa Tech Summit?',
        description: 'Market resolves YES if the official Africa Tech Summit 2027 is confirmed to be held in Nairobi',
        category: 'Events',
        resolution_source: 'Official event organizers',
        resolution_time: '2026-12-31T23:59:59Z',
        liquidity: 30000,
      },
      {
        question: 'Will M-Pesa transaction volume exceed 20B in 2026?',
        description: 'Market resolves YES if total M-Pesa transaction volume exceeds 20 billion KES in calendar year 2026',
        category: 'Tech',
        resolution_source: 'Safaricom Annual Report',
        resolution_time: '2027-01-31T23:59:59Z',
        liquidity: 40000,
      },
      {
        question: 'Will Ruto win the 2027 Presidential Election?',
        description: 'Market resolves YES if William Ruto wins the 2027 Kenyan presidential election',
        category: 'Politics',
        resolution_source: 'IEBC Official Results',
        resolution_time: '2027-08-31T23:59:59Z',
        liquidity: 100000, // High-profile market with higher liquidity
        b: 50000, // Custom b for high-volume market
      },
    ];

    for (const market of markets) {
      try {
        const result = marketStmt.run(
          market.question,
          market.description,
          market.category,
          market.b || DEFAULT_B,
          q_yes,
          q_no,
          market.liquidity,
          'active',
          market.resolution_source,
          market.resolution_time,
          1 // Created by admin
        );
        console.log(`✓ Market created: "${market.question}" (ID: ${result.lastInsertRowid})`);
      } catch (e) {
        console.log(`⚠ Market already exists: "${market.question}"`);
      }
    }

    // Update liquidity pool to account for locked liquidity
    const totalLiquidity = markets.reduce((sum, m) => sum + m.liquidity, 0);
    const updateLiquidityStmt = db.prepare(`
      UPDATE liquidity_pool
      SET locked_liquidity = ?,
          available_liquidity = total_liquidity - ?
      WHERE id = 1
    `);
    updateLiquidityStmt.run(totalLiquidity, totalLiquidity);
    console.log(`\n✓ Locked KES ${totalLiquidity} in liquidity pool for markets`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('   Admin: admin@cashmarket.ke / admin123');
    console.log('   Oracle: oracle@cashmarket.ke / oracle123');
    console.log('   User 1: john@test.com / user123 (KES 10,000, KYC verified)');
    console.log('   User 2: jane@test.com / user123 (KES 15,000, KYC verified)');
    console.log('   User 3: bob@test.com / user123 (KES 5,000, KYC unverified)');
    console.log('\n💡 All payments are SIMULATED - no actual M-Pesa/Daraja integration yet');
    console.log('   When you get Daraja API, update lib/security/otp.ts for SMS');
    console.log('   and deposit/withdraw endpoints for real M-Pesa transactions');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
