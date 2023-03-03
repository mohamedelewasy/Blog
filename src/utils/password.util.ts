import { compareSync, hash, hashSync } from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
export const hashPassword = (password: string) => {
  const { PAPER, SALT_ROUND } = process.env;
  if (!PAPER || !SALT_ROUND) {
    // eslint-disable-next-line no-console
    console.log('paper or salt is missing');
    process.exit(1);
  }
  return hashSync(password + PAPER, +SALT_ROUND);
};

export const comparePassword = (data: string, hashed: string) => {
  const { PAPER } = process.env;
  return compareSync(data + PAPER, hashed);
};
