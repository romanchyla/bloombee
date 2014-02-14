// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({
  paths: {
    // Make vendor easier to access.
    "libs": "../libs",

    // Almond is used to lighten the output filesize.
    "almond": "../libs/bower/almond/almond",

    // Opt for Lo-Dash Underscore compatibility build over Underscore.
    "underscore": "../lib/bower/lodash/dist/lodash.underscore",

    // Map remaining vendor dependencies.
    "jquery": "../libs/bower/jquery/jquery",
    "backbone": "../libs/bower/backbone/backbone"
  },

  shim: {
    // This is required to ensure Backbone works as expected within the AMD
    // environment.
    "backbone": {
      // These are the two hard dependencies that will be loaded first.
      deps: ["jquery", "underscore"],

      // This maps the global `Backbone` object to `require("backbone")`.
      exports: "Backbone"
    }
  }
});
