import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_DEV_API_BASE_URL;

export const getParticipants = () => {
  console.log('Fetching participants...');
  return axios.get(`${API_BASE_URL}/api/participants`)
    .then(response => {
      console.log('Response received:', response.data);
      return response;
    })
    .catch(error => {
      console.error('Error fetching participants:', error);
      throw error;
    });
};

export const getParticipantById = (id: number) => {
  console.log(`Fetching participant with ID: ${id}`);
  return axios.get(`${API_BASE_URL}/api/participants/${id}`)
    .then(response => {
      console.log('Response received:', response.data);
      return response;
    })
    .catch(error => {
      console.error(`Error fetching participant with ID ${id}:`, error);
      throw error;
    });
};


export const addParticipant = (participant: unknown) => {
  return axios.post(`${API_BASE_URL}/api/participants`, participant);
};

export const updateParticipant = (id: number, participant: unknown) => {
  return axios.put(`${API_BASE_URL}/api/participants/${id}`, participant);
};

export const deleteParticipant = (id: number) => {
  return axios.delete(`${API_BASE_URL}/api/participants/${id}`);
};

export const getDisciplines = () => {
  return axios.get(`${API_BASE_URL}/api/disciplines`);
};

export const getDisciplineById = (id: number) => {
  return axios.get(`${API_BASE_URL}/api/disciplines/${id}`);
};

export const addDiscipline = (discipline: unknown) => {
  return axios.post(`${API_BASE_URL}/api/disciplines`, discipline);
};

export const updateDiscipline = (id: number, discipline: unknown) => {
  return axios.put(`${API_BASE_URL}/api/disciplines/${id}`, discipline);
};

export const deleteDiscipline = (id: number) => {
  return axios.delete(`${API_BASE_URL}/api/disciplines/${id}`);
};

export const getResults = () => {
  return axios.get(`${API_BASE_URL}/api/results`);
};

export const getResultById = (id: number) => {
  return axios.get(`${API_BASE_URL}/api/results/${id}`);
};

export const addResult = (result: any) => {
  return axios.post(`${API_BASE_URL}/api/results`, result);
};

export const updateResult = (id: number, result: any) => {
  return axios.put(`${API_BASE_URL}/api/results/${id}`, result);
};

export const deleteResult = (id: number) => {
  return axios.delete(`${API_BASE_URL}/api/results/${id}`);
};



