import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteDiscipline, getDisciplines } from '../services/api'; 

interface Discipline {
  id: number;
  name: string;
  resultType: string;
}

const DisciplineList: React.FC = () => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    getDisciplines()
      .then(response => {
        setDisciplines(response.data);
      })
      .catch(error => {
        setError('Error fetching disciplines');
        console.error('Error fetching disciplines:', error);
      });
  }, []);

  const handleDelete = (disciplineId: number) => {
    if (window.confirm('Are you sure you want to delete this discipline?')) {
      deleteDiscipline(disciplineId)
        .then(() => {
          setDisciplines(disciplines.filter(discipline => discipline.id !== disciplineId));
        })
        .catch(error => console.error('Error deleting discipline:', error));
    }
  };

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
            <button 
              type="button" 
              onClick={() => handleDelete(discipline.id)} 
              style={{ marginLeft: '10px', color: 'white' }}
            >
              Delete Discipline
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisciplineList;
