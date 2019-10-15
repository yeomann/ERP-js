"use strict";

// https://github.com/strongloop/loopback/issues/624
module.exports = function(app) {
  /* var remotes = app.remotes();

  remotes.options.rest = remotes.options.rest || {};
  remotes.options.rest.handleErrors = false;

  app.middleware('final', FinalErrorHandler);

  function FinalErrorHandler(err, req, res, next) {
    console.log(err);
    res.status(400).send({
      code: 400,
      message: err.message,
      data: {},
      result: 'fail',
    }).end();
  } */
};
