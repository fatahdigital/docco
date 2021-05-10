(function (window, document, $, undefined) {
  'use strict';
    var Key = {
      k: function (e) {
      Key.s();
      Key.methods();
    },
    s: function (e) {
    this._window = $(window),
    this._document = $(document)
    },
    methods: function (e) {
      Key.stickHeader();         
    },
    stickHeader: function () {
      Key._window.scroll(function () {
          if ($(this).scrollTop() > 100) {
            $('.navigation-default').addClass('sticky')
          }else{
            $('.navigation-default').removeClass('sticky')
          }
      })
    },
  };
  Key.k();
})(window, document, jQuery);

