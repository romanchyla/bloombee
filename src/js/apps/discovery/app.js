console.log('loading app.js');
console.log(define);
define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var _ = require("underscore");
  var $ = require("jquery");
  var Backbone = require("backbone");
  console.log(_);
  console.log($);
  console.log(Backbone);
  console.log('finished loading reqs');
  
  // Alias the module for easier identification.
  var app = module.exports;

  // The root path to run the application through.
  app.root = "/js/apps/discovery";
  
  var test = require('js/modules/hello');
  console.log(test);
  test.showName('world');
  
});
