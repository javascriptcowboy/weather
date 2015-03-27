import Ember from 'ember';
import TempColorMixin from '../mixins/temp-color';

export default Ember.Component.extend(TempColorMixin, {

  // Properties

  itemSelected: false,

  /**
   * computed property - if checkbox not selected, and if 2 comparables are selected, disable checkbox
   * @return {boolean}
   */
  checkboxDisabled: function() {

    return (!this.get('itemSelected')) && (this.get('totalComparables') === 2);

  }.property('totalComparables'),

  // Methods

  /**
   * Sends action to add item to compare
   */
  compare: function() {

    if (this.get('itemSelected')) {

      this.sendAction('addToCompare', this.get('item'));

    } else {

      this.sendAction('removeFromCompare', this.get('item'));

    }

  }.observes('itemSelected'),

  /**
   * if totalComparables becomes zero from clearing, set checkbox to false
   */
  clearCheckbox: function() {

    if (this.get('totalComparables') === 0) {

      this.set('itemSelected', false);

    }

  }.observes('totalComparables'),

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
     * Sends action to remove item from result set
     */
    removeResult: function() {

      this.sendAction('removeResult', this.get('item'));

    }

  }

});
