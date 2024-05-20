import clientPromise from '@/lib/mongodb'
// import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  callbacks:{
    async jwt({ token }) {
      if (token.email === process.env.NEXT_PUBLIC_EMAIL) {
        token.role = "admin";
      } else {
        token.role = "member";
      }
      return token;
    },

  },
  secret: process.env.NEXTAUTH_SECRET,
})