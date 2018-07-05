(function ($) {

  "use strict";

  // Submenu FadeIn-Out Function
  Drupal.behaviors.customBehavior = {
    attach: function(context, settings) {
      // Menu Navigation
      $("#block-dorsetcollege-main-menu .menu-lv-0 > .menu-item--expanded").mouseenter(function () {
        //$(this).find(".sub-menu").animate({ height: "toggle" }, 600);
        $(this).find(".sub-menu").show();

      }).mouseleave(function () {
        //$(this).find(".sub-menu").animate({ height: "toggle" }, 600);
        $(this).find(".sub-menu").hide();

      });
      $(".sub-menu").change(function (e) {
        $(".sub-menu").trigger("mouseleave");

      });
      $(".sub-menu").click(function (e) {
        $(".sub-menu").trigger("mouseleave");

      });
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
        $('.btn-blue').click(function(){
        var display =  $('.lecturer-row:not(:first)').css("display");
            if(display!="none")
            {
                $('.lecturer-row:not(:first)').hide();
            } else {
              $('.lecturer-row:not(:first)').show();
            }
        });
      });


      $(document).ready(function(){
          $('#site-branding').click(function(){
              $('#block-dorsetcollege-main-menu').toggle();
          });
      }); 

    // jQuery to get the flexslider(s).
      // Calling flexslider.
      // Using this method, we can call different flexslider settings on each class
      // This one calls flexslider on the .flexslider-slider class.
      $('.flexslider-slider').flexslider({
      //   animation: "fade",
      //   prevText: "",
      //   nextText: "",
      //   controlNav: false,
      //   animationSpeed: 800,
      //   easing: 'linear',
      //   slideshowSpeed: 5000,
      //   fadeFirstSlide: false,
      // });
      animation: "slide",
      animationLoop: true,
      itemWidth: 250,
      // itemMargin: 10,
      controlNav: false,
      prevText: "",
      nextText: "",
      maxItems: 3,
      keyboard: true,
      touch: true

    });
      
      $(document).ready(function() {
        $("#hide").click(function() {      
            if($(".node_54 .page-content-section .right-paragraph:nth-child(3),.node_54 .page-content-section .left-paragraph:nth-child(2) ").hasClass("max")) {
                $(".node_54 .page-content-section .right-paragraph:nth-child(3), .node_54 .page-content-section .left-paragraph:nth-child(2)").removeClass("max");
            } else {
               $(".node_54 .page-content-section .right-paragraph:nth-child(3), .node_54 .page-content-section .left-paragraph:nth-child(2)").addClass("max");
            }
    
        })
    });
        

    // $("#hide").on("click", function (){
    ////if ($(".node_54 .paragraph--type--page-introduction").height() == 200) {
    ////   $(".node_54 .paragraph--type--page-introduction").animate(
    ////         {height: "2000px"});
    ////     }
    ////  else if ($(".node_54 .paragraph--type--page-introduction").height() == 2000) {
    //// $(".node_54 .paragraph--type--page-introduction").animate({height: "200px"});
    //// }
    //
    //$(".node_54 div:nth-child(3)").slideToggle('slow');
    //});
    }
  };
})(jQuery);