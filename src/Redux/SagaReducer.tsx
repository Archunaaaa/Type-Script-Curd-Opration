import * as types from "../Types/SagaTypes";

interface Employee {
  id: string;
}

interface State {
  employees: Employee[];
  employee: Employee | null;
  employeeId: string | null;
  selectedEmployee: Employee | null;
  isLoading?: boolean;
  error?: string | null;
  message?: string | null; 
  searchText?: string;
  selectedProducts?: string; 
  deleteSelectedDialogVisible?: boolean;
}

type Action =
  | { type: typeof types.POST_REQUEST | typeof types.GET_REQUEST | typeof types.GETID_REQUEST | typeof types.UPDATE_REQUEST | typeof types.DELETE_REQUEST }
  | { type: typeof types.POST_SUCCESS; payload: Employee }
  | { type: typeof types.POST_ERROR | typeof types.GET_ERROR | typeof types.GETID_ERROR | typeof types.UPDATE_ERROR | typeof types.DELETE_ERROR; payload: string }
  | { type: typeof types.GET_SUCCESS; payload: Employee[] }
  | { type: typeof types.GETID_SUCCESS | typeof types.UPDATE_SUCCESS; payload: Employee }
  | { type: typeof types.DELETE_SUCCESS; payload: string }
  | { type: "SET_LOADING"; value: boolean }
  | { type: "SET_SEARCH_TEXT"; value: string }
  | { type: "SET_SELECTED_PRODUCTS"; value: string }
  | { type: "SET_DELETE_SELECTED_DIALOG_VISIBLE"; payload: boolean }
  | { type: string; [key: string]: any };

const initialState: State = {
  employees: [],
  employee: null,
  employeeId: null,
  selectedEmployee: null,
};

const reducersaga = (state: State = initialState, action: Action): State => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case types.POST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.POST_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, action.payload],
        employee: action.payload,
        isLoading: false,
        error: null,
      };
    case types.POST_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
        error: null,
      };

    case types.GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.GET_SUCCESS:
      return {
        ...state,
        employeeId: null,
        employees: action.payload,
        selectedEmployee: null,
        employee: null,
      };
    case types.GET_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
        error: null,
      };

    case types.GETID_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.GETID_SUCCESS:
      return {
        ...state,
        selectedEmployee: action.payload,
        employeeId: action.payload.id,
        employee: null,
        isLoading: false,
        error: null,
      };

    case types.GETID_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
        error: null,
      };

    case types.UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case types.UPDATE_SUCCESS:
      const updatedEmployees = state.employees.map((employee) =>
        employee.id === action.payload.id ? action.payload : employee
      );
      return {
        ...state,
        employees: updatedEmployees,
        selectedEmployee: null,
        // employee: action.payload,
      };

    case types.UPDATE_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
        error: null,
      };

    case types.DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case types.DELETE_SUCCESS:
      const filteredEmployees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
      return {
        ...state,
        employees: filteredEmployees,
        employee: null,
      };

    case types.DELETE_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
        error: null,
      };

    case "SET_LOADING":
      return { ...state, isLoading: action.value };
    case "SET_SEARCH_TEXT":
      return { ...state, searchText: action.value };
    case "SET_SELECTED_PRODUCTS":
      return { ...state, selectedProducts: action.value };
    case "SET_DELETE_SELECTED_DIALOG_VISIBLE":
      return { ...state, deleteSelectedDialogVisible: action.payload };
    default:
      return state;
  }
};

export default reducersaga;