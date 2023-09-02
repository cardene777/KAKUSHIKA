import crypto from "crypto";

export const hashString = (inputString: string): string => {
  const hash = crypto.createHash("sha256");
  hash.update(inputString);
  return hash.digest("hex");
};
