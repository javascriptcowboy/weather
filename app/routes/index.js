import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * Index Route's model hook
   * @return {array}
   */
  model: function() {

    // TODO: keep current model on transitions

    // TODO: Keep state on brower refresh

    return Ember.A();

  },

  /**
   * reset comparables when transitioning into route
   */
  setupController: function(controller, model) {

    this._super(controller, model);

    controller.set('comparables', Ember.A());

  }

});
