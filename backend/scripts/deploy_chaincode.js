require('../config.js');
const install = require('../app/install-chaincode.js');
const helper = require('../app/helper.js');

for (let org of ['org1', 'org2']) {
  if (org.indexOf('org') === 0) {
    const peers = ['peer1', 'peer2'];
    const chaincodeName = 'mycc';
    const chaincodePath = 'github.com/example_cc';
    const chaincodeVersion = 'v1';

    install.installChaincode(peers, chaincodeName, chaincodePath, chaincodeVersion, org)
      .then(function(message) {
        console.log(message);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}
