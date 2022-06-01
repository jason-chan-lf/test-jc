import {
  IRepositoryApiClient,
  RepositoryApiClient,
  Entry,
  ODataValueContextOfIListOfEntry,
  RepositoryInfo,
} from '@laserfiche/lf-repository-api-client';
import { OAuthAccessKey, servicePrincipalKey, repoId } from './ServiceConfig.js';

const _RepositoryApiClient: IRepositoryApiClient = createRepoAPIClient();
const rootFolderEntryId: number = 1;

await main();

async function main(): Promise<void> {
  const repoName: string = await getRepoName();
  const rootFolder: Entry = await getRootFolder();
  const rootFolderChildren: Entry[] = await getFolderChildren(rootFolderEntryId);
}

async function getRepoName(): Promise<string> {
  const response: RepositoryInfo[] = await _RepositoryApiClient.repositoriesClient.getRepositoryList({});
  const repoName = response[0].repoName ?? '';
  console.log(`Repository Name: '${repoName}'`);
  return repoName;
}

async function getRootFolder(): Promise<Entry> {
  const entryResponse: Entry = await _RepositoryApiClient.entriesClient.getEntry({
    repoId,
    entryId: rootFolderEntryId,
  });
  const rootFolderName = entryResponse.name && entryResponse.name.length > 0 ? entryResponse.name : '/';
  console.log(`Root Folder Name: '${rootFolderName}'`);
  return entryResponse;
}

async function getFolderChildren(folderEntryId: number): Promise<Entry[]> {
  const result: ODataValueContextOfIListOfEntry = await _RepositoryApiClient.entriesClient.getEntryListing({
    repoId,
    entryId: folderEntryId,
    orderby: 'name',
    groupByEntryType: true,
  });
  const children: Entry[] = result.value ?? [];
  for (let i = 0; i < children.length; i++) {
    let child: Entry = children[i];
    console.log(`${i}:[${child.entryType}] '${child.name}'`);
  }
  return children;
}

function createRepoAPIClient(): IRepositoryApiClient {
  const repositoryApiClient = RepositoryApiClient.create(servicePrincipalKey, JSON.stringify(OAuthAccessKey));
  return repositoryApiClient;
}
