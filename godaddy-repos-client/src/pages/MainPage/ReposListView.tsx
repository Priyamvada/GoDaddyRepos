import React, { useEffect, useState } from 'react';
import { fetchRepoList, RepoItem } from '../../data/repoListDataProvider';
import { ListView, ColumnProps, Toast, LoadingSpinner } from '../../components';
import { FontSize, FontWeight, Icons } from '../../assets';
import { ListItem } from '../../components/ListView/listView.types';
import { useNavigate } from 'react-router-dom';
import { LanguageIcon } from '../../utils/dataParsingUtils';

interface RepoListViewProps {
  styles?: React.CSSProperties;
}

const RepoListViewContainerStyles: React.CSSProperties = {
  padding: '10px 20px',
};

export const ReposListView: React.FC<RepoListViewProps> = ({ styles }) => {
  const [repoList, setRepoList] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();

  const handleRepoListItemClick = (item: ListItem) => {
    navigate(`/repoDetails/:${item.id}`, { state: { message: 'Back to all repositories', repo: item.data as RepoItem | undefined } });
  };

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const data = await fetchRepoList();
        setRepoList(data.map((repo) => ({ id: repo.id.toString(), data: repo })));
        setLoading(false);
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

  const columnProps: ColumnProps[] = [
    {
      key: 'name',
      label: 'Name',
      type: 'text',
      sortable: true,
      filterable: true,
      style: {
        fontWeight: FontWeight.semibold,
        textAlign: 'left',
      },
    },
    {
      key: 'language',
      label: '',
      type: 'text',
      sortable: true,
      filterable: true,
      render: (item) => (
        <img
          src={LanguageIcon[item?.data?.language] ?? LanguageIcon['default'] }
          alt={item?.data?.language || 'code'}
          style={{ maxWidth: '20px', maxHeight: '20px' }} />
      ),
      style: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    {
      key: 'description',
      label: 'Description',
      placeholder: 'No description',
      type: 'text',
      style: {
        textAlign: 'left',
        fontSize: FontSize.xsmall,
      },
    },
    {
      key: 'forks',
      label: 'Forks',
      type: 'number',
      sortable: true,
    },
    {
      key: 'stargazersCount',
      label: 'Stars',
      type: 'number',
      sortable: true,
    },
    {
      key: 'updatedAt',
      label: 'Last Updated',
      type: 'date',
      sortable: true,
      style: {
        fontSize: FontSize.xsmall,
      }
    },
  ];

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div style={{ ...styles, ...RepoListViewContainerStyles }}>
          { error ? <Toast message={error}/> : (
            <ListView items={repoList} columnProps={columnProps} onItemClick={handleRepoListItemClick}/>
          )}
        </div>
      )}
    </div>
  );
};