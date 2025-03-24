import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userLogIn } from "@/libs/userLogIn";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const data = await userLogIn(credentials.email, credentials.password);

        if (data?.success && data?.token) {
          return {
            id: data.data?._id,
            name: data.data?.name,
            email: data.data?.email,
            token: data.token,
            tel: data.data?.tel,
            role: data.data?.role,
            createdAt: data.data?.createdAt
          };
        }
        return null;
      }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          ...user
        };
      }
      return token;
    },
    session({ session, token }: { session: any; token: any }) {
      session.user = token;
      return session;
    },
  },
};