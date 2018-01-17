import { combineEpics } from "redux-observable";
import { fetchUserEpic } from "../modules/userModule";
import { fetchOrgEpic } from "../modules/orgsModule";

export const rootEpic = combineEpics(
    fetchUserEpic,
    fetchOrgEpic
);