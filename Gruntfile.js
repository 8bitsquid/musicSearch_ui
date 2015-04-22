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
                    'dist/musicSearch.min.css': 'src/**/*.less'
                },
                options: {
                    compress: true
                }
            }
        },
        html2js:{
            dev: {
                src: 'src/**/*.tpl.html',
                dest: 'dist/musicSearch-templates.js',
                module: 'ualib.musicSearch.templates'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: 'src/**/*.js',
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
        uglify: {
            dist: {
                files: {
                    'dist/musicSearch.min.js': 'src/**/*.js'
                }
            }
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
        }
    });

    // Register tasks
    grunt.registerTask('default', [
        'dev'
    ]);
    grunt.registerTask('dev', [
        'html2js:dev',
        'less:dev',
        'concat'
    ]);
    grunt.registerTask('build', [
        //'html2js:build',
        'jshint',
        'copy',
        'less:build',
        'uglify'
    ]);
};