import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {

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

  // Methods

  /**
   * success handler
   * @param  {JSON} response
   */
  handleSuccess: function(response) {

    // console.log(response);

    // Push the new object on to the model
    this.get('model').pushObject(response.current_observation);

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

      this.set('showError', true);

    }

  }

});
