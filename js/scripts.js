
//Back to Top
function backToTop() {
  "use strict";


  //trigger point
  var triggerPoint = 50,
      scrTop = 0,
      featureDetected = false;

  function detectTrigger() {

      scrTop = $(window).scrollTop();
      featureDetected = false;
      
      //Edit height value here
      if (scrTop >= 1080) {
          $(".back-to-top").addClass("active");
      } else {
          $(".back-to-top").removeClass("active");
      }

       

  }

  function onRepaint() {
      if (typeof window.requestAnimationFrame === "undefined") {
          detectTrigger();
          return;
      }

      if (!featureDetected) {
          window.requestAnimationFrame(detectTrigger);
      }
      featureDetected = true;
  }


  $(".back-to-top").click(function () {
    $('html, body').animate({scrollTop: 0
      }, 50).parent().focus();
    return false;
  });

  detectTrigger(); // run on page load for refresh when already scrolled

  $(window).on("scroll", function () {
      onRepaint();
  });

} // backToTop()



//Print page
function printPage() {
  "use strict";

  document.getElementById("msd-print-button").addEventListener("click", function() {
      var printContents = document.getElementById('main-content').innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
 });
 
}



//Dropdown list
function dropdown () {
      'use strict';  
      
      var App = {};
       
      App.buttonCount = 0;
      
      // Panel 
      App.panel = document.querySelectorAll('[data-js=msd-filter__panel]');
      
      [].forEach.call( App.panel, function(el) {
        el.setAttribute('role', 'tablist');
        el.setAttribute('aria-multiselectable', 'true');
      });
    
      // Section var
      App.section = document.querySelectorAll('[data-js=msd-filter__section]');
      
      // Each seciton
      // Inspired by http://jsfiddle.net/toddmotto/KjnG2/2/
      [].forEach.call( App.section, function(el, i) {   
    
        // Heading var, hide the heading
        App.heading = el.querySelector('[data-js=msd-filter__heading]');
        App.heading.classList.add('msd-filter__hidden');     
      
        
        // Content var, set ARIA property
        App.content = el.querySelector('[data-js=msd-filter__content]');    
        App.content.setAttribute('aria-hidden', 'true');
        App.content.setAttribute('aria-labelledby', App.heading.id);
        App.content.setAttribute('role', 'tabpanel');
    
        // Create the button
        App.button = document.createElement('button');
    
        // Assign class, and attributes
        App.button.id = App.heading.id;
        App.button.classList.add('msd-filter__button'); 
        App.button.setAttribute('data-js', 'button');
        App.button.innerHTML = App.heading.innerHTML;
        App.button.setAttribute('aria-expanded', 'false');
        App.button.setAttribute('aria-selected', 'false');
        App.button.setAttribute('aria-controls', App.content.id);
        App.button.setAttribute('role', 'tab');
        App.button.setAttribute('tabindex', '-1');
    
        // Insert the button 
        App.heading.parentNode.insertBefore(App.button, App.heading);
        
        // Button count, used in keyboard nav
        App.buttonCount++;
      
        // Button click event handler
        App.button.onclick = function () {
         
          var thisButton = this,
              thisContent = document.querySelectorAll('[data-js=msd-filter__content]');
            
          // Toogle active state (+/-)
          thisButton.classList.toggle('msd-filter__button--active');
      
          // Toggle ARIA property
          // https://gist.github.com/toddmotto/bbb704d88cf39b06dbe0
          thisButton.setAttribute('aria-expanded', thisButton.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
      
          // Toogle active state (show/hide)
          thisContent[i].classList.toggle('msd-filter__content--active'); 
      
          // Toggle ARIA property    
          thisContent[i].setAttribute('aria-hidden', App.content.getAttribute('aria-hidden') === 'true' ? 'false' : 'true');
      
        };
        
        // Keyboard navigation
        // http://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#accordion
        App.button.onfocus = function () {
    
          var thisButton = this;       
          
          // Set selected state
          [].forEach.call( document.querySelectorAll('[data-js=button]'), function(el) { 
            el.setAttribute('aria-selected', 'false');
            el.setAttribute('tabindex', '-1');
          });
          thisButton.setAttribute('aria-selected', 'true');
          thisButton.setAttribute('tabindex', '0');
          
        };
        
        App.button.onkeydown = function (e) {
          
          var thisButton = this;          
         
          switch(e.which) {
            // Left/Up
            case 37:
            case 38:
              
              e.preventDefault();
              // Check for previous node
                        
              if (!thisButton.parentNode.previousElementSibling) {
                // No previous node,
                // Set focus on last node
                thisButton.parentNode.parentNode.getElementsByTagName('section')[App.buttonCount-1].getElementsByTagName('button')[0].focus();
              } else {
                // Move focus to previous
                thisButton.parentNode.previousElementSibling.getElementsByTagName('button')[0].focus();
              }
              
              break;
              
            // Right/Down
            case 39:
            case 40:
              e.preventDefault();
              
              // Check for next node
             
              if (!thisButton.parentNode.nextElementSibling) {
                // No next node,
                // Set focus on first node            
                thisButton.parentNode.parentNode.getElementsByTagName('section')[0].getElementsByTagName('button')[0].focus();
              } else {
                // Move focus to next
                thisButton.parentNode.nextElementSibling.getElementsByTagName('button')[0].focus();
              }
              break;
              
            // Home
            case 36:          
                // Set focus on first node
              thisButton.parentNode.parentNode.getElementsByTagName('section')[0].getElementsByTagName('button')[0].focus();
              break;
              
            // End
            case 35:          
                // Set focus on last node
              thisButton.parentNode.parentNode.getElementsByTagName('section')[App.buttonCount-1].getElementsByTagName('button')[0].focus();
              break;
              
          }
          
        }; 
        
        // Remove heading from DOM
        el.removeChild(App.heading);
        
      });
      
      // Make first button selectable
      document.querySelector('[data-js=button]').setAttribute('tabindex', '0');
      document.querySelector('[data-js=button]').setAttribute('aria-selected', 'true');
   
}



//Re-order search filter in mobile
function filterReorder() {


$(window).on("load resize", function () {

   if ($(window).width() <= 770) {
      $('.msd-order-1').insertBefore('.msd-order-2');

      }  else {

       $('.msd-order-2').insertBefore('.msd-order-1');
    }

   });

}



//Document - load
$(document).ready(function () {
  backToTop();
  printPage();
  dropdown();
  filterReorder();
});
