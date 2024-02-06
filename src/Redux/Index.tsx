import { combineReducers } from "redux";
import reducersaga from "../Redux/SagaReducer";

const rootReducer = combineReducers({
  reducersaga:reducersaga,
  
});

export default rootReducer;