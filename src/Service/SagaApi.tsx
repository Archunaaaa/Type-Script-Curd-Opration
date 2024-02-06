import { put, takeLatest, call } from "redux-saga/effects";
import {
  createUser,
  getUsers,
  updateUser,
  getUser,
  deleteUser,
} from "../Service/Api";
import * as types from "../Types/SagaTypes";
import {
  postdataerror,
  postdatasuccess,
  getdatasuccess,
  getdataerror,
  getiddatasuccess,
  getiddataerror,
  updatedataError,
  updatedataSuccess,
  deleteDataSuccess,
  deleteDataError,
} from "../Action/SagaAction";

interface Action {
    type: string;
    payload: any; 
  }
  
  export function* Postdatadetails(action: Action): Generator<any, void, any> {
    console.log(action.payload);
    try {
      const response: any = yield call(createUser, action.payload);
      if (response.status === 200 || response.status === 201) {
        yield put(postdatasuccess(action.payload));
      }
    } catch (error: any) {
      yield put(postdataerror(error));
    }
  }
  
  export function* getdatadetails(): Generator<any, void, any> {
    try {
      const getresponse: any = yield call(getUsers);
      const result = getresponse.data;
      if (getresponse.status === 200 || getresponse.status === 201) {
        yield put(getdatasuccess(result));
      }
    } catch (error: any) {
      yield put(getdataerror(error));
    }
  }
  
  export function* getiddatadetails(action: Action): Generator<any, void, any> {
    try {
      const id = action.payload;
      const getidresponse: any = yield call(getUser, id);
      if (getidresponse.status === 200 || getidresponse.status === 201) {
        yield put(getiddatasuccess(getidresponse.data));
      }
    } catch (error: any) {
      yield put(getiddataerror(error));
    }
  }
  
  export function* updatedata(action: Action): Generator<any, void, any> {
    try {
      const updatedata = action.payload;
      const id = updatedata.id;
      const updateresponse: any = yield call(updateUser, id, updatedata);
      if (updateresponse.status === 200 || updateresponse.status === 201) {
        yield put(updatedataSuccess(updateresponse));
      }
    } catch (error: any) {
      yield put(updatedataError(error));
    }
  }
  
  function* deleteData(action: Action): Generator<any, void, any> {
    try {
      const id = action.payload.id;
      const deleteResponse: any = yield call(deleteUser, id);
      if (deleteResponse.status === 200 || deleteResponse.status === 201) {
        yield put(deleteDataSuccess(id));
      }
    } catch (error: any) {
      yield put(deleteDataError(error));
    }
  }
  
  function* watchApiCalls() {
    yield takeLatest(types.POST_REQUEST, Postdatadetails);
    yield takeLatest(types.GET_REQUEST, getdatadetails);
    yield takeLatest(types.GETID_REQUEST, getiddatadetails);
    yield takeLatest(types.UPDATE_REQUEST, updatedata);
    yield takeLatest(types.DELETE_REQUEST, deleteData);
  }
  
  export default watchApiCalls;