/**
 * Created by meathill on 14-1-21.
 */
;(function (ns) {
  ns.Router = Backbone.Router.extend({
    $gui: null,
    $nav: null,
    routes: {
      "": 'backHome',
      "all": "showAll",
      "offline": "showOffline",
      'config': 'showConfiguration',
      "local/:game(/*path)": "showLocalGuide",
      'remote/:game(/*path)': 'showRemoteGuide',
      'news/:id': 'showNewsById'
    },
    backHome: function () {
      this.$gui.showMainPage('homepage');
      this.$nav.activeNavButton('');
      ga.pageview('home');
    },
    showAll: function () {
      this.$gui.showMainPage('all');
      this.$nav.activeNavButton('all');
      ga.pageview('all');
    },
    showOffline: function () {
      this.$gui.showMainPage('offline');
      this.$nav.activeNavButton('offline');
      ga.pageview('offline');
    },
    showConfiguration: function () {
      this.$gui.showPage('template/config.html', 'config');
    },
    showLocalGuide: function (game, path) {
      path = path ? path : '';
      this.$gui.showPopupPage(config.local + game + '/' + path, 'local game game-' + game);
      this.$gui.setGame(game);
      ga.pageview('local/' + game + '/' + path);
    },
    showRemoteGuide: function (game, path) {
      path = path ? path : '';
      this.$gui.showPopupPage(config.remote + game + '/' + path, 'remote game game-' + game);
      this.$gui.setGame(game);
      ga.pageview('remote/' + game + '/' + path);
    },
    showNewsById: function (id) {
      this.$gui.showPopupPage(config.news, 'news news-' + id, {id: id});
      ga.pageview('news/' + id);
    }
  });
}(Nervenet.createNameSpace('gamepop')));