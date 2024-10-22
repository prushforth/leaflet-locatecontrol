module.exports = function (grunt) {
  var banner = "/*! Version: <%= pkg.version %>\nCopyright (c) 2016 Dominik Moritz */\n";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    uglify: {
      options: {
        banner: banner,
        preserveComments: false,
        sourceMap: true
      },
      build: {
        files: [
          {
            src: "dist/L.Control.Locate.umd.js",
            dest: "dist/L.Control.Locate.min.js"
          },
          {
            src: "dist/L.Control.Locate.esm.js",
            dest: "dist/L.Control.Locate.esm.min.js"
          }
        ]
      }
    },
    sass: {
      options: {
        implementation: require("sass"),
        sourceMap: false
      },
      dist: {
        options: {
          style: "compressed"
        },
        files: {
          "dist/L.Control.Locate.min.css": "src/L.Control.Locate.scss",
          "dist/L.Control.Locate.mapbox.min.css": "src/L.Control.Locate.mapbox.scss"
        }
      },
      uncompressed: {
        options: {
          style: "expanded"
        },
        files: {
          "dist/L.Control.Locate.css": "src/L.Control.Locate.scss",
          "dist/L.Control.Locate.mapbox.css": "src/L.Control.Locate.mapbox.scss"
        }
      }
    },
    bump: {
      options: {
        files: ["package.json", "bower.json"],
        commitFiles: [
          "package.json",
          "bower.json",
          "dist/L.Control.Locate.css",
          "dist/L.Control.Locate.min.css",
          "dist/L.Control.Locate.min.css.map",
          "dist/L.Control.Locate.mapbox.css",
          "dist/L.Control.Locate.mapbox.min.css",
          "dist/L.Control.Locate.mapbox.min.css.map",
          "dist/L.Control.Locate.esm.js",
          "dist/L.Control.Locate.esm.min.js",
          "dist/L.Control.Locate.esm.min.js.map",
          "dist/L.Control.Locate.min.js",
          "dist/L.Control.Locate.min.js.map"
        ],
        push: false
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          protocol: "https",
          keepalive: true
        }
      }
    },
    rollup: {
      options: {
        plugins: [
          require("@rollup/plugin-node-resolve").nodeResolve(),
          require("@rollup/plugin-commonjs")()
        ]
      },
      build_es: {
        options: {
          format: "es",
          external: ["leaflet"]
        },
        files: {
          "dist/L.Control.Locate.esm.js": "src/L.Control.Locate.js"
        }
      },
      build_umd: {
        options: {
          format: "umd",
          name: "L.Control.Locate",
          external: ["leaflet"],
          globals: {
            leaflet: "L"
          }
        },
        files: {
          "dist/L.Control.Locate.umd.js": "src/L.Control.Locate.js"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-bump");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-rollup");

  // Default task(s).
  grunt.registerTask("default", ["rollup:build_es", "rollup:build_umd", "uglify", "sass"]);
};
