import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail/:repoName" element={<div>Detail Page Placeholder</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
