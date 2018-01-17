const log4js = require('log4js');
const logger = log4js.getLogger('NDAapp');
const jwt = require('jsonwebtoken');
const hfc = require('fabric-client');
const router = require('express').Router();

const helper = require('../app/helper.js');
const common = require('./common');
const query = require('../app/query.js');
const channels = require('../app/create-channel.js');
const join = require('../app/join-channel.js');

router.get('/', function(req, res) {
  const orgs = [];
  for (let org in helper.ORGS) {
    if (org.indexOf('org') === 0) {
      orgs.push(org);
    }
  }

  res.json(orgs);
});

// Register and enroll user
router.post('/:org_name/users', function(req, res) {
	const username = req.body.username;
	const orgName = req.params.org_name;

	logger.debug('End point : /users');
	logger.debug('User name : ' + username + ' Org name  : ' + orgName);

	if (!username) {
		res.json(common.getErrorMessage('username'));
		return;
	}

	if (!orgName) {
		res.json(common.getErrorMessage('orgName'));
		return;
	}

	const token = jwt.sign({
		exp: Math.floor(Date.now() / 1000) + parseInt(hfc.getConfigSetting('jwt_expiretime')),
		username: username,
		orgName: orgName
	}, req.app.get('secret'));

  helper.getRegisteredUsers(username, orgName, true)
    .then(function(response) {
      if (response && typeof response !== 'string') {
        response.token = token;
        res.json(response);
      } else {
        res.json({
          success: false,
          message: response
        });
      }
    });
});

// Register and enroll user
router.post('/:org_name/channels', function(req, res) {
  const orgName = req.params.org_name;
  const org = helper.ORGS[orgName];
  const username = req.username;
  const channelName = 'mychannel';
  const channelConfigPath = '../../artifacts/channel/mychannel.tx';

  if (!org) {
		res.json(common.getErrorMessage('org_name'));
		return;
  }

  const peers = Object.keys(org.peers);

  // 1. Check if channel exists
  query.getChannels(peers[0], username, orgName)
    .then(function(response) {
      // 2. Create channel if does not exist
      if (response.channels.length > 0) {
        return Promise.reject({
          error: 'duplicate_request',
          error_description: 'you have joined the group'
        });
      }

      return channels.createChannel(channelName, channelConfigPath, orgName)
        .catch(function(err) {
          logger.warn('failed to create channel', err);
          // when it fails to create channel, tried to join
          return Promise.resolve();
        });
    })
    .then(common.delayPromise(5000))
    .then(function() {
      // 3. Join channel
      return join.joinChannel(channelName, peers, orgName);
    })
    .then(function(response) {
      res.json(response);
    })
    .catch(function(err) {
      res.status(403).json(err);
    });
});

module.exports = router;
