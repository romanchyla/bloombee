bloombee
=========

Clever face for BEER, better discovery for researchers

OK, so word of introduction into this bright new world of perplexity. Mistakes 
are wonderful gifts to humans, we ARE EXPECTED to make mistakes as we make 
progress. IT IS OK TO MAKE MISTAKES. Please let no 'getting it right' kill 
your creativity!


Face of this application as well as inner workings may change dramatically, 
until we are satisfied and we find THE sweetspot.



dev setup
=========

If you don't have node.js, do this (or equivalent of your distribution):

  $ sudo apt-get install node npm grunt-cli


Now (inside the project), run:
  
  $ npm install
  $ grunt setup 


And you are ready to go!


Explanation of the module structure:
====================================

I have discovered that none of the boilerplate generators are perfect (surprise ;)) and so I have taken inspiration from these:

  - https://github.com/backbone-boilerplate/backbone-boilerplate
  - https://github.com/jkat98/benm
  - https://github.com/artsy/ezel


This is the current file/folder structure, with short explanation:  
  
/bloombee.
   |-package.json
   |-bower.json
   |-Gruntfile.json   
   |-/bower_components
   |-/dist
   |-/node_modules
   |-/src
   |---apps
   |-----discovery
   |-------img
   |-------styles
   |-------templates
   |---collections
   |---components
   |---libs
   |---modules
   |---views
   |-/test
   |---mocha
   |-----apps
   |-------discovery
  

Because npm (browserify) is not yet ready to package libraries for client development, we are using bower. It works great, but mind the following:

  - bower.json: specifies libraries that are needed for client-side ie. 
         inside browser (e.g. backbone)
  - package.json: lists libraries that are necessary for development
         (e.g. grunt, webserver) and for server-side
         
         
Gruntfile.json
  - various instructions and commands, run: grunt --help
  
  
/bower_components
/node_modules

  - these will be created once you setup your environment
  
/dist

  - here we export the deployment-ready version of the code (compacted,
    minified, ready to be included into flask)
    
/src

  - ./apps: because we want to develop separate applications (e.g. discovery,
    private libraries) I decided to keep them all here.
    
    - the normal boilerplate libraries are made for situations when you are 
      building *one* application; but we want to build several apps and 
      reuse the code
      
    - each application resides in its own folder, eg. ./apps/discovery and
      will have the standardized structure:
        - app.js
        - routes.js
        - ....
        
    - (it seems) that each application may have to carry its own static
      folders, eg. /styles /templates [but maybe we should create
      some mirroring tree just for the static files? Depends on what you
      consider to be a code: templates and css can be viewed as such]
     
  - ./modules
    ./models
    ./collections
    ./views
    
    - these folders should hold the *general, reusable* code that we develop,
      and that we want to reuse inside apps
    
  - ./libs: created automatically, when you run grunt setup - contains
    all external dependencies (ie. backbone, requirejs)
    
/test
 
  - ./mocha
  
    - because we may want to use several javascript testing frameworks (but maybe
      it is not necessary, maybe one can do all what we need...) I decide to keep
      the standard structure: [framework]/<tree>
      
    - the folder will mirror the code tree, eg.:
    
      ./mocha
         |
         /apps
         |  |
         |  /discovery
         |     |
         |     router.specs.js
         |     main.specs.js
         |  ...   
         /modules
             |
             facets.specs.js
         
    

             
You can refer to the following page for more links and discussion: 
http://labs.adsabs.harvard.edu/trac/ads-invenio/wiki/BackboneResources



Todo:
=====

- use https://github.com/yeoman/grunt-bower-requirejs instead of grunt-bbb
