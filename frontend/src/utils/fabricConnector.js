import axios from "axios";
const API_HOST = "http://localhost:4000";

export const postUser = (username, orgName) =>
    axios.post(`${API_HOST}/users`, {
        username,
        orgName
    });



export const createUser = (credential) =>
    axios.post(`${API_HOST}/orgs/${credential.orgName}/users`, credential);



export const getOrgs = () => axios.get(`${API_HOST}/orgs`);

export default {
    postUser,
    createUser,
    getOrgs
};

//
// GET  /orgs
// POST /orgs/{}/users
// POST /orgs/{}/channels
// GET  /channels
// PUT  /orgs/{}/channels/{}
// GET  /channels/{}/docs