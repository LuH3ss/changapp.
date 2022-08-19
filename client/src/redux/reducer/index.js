import {
  GET_DETAILS,
  GET_ALL_SERVICES,
  SORT_SERVICES,
  GET_ALL_CATEGORIES,
  SERVICE_NAME,
} from "../actions/index.js";

const initialStates = {
  serviceDetail: [],
  services: [],
  servicesAux: [],
  categories: [],
};

const reducer = (state = initialStates, action) => {
  switch (action.type) {
    case GET_DETAILS:
      return {
        ...state,
        serviceDetail: action.payload,
      };
    case GET_ALL_SERVICES:
      return {
        ...state,
        services: action.payload,
        servicesAux: action.payload,
      };
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SERVICE_NAME:
      return {
        ...state,
        services: action.payload,
        servicesAux: action.payload,
      };
    case SORT_SERVICES:
      let sorted;
      if (action.payload === "Price") {
        sorted = state.services.sort(function (a, b) {
          return a.price - b.price;
        });
      } else {
        sorted = state.services.sort(function (a, b) {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      }
      return {
        ...state,
        services: sorted,
      };
    default:
      return state;
  }
};

export default reducer;
