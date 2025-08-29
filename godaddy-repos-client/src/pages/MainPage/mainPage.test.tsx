import React from 'react';
import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import MainPage from './MainPage';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('MainPage', () => {
  beforeEach(() => {
    // Reset mocks before each test to ensure isolation
    mockedAxios.get.mockClear();
    mockedAxios.post.mockClear();
  });

  it('should fetch data on mount', async () => {
    const mockRepos = [{ id: 1, name: 'Repo1' }, { id: 2, name: 'Repo2' }];
    mockedAxios.get.mockResolvedValueOnce({ data: mockRepos }); // Mock the API response

    render(<MainPage />);

    // Wait for the asynchronous operation (API call and state update)
    await waitFor(() => {
      expect(screen.getByText('Repo1')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Repo2')).toBeInTheDocument();
    });

    // Verify that axios.get was called
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://api.github.com/orgs/godaddy/repos');
  });

  test('renders correctly with a specific text', () => {
    render(<MainPage />);

    // Assert Title is rendered
    expect(screen.getByText(/GoDaddy Repositories/i)).toBeInTheDocument();

    // Assert Subtitle is rendered
    expect(screen.getByText(/Explore the list of repositories/i)).toBeInTheDocument();
  });
});