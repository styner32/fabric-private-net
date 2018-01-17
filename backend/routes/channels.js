const router = require('express').Router();
const helper = require('../app/helper.js');

router.get('/', function(req, res) {
  const channels = {};
  for (let org in helper.ORGS) {
    if (org.indexOf('org') === 0) {
      channels[helper.getChannelForOrg(org)._name] = true;
    }
  }

  res.json(Object.keys(channels));
});

module.exports = router;
