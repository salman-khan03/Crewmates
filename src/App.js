import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CrewList from './components/CrewList';
import CrewmateInfo from './components/CrewmateInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CrewList />} />
        <Route path="/crewmate/:id" element={<CrewmateInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
