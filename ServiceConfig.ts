import 'dotenv/config';
import { AccessKey, createFromBase64EncodedAccessKey} from '@laserfiche/lf-api-client-core';
export const servicePrincipalKey: string =
  process.env.SERVICE_PRINCIPAL_KEY ?? '';
if (!servicePrincipalKey) {
  throw new Error(`Unable to load SERVICE_PRINCIPAL_KEY from .env`);
}
const accessKeyBase64: string = process.env.ACCESS_KEY ?? '';
if (!accessKeyBase64){
  throw new Error(`Unable to load ACCESS_KEY from .env`);
}
export const OAuthAccessKey: AccessKey = createFromBase64EncodedAccessKey(accessKeyBase64 ?? '');
export const repoId: string = process.env.REPOSITORY_ID ?? '';
