var watson = require('watson-developer-cloud');
var async = require('async');

var tone_analyzer = watson.tone_analyzer({
  username: 'a3ddab35-61d4-44ee-be03-4e85debdb0f4',
  password: 'fzOcKiPtY37v',
  version: 'v3',
  version_date: '2016-05-19'
});

module.exports = function(MobileData) {
  MobileData.observe('before save', function filterProperties(ctx, next) {
        if (ctx.instance && ctx.instance.comment && ctx.instance.comment.desc) {
          async.waterfall([
            function(cb) {
              tone_analyzer.tone({ text: ctx.instance.comment.desc },
                function(err, tone) {
                  if (err) {
                    console.log(err);
                  } else {
                    cb(null, tone);
                  }
              });
            },
            function (tone, cb) {
              ctx.instance.comment.tone = tone;
              cb(null);
            }
          ], function (err, result) {
              if (err) next(err);
              if (!err) next();
          });
        } else {
          next();
        }
      });
};
