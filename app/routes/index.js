import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * reset comparables when transitioning into route
   */
  setupController: function(controller, model) {

    this._super(controller, model);

    if (!controller.get('model')) {

      controller.set('model', Ember.A());

    }

    controller.set('comparables', Ember.A());

  }

});
