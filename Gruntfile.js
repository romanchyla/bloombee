module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // Wipe out previous builds and test reporting.
    clean: ["dist/", "test/reports"],
    
    // This will install libraries (client-side dependencies)
    bower: {
      install: {
        options: {
          targetDir: './src/libs'
        }
      }
    },

    // Run your source code through JSHint's defaults.
    jshint: ["src/js/**/*.js"],
    

    // This task uses James Burke's excellent r.js AMD builder to take all
    // modules and concatenate them into a single file.
    requirejs: {
      
      baseUrl: 'src/js', // this is needed just for the 'stupid' list task
      
      options: {
        //baseUrl: 'src/js',
        //mainConfigFile: "src/js/config.js",
        dir: 'dist/js',
        baseUrl: 'src/js'
        //appDir:'src/js'
      },
      
      release: {
        options: {
          generateSourceMaps: true,
          
          optimize: "uglify2",

          // Since we bootstrap with nested `require` calls this option allows
          // R.js to find them.
          findNestedDependencies: true,

          // Include a minimal AMD implementation shim.
          name: "../libs/almond/almond",

          // Wrap everything in an IIFE.
          wrap: true,

          // Do not preserve any license comments when working with source
          // maps.  These options are incompatible.
          preserveLicenseComments: false
        }
      }
    },
    

    // Minfiy the distribution CSS.
    cssmin: {
      combine: {
        // without this the imports are simply eaten (though css-clean
        // added support for imports, it doesn't seem to work
        options: {
           processImport: false
        },
        files: {
          //cwd: 'dist',
          "dist/css/style.min.css" : ["src/css/*.css", "src/js/apps/**/css/*.css"]
        }
      }
    },

    server: {
      options: {
        host: "0.0.0.0",
        port: 8000
      },

      development: {},

      release: {
        options: {
          prefix: "dist"
        }
      },

      test: {
        options: {
          forever: false,
          port: 8001
        }
      }
    },

    processhtml: {
      release: {
        files: {
          "dist/index.html": ["index.html"]
        }
      }
    },

    // Move libs and src logic during a build.
    copy: {
      release: {
        files: [
          {
            expand: true,
            src: ["./src/**"],
            dest: "dist/",
            rename: function(dest,src) {
              //grunt.verbose.writeln("src" + src);
              return dest + src.replace('/src/', '/');
            }
          }
        ]
      }
    },

    compress: {
      release: {
        options: {
          archive: "dist/source.min.js.gz"
        },

        files: ["dist/source.min.js"]
      }
    },

    // Unit testing is provided by Karma.  Change the two commented locations
    // below to either: mocha, jasmine, or qunit.
    karma: {
      options: {
        basePath: process.cwd(),
        singleRun: true,
        captureTimeout: 7000,
        autoWatch: true,

        reporters: ["progress", "coverage"],
        browsers: ["PhantomJS"],

        // Change this to the framework you want to use.
        frameworks: ["mocha"],

        plugins: [
          "karma-jasmine",
          "karma-mocha",
          "karma-qunit",
          "karma-phantomjs-launcher",
          "karma-coverage"
        ],

        preprocessors: {
          "src/js/**/*.js": "coverage"
        },

        coverageReporter: {
          type: "lcov",
          dir: "test/coverage"
        },

        files: [
          // You can optionally remove this or swap out for a different expect.
          "src/libs/chai/chai.js",
          "src/libs/requirejs/require.js",
          "test/runner.js",

          {
            pattern: "src/js/**/*.*",
            included: false
          },
          // Derives test framework from Karma configuration.
          {
            pattern: "test/<%= karma.options.frameworks[0] %>/**/*.spec.js",
            included: false
          }
          
        ]
      },

      // This creates a server that will automatically run your tests when you
      // save a file and display results in the terminal.
      daemon: {
        options: {
          singleRun: false
        }
      },

      // This is useful for running the tests just once.
      run: {
        options: {
          singleRun: true
        }
      }
    },

    coveralls: {
      options: {
        coverage_dir: "test/coverage/PhantomJS 1.9.2 (Linux)/"
      }
    },
    
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/js/**/*.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    }
  });

  // Grunt BBB tasks.
  grunt.loadNpmTasks("grunt-bbb-server");
  grunt.loadNpmTasks("grunt-bbb-requirejs"); // we use 'list' target only, requirejs will get overriden
  
  // Grunt contribution tasks.
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-compress");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Third-party tasks.
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks("grunt-karma-coveralls");
  grunt.loadNpmTasks("grunt-processhtml");

  
  
  // deactivated since the code is 'silly' it allows
  // only for hardcoded targets
  // grunt.loadNpmTasks("grunt-bbb-styles");
  
  // Bower tasks
  grunt.loadNpmTasks('grunt-bower-task');

  // Create an aliased test task.
  grunt.registerTask("test", ["karma:run"]);
  
  // Create an aliased test task.
  grunt.registerTask("setup", 'Sets up the development environment', ["bower"]);

  // When running the default Grunt command, just lint the code.
  grunt.registerTask("default", [
    "clean",
    "jshint",
    "processhtml",
    "copy",
    "requirejs",
    "cssmin",
  ]);
};
