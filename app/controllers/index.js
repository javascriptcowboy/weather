import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ComparableMixin from '../mixins/comparable';

export default Ember.Controller.extend(EmberValidations.Mixin, ComparableMixin, {

  // Properties

  sortProperties: ['display_location.full:asc'],

  sortedResults: Ember.computed.sort('model', 'sortProperties'),

  /**
   * injects the weather service into controller
   * @type {function}
   */
  weather: Ember.inject.service(),

  /**
   * used for validating properties
   * @type {Object}
   */
  validations: {
    zipCode: {
      presence: true,
      numericality: true,
      length: {
        minimum: 5,
        maximum: 5
      }
    }
  },

  /**
   * used to show/hide errors when focus out of input
   * @type {Boolean}
   */
  showError: false,

  /**
   * used to display server side errors in an Alert Box component
   * @type {String}
   */
  alertMsg: '',

  /**
   * used for showing spinner during AJAX call
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * property used for searching by zip code
   * @type {String}
   */
  zipCode: '',

  /**
   * keeps track of number of items in model
   * @type {number}
   */
  totalItems: Ember.computed.alias('model.length'),

  /**
   * boolean to know if more than one item in result set
   * @type {boolean}
   */
  multipleItems: Ember.computed.gt('totalItems', 1),

  // Methods

  /**
   * success handler
   * @param  {JSON} response
   */
  handleSuccess: function(response) {

    var tempItem = response.current_observation;

    var newModel = this.store.createRecord('weather-item', {
      ob_url: tempItem.ob_url,
      display_location: tempItem.display_location,
      icon: tempItem.icon,
      weather: tempItem.weather,
      temp_f: tempItem.temp_f,
      feelslike_f: tempItem.feelslike_f,
      observation_time: tempItem.observation_time
    });

    newModel.save();

    this.resetZipCode();

  },

  /**
   * error handler
   * @param  {Error} error
   */
  handleError: function(error) {

    if (error.description) {

      this.set('alertMsg', error.description);

    } else {

      this.set('alertMsg', 'Something unexpected happened. Please try again later.');

    }

    this.resetZipCode();

  },

  /**
   * reset the zipCode field
   */
  resetZipCode: function() {

    this.set('zipCode', '');

  },

  /**
   * cancels loading, hides spinner
   */
  cancelLoading: function() {

    var self = this;

    Ember.run(function() {
      self.set('isLoading', false);
    });

  },

  // Actions

  actions: {

    /**
     * action to search weather, calls weather service
     */
    searchWeather: function() {

      var self = this,
          zipCode = this.get('zipCode');

      // Clear client side validation errors
      this.set('showError', false);

      // Clear server side errors
      this.send('removeAlert');

      this.set('isLoading', true);

      this.get('weather')
          .getConditionsByZip(zipCode)
          .then(

        // Success
        function(response) {

          self.cancelLoading();

          if (response.response.error) {

            Ember.run(function() {
              self.handleError(response.response.error);
            });

          } else {

            Ember.run(function() {
              self.handleSuccess(response);
            });

          }

        },

        // Failure
        function(error) {

          self.cancelLoading();

          Ember.run(function() {
            self.handleError(error);
          });

        }

      );

    },

    /**
     * toggles showing the validation errors
     *
     */
    showErrors: function() {

      if (this.get('zipCode')) {

        this.set('showError', true);

      }

    },

    /**
     * removes selected item from the model array
     * @param  {object} item
     */
    removeResult: function(item) {

      item.deleteRecord();

      item.save();

      // this.get('model').removeObject(item);

    },

    /**
     * resets alertMsg, therefore hiding the Alert Box component
     */
    removeAlert: function() {

      this.set('alertMsg', '');

    }

  }

});
