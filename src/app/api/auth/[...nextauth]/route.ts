// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Define the NextAuth handler
const authHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Optional: Custom sign-in page
    error: "/auth/error", // Optional: Custom error page
  },
  callbacks: {
    async jwt({ token, account }) {
      // Ensure account is properly typed
      if (account?.provider === "google") {
        token.id = account.id;
        token.email = account.email as string | null; // Explicitly type the email as string | null
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.name = token.id as string;
        session.user.email = token.email as string | null;
      }
      return session;
    },
  },
});

// Export GET and POST handlers directly
export const GET = authHandler;
export const POST = authHandler;
