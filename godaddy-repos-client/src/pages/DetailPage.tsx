import React from 'react';

interface RepoDetailsProps {
  repo: {
    name: string;
    description: string;
    owner: string;
    stars: number;
    forks: number;
    language: string;
    url: string;
  };
}

const DetailPage: React.FC<RepoDetailsProps> = ({ repo }) => {
  if (!repo) {
    return <div>No repository selected.</div>;
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>{repo.name}</h2>
      <p><strong>Description:</strong> {repo.description || 'No description provided.'}</p>
      <p><strong>Owner:</strong> {repo.owner}</p>
      <p><strong>Language:</strong> {repo.language || 'N/A'}</p>
      <p><strong>Stars:</strong> {repo.stars}</p>
      <p><strong>Forks:</strong> {repo.forks}</p>
      <a href={repo.url} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
    </div>
  );
};

export default DetailPage;