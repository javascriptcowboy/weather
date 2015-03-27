import Ember from 'ember';

export default Ember.Component.extend({

  // Properties

  itemSelected: false,

  /**
   * computed property - if checkbox not selected, and if 2 comparables are selected, disable checkbox
   * @return {boolean}
   */
  checkboxDisabled: function() {

    return (!this.get('itemSelected')) && (this.get('totalComparables') === 2);

  }.property('totalComparables'),

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

    /**
     * Sends action to add item to compare
     */
    compare: function() {

      if (this.get('itemSelected')) {

        this.sendAction('addToCompare', this.get('item'));

      } else {

        this.sendAction('removeFromCompare', this.get('item'));

      }

    },

    /**
     * Sends action to remove item from result set
     */
    removeResult: function() {

      this.sendAction('removeResult', this.get('item'));

    }

  }

});
