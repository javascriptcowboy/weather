import Ember from 'ember';
import ComparableMixin from '../../../mixins/comparable';
import { module, test } from 'qunit';

module('ComparableMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var ComparableObject = Ember.Object.extend(ComparableMixin);
  var subject = ComparableObject.create();
  assert.ok(subject);
});
