import * as Types from "../Types/SagaTypes";

interface Data {
  id?: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  password: string;
  cpass: string;
  language: string;
  gender: string;
}

// Action Creators for POST operations
export const postdatarequest = (data: Data) => {
  return {
    type: Types.POST_REQUEST,
    payload: data,
  } ;
};

export const postdatasuccess = (data: Data) => {
  return {
    type: Types.POST_SUCCESS,
    payload: data,
  } ;
};

export const postdataerror = (data: string) => {
  return {
    type: Types.POST_ERROR,
    payload: data,
  } ;
};

// Action Creators for GET operations
export const getdatarequest = () => {
  return {
    type: Types.GET_REQUEST,
  } ;
};

export const getdatasuccess = (data: Data[]) => {
  return {
    type: Types.GET_SUCCESS,
    payload: data,
  } ;
};

export const getdataerror = (data: string) => {
  return {
    type: Types.GET_ERROR,
    payload: data,
  } ;
};

// Action Creators for GET by ID operations
export const getiddatarequest = (id: string) => {
  return {
    type: Types.GETID_REQUEST,
    payload: id,
  } ;
};

export const getiddatasuccess = (data: Data) => {
  return {
    type: Types.GETID_SUCCESS,
    payload: data,
  } ;
};

export const getiddataerror = (data: string) => {
  return {
    type: Types.GETID_ERROR,
    payload: data,
  } ;
};

// Action Creators for UPDATE operations
export const updatedataRequest = (data: Data) => {
  return {
    type: Types.UPDATE_REQUEST,
    payload: data,
  } ;
};

export const updatedataSuccess = (data: Data) => {
  return {
    type: Types.UPDATE_SUCCESS,
    payload: data,
  } ;
};

export const updatedataError = (data: string) => {
  return {
    type: Types.UPDATE_ERROR,
    payload: data,
  } ;
};

// Action Creators for DELETE operations
export const deleteDataRequest = (data: Data) => {
  return {
    type: Types.DELETE_REQUEST,
    payload: data,
  } ;
};

export const deleteDataSuccess = (data: string) => {
  return {
    type: Types.DELETE_SUCCESS,
    payload: data,
  } ;
};

export const deleteDataError = (data: string) => {
  return {
    type: Types.DELETE_ERROR,
    payload: data,
  } ;
};