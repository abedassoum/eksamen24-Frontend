import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getParticipants } from '../services/api';

interface Participant {
  id: number;
  name: string;
  gender: string;
  age: number;
  club: string;
}

const ParticipantList: React.FC = () => {
  const [participants, setParticipants] = useState<Map<number, Participant>>(new Map());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getParticipants()
      .then(response => {
        const participantsArray: Participant[] = response.data; 
        console.log(participantsArray); 
        
       
        const participantsMap = new Map<number, Participant>();
        participantsArray.forEach(participant => {
          participantsMap.set(participant.id, participant);
        });

        setParticipants(participantsMap);
      })
      .catch(error => {
        setError('Error fetching participants');
        console.error('Error fetching participants:', error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Participants</h1>
      <Link to="/participants/new" className="btn btn-primary">Add New Participant</Link>
      {error && <div className="text-red-500">{error}</div>}
      <ul>
        {[...participants.values()].map(participant => (
          <li key={participant.id}>
            <Link to={`/participants/${participant.id}`}>{participant.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;
