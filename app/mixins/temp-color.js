import Ember from 'ember';

export default Ember.Mixin.create({

  // Properties

  /**
   * computed property that returns a css class based on temp value
   */
  tempColor: Ember.computed(
    'item.temp_f',
    function() {

      var temp = this.get('item.temp_f'),
          tempClass = '';

      if (temp > 60) {

          tempClass = 'temp-warm';

      } else {

        tempClass = 'temp-cool';

      }

      return tempClass;

    }
  )

});
