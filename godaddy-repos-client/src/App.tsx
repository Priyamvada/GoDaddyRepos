import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import './App.css';
import RepoDetailsPage from './pages/RepoDetailsPage/RepoDetailsPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/repoDetails/:repoName" element={<RepoDetailsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
