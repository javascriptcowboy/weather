import Ember from 'ember';

export default Ember.Controller.extend({

  // Properties

  /**
   * injects the weather service into controller
   * @type {function}
   */
  weather: Ember.inject.service(),

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

    console.log(error);

  },

  // Actions

  actions: {

    /**
     * action to search weather, calls weather service
     */
    searchWeather: function() {

      var self = this,
          zipCode = this.get('zipCode');

      this.get('weather')
          .getConditionsByZip(zipCode)
          .then(

        // Success
        function(response) {

          Ember.run(function() {
            self.handleSuccess(response);
          });

        },

        // Failure
        function(error) {

          Ember.run(function() {
            self.handleError(error);
          });

        }

      );

    }

  }

});
