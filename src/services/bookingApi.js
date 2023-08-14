import api from './api';

export async function getUserBooking(token) {
  const response = await api.get('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
}

export async function createUserBooking(token, body) {
  const response = await api.post('/booking', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
}

export async function changeUserBooking(token, body, bookingId) {
  const response = await api.put(`/booking/${bookingId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
}
