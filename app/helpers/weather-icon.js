import Ember from 'ember';

export function weatherIcon(icon) {
  var baseUrl = 'http://icons.wxug.com/i/c/',
      iconSet = 'i',
      imgType = '.gif';

  return new Ember.Handlebars.SafeString('<img class="img-responsive center-block" src="' + baseUrl + iconSet + '/' + icon + imgType + '" alt="' + icon + '"/>');
}

export default Ember.HTMLBars.makeBoundHelper(weatherIcon);
