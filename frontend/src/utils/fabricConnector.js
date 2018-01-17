const API_HOST = "http://localhost:4000";

class FabricConnector {
    postUser(username, orgName) {
        return new Promise((resolve, reject) => {
            fetch(`${API_HOST}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    orgName
                })
            })
                .then(response => response.json())
                .then((json) => {
                    console.log(json);
                    resolve(json);
                })
                .catch((e) => {
                    console.log('error', e);
                    reject();
                });
        });
    }

    getOrgs() {
        return new Promise((resolve, reject) => {
            fetch(`${API_HOST}/orgs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log(json);
                    resolve(json);
                })
                .catch((e) => {
                    console.log('error', e);
                    reject();
                });
        });
    }
}

export default new FabricConnector();
