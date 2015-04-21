import DS from 'ember-data';

export default DS.Model.extend({
  ob_url: DS.attr(),
  display_location: DS.attr(),
  icon: DS.attr(),
  weather: DS.attr(),
  temp_f: DS.attr(),
  feelslike_f: DS.attr(),
  observation_time: DS.attr()
});
