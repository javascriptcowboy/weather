import Ember from 'ember';

export default Ember.Component.extend({

  // Properties

  /**
   * computed property that returns a css class based on temp value
   */
  tempColor: Ember.computed(
    'item.temp_f',
    function() {

      var temp = this.get('item.temp_f'),
          tempClass = '';

      if (temp > 60) {

          tempClass = 'temp-warm';

      } else {

        tempClass = 'temp-cool';

      }

      return tempClass;

    }
  ),

  // Events

  /**
   * enable tooltips when component is rendered on the DOM
   */
  didInsertElement: function() {

    Ember.$('[data-toggle="tooltip"]').tooltip();

  },

  // Actions

  actions: {

    // TODO: Handle checkbox action for comparing

  }

});
