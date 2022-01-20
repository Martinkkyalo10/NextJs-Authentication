import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/db";

// next auth must be exported as a function
export default NextAuth({
  // ensure JWT is generated
  session: {
    jwt: true,
  },

  // setup auth providers
  Providers: [
    // config providers to bring your own credentials, select credentials provider
    CredentialsProvider({
      async authorize(credentials) {
        //   connect to database
        const client = await connectToDatabase();

        // provide auth login
        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        // not user found
        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        // find out if password is correct
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        // if not valid
        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        client.close();
        // now the user is loged in. return an object (userinfo) that must be returned with JWT to client
        return { email: user.email };
      },
    }),
  ],
});
