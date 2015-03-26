import Ember from 'ember';

export default Ember.Service.extend({

  // Properties

  /**
   * apiKey for Weather Underground API
   * @type {String}
   */
  apiKey: '625172310aff38a6',

  /**
   * baseUrl for searching Weather Underground API
   * @type {String}
   */
  baseUrl: 'http://api.wunderground.com/api/',

  /**
   * type of response format
   * @type {String}
   */
  responseFormat: '.json',

  /**
   * searches the Weather Underground API for conditions based on zip code
   * @param  {string} zipCode
   * @return {JSON|Error}
   */
  getConditionsByZip: function(zipCode) {

    var baseUrl = this.get('baseUrl'),
        apiKey = this.get('apiKey'),
        responseFormat = this.get('responseFormat'),
        url = baseUrl + apiKey + '/conditions/q/' + zipCode + responseFormat;

    return Ember.$.ajax({
      type: 'GET',
      url: url
    }).then(

      // Success
      function(response) {

        return response;

      },

      // Failure
      function(error) {

        return error;

      }

    );

  }

});
