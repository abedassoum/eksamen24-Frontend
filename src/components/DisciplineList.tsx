import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Discipline {
  id: number;
  name: string;
  resultType: string;
}

const DisciplineList: React.FC = () => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/disciplines')
      .then(response => {
        setDisciplines(response.data);
      })
      .catch(error => {
        setError('Error fetching disciplines');
        console.error('Error fetching disciplines:', error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Disciplines</h1>
      <Link to="/disciplines/new" className="btn btn-primary">Add New Discipline</Link>
      {error && <div className="text-red-500">{error}</div>}
      <ul>
        {disciplines.map(discipline => (
          <li key={discipline.id}>
            {discipline.name} - {discipline.resultType}
            <Link to={`/disciplines/${discipline.id}/edit`} className="btn btn-secondary">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisciplineList;
