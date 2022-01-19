import { hash, compare } from "bcryptjs";

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

// find if the hashed passoword is equal to the plain text password

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
