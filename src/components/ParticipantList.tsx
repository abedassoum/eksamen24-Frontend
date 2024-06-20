import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getParticipants, filterParticipants, searchParticipants } from '../api/api'; 
import { Participant } from '../services/types';

const ParticipantList: React.FC = () => {
  const [participants, setParticipants] = useState<Map<number, Participant>>(new Map());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterClub, setFilterClub] = useState<string>('');
  const [filterGender, setFilterGender] = useState<string>('');
  const [filterAge, setFilterAge] = useState<number | null>(null);
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
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    searchParticipants(searchValue)
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

  const handleFilter = () => {
    filterParticipants(searchTerm, filterClub, filterGender, filterAge)
      .then(response => {
        const participantsArray: Participant[] = response.data;

        const participantsMap = new Map<number, Participant>();
        participantsArray.forEach(participant => {
          participantsMap.set(participant.id, participant);
        });

        setParticipants(participantsMap);
      })
      .catch(error => {
        setError('Error filtering participants');
        console.error('Error filtering participants:', error);
      });
  };

  const handleClubChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const clubValue = event.target.value;
    setFilterClub(clubValue);
    filterParticipants(searchTerm, clubValue, filterGender, filterAge)
      .then(response => {
        const participantsArray: Participant[] = response.data;

        const participantsMap = new Map<number, Participant>();
        participantsArray.forEach(participant => {
          participantsMap.set(participant.id, participant);
        });

        setParticipants(participantsMap);
      })
      .catch(error => {
        setError('Error filtering participants');
        console.error('Error filtering participants:', error);
      });
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genderValue = event.target.value;
    setFilterGender(genderValue);
    filterParticipants(searchTerm, filterClub, genderValue, filterAge)
      .then(response => {
        const participantsArray: Participant[] = response.data;

        const participantsMap = new Map<number, Participant>();
        participantsArray.forEach(participant => {
          participantsMap.set(participant.id, participant);
        });

        setParticipants(participantsMap);
      })
      .catch(error => {
        setError('Error filtering participants');
        console.error('Error filtering participants:', error);
      });
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ageValue = event.target.value ? parseInt(event.target.value, 10) : null;
    setFilterAge(ageValue);
    filterParticipants(searchTerm, filterClub, filterGender, ageValue)
      .then(response => {
        const participantsArray: Participant[] = response.data;

        const participantsMap = new Map<number, Participant>();
        participantsArray.forEach(participant => {
          participantsMap.set(participant.id, participant);
        });

        setParticipants(participantsMap);
      })
      .catch(error => {
        setError('Error filtering participants');
        console.error('Error filtering participants:', error);
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
      <div className="flex gap-4">
        <select value={filterClub} onChange={handleClubChange} className="p-2 border border-gray-300 rounded">
          <option value="">All Clubs</option>
          <option value="Sport Club">Sport Club</option>
          <option value="Star Club">Star Club</option>
          <option value="Fighters Club">Fighters Club</option>
        </select>
        <select value={filterGender} onChange={handleGenderChange} className="p-2 border border-gray-300 rounded">
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="number"
          placeholder="Filter by age"
          value={filterAge || ''}
          onChange={handleAgeChange}
          className="p-2 border border-gray-300 rounded"
        />
        <button onClick={handleFilter} className="btn btn-primary">Filter</button>
      </div>
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

