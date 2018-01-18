require('../config.js');
const helper = require('../app/helper.js');
const install = require('../app/install-chaincode.js');

let orgs = [];
for (let org in helper.ORGS) {
  if (org.indexOf('org') === 0) {
    orgs.push(org);
  }
}

const peers = ['peer1', 'peer2'];
const chaincodePath = 'github.com/ndahandler';
const chaincodeName = 'ndahandler';
const chaincodeVersion = 'v0';

const installPromises = [];
for (let org of orgs) {
  installPromises.push(install.installChaincode(peers, chaincodeName, chaincodePath, chaincodeVersion, org));
}

Promise.all(installPromises)
  .then(function(message) {
    console.log(message);
  })
  .catch(function(err) {
    console.log(err);
  });
