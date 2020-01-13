import api from './api';

const handleGetCall = (id = '') => {
  return fetch(`${api.listDataService}/${id}`);
};

const handlePutCall = (details) => {
  return new Promise((resolve, reject) => {
    fetch(`${api.listDataService}/${details.id}`, {
      method: 'put',
      body: JSON.stringify(details),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(async (data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getAll = async () => {
  try {
    return await (await handleGetCall()).json();
  } catch (err) {
    console.error(err);

    return [];
  }
};

export const getOne = async (id) => {
  return await (await handleGetCall(id)).json();
};

export const putOne = async (details) => {
  return await (await handlePutCall(details)).json();
};
