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
      Key.stickHeader1();      
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

    stickHeader1: function () {
      Key._window.scroll(function () {
          if ($(this).scrollTop() > 0) {
            $('.doc-navigation.navigation-default').addClass('sticky')
          }else{
            $('.doc-navigation.navigation-default').removeClass('sticky')
          }
      })
    },
    
  };
  Key.k();
})(window, document, jQuery);


// var $root = $('html, body');

// $('#TableOfContents ul li a').click(function() {
//     var href = $.attr(this, 'href');

//     $root.animate({
//         scrollTop: $(href).offset().top
//     }, 200, function () {
//         window.location.hash = href;
//     });

//     return false;
// });

$(document).ready(function () {
  // Add smooth scrolling to all links
  $("#TableOfContents a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: ($(hash).offset().top - $('#myNavbar').height())
      }, 800, function(){
      });
    }
  });

  /* hide if nothing to display in TOC */
  if($("#TableOfContents a").length){
    $(".documentation-rightSidebar").show();
  }
  /* hide if nothing to display in TOC */
  $(window).scroll(function() {
    $(".content-wrapper :header").each(function() {
      if ( $(this).tagName != "H1" ) {
        if ( ( $(window).scrollTop() + 90) >= $(this).offset().top - 110) {
          var id = $(this).attr('id');
          $('#TableOfContents ul li a').removeClass('active');
          $('#TableOfContents ul li a[href="#' + id + '"]').addClass('active');
        }
  
      }
    });
  });

// clipboard
var clipInit = false;
$('code').each(function() {
    var code = $(this),
        text = code.text();

    if (text.length > 5) {
        if (!clipInit) {
            var text, clip = new ClipboardJS('.copy-to-clipboard', {
                text: function(trigger) {
                    text = $(trigger).prev('code').text();
                    return text.replace(/^\$\s/gm, '');
                }
            });

            var inPre;
            clip.on('success', function(e) {
                e.clearSelection();
                inPre = $(e.trigger).parent().prop('tagName') == 'PRE';
                $(e.trigger).attr('aria-label', 'Copied to clipboard!').addClass('tooltipped tooltipped-' + (inPre ? 'w' : 's'));
            });

            clip.on('error', function(e) {
                inPre = $(e.trigger).parent().prop('tagName') == 'PRE';
                $(e.trigger).attr('aria-label', fallbackMessage(e.action)).addClass('tooltipped tooltipped-' + (inPre ? 'w' : 's'));
                $(document).one('copy', function(){
                    $(e.trigger).attr('aria-label', 'Copied to clipboard!').addClass('tooltipped tooltipped-' + (inPre ? 'w' : 's'));
                });
            });

            clipInit = true;
        }

        code.after('<span class="copy-to-clipboard" title="Copy to clipboard" />');
        code.next('.copy-to-clipboard').on('mouseleave', function() {
            $(this).attr('aria-label', null).removeClass('tooltipped tooltipped-s tooltipped-w');
        });
    }
});

  
}); // document ready

