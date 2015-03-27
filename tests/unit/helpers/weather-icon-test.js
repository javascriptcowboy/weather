import {
  weatherIcon
} from '../../../helpers/weather-icon';
import { module, test } from 'qunit';

module('WeatherIconHelper');

// Replace this with your real tests.
test('it works', function(assert) {
  var result = weatherIcon(42);
  assert.ok(result);
});
