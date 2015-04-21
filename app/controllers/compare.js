import Ember from 'ember';

export default Ember.Controller.extend({

  // Properties

  differenceInTemp: function() {

    var result = 0;

    this.get('model').reduce(function(prev,next){

      result = prev.temp_f - next.temp_f;

    });

    // return the difference, use absolute value in case negative, and set to 1 decimal.
    result = Math.abs(result.toFixed(1));

    return result;

  }.property('model')

});
