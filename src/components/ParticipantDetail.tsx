import React, { useEffect, useState } from 'react';
import { getParticipantById } from '../services/api'; 
import { Participant } from '../services/types';
import { deleteParticipant } from '../services/api';
import { useNavigate, useParams, Link } from 'react-router-dom';


const ParticipantDetail: React.FC = () => {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getParticipantById(parseInt(id))
        .then(response => setParticipant(response.data))
        .catch(error => console.error('Error fetching participant:', error));
    }
  }, [id]);

  if (!participant) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    if (id && window.confirm('Are you sure you want to delete this participant?')) {
      deleteParticipant(parseInt(id))
        .then(() => navigate('/'))
        .catch(error => console.error('Error deleting participant:', error));
    }
  };

  return (
    <div>
      <h1>{participant.name}</h1>
      <p>Gender: {participant.gender}</p>
      <p>Age: {participant.age}</p>
      <p>Club: {participant.club}</p>
      <h2>Disciplines</h2>
      <ul>
        {participant.disciplines.map(discipline => (
          <li key={discipline.id}>{discipline.name}</li>
        ))}
      </ul>
      <h2>Results</h2>
      <ul>
        {participant.results.map(result => (
          <li key={result.id}>{result.resultType}: {result.resultValue} on {result.date}</li>
        ))}
      </ul>
      <Link to={`/participants/${participant.id}/edit`}>Edit Participant</Link>
      {id && (
          <button type="button" onClick={handleDelete} style={{ marginLeft: '10px', color: 'white' }}>
            Delete Participant
          </button>
        )}
    </div>
  );
};

export default ParticipantDetail;

