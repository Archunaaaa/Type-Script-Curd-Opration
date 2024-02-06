import axios, { AxiosInstance } from "axios";

export const API_URL ="https://64d60e47754d3e0f13618812.mockapi.io/form/"
;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
});

export interface UserData { 
  name: string;
  email: string;
  phone: string;
  password?: string;
  cpass?: string;
  language: string;
  gender: string;
  dob: string;
}

const USER_API_URL = "Usestate";


export const createUser = async (userdata: UserData) => {
  try {
    const response = await axiosInstance.post(USER_API_URL, userdata);
    console.log(response);
    return response;
   
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id: string, userdata: UserData) => {
  try {
    const response = await axiosInstance.put(`${USER_API_URL}/${id}`, userdata);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await axiosInstance.get(`${USER_API_URL}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`${USER_API_URL}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(USER_API_URL);
    return response;
  } catch (e) {
    throw e;
  }
};

export default UserData;