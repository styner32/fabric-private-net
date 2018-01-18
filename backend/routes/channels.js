const fs = require('fs');
const router = require('express').Router();
const formidable = require('formidable');

const instantiate = require('../app/instantiate-chaincode.js');
const invoke = require('../app/invoke-transaction.js');
const helper = require('../app/helper.js');
const query = require('../app/query.js');

const chaincodeName = 'ndahandler';
const chaincodeVersion = 'v0';

router.get('/', function(req, res) {
  const channels = {};
  for (let org in helper.ORGS) {
    if (org.indexOf('org') === 0) {
      channels[helper.getChannelForOrg(org)._name] = true;
    }
  }

  res.json(Object.keys(channels));
});

router.post('/:channel_name/docs', function(req, res) {
  const channelName = req.params.channel_name;
  const functionName = 'create';

  console.log(req);

  const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    console.log('files', files);
    console.log('fields', fields);
    const oldpath = files.file.path,
          file_size = files.file.size,
          file_ext = files.file.name.split('.').pop(),
          index = oldpath.lastIndexOf('/') + 1,
          file_name = oldpath.substr(index);

    fs.readFile(oldpath, function(err, data) {
      query.getInstalledChaincodes('peer1', 'instantiated', req.username, req.orgname)
        .then(function(message) {
          if (!message.includes(chaincodeName)) {
            return instantiate.instantiateChaincode(channelName, chaincodeName, chaincodeVersion, ["a","100","b","200"], req.orgname);
          }
          return Promise.resolve();
        })
        .then(function() {
          return invoke.invokeChaincode(null, channelName, chaincodeName, functionName, ['doc', Buffer.from(data).toString('base64')], req.username, req.orgname)
        })
        .then(function(message) {
          res.status(200);
          res.json({'success': true});
        })
        .catch(function(err) {
          res.status(403);
          res.json({'success': false, 'err': error});
        })
    });
 });
});

router.get('/:channel_name/docs', function(req, res) {
  const channelName = req.params.channel_name;
  const functionName = 'getdoc';

  query.queryChaincode('peer1', channelName, chaincodeName, ['doc'], functionName, req.username, req.orgname)
    .then(function(message) {
      res.status(200);
      res.json({'success': true, 'base64': message});
    })
    .catch(function(err) {
      res.status(403);
      res.json({'success': false, 'err': error});
    });
});

module.exports = router;
