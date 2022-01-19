import { hashPassword } from "../../../../helpers/auth";
import { connectToDatabase } from "../../../../helpers/db";

async function handler(req, res) {
  // extract incoming data first before connecting to database
  const data = req.body;

  // destructure data object
  const { email, password } = data;

  // validate data
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input! Password should also be at least 7 charcters long.",
    });
    return;
  }

  // passing this if check means u have valid data which should be stored

  const client = await connectToDatabase();

  // get access to the DB
  const db = client.db();
  const hashedPassword = hashPassword(password);

  // create a new user
  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword, //encrypt pass using bcrypt.js package
  });
  res.status(201).json({ message: "User created!", result });
}

export default handler;
