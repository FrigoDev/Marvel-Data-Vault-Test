import { combineReducers } from "redux";

import hideReducer from "./bookmarkHideReducer";
import bookmarkReducer from "./bookmarkReducer";

const reducer = combineReducers({
  bookmark: bookmarkReducer,
  hide: hideReducer,
});

export default reducer;
