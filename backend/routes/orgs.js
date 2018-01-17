const log4js = require('log4js');
const logger = log4js.getLogger('SampleWebApp');
const jwt = require('jsonwebtoken');
const hfc = require('fabric-client');
const helper = require('../app/helper.js');
const router = require('express').Router();
const common = require('./common');

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

	helper.getRegisteredUsers(username, orgName, true).then(function(response) {
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

module.exports = router;
