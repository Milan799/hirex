import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/db/db";
import { User } from "@/lib/models/User";

const useSecureCookies = process.env.NODE_ENV === "production";
const cookiePrefix = process.env.APP_TYPE === "employer" ? "__employer" : 
                     process.env.APP_TYPE === "seeker" ? "__seeker" : 
                     "";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  cookies: cookiePrefix ? {
    sessionToken: {
      name: `${useSecureCookies ? "__Secure-" : ""}${cookiePrefix}.next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
  } : undefined,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          await connectToDatabase();
          
          const user = await User.findOne({ email: credentials.email }).select("+password");
          
          if (!user) {
            throw new Error("Invalid credentials");
          }

          const isValid = await user.comparePassword(credentials.password as string);
          
          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          if (credentials.role && user.role !== credentials.role) {
            throw new Error(`Please log in as a ${credentials.role}`);
          }

          return {
            id: user._id.toString(),
            name: user.fullName,
            email: user.email,
            role: user.role,
            accessToken: "local-jwt-token" 
          };
        } catch (error: any) {
          throw new Error(error.message || "Email or password incorrect. Please try again.");
        }
      }
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = (user as any).accessToken || account?.access_token || "oauth-token";
        token.role = (user as any).role || "candidate";
        token.id = (user as any).id || user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session as any).accessToken = token.accessToken;
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  }
});