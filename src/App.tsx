import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ParticipantList from './components/ParticipantList';
import ParticipantForm from './components/ParticipantForm';
import ParticipantDetail from './components/ParticipantDetail';
import DisciplineList from './components/DisciplineList';
import DisciplineForm from './components/DisciplineForm';
import ResultForm from './components/ResultForm';

const Home: React.FC = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold">Home Page</h1>
    <nav>
      <ul>
        <li><Link to="/participants" className="text-blue-500">Participants</Link></li>
        <li><Link to="/disciplines" className="text-blue-500">Disciplines</Link></li>
      </ul>
    </nav>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/participants" element={<ParticipantList />} />
        <Route path="/participants/new" element={<ParticipantForm />} />
        <Route path="/participants/:id" element={<ParticipantDetail />} />
        <Route path="/participants/:id/edit" element={<ParticipantForm />} />
        <Route path="/disciplines" element={<DisciplineList />} />
        <Route path="/disciplines/new" element={<DisciplineForm />} />
        <Route path="/disciplines/:id/edit" element={<DisciplineForm />} />
        <Route path="/results/new" element={<ResultForm />} />
        <Route path="/results/:id/edit" element={<ResultForm />} />
      </Routes>
    </Router>
  );
};

export default App;





