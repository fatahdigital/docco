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

  // get current URL path and assign 'active' class
  var pathname = window.location.pathname;
  $('.navbar-nav > .nav-item > a[href="'+pathname+'"]').addClass('active');

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

var text, clip = new ClipboardJS('.anchor');
  $("h1~h2,h1~h3,h1~h4,h1~h5,h1~h6").append(function(index, html){
    var element = $(this);
    var url = encodeURI(document.location.origin + document.location.pathname);
    var link = url + "#"+element[0].id;
    return " <span class='anchor' data-clipboard-text='"+link+"'>" +
      "<i class='fa fa-link fa-lg'></i>" +
      "</span>"
    ;
  });

  $(".anchor").on('mouseleave', function(e) {
    $(this).attr('aria-label', null).removeClass('tooltipped tooltipped-s tooltipped-w');
  });

  clip.on('success', function(e) {
      e.clearSelection();
      $(e.trigger).attr('aria-label', 'Link copied to clipboard!').addClass('tooltipped tooltipped-s');
  });
  $('code.language-mermaid').each(function(index, element) {
    var content = $(element).html().replace(/&amp;/g, '&');
    $(element).parent().replaceWith('<div class="mermaid" align="center">' + content + '</div>');
  });

  restoreTabSelections();

  
  
}); // document 

function switchTab(tabGroup, tabId) {
  allTabItems = jQuery("[data-tab-group='"+tabGroup+"']");
  targetTabItems = jQuery("[data-tab-group='"+tabGroup+"'][data-tab-item='"+tabId+"']");

  // if event is undefined then switchTab was called from restoreTabSelection
  // so it's not a button event and we don't need to safe the selction or
  // prevent page jump
  var isButtonEvent = event != undefined;

  if(isButtonEvent){
    // save button position relative to viewport
    var yposButton = event.target.getBoundingClientRect().top;
  }

  allTabItems.removeClass("active");
  targetTabItems.addClass("active");

  if(isButtonEvent){
    // reset screen to the same position relative to clicked button to prevent page jump
    var yposButtonDiff = event.target.getBoundingClientRect().top - yposButton;
    window.scrollTo(window.scrollX, window.scrollY+yposButtonDiff);

    // Store the selection to make it persistent
    if(window.localStorage){
        var selectionsJSON = window.localStorage.getItem("tabSelections");
        if(selectionsJSON){
          var tabSelections = JSON.parse(selectionsJSON);
        }else{
          var tabSelections = {};
        }
        tabSelections[tabGroup] = tabId;
        window.localStorage.setItem("tabSelections", JSON.stringify(tabSelections));
    }
  }
}

function restoreTabSelections() {
  if(window.localStorage){
      var selectionsJSON = window.localStorage.getItem("tabSelections");
      if(selectionsJSON){
        var tabSelections = JSON.parse(selectionsJSON);
      }else{
        var tabSelections = {};
      }
      Object.keys(tabSelections).forEach(function(tabGroup) {
        var tabItem = tabSelections[tabGroup];
        switchTab(tabGroup, tabItem);
      });
  }
}

