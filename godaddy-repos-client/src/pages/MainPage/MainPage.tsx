import React from 'react';
import { ReposListView } from './ReposListView';
import PageHeader from '../../components/PageHeader/PageHeader';

const MainPage: React.FC = () => {
  return (
    <div>
      <PageHeader title="GoDaddy Repositories" subtitle="Explore the list of repositories" />
      <ReposListView />
    </div>
  );
};

export default MainPage;