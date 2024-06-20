import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getParticipants, searchParticipants } from '../services/api'; 
import { Participant } from '../services/types';

const ParticipantList: React.FC = () => {
  const [participants, setParticipants] = useState<Map<number, Participant>>(new Map());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = () => {
    getParticipants()
      .then(response => {
        const participantsArray: Participant[] = response.data; 
        
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
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    searchParticipants(event.target.value)
      .then(response => {
        const participantsArray: Participant[] = response.data; 

        const participantsMap = new Map<number, Participant>();
        participantsArray.forEach(participant => {
          participantsMap.set(participant.id, participant);
        });

        setParticipants(participantsMap);
      })
      .catch(error => {
        setError('Error searching participants');
        console.error('Error searching participants:', error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Participants</h1>
      <Link to="/participants/new" className="btn btn-primary">Add New Participant</Link>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        className="mt-4 mb-4 p-2 border border-gray-300 rounded"
      />
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
