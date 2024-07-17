import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const user = { id: 1, name: "Admin User", email: "admin@example.com" };

        if (credentials.username === process.env.NEXT_PUBLIC_ADMIN_USERNAME && credentials.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/auth/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 5, 
    updateAge: 0,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    }
  }
});
