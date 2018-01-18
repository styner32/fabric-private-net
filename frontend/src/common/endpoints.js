import constants from "./constants";

//unauthenticated
//     ~GET  /orgs~
export const ORGS = `${constants.API_HOST}/orgs`;
//     ~POST /orgs/:org_name/users~
export const ORGS_USERS = (orgId) => `${constants.API_HOST}/orgs/${orgId}/users`;

//authenticated
//     ~GET  /channels~
export const CHANNELS = `${constants.API_HOST}/channels`;
//     ~POST /orgs/:org_name/channels~
//     ~PUT  /orgs/:org_name/channels/:channel_name~
export const ORGS_CHANNELS = (orgId, channelId) => `${constants.API_HOST}/orgs/${orgId}/channels${channelId ? "/"+channelId : ""}`;