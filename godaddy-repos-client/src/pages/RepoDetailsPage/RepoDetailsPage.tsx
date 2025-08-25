import React from 'react';
import { RepoItem } from '../../data/repoListDataProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import { LanguageIcon } from '../../utils/dataParsingUtils';
import { repoDetailsLeftPanelStyles, repoDetailsPageContainerStyles, repoDetailsRightPanelStyles } from './repoDetailsPage.styles';
import { getFormattedDate } from '../../utils/dateUtils';
import { FontSize } from '../../assets';

const RepoDetailsPage: React.FC = () => {
  const location = useLocation();
  const message = location.state?.message ?? '';
  const repo: RepoItem | undefined = location.state?.repo;
  const navigate = useNavigate();

  const handleSubtitleClicked = () => {
    navigate('/');
  };
  
  if (!repo) {
    return <div>No repository selected.</div>;
  }

  return (
    <>
      <PageHeader title={`${repo.name} Repository Details`} subtitle={message} onSubtitleClick={handleSubtitleClicked} />
      <div style={repoDetailsPageContainerStyles}>
        <div style={repoDetailsLeftPanelStyles}>
          <h2>{repo.name}</h2>
          <img
            src={LanguageIcon[repo.language ?? 'default']}
            alt={repo.language || 'code'}
            style={{ maxWidth: '40px', maxHeight: '40px' }} />
          <p style={{ fontSize: `${FontSize.small}` }}><strong>Description: </strong>{repo.description || 'No description provided.'}</p>
          <p><strong>Owner: </strong>
          {repo.owner?.htmlUrl ? <a href={repo.owner.htmlUrl} target="_blank" rel="noopener noreferrer">{repo.owner.login}</a> : (repo.owner?.login ?? 'Unknown')}</p>
          <p><strong>Language: </strong>{repo.language || 'N/A'}</p>
          <p><strong>Stars: </strong>{repo.stargazersCount}</p>
          <p><strong>Forks: </strong>{repo.forks}</p>
          <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </div>
        <div style={repoDetailsRightPanelStyles}>
          <h3>Permissions</h3>
          {/* ✓ ✔ ✅ ✘  ✖ ✕ ❎ ☓ ✗ */}
          <p>Admin: {repo.permissions?.admin ? '✔' : '❌'}</p>
          <p>Push: {repo.permissions?.push ? '✔' : '❌'}</p>
          <p>Pull: {repo.permissions?.pull ? '✔' : '❌'}</p>
          <br />
          <h3>{repo.license?.url ? <a href={repo.license.url} target="_blank" rel="noopener noreferrer">{repo.license.name}</a> : (repo.license?.name ?? 'N/A')}</h3>
          <p><strong>SPDX ID:</strong> {repo.license?.spdxId || 'N/A'}</p>
          <br />
          <h3>Additional Info</h3>
          <p><strong>Created:</strong> {getFormattedDate(repo.createdAt ?? '')}</p>
          <p><strong>Updated:</strong> {getFormattedDate(repo.updatedAt ?? '')}</p>
          <p><strong>Open Issues:</strong> {repo.openIssues}</p>
          <p><strong>Watchers:</strong> {repo.watchers}</p>
          <p><strong>Size:</strong> {`${repo.size} MB`}</p>
          <p><strong>Topics:</strong> {repo.topics && repo.topics.length > 0 ? repo.topics.join(', ') : 'N/A'}</p>
        </div>
        <div style={repoDetailsRightPanelStyles}>
          <h3>URLs</h3>
          <p>{repo.gitUrl && <a href={repo.gitUrl} target="_blank" rel="noopener noreferrer">Git URL</a>}</p>
          <p>{repo.sshUrl && <a href={repo.sshUrl} target="_blank" rel="noopener noreferrer">SSH URL</a>}</p>
          <p>{repo.cloneUrl && <a href={repo.cloneUrl} target="_blank" rel="noopener noreferrer">Clone URL</a>}</p>
          <p>{repo.svnUrl && <a href={repo.svnUrl} target="_blank" rel="noopener noreferrer">SVN URL</a>}</p>
          <p>{repo.homepage && <a href={repo.homepage} target="_blank" rel="noopener noreferrer">Homepage</a>}</p>
          <br />
          <h3>Flags</h3>
          <p>Archived: {repo.archived ? '✔' : '❌'}</p>
          <p>Disabled: {repo.disabled ? '✔' : '❌'}</p>
          <p>Forking Allowed: {repo.allowForking ? '✔' : '❌'}</p>
          <p>Has Issues: {repo.hasIssues ? '✔' : '❌'}</p>
          <p>Has Projects: {repo.hasProjects ? '✔' : '❌'}</p>
          <p>Has Downloads: {repo.hasDownloads ? '✔' : '❌'}</p>
          <p>Has Wiki: {repo.hasWiki ? '✔' : '❌'}</p>
          <p>Has Pages: {repo.hasPages ? '✔' : '❌'}</p>
          <p>Has Discussions: {repo.hasDiscussions ? '✔' : '❌'}</p>
        </div>
      </div>
      
    </>
  );
};

export default RepoDetailsPage;