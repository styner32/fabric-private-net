require('../config.js');
const install = require('../app/install-chaincode.js');
const instantiate = require('../app/instantiate-chaincode.js');
const helper = require('../app/helper.js');
const channels = require('../app/create-channel.js');

let orgs = [];
for (let org in helper.ORGS) {
  if (org.indexOf('org') === 0) {
    orgs.push(org);
  }
}

const channelName = 'mychannel';
const chaincodeName = 'mycc';
const chaincodePath = 'github.com/example_cc';
const chaincodeVersion = 'v0';
const channelConfigPath = '../../artifacts/channel/mychannel.tx';

// create channel
channels.createChannel(channelName, channelConfigPath, orgs[0])
  .then(function() {
    // Deploy chaincode to each org
    const installPromises = [];
    for (let org of orgs) {
      const peers = ['peer1', 'peer2'];
      installPromises.push(install.installChaincode(peers, chaincodeName, chaincodePath, chaincodeVersion, org));
    }

    Promise.all(installPromises)
      .then(function(msg) {
        // Instaniate chaincode from first org
        const args = ['a', '100', 'b', '200'];
        return instantiate.instantiateChaincode(channelName, chaincodeName, chaincodeVersion, args, orgs[0]);
      })
      .then(function(message) {
        console.log(message);
      })
      .catch(function(err) {
        console.log(err);
      });
  })
  .catch(function(err) {
    console.log('failed to create a channel', err);
  });
