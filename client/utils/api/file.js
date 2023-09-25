import axios from 'axios';
import config from '../../config';

const axiosConfig = axios.create({
  baseURL: `${config.SERVER_URL}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json', // İstek veri türünü belirtin (örneğin JSON)
  },
});

export async function getFiles({ token }) {
  return new Promise(async (resolve, reject) => {
    try {
      axiosConfig
        .get('/files', { headers: { Authorization: token } })
        .then((res) => {
          resolve({ status: true, data: res.data });
        })
        .catch((err) => {
          reject({ status: false, message: 'Your session has expired. Redirected to login page...' });
        });
    } catch (error) {
      console.log('Try-catch block error on getFiles. Error:');
      console.log(error);
      reject({ status: false, message: 'Something went wrong.' });
    }
  });
}

export async function postFiles({ token, data }) {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('fileName', data.fileName);
      formData.append('file', data.file);

      axios
        .post(`${config.SERVER_URL}/files`, formData, { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } })
        .then((res) => {
          resolve({ status: true, message: 'File uploaded successfully.', data: res.data });
        })
        .catch((err) => {
          reject({ status: false, message: 'Something went wrong on postFiles. Error: ' + err });
        });
    } catch (error) {
      console.log('Try-catch block error on postFiles. Error:');
      console.log(error);
      reject({ status: false, message: 'Something went wrong.' });
    }
  });
}

export async function deleteFiles({ token, fileId }) {
  return new Promise(async (resolve, reject) => {
    try {
        axios
          .post(`${config.SERVER_URL}/files/${fileId}?_method=DELETE`, {}, { headers: { Authorization: token, 'Content-Type': 'application/json' } })
          .then((res) => {
            resolve({ status: true, message: res.data.message });
          })
          .catch((err) => {
            console.log(err);
            reject({ status: false, message: 'Something went wrong on deleteFiles.', error: err });
          });
    } catch (error) {
      console.log('Try-catch block error on deleteFiles. Error:');
      console.log(error);
      reject({ status: false, message: 'Something went wrong.' });
    }
  });
}

export async function updateFiles({ token, fileId, data }) {
  return new Promise(async (resolve, reject) => {
    try {
      axios
      .post(`${config.SERVER_URL}/files/${fileId}?_method=PUT`, data, { headers: { Authorization: token, 'Content-Type': 'application/json' } })
          .then((res) => {
            resolve({ status: true, message: res.data.message });
          })
          .catch((err) => {
            console.log(err);
            reject({ status: false, message: 'Something went wrong on updateFiles.', error: err });
          });
    } catch (error) {
      console.log('Try-catch block error on updateFiles. Error:');
      console.log(error);
      reject({ status: false, message: 'Something went wrong.' });
    }
  });
}

export async function getFile({ token, fileId }) {
  return new Promise(async (resolve, reject) => {
    try {
      axios
        .get(`${config.SERVER_URL}/files/${fileId}`, { headers: { Authorization: token, 'Content-Type': 'application/json' } })
        .then((res) => {
          resolve({ status: true, data: res.data });
        })
        .catch((err) => {
          console.log(err);
          if(err.response.status === 429){
            reject({ status: false, statusCode: err.response.status, message: err.response.data.message });
          }
        });
    } catch (error) {
      console.log('Try-catch block error on deleteFiles. Error:');
      console.log(error);
      reject({ status: false, message: 'Something went wrong.' });
    }
  });
}
