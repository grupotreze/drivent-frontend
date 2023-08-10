import api from './api';

export async function getEnrolledActivitiesCount(token, activityId) {
  const response = await api.get(`/activities/${activityId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
}

export async function enrollActivity(token, activityId) {
  return await api.post(`/activities/${activityId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

export async function unenrollActivity(token, activityId) {
  return await api.delete(`/activities/${activityId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}
