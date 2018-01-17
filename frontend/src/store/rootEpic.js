import { combineEpics } from "redux-observable";
import { fetchUserEpic } from "../modules/userModule";

export const rootEpic = combineEpics(
    fetchUserEpic
);