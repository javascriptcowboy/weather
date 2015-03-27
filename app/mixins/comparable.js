import Ember from 'ember';

export default Ember.Mixin.create({

  // Properties

  /**
   * holds collection of items to compare
   * @type {array}
   */
  comparables: null,

  /**
   * keeps track of number of items in comparables array
   * @type {number}
   */
  totalComparables: Ember.computed.alias('comparables.length'),

  /**
   * if 1 item in comparables
   * @type {boolean}
   */
  oneComparable: Ember.computed.equal('totalComparables', 1),

  /**
   * if maximum items in comparables (2)
   * @type {[type]}
   */
  maxComparables: Ember.computed.equal('totalComparables', 2),

  // Events

  /**
   * Create empty array on init
   */
  init: function() {

    this._super();

    this.set('comparables', Ember.A());

  },

  // Actions

  actions: {

    /**
     * Transition to the Compare route, passing in the comparables array
     */
    compareItems: function() {

      this.transitionToRoute('compare', this.get('comparables'));

    },

    /**
     * adds item to comparables array
     * @param {object} item
     */
    addToCompare: function(item) {

      this.get('comparables').pushObject(item);

    },

    /**
     * removes item from comparables array
     * @param {object} item
     */
    removeFromCompare: function(item) {

      this.get('comparables').removeObject(item);

    },

    /**
     * clear the comparables array
     */
    clearCompare: function() {

      this.set('comparables', Ember.A());

    }

  }

});
