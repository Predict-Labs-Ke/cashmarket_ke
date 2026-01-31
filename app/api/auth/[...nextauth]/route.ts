import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import { verifyPassword } from "@/lib/security/passwordHash";
import { recordLoginAttempt, isLockedOut, clearLoginAttempts } from "@/lib/middleware/rateLimit";
import { createSession } from "@/lib/security/session";
import type { User, AdminUser } from "@/lib/types";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        userType: { label: "User Type", type: "text" }, // 'user' or 'admin'
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const ipAddress = req.headers?.['x-forwarded-for'] as string || 
                         req.headers?.['x-real-ip'] as string;

        // Check rate limiting
        const lockoutStatus = isLockedOut(credentials.email, ipAddress);
        if (lockoutStatus.locked) {
          throw new Error(
            `Account locked due to too many failed login attempts. Try again after ${lockoutStatus.lockedUntil?.toLocaleTimeString()}`
          );
        }

        const userType = credentials.userType || 'user';

        try {
          let user: (User | AdminUser) & { role?: string } | undefined;

          if (userType === 'admin') {
            // Admin login
            const stmt = db.prepare(`
              SELECT * FROM admin_users WHERE email = ? AND is_active = 1
            `);
            user = stmt.get(credentials.email) as AdminUser | undefined;
          } else {
            // Regular user login
            const stmt = db.prepare(`
              SELECT * FROM users WHERE email = ?
            `);
            user = stmt.get(credentials.email) as User | undefined;
          }

          if (!user || !user.password_hash) {
            recordLoginAttempt(credentials.email, ipAddress, false);
            throw new Error("Invalid credentials");
          }

          const isValid = await verifyPassword(credentials.password, user.password_hash);

          if (!isValid) {
            recordLoginAttempt(credentials.email, ipAddress, false);
            throw new Error("Invalid credentials");
          }

          // Successful login
          recordLoginAttempt(credentials.email, ipAddress, true);
          clearLoginAttempts(credentials.email);

          // Create session with device info
          const userAgent = req.headers?.['user-agent'] as string;
          createSession(user.id, userAgent, ipAddress, userAgent);

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            role: userType === 'admin' ? (user as AdminUser).role : 'user',
          };
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-change-in-production',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
