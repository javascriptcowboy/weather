import Ember from 'ember';

export default Ember.Controller.extend({

  // Properties

  differenceInTemp: function() {

    var tempArray = [],
        i,
        result = 0;

    // Extract out temps from each object
    this.get('model').forEach(function(item) {

      tempArray.push(item.temp_f);

    });

    // loop through temps and substract the difference
    for (i = 0; i < tempArray.length; i++) {

      if (i === 0) {

        result = tempArray[i];

      } else {

        result -= tempArray[i];

      }

    }

    // return the difference, use absolute value in case negative, and set to 1 decimal.
    result = Math.abs(result.toFixed(1));

    return result;

  }.property('model')

});
