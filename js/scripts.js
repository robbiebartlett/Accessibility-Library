
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
        if (scrTop >= 2400) {
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
	    }, 50);
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




 //Document - load
 $(document).ready(function () {
    backToTop();
    printPage();
 });
 