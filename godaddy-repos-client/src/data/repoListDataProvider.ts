import axios from 'axios';
import { snakeToCamel } from '../utils/dataParsingUtils';

const GODADDY_GIRHUB_REPOS_URL = 'https://api.github.com/orgs/godaddy/repos';
const GODADDY_GITHUB_REPO_DETAILS_URL = 'https://api.github.com/repos/godaddy'

export interface RepoLicense {
  key?: string;
  name?: string;
  spdxId?: string;
  url?: string;
  nodeId?: string;
}

export interface RepoPermissions {
  admin?: boolean;
  maintain?: boolean;
  push?: boolean;
  triage?: boolean;
  pull?: boolean;
}

export interface RepoOwner {
  login?: string;
  id: number;
  nodeId?: string;
  avatarUrl?: string;
  gravatarId?: string;
  url?: string;
  htmlUrl?: string;
  followersUrl?: string;
  followingUrl?: string;
  gistsUrl?: string;
  starredUrl?: string;
  subscriptionsUrl?: string;
  organizationsUrl?: string;
  reposUrl?: string;
  eventsUrl?: string;
  receivedEventsUrl?: string;
  type?: string;
  userViewType?: string;
  siteAdmin?: boolean;
}

export interface RepoItem {
  id: number;
  nodeId?: string;
  name: string;
  fullName?: string;
  private?: boolean;
  owner?: RepoOwner;
  htmlUrl?: string;
  description?: string;
  fork?: boolean;
  url?: string;
  forksUrl?: string;
  keysUrl?: string;
  collaboratorsUrl?: string;
  teamsUrl?: string;
  hooksUrl?: string;
  issueEventsUrl?: string;
  eventsUrl?: string;
  assigneesUrl?: string;
  branchesUrl?: string;
  tagsUrl?: string;
  blobsUrl?: string;
  gitTagsUrl?: string;
  gitRefsUrl?: string;
  treesUrl?: string;
  statusesUrl?: string;
  languagesUrl?: string;
  stargazersUrl?: string;
  contributorsUrl?: string;
  subscribersUrl?: string;
  subscriptionUrl?: string;
  commitsUrl?: string;
  gitCommitsUrl?: string;
  commentsUrl?: string;
  issueCommentUrl?: string;
  contentsUrl?: string;
  compareUrl?: string;
  mergesUrl?: string;
  archiveUrl?: string;
  downloadsUrl?: string;
  issuesUrl?: string;
  pullsUrl?: string;
  milestonesUrl?: string;
  notificationsUrl?: string;
  labelsUrl?: string;
  releasesUrl?: string;
  deploymentsUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  pushedAt?: string;
  gitUrl?: string;
  sshUrl?: string;
  cloneUrl?: string;
  svnUrl?: string;
  homepage?: string;
  size?: number;
  stargazersCount?: number;
  watchersCount?: number;
  language?: string;
  hasIssues?: boolean;
  hasProjects?: boolean;
  hasDownloads?: boolean;
  hasWiki?: boolean;
  hasPages?: boolean;
  hasDiscussions?: boolean;
  forksCount?: number;
  mirrorUrl?: string | null;
  archived?: boolean;
  disabled?: boolean;
  openIssuesCount?: number;
  license?: RepoLicense;
  allowForking?: boolean;
  isTemplate?: boolean;
  webCommitSignoffRequired?: boolean;
  topics?: string[];
  visibility?: string;
  forks?: number;
  openIssues?: number;
  watchers?: number;
  defaultBranch?: string;
  permissions?: RepoPermissions;
}

function convertToRepoLicense(license: any): RepoLicense {
  let repoLicense: any = {};
  for (const key in license) {
    repoLicense[snakeToCamel(key)] = license[key];
  }
  return repoLicense as RepoLicense;
}

function convertToRepoOwner(owner: any): RepoOwner {
  let repoOwner: any = {};
  for (const key in owner) {
    repoOwner[snakeToCamel(key)] = owner[key];
  }
  return repoOwner as RepoOwner;
}

function convertToRepoPermissions(permissions: any): RepoPermissions {
  return permissions as RepoPermissions;
}

function convertToRepoItem(repo: any): RepoItem {
  let repoItem: any = {};
  for (const key in repo) {
    if (key === 'license' && repo[key]) {
      repoItem['license'] = convertToRepoLicense(repo[key]);
    } else if (key === 'owner' && repo[key]) {
      repoItem['owner'] = convertToRepoOwner(repo[key]);
    } else if (key === 'permissions' && repo[key]) {
      repoItem['permissions'] = convertToRepoPermissions(repo[key]);
    } else {
      repoItem[snakeToCamel(key)] = repo[key];
    }
  }
  return repoItem as RepoItem;
}

export async function fetchRepoList(): Promise<RepoItem[]> {
  try {
    const response = await axios.get(GODADDY_GIRHUB_REPOS_URL);
    return response.data.map((repo: any): RepoItem => convertToRepoItem(repo));
  } catch (error) {
    console.error('Failed to fetch repo list:', error);
    throw error;
  }
}

export async function fetchRepoByName(repoName: string): Promise<RepoItem | null> {
  try {
    const response = await axios.get(`${GODADDY_GITHUB_REPO_DETAILS_URL}/${repoName}`);
    return convertToRepoItem(response.data);
  } catch (error) {
    console.error(`Failed to fetch repo: ${repoName}:`, error);
    throw error;
  }
}