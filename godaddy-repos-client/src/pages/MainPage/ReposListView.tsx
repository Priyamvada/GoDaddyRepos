import React, { useEffect, useState } from 'react';
import { fetchRepoList } from '../../data/repoListDataProvider';
import { ListView, ColumnProps, Toast, LoadingSpinner } from '../../components';
import { FontSize, FontWeight, Icons } from '../../assets';
import { ListItem } from '../../components/ListView/listView.types';

interface RepoListViewProps {
  styles?: React.CSSProperties;
}

const RepoListViewContainerStyles: React.CSSProperties = {
  padding: '10px 20px',
};

const languageIcon: { [key: string]: string } = {
  JavaScript: Icons.javaScript,
  Python: Icons.python,
  Ruby: Icons.ruby,
  PHP: Icons.php,
  'Objective-C': Icons.objC,
  'C#': Icons.csharp,
  default: Icons.genericCode,
};

export const ReposListView: React.FC<RepoListViewProps> = ({ styles }) => {
  const [repoList, setRepoList] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

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
          src={languageIcon[item?.data?.language] ?? languageIcon['default'] }
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
            <ListView items={repoList} columnProps={columnProps} />
          )}
        </div>
      )}
    </div>
  );
};