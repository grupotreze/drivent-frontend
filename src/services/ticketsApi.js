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

export async function getTicket(token) {
  const response = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
}

export async function createTicketPayment(token, body) {
  const response = await api.post('/payments/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
}
