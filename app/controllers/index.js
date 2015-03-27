import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ComparableMixin from '../mixins/comparable';

export default Ember.Controller.extend(EmberValidations.Mixin, ComparableMixin, {

  // Properties

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

    // Push the new object on to the model
    this.get('model').pushObject(Ember.Object.create({
      id: tempItem.display_location.zip,
      ob_url: tempItem.ob_url,
      display_location: tempItem.display_location,
      icon: tempItem.icon,
      weather: tempItem.weather,
      temp_f: tempItem.temp_f,
      feelslike_f: tempItem.feelslike_f,
      observation_time: tempItem.observation_time
    }));

    // Reset the zip code
    this.set('zipCode', '');

  },

  /**
   * error handler
   * @param  {Error} error
   */
  handleError: function(error) {

    if (error.description) {

      alert(error.description);

    } else {

      console.log(error);

    }

  },

  // Actions

  actions: {

    /**
     * action to search weather, calls weather service
     */
    searchWeather: function() {

      // TODO: Show loading gif

      var self = this,
          zipCode = this.get('zipCode');

      this.set('showError', false);

      this.get('weather')
          .getConditionsByZip(zipCode)
          .then(

        // Success
        function(response) {

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

      this.get('model').removeObject(item);

    }

  }

});
