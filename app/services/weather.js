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
   * searches the Weather Underground API for conditions based on zip code
   * @param  {string} zipCode
   * @return {JSON|Error}
   */
  getConditionsByZip: function(zipCode) {

    var apiKey = this.get('apiKey'),
        baseUrl = this.get('baseUrl'),
        url = baseUrl + apiKey + '/conditions/q/' + zipCode + '.json';

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
