"use strict";

// https://github.com/strongloop/loopback/issues/624
module.exports = function(app) {
  /* var remotes = app.remotes();

  remotes.after('**', function(ctx, next) {
    ctx.result = {
      code: 200,
      message: ctx.methodString + ' success',
      data: ctx.result,
      result: 'success',
    };

    next();
  }); */
};
