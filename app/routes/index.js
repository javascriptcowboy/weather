import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {

    return this.store.findAll('weather-item');

  },

  setupController: function(controller, model) {

    // Call _super for default behavior
    this._super(controller, model);

    // Clear Comparables array
    controller.set('comparables', Ember.A());

  }

});
