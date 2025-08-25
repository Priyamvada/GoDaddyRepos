import React, { useEffect, useState } from 'react';
import { fetchRepoList } from '../data/repoListDataProvider';
import { ListView, ColumnProps, Toast, LoadingSpinner } from '../components';

const MainPage: React.FC = () => {
  const [repoList, setRepoList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const data = await fetchRepoList();
        setRepoList(data);
      } catch (error) {
        setRepoList([]);
        setError(error);
        setLoading(false);
      } finally {
        setError(null);
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const columnProps : ColumnProps[] = [
    { key: 'name', label: 'Name', type: 'text', sortable: true, filterable: true },
    { key: 'description', label: 'Description', type: 'text' },
    { key: 'language', label: 'Language', type: 'text', sortable: true, filterable: true },
    { key: 'forks', label: 'Forks', type: 'number', sortable: true },
    { key: 'stargazersCount', label: 'Stars', type: 'number', sortable: true },
    { key: 'updatedAt', label: 'Last Updated', type: 'date', sortable: true },
  ];

  return (
    <div>
      <h1>Repository List</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          { error ? <Toast message={error}/> : (
            <ListView items={repoList} columnProps={columnProps} />
          )}
        </div>
      )}
    </div>
  );
};

export default MainPage;