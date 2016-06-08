'use strict';
var path = require('path');
var fs = require('fs');
var generator = require('raml-generator').generator;
var Handlebars = require('handlebars');
var util = require('util');

Handlebars.registerPartial('auth', fs.readFileSync(path.join(__dirname, 'lib/partials/auth.js.hbs'), 'utf8')),
Handlebars.registerPartial('utils',fs.readFileSync(path.join(__dirname, 'lib/partials/utils.php.hbs'), 'utf8')),
Handlebars.registerPartial('client',fs.readFileSync(path.join(__dirname, 'lib/partials/client.php.hbs'), 'utf8')),
Handlebars.registerPartial('resources', fs.readFileSync(path.join(__dirname, 'lib/partials/resources.php.hbs'), 'utf8'))
Handlebars.registerPartial('resource', fs.readFileSync(path.join(__dirname, 'lib/partials/resource.php.hbs'), 'utf8'))


Handlebars.registerHelper('stringify', function(value) {
  return  require('javascript-stringify')(value);
});
Handlebars.registerHelper('allResources', function(value) {
  var res =  require('./lib/helpers/resource').allResources(value.data.root);
  console.log(util.inspect(res));
  return res;
});
Handlebars.registerHelper('replace', function(value, substr, newSubstr) {
  return value.replace(substr, newSubstr);
});
Handlebars.registerHelper('paramCase', function(value, data) {
  return require('change-case').paramCase(value);
});
Handlebars.registerHelper('pascalCase', function(value, data) {
  return require('change-case').pascalCase(value);
});
Handlebars.registerHelper('camelCase', function(value, data) {
  return require('change-case').camelCase(value);
});
Handlebars.registerHelper('upperCase', function(value, data) {
  return require('change-case').upperCase(value);
});
Handlebars.registerHelper('pluck', function(value, prop, options) {
  // TODO fix this stuff...
  return value && require('_').map(prop);
});
Handlebars.registerHelper('contains', function(value, array, options) {
  array = ( array instanceof Array ) ? array : [array];
	return (array.indexOf(value) > -1) ? options.fn( this ) : "";
});
Handlebars.registerHelper('keys', function(value) {
  return Object.keys[value];
});


module.exports = generator({
    templates: {
      'README.md': Handlebars.compile(fs.readFileSync(path.join(__dirname, 'lib/templates/README.md.hbs'), 'utf8')),
      'INSTALL.md': Handlebars.compile(fs.readFileSync(path.join(__dirname, 'lib/templates/INSTALL.md.hbs'), 'utf8')),
      'composer.json': Handlebars.compile(fs.readFileSync(path.join(__dirname, 'lib/templates/composer.json.hbs'), 'utf8')),
      'index.php': Handlebars.compile(fs.readFileSync(path.join(__dirname, 'lib/templates/index.php.hbs'), 'utf8'))
    }
});
