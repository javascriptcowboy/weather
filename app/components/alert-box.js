import Ember from 'ember';

export default Ember.Component.extend({

// Actions

  actions: {

    /**
     * Sends action to Controller
     */
    close: function() {

      return this.sendAction();

    }

  }

});
