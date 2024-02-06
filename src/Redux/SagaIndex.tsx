import {all} from"redux-saga/effects";
import watchApiCalls from "../Service/SagaApi";

export default function* rootSaga() {
    yield all([watchApiCalls()]);
  }