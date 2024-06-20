import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

interface Participant {
  id: number;
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

const ParticipantDetail: React.FC = () => {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get(`/api/participants/${id}`)
      .then(response => setParticipant(response.data))
      .catch(error => console.error('Error fetching participant:', error));
  }, [id]);

  if (!participant) {
    return <div>Loading...</div>;
  }

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
    </div>
  );
};

export default ParticipantDetail;
