import axios from 'axios';
import React, { useContext } from 'react';
import { userContext } from '../../context/userContext';
const API_URL = 'https://personalweb-api.herokuapp.com/graphql';
// const API_URL = 'http://localhost:8080/graphql';

const constOptions = {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  url: API_URL,
};

// localStorage.getItem('token', JSON.stringify(token));

export const registerUser = async (query) => {
  const options = {
    method: constOptions.method,
    headers: constOptions.headers,
    data: query,
    url: constOptions.url,
  };
  try {
    console.log('register query ', options);
    const response = await axios(options);
    console.log('register response ', response?.data);
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};
export const createWebsite = async (data) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${data.token}`,
  };
  const options = {
    method: constOptions.method,
    headers,
    data: data.query,
    url: constOptions.url,
  };
  console.log('createWebsite query ', options);
  const response = await axios(options);
  console.log('createWebsite response ', response?.data);
  return response.data;
};
// handles new appointments
export const createAppointment = async (data) => {
  const headers = {
    ...constOptions.headers,
    Authorization: `Bearer ${data.token}`,
  };
  try {
    const response = await axios.post(constOptions.url, data.graphql, {
      headers,
    });
    console.log('createAppointment response ', response?.data);

    return response.data;
  } catch (err) {
    console.log('createAppointment error ', err?.response?.data);
    return err?.response?.data;
  }
};
export const getWebsite = async (data) => {
  const headers = {
    ...constOptions.headers,
  };
  try {
    const response = await axios.post(constOptions.url, data.graphql, {
      headers,
    });
    console.log('getWebsite response ', response?.data);
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};
export const getAppointments = async (data) => {
  const headers = {
    ...constOptions.headers,
    Authorization: `Bearer ${data.token}`,
  };
  try {
    const response = await axios.post(constOptions.url, data.graphql, {
      headers,
    });
    console.log('getAppointments response ', response?.data);
    return response.data;
  } catch (err) {
    console.log('getAppointments response ', err?.response?.data);
    return err?.response?.data;
  }
};
export const getCustomers = async (data) => {
  const headers = {
    ...constOptions.headers,
    Authorization: `Bearer ${data.token}`,
  };

  const options = {
    method: 'POST',
    headers,
    data: data.graphqlQuery,
    url: constOptions.url,
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};
export const updateAppointment = async (data) => {
  const headers = {
    ...constOptions.headers,
    Authorization: `Bearer ${data.token}`,
  };
  try {
    console.log('updateAppointment data.graphql,', data.graphql);
    const response = await axios.post(constOptions.url, data.graphql, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.log('updateAppointment err?.response?', err?.response);
    return err?.response?.data;
  }
};
export const imageUpload = async (data) => {
  // Authorization: `Bearer ${data.token}`,
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  const options = {
    method: constOptions.method,
    headers,
    data: data.query,
    url: constOptions.url,
  };
  console.log('image query ', options);
  const response = await axios(options);
  console.log('image response ', response?.data);
  return response.data;
};

export const signInUser = async (query) => {
  const options = {
    method: constOptions.method,
    headers: constOptions.headers,
    data: query,
    url: constOptions.url,
  };

  console.log('signInUser', options);
  try {
    const response = await axios(options);
    console.log('signInUser response', response);
    return response.data;
  } catch (err) {
    console.log('signInUser err?.response?', err?.response);
    return err?.response?.data;
  }
};
export const getGreet = async (token) => {
  const headers = {
    ...constOptions.headers,
    Authorization: `Bearer ${token}`,
  };
  const graphqlQuery = {
    query: `
    query {
      greet {
        name
      }
    }
    `,
  };
  const options = {
    method: 'POST',
    headers,
    data: graphqlQuery,
    url: constOptions.url,
  };
  console.log('requesting greet', options);
  const response = await axios(options);
  console.log(' greet response', response);

  return response.data;
};
export const getUserInfo = async (token) => {
  console.log('token in post ', token);
  const headers = {
    ...constOptions.headers,
    Authorization: `Bearer ${token}`,
  };
  const graphqlQuery = {
    query: `
    {
      userInfo {
        _id
        username
        email
        firstname
        lastname
        password
        phone
        role
       }
    }
    `,
  };
  const options = {
    method: 'POST',
    headers,
    data: graphqlQuery,
    url: constOptions.url,
  };
  try {
    const response = await axios(options);
    console.log('getUserINfo response ', response?.data);
    return response.data;
  } catch (err) {
    console.log('getUserINfo response ', response?.data);
    return err?.response?.data;
  }
};
