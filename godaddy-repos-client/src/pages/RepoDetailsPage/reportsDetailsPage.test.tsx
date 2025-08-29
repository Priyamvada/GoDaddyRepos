import React from 'react';
import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import RepoDetailsPage from './RepoDetailsPage';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('RepoDetailsPage', () => {
    it('should fetch data on mount', async () => {
      beforeEach(() => {
      // Reset mocks before each test to ensure isolation
      mockedAxios.get.mockClear();
      mockedAxios.post.mockClear();
    });

    const mockRepoItem = {
      id: 1,
      name: 'Repo1',
      description: 'Repo1 description',
      language: 'Python',
      forks: 10,
      openIssues: 5,
      watchers: 20,
      htmlUrl: 'https://github.com/godaddy/Repo1',
      owner: { id: 1, login: 'godaddy'}
    };
    mockedAxios.get.mockResolvedValueOnce({ data: mockRepoItem }); // Mock the API response

    render(<RepoDetailsPage />);

    // Wait for the asynchronous operation (API call and state update)
    await waitFor(() => {
      expect(screen.getByText('Repo1')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Repo1 description')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Python')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Forks: 10')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Open Issues: 5')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Watchers: 20')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('View on GitHub')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Owner: godaddy')).toBeInTheDocument();
    });
    
    // Verify that axios.get was called
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://api.github.com/repos/godaddy/Repo1');
  });

  test('renders correctly with a specific text', () => {
    render(<RepoDetailsPage />);

    // Assert Title is rendered
    expect(screen.getByText(/Repository Details/i)).toBeInTheDocument();
  });
});