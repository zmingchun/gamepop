/**
 * Created by meathill on 14-1-21.
 */
;(function (ns) {
  var fragment;
  ns.FeedsList = Backbone.View.extend({
    $context: null,
    $router: null,
    loadButton: null,
    events: {
      'tap .item': 'item_tapHandler',
      'tap .load-more': 'loadButton_tapHandler'
    },
    initialize: function () {
      this.template = Handlebars.compile(this.$('script').remove().html());
      this.loadButton = this.$('.load-more').remove();

      this.render();
      this.collection.on('reset', this.render, this);
      this.collection.on('add', this.collection_addHandler, this);
      this.collection.on('sync', this.collection_readyHandler, this);
    },
    render: function (collection) {
      if (collection) {
        this.$('.fa-spin').removeClass('fa-spin');
      } else {
        collection = this.collection;
      }
      this.$('ul')
        .html(this.template({feeds: collection.toJSON()}))
        .append(this.loadButton);
      this.loadButton.removeClass('disabled');
    },
    collection_addHandler: function (model) {
      var html = this.template({feeds: [model.toJSON()]});
      fragment = fragment ? fragment.add(html) : $(html);
    },
    collection_readyHandler: function () {
      if (fragment) {
        fragment.insertBefore(this.loadButton);
        fragment = null;
      }
      this.loadButton.removeClass('disabled')
        .find('i').remove();
    },
    item_tapHandler: function (event) {
      var href = $(event.currentTarget).find('a').attr('href');
      this.$router.navigate(href);
    },
    loadButton_tapHandler: function (event) {
      var target = $(event.currentTarget);
      if (target.hasClass('disabled')) {
        return;
      }
      target.addClass('disabled');
      if (this.collection.next()) {
        target.prepend('<i class="fa fa-spin fa-spinner"></i>');
      } else {
        target.html('新闻您都看完了，我们会努力找来更多的');
      }
    }
  });
}(Nervenet.createNameSpace('gamepop.view')));