import bcryptNode from "bcryptjs";
import bcryptReact from "bcryptjs-react";

const BCRYPT_HASH = "$2a$04$/avXx1xzOfjcrJsrrIa4Mu";

const getBcrypt = () =>
  typeof window === "undefined" ? bcryptNode : bcryptReact;

export const encrypt = async (message: string) => {
  const bcrypt = getBcrypt();
  const hash = await bcrypt.hash(message, BCRYPT_HASH);
  return hash;
};

export const compare = async (message: string, hash: string) => {
  const bcrypt = getBcrypt();
  return bcrypt.compareSync(message, hash);
};
