import Ember from 'ember';

export default Ember.Controller.extend({

  // Properties

  differenceInTemp: function() {

    var tempArray = [];

    this.get('model').forEach(function(item, index) {

      tempArray.push(item.temp_f);

    });

    console.log(tempArray);

    var i,
    result = 0;

    for (i = 0; i < tempArray.length; i++) {

      if (i === 0) {

        result = tempArray[i];

      } else {

        result -= tempArray[i];

      }

    };

    result = Math.abs(result.toFixed(1));

    return result;

  }.property('model')

});
