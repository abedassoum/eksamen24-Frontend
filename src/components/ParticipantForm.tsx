import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addParticipant, updateParticipant, getParticipantById } from '../api/api'; 
import { Participant, Discipline, Result } from '../services/types';

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
      getParticipantById(parseInt(id))
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

  const handleDisciplineChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setParticipant(prevParticipant => {
      const disciplines = [...prevParticipant.disciplines];
      disciplines[index] = { ...disciplines[index], [name]: value };
      return { ...prevParticipant, disciplines };
    });
  };

  const handleResultChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setParticipant(prevParticipant => {
      const results = [...prevParticipant.results];
      results[index] = { ...results[index], [name]: value };
      return { ...prevParticipant, results };
    });
  };

  const addDiscipline = () => {
    setParticipant(prevParticipant => ({
      ...prevParticipant,
      disciplines: [...prevParticipant.disciplines, { id: 0, name: '', resultType: '' }]
    }));
  };

  const addResult = () => {
    setParticipant(prevParticipant => ({
      ...prevParticipant,
      results: [...prevParticipant.results, { id: 0, resultType: '', date: '', resultValue: '', disciplineId: 0 }]
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitting participant:', JSON.stringify(participant, null, 2));  // Detailed log
    const request = id ? updateParticipant(parseInt(id), participant) : addParticipant(participant);
  
    request
      .then(() => navigate('/'))
      .catch(error => {
        console.error('Error saving participant:', error);
        if (error.response) {
          console.error('Error response data:', error.response.data);  // Log the response data from backend
        }
      });
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

        <div>
          <h2>Disciplines</h2>
          {participant.disciplines.map((discipline, index) => (
            <div key={index}>
              <label>Name:</label>
              <input type="text" name="name" value={discipline.name} onChange={e => handleDisciplineChange(index, e)} />
              <label>Result Type:</label>
              <input type="text" name="resultType" value={discipline.resultType} onChange={e => handleDisciplineChange(index, e)} />
            </div>
          ))}
          <button type="button" onClick={addDiscipline}>Add Discipline</button>
        </div>

        <div>
          <h2>Results</h2>
          {participant.results.map((result, index) => (
            <div key={index}>
              <label>Result Type:</label>
              <input type="text" name="resultType" value={result.resultType} onChange={e => handleResultChange(index, e)} />
              <label>Date:</label>
              <input type="date" name="date" value={result.date} onChange={e => handleResultChange(index, e)} />
              <label>Result Value:</label>
              <input type="text" name="resultValue" value={result.resultValue} onChange={e => handleResultChange(index, e)} />
              <label>Discipline ID:</label>
              <input type="number" name="disciplineId" value={result.disciplineId} onChange={e => handleResultChange(index, e)} />
            </div>
          ))}
          <button type="button" onClick={addResult}>Add Result</button>
        </div>

        <button type="submit">Save Participant</button>
      </form>
    </div>
  );
};

export default ParticipantForm;
