import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../Redux/Index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../Service/SagaApi";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);

export default store;