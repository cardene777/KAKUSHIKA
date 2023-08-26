import { Polybase } from "@polybase/client";
import * as eth from "@polybase/eth";
import { POLYBASE_NAMESPACE, POLYBASE_COLLECTION_NAME } from "@common/config";

const db = new Polybase({
  defaultNamespace: POLYBASE_NAMESPACE,
});
db.signer(async (data: string) => {
  const accounts = await eth.requestAccounts();
  const account = accounts[0];

  const sig = await eth.sign(data, account);

  return { h: "eth-personal-sign", sig };
});
const collectionReference = db.collection(POLYBASE_COLLECTION_NAME);

export default collectionReference;
