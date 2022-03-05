import { combineReducers } from "redux";
import CartSlice from "./CartSlice";

export interface IRootState {}

const rootReducer = combineReducers<IRootState>({
  cart: CartSlice,
});

export default rootReducer;
