import { getSession } from "next-auth/react";
import { hashPassword, verifyPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/db";

export default async function handler(req, res) {
  // check the req method
  if (req.method !== "PATCH") {
    return;
  }

  // check if the req is coming from an authenticated user using getSession
  const session = await getSession({ req: req });

  // no session means user is unauthenticated
  if (!session) {
    res.status(401).json({ message: "Not Authenticated!" });
    return;
  }
  // change password logic
  // extract the user data
  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  // connect to database
  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found!" });
    client.close();
    return;
  }

  // verify the password
  const currentPassword = user.password;

  const passwordsAreEqual = verifyPassword(oldPassword, currentPassword);

  // if they dont match denay the user the permision to chang the password 403 or 422 status code
  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid password." });
    client.close();
    return;
  }

  // password are correct so replace the old password with the hashed new password
  const hashedPassword = await hashPassword(newPassword);
  const updatedPassword = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: "Password updated." });
}
