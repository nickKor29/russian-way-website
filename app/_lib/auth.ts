import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "./data-service";
import { Session, User } from "./types";

// Установите authConfig с типом any для временного решения ошибок
const authConfig: any = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    authorized({ auth }: { auth: { user?: any } }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: any }) {
      try {
        const existingGuest = await getUser(user.email);
        console.log(existingGuest);
        if (!existingGuest) {
          const newUser = { email: user.email, fullName: user.name };
          await createUser(newUser);
        }
        return true;
      } catch {
        return false;
      }
    },
    async session({ session }: { session: any }) {
      const user = await getUser(session.user.email);
      session.user.userId = user.id;
      session.user.toursIds = user.toursIds;
      console.log("SESSION");
      console.log(session);
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

// Экспортируйте обработчики для NextAuth
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
