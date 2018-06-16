(function ($) {

  "use strict";

  // Submenu FadeIn-Out Function
  Drupal.behaviors.customBehavior = {
    attach: function(context, settings) {
      // JS code from here
      
      $('.btn-modal').click(function() {

        var ori = $(this).attr("id"); 
        var id = ori.split('-')[2];
        var targ = '#box-lec-' + id;

        $(targ).show();

      });

      $(window).click(function(e) {

        var target = e.target.className;

        if(target == 'modal' || target == 'close close-button') {
          $('.modal').hide();
        }

      });

     $(document).ready(function(){
          $('.btn-more').click(function(){
              $('.block .col-sm-6').toggle();
          });
      }); 

    }
  };
})(jQuery);