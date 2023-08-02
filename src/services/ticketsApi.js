import api from './api';

export async function getTicketsTypes(token) {
  const response = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    } 
  }); 

  return response.data;
}

export async function createTicketReservation(token, ticketTypeId) {
  const response = await api.post('/tickets', { ticketTypeId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    } 
  }); 

  return response.data;
}
