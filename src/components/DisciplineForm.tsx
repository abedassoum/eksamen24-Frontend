import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Discipline {
  id?: number;
  name: string;
  resultType: string;
}

const DisciplineForm: React.FC = () => {
  const [discipline, setDiscipline] = useState<Discipline>({
    name: '',
    resultType: ''
  });

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      axios.get(`/api/disciplines/${id}`)
        .then(response => setDiscipline(response.data))
        .catch(error => console.error('Error fetching discipline:', error));
    }
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setDiscipline(prevDiscipline => ({
      ...prevDiscipline,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const request = id ? axios.put(`/api/disciplines/${id}`, discipline) : axios.post('/api/disciplines', discipline);

    request
      .then(() => navigate('/disciplines'))
      .catch(error => console.error('Error saving discipline:', error));
  };

  return (
    <div>
      <h1>{id ? 'Edit Discipline' : 'Add New Discipline'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={discipline.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Result Type:</label>
          <select name="resultType" value={discipline.resultType} onChange={handleChange} required>
            <option value="">Select Result Type</option>
            <option value="Time">Time</option>
            <option value="Distance">Distance</option>
            <option value="Points">Points</option>
          </select>
        </div>
        <button type="submit">Save Discipline</button>
      </form>
    </div>
  );
};

export default DisciplineForm;
