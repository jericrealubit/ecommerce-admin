import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import { getServerSession } from "next-auth";

const adminEmails = ["jericrealubit@gmail.com"];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      //if (adminEmails.includes(session?.user?.email)) {
      if (1) {
        // testing only
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export const isAdminRequest = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  // comment out for testing
  // if (!adminEmails.includes(session?.user?.email)) {
  //   res.status(401).send("Unauthorized");
  //   res.end();
  // }
};
