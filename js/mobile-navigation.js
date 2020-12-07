! function(e, n) {
    var i = {
        init: function(n, i) {
            var u = this;
            u.options = e.extend({}, e.fn.nav.options, n), u.$body = e("body"), u.$nav = e(i), u.$menuButton = e(u.options.navButton), u.$subMenu = e(u.options.subMenu), u.subMenu = u.options.subMenu, u.mobileMode = u.isCurrentlyMobile(u), u.mouseOver = u.options.mouseOver, u.disableSubMenuLink = u.options.disableSubMenuLink, u.slideSpeed = u.options.slideSpeed, u.collapseSubMenus(u), u.bindEvents(u)
        },
        bindEvents: function(i) {
            i.$menuButton.on("click", function(e) {
                i.toggleNav(i), e.preventDefault()
            }), i.$nav.on("click", i.subMenu + " > .msd-mobile__toggle", function(n) {
                var u = e(this);
                i.isSubMenuLinkDisabled(i, u) && (i.toggleSubMenu(i, u.parent()), n.preventDefault())
            }), 1 == i.mouseOver && (i.$nav.on("mouseenter", i.subMenu, function() {
                0 == i.mobileMode && i.openSubMenu(i, e(this))
            }), i.$nav.on("mouseleave", i.subMenu, function() {
                0 == i.mobileMode && i.closeSubMenu(i, e(this))
            })), e(n).on("resize", function() {
                i.resetNav(i)
            })
        },
        isSubMenuLinkDisabled: function(e, n) {
            return "always" == e.disableSubMenuLink || "#" == n.attr("href") || "mobile" == e.disableSubMenuLink && 1 == e.mobileMode || "desktop" == e.disableSubMenuLink && 0 == e.mobileMode
        },
        toggleNav: function(n) {
            n.$nav.stop().clearQueue().slideToggle(n.slideSpeed, function() {
                var i = e(this);
                i.is(":hidden") ? (n.collapseSubMenus(n), e(this).attr("style", "display: none;")) : e(this).attr("style", "display: block;")
            })
        },
        toggleSubMenu: function(e, n) {
            n.hasClass("msd-mobile-nav__active") ? e.closeSubMenu(e, n) : e.openSubMenu(e, n)
        },
        openSubMenu: function(n, i) {
            i.addClass("msd-mobile-nav__active").children("ul").stop().clearQueue().slideDown(n.slideSpeed, function() {
                e(this).attr("style", "display: block;")
            }), i.siblings(n.subMenu).removeClass("msd-mobile-nav__active").children("ul").slideUp(n.slideSpeed, function() {
                e(this).clearQueue()
            }).find(".msd-mobile-nav__active").removeClass("msd-mobile-nav__active").children("ul").slideUp(n.slideSpeed, function() {
                e(this).clearQueue()
            })
        },
        closeSubMenu: function(n, i) {
            i.removeClass("msd-mobile-nav__active").children("ul").stop().clearQueue().slideUp(n.slideSpeed, function() {
                e(this).attr("style", "display: none;")
            }).find(".msd-mobile-nav__active").removeClass("msd-mobile-nav__active").children("ul").slideUp(n.slideSpeed, function() {
                e(this).clearQueue()
            })
        },
        resetNav: function(e) {
            var n = e.isCurrentlyMobile(e);
            e.mobileMode !== n && (e.$nav.removeAttr("style").find("ul").removeAttr("style"), e.collapseSubMenus(e), e.mobileMode = n)
        },
        collapseSubMenus: function(e) {
            e.$subMenu.removeClass("msd-mobile-nav__active").children("ul").hide()
        },
        isCurrentlyMobile: function(e) {
            return e.$menuButton.is(":visible")
        }
    };
    e.fn.nav = function(e) {
        return this.each(function() {
            var n = Object.create(i);
            n.init(e, this)
        })
    }, e.fn.nav.options = {
        navButton: ".msd-mobile-nav__toggle",
        subMenu: ".msd-mobile__toggle--wrapper",
        mouseOver: !0,
        disableSubMenuLink: "always",
        slideSpeed: 3
    }, $(".msd-mobile-nav__toggle").click(function(){
        $(this).toggleClass("msd-mobile-nav__toggle--active");
      });

    //Switch title
      jQuery.fn.extend({
        toggleText: function (a, b){
            var isClicked = false;
            var that = this;
            this.click(function (){
                if (isClicked) { that.text(a); isClicked = false; }
                else { that.text(b); isClicked = true; }
            });
            return this;
        }
    });
    
    $('.msd-mobile-nav__toggle').toggleText("Menu", "Close");

    $(window).on('resize', function () {
      
      if ($(window).width() > 767) {
          $(".msd-mobile-nav__toggle").attr("aria-expanded","false");
          $('.msd-mobile-nav__toggle').text('Menu');

       } else {
   
          if ($('.msd-mobile-nav').attr("aria-hidden","false")) {
              $(".msd-mobile-nav__toggle").attr("aria-expanded","true");
              $('.msd-mobile-nav__toggle').toggleText("Menu", "Close");
          }
       }
    });

     //Add ARIA controls
      $(window).on("load resize", function () {
        var toggle = document.querySelector(".msd-mobile-nav__toggle");
            mobilemenu = document.querySelector(".msd-mobile-nav");

         toggle.addEventListener("click", function(){
  
           if (toggle.classList.contains("msd-mobile-nav__toggle--active")) {
               toggle.setAttribute("aria-expanded", "true");
               mobilemenu.setAttribute("aria-hidden", "false");
  
                toggle(function(el) {
                    el.classList.remove("msd-mobile-nav__toggle--active");
                    });
                } else {
                toggle.setAttribute("aria-expanded", "false");
                mobilemenu.setAttribute("aria-hidden", "true");
                
                toggle(function(el) {
                    el.classList.add("msd-mobile-nav__toggle--active");
                    });
                }
           }); 
        });
  
      //Navigation title
      $('.msd-mobile-nav').nav();

}(jQuery, window, document), "function" != typeof Object.create && (Object.create = function(e) {
    function n() {}
    return n.prototype = e, new n
});