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

  /**
   * temp property
   * @type {JSON}
   */
  responseObject: null,

  // Methods

  /**
   * success handler
   * @param  {JSON} response
   */
  handleSuccess: function(response) {

    this.set('responseObject', JSON.stringify(response));

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

      this.set('responseObject', null);

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
