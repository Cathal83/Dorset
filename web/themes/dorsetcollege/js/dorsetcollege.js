(function ($) {

  "use strict";

  // Submenu FadeIn-Out Function
  Drupal.behaviors.customBehavior = {
    attach: function(context, settings) {
      // JS code from here
      
      
      // Get the modal
      // var modal = document.getElementById('myModal');
      var modal = document.getElementsByClassName('modal')[3];

      // Get the button that opens the modal
      this.$btn = document.getElementsByClassName("btn")[3];

      // Get the <span> element that closes the modal
      this.$span = document.getElementsByClassName("close")[3];

      // When the user clicks on the button, open the modal 
      this.$btn.onclick = function() {
          modal.style.display = "block";
      }

      // When the user clicks on <span> (x), close the modal
      this.$span.onclick = function() {
         modal.style.display = "none";
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }
    
    }
  };
})(jQuery);