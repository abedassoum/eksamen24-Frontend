import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Result {
  id?: number;
  resultType: string;
  date: string;
  resultValue: string;
  disciplineId: number;
  participantId: number;
}

const ResultForm: React.FC = () => {
  const [result, setResult] = useState<Result>({
    resultType: '',
    date: '',
    resultValue: '',
    disciplineId: 0,
    participantId: 0
  });

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      axios.get(`/api/results/${id}`)
        .then(response => setResult(response.data))
        .catch(error => console.error('Error fetching result:', error));
    }
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setResult(prevResult => ({
      ...prevResult,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const request = id ? axios.put(`/api/results/${id}`, result) : axios.post(`/api/results`, result);

    request
      .then(() => navigate('/results'))
      .catch(error => console.error('Error saving result:', error));
  };

  return (
    <div>
      <h1>{id ? 'Edit Result' : 'Add New Result'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Result Type:</label>
          <select name="resultType" value={result.resultType} onChange={handleChange} required>
            <option value="">Select Result Type</option>
            <option value="Time">Time</option>
            <option value="Distance">Distance</option>
            <option value="Points">Points</option>
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input type="datetime-local" name="date" value={result.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Result Value:</label>
          <input type="text" name="resultValue" value={result.resultValue} onChange={handleChange} required />
        </div>
        <div>
          <label>Discipline ID:</label>
          <input type="number" name="disciplineId" value={result.disciplineId} onChange={handleChange} required />
        </div>
        <div>
          <label>Participant ID:</label>
          <input type="number" name="participantId" value={result.participantId} onChange={handleChange} required />
        </div>
        <button type="submit">Save Result</button>
      </form>
    </div>
  );
};

export default ResultForm;



