'use strict';
module.exports = function(grunt) {
    // Load all tasks
    require('load-grunt-tasks')(grunt);
    // Show elapsed time
    require('time-grunt')(grunt);


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: 'bower_components',
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'src/**/*.js'
            ]
        },
        less: {
            dev: {
                files: {
                    'dist/musicSearch.css': 'src/**/*.less'
                },
                options: {
                    compress: false,
                    // LESS source map
                    // To enable, set sourceMap to true and update sourceMapRootpath based on your install
                    sourceMap: true,
                    sourceMapFilename: 'dist/musicSearch.css.map'
                }
            },
            build: {
                files: {
                    'dist/musicSearch.min.css': ['src/**/*.less']
                },
                options: {
                    compress: true
                }
            }
        },
        html2js:{
            dev: {
                src: 'src/**/*.tpl.html',
                dest: 'tmp/templates.js',
                module: 'ualib.musicSearch.templates'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['tmp/templates.js', 'src/**/*.js'],
                dest: 'dist/musicSearch.js'
            },
            index: {
                src: 'src/index.html',
                dest: 'dist/index.html',
                options: {
                    process: true
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: [
                    {
                        'dist/musicSearch.js': ['dist/musicSearch.js']
                    }
                ]
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/musicSearch.min.js': ['dist/musicSearch.js']
                }
            }
        },
        clean: {
            app: ['tmp/']
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: ['pkg'],
                commit: false,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json', 'bower.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                regExp: false
            }
        },
        ngdocs: {
            options: {
                dest: 'docs',
                html5Mode: false,
                startPage: 'api/',
                sourceLink: true,
                title: "Videos App Docs",
                titleLink: "api/"
            },
            api: {
                src: ['src/**/*.js', '!src/**/*.spec.js'],
                title: 'API Documentation'
            }
        },
        'gh-pages': {
            options: {
                base: 'docs'
            },
            firstTarget: {
                src: ['**/*']
            }
        }
    });

    // Register tasks
    grunt.registerTask('default', [
        'dev'
    ]);
    grunt.registerTask('dev', [
        'html2js:dev',
        'less:dev',
        'concat',
        'clean'
    ]);
    grunt.registerTask('build', [
        'jshint',
        'concat:index',
        'less:build',
        'ngAnnotate',
        'uglify',
        'clean'
    ]);
};