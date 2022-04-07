export const addNewUser = async (userData) => {
  if (userData) {
    const response = await fetch(`/v1/user/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      return response.status;
    }
  }
  return null;
};

export const accessRequest = async (request) => {
  if (request) {
    const response = await fetch(`/v1/user/accessrequest`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    if (response.ok) {
      return response.status;
    }
  }
  return null;
};

export const getClubs = async () => {
  const response = await fetch(`/v1/session/clubs`);
  if (response.ok) {
    const jsonResponse = await response.json();
    return jsonResponse;
  }
  return null;
};

export const getSessions = async (clubId) => {
  const response = await fetch(`/v1/session/sessions?venue=${clubId}`);
  if (response.ok) {
    const jsonResponse = await response.json();
    return jsonResponse;
  }
  return null;
};
