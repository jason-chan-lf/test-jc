import 'dotenv/config';
import { AccessKey } from '@laserfiche/lf-api-client-core';
export const servicePrincipalKey: string =
  process.env.SERVICE_PRINCIPAL_KEY ?? '';
if (!servicePrincipalKey) {
  throw new Error(`Unable to load SERVICE_PRINCIPAL_KEY from .env`);
}
let accessKey: any = process.env.OAUTH_ACCESS_KEY;
const reg = /\\\"/g;
accessKey = accessKey?.replace(reg, '"');
accessKey = accessKey?.replace('"{', '{');
accessKey = accessKey?.replace('}"', '}');
export const OAuthAccessKey: AccessKey = JSON.parse(accessKey ?? '');
export const repoId: string = process.env.REPOSITORY_ID_1 ?? '';
