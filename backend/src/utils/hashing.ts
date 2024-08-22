import bcrypt from "bcryptjs";

const hashPassword = async (s: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(s, salt);
  console.log(hash);
  return hash;
}

const comparePassword = async (s: string, hash: string) => {
  const is = await bcrypt.compare(s, hash);
  return is;
}

export {
  hashPassword,
  comparePassword
}