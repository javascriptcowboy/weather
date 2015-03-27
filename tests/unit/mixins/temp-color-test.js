import Ember from 'ember';
import TempColorMixin from '../../../mixins/temp-color';
import { module, test } from 'qunit';

module('TempColorMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var TempColorObject = Ember.Object.extend(TempColorMixin);
  var subject = TempColorObject.create();
  assert.ok(subject);
});
