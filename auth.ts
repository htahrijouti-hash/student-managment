import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getDB } from '@/lib/db';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        try {
          const db = getDB();
          const user = db.prepare('SELECT * FROM users WHERE email = ?').get(credentials.email) as any;

          if (!user) {
            throw new Error('No user found with this email');
          }

          const passwordMatch = await bcrypt.compare(credentials.password as string, user.password);

          if (!passwordMatch) {
            throw new Error('Invalid password');
          }

          return {
            id: String(user.id),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
});
