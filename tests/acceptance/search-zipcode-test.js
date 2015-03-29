import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'weather/tests/helpers/start-app';

var application;

module('Acceptance: SearchZipcode', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting index', function(assert) {

  visit('/');

  andThen(function() {
    assert.equal(currentPath(), 'index');
  });
});

test('search for 97007', function(assert) {

  visit('/');
  fillIn('#zipCode', '97007');
  click('input[type="submit"]');

  andThen(function() {

    assert.equal(find('.result-item:first h3').text().trim(), 'Beaverton, OR');

  });

});
