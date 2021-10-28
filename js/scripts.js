
//Navigation
function primaryNav () {
  'use strict';  
  
  //toggle menu 
  $('.msd-navigation__toggle').on('click', function (e) {

  $('.msd-navigation').toggleClass('active');
  var primaryNav = $('.msd-navigation__toggle');

  if (primaryNav.attr("aria-expanded") === "false") {
    primaryNav.attr("aria-expanded", "true");
  } else {
    primaryNav.attr("aria-expanded", "false");
  }

  // toggle menu/close
  if ($(this).text() == "Close")
  $(this).text("Menu");
  else
  $(this).text("Close");

  }); 


  //toggle sub-menu
  $('.msd-navigation__mobile-toggle').on('click', function (e) {
  e.preventDefault();


  //Set ARIA values
  var primaryLevelButton = $(this);
  if (primaryLevelButton.attr("aria-expanded") === "false") {
    primaryLevelButton.attr("aria-expanded", "true");
  } else {
    primaryLevelButton.attr("aria-expanded", "false");
  }
  



  //toggle submenu & ARIA values
  var openMenu=$(this).parent().toggleClass('active');    
  $(".msd-navigation__list-item").not(openMenu).removeClass('active');
  $(".msd-navigation__mobile-toggle").not(this).attr("aria-expanded","false");


}); 


// Accessible Desktop navigation
$('.msd-navigation').find('.msd-navigation__level-one > msd-navigation__list-item').on('focusin', function () {
$('.msd-navigation__level-one > .msd-navigation__list-item').removeClass('js-focus');
});
$('.msd-navigation-sr-expand__btn').on('click', function (e) {
var isAlreadyOpen = $(this).closest('.msd-navigation__level-one > li.js-focus').length;
$('.msd-navigation__level-one > li').removeClass('js-focus');

if (!isAlreadyOpen) {
  $(this).closest('.msd-navigation__level-one > .msd-navigation__list-item').addClass('js-focus');
}
});
$('.msd-navigation').on('mouseover', function () {
$(this).find('.js-focus').removeClass('js-focus');
});
$('body').on('keyup', function (e) {
if (e.keyCode === 27) {
  $('.js-focus').removeClass('js-focus');
}
}); 

}





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

  var title = document.getElementById('skiplinks');
  $(".back-to-top").click(function () {
    title.focus();
    $('html, body').animate({scrollTop: 0
      }, 50).parent();
    return false;
  });

  detectTrigger(); // run on page load for refresh when already scrolled

  $(window).on("scroll", function () {
      onRepaint();
  });



} 





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





//TimeStamp
function timeStamp() {
  $('#year').html(new Date().getFullYear());
}





//Expand <details> accordion
function accordion() {

  $('.msd-accordion__toggle').on('click', function (e) {
    var $accordionGroups = $(".msd-accordion").find(".msd-accordion__details"),
        $expandLink = $(".msd-accordion__toggle"),
        $detailsOpen = $accordionGroups.prop("open"),
        $detailsActive= $expandLink.hasClass("active");

   if ($detailsActive == true) {
     $accordionGroups.prop('open', false);
     $expandLink.html("Expand All").toggleClass("active");
   } else if (($detailsOpen == true) && ($detailsActive == false))  {
     $accordionGroups.prop('open', true);
     $expandLink.html("Collapse All").toggleClass("active");
   } else  {
     $accordionGroups.prop('open', true);
     $expandLink.html("Collapse All").toggleClass("active");
   }

     //Set ARIA values
  var openAccordion = $(this);
  if (openAccordion.attr("aria-expanded") === "false") {
    openAccordion.attr("aria-expanded", "true");
  } else {
    openAccordion.attr("aria-expanded", "false");
  }

  });

}






//Filter list
function filter() {

  //Used to minify filters in mobile
  $(window).on("load resize", function () {

    if ($(window).width() <= 770) {
      //Set filter to closed
      document.getElementById("msd-filter").open = false;
      //Add focus element
      $(".msd-filter__summary").attr('tabindex', '1');
      //Change tab order in mobile view
      $('.msd-order-1').insertBefore('.msd-order-2');
 
       }  else {
 
        document.getElementById("msd-filter").open = true;
        $(".msd-filter__summary").attr('tabindex', '-1');
        $('.msd-order-2').insertBefore('.msd-order-1');
     }

   }); 
}








//Document - load
$(document).ready(function () {
  primaryNav();
  backToTop();
  printPage();
  timeStamp();
  accordion();
  filter();
});
