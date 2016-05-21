var loopback = require('loopback');

module.exports = function(Patient) {
	Patient.me = function(cb) {
		var userId = loopback.getCurrentContext().active.accessToken.userId;

    Patient.findOne( { id: userId }, function(err, patient) { 
    	cb(null, patient);
    });
  }


  Patient.remoteMethod(
    'me', 
    {
      http: { path: '/me', verb: 'get' },
      returns: { arg: 'patient', type: 'Patient', root: true }
    }
  );

};
