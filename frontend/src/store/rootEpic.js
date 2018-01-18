import { combineEpics } from "redux-observable";
import { orgsUserPostEpic } from "../modules/userModule";
import { fetchOrgEpic, joinChannelEpic } from "../modules/orgsModule";
import { fetchChannelsEpic, uploadDocEpic, fetchDocsEpic } from "../modules/channelsModule";

export const rootEpic = combineEpics(
    orgsUserPostEpic,
    fetchOrgEpic,
    joinChannelEpic,
    fetchChannelsEpic,
    uploadDocEpic,
    fetchDocsEpic
);