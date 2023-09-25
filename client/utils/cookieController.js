import { cookies } from 'next/headers';

export async function setCookie(name, data) {
  return new Promise(async (resolve, reject) => {
    try {
      cookies().set({
        name: name,
        value: data,
        httpOnly: true,
        path: '/',
      });
      resolve({ message: 'Cookie created successfully.' });
    } catch (error) {
      console.log('Try-catch block error on getCookie. Error:');
      console.log(error);
      reject({ message: 'Cookie could not created.' });
    }
  });
}

export async function getCookie(name) {
  return new Promise(async (resolve, reject) => {
    try {
      var cookie = await cookies().get(name);
      if (cookie) {
        resolve({ token: cookie.value, message: 'Cookie found successfully.' });
      } else {
        reject({ token: undefined, message: 'Your session has expired. Redirected to login page...' });
      }
    } catch (error) {
      console.log('Try-catch block error on getCookie. Error:');
      console.log(error);
      reject({ token: undefined, message: 'Your session has expired. Redirected to login page...' });
    }
  });
}

export async function deleteCookie(name) {
  return new Promise(async (resolve, reject) =>{
    try {
      cookies().delete(name);
      resolve({message: 'Cookie deleted successfully.'});
    } catch (error) {
      console.log('Try-catch block error on getCookie. Error:');
      console.log(error);
      reject({ message: 'Something went wrong into deleteCookie func.', error });
    }
  })
}