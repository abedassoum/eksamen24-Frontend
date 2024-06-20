import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Participant {
  id?: number;
  name: string;
  gender: string;
  age: number;
  club: string;
  disciplines: Discipline[];
  results: Result[];
}

interface Discipline {
  id: number;
  name: string;
  resultType: string;
}

interface Result {
  id: number;
  resultType: string;
  date: string;
  resultValue: string;
  disciplineId: number;
}

const ParticipantForm: React.FC = () => {
  const [participant, setParticipant] = useState<Participant>({
    name: '',
    gender: '',
    age: 0,
    club: '',
    disciplines: [],
    results: [],
  });

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      axios.get(`/api/participants/${id}`)
        .then(response => setParticipant(response.data))
        .catch(error => console.error('Error fetching participant:', error));
    }
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setParticipant(prevParticipant => ({
      ...prevParticipant,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const request = id ? axios.put(`/api/participants/${id}`, participant) : axios.post('/api/participants', participant);

    request
      .then(() => navigate('/'))
      .catch(error => console.error('Error saving participant:', error));
  };

  return (
    <div>
      <h1>{id ? 'Edit Participant' : 'Add New Participant'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={participant.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={participant.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={participant.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Club:</label>
          <input type="text" name="club" value={participant.club} onChange={handleChange} required />
        </div>
        <button type="submit">Save Participant</button>
      </form>
    </div>
  );
};

export default ParticipantForm;
