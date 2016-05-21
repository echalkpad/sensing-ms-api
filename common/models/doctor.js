var loopback = require('loopback');

module.exports = function(Doctor) {
	Doctor.me = function(cb) {
		var userId = loopback.getCurrentContext().active.accessToken.userId;

    Patient.findOne( { id: userId }, function(err, doctor) { 
    	cb(null, doctor);
    });
  }
   
  Doctor.remoteMethod(
    'me', 
    {
    	http: { path: '/me', verb: 'get' },
      returns: { arg: 'doctor', type: 'Doctor', root: true }
    }
  );
};
