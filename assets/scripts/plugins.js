(function ($) {
    sc_is_IE = function() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0) // If Internet Explorer, return version number
        {
            return true;
        }
        else  // If another browser, return 0
        {
            return false;
        }
    };
    $.fn.press_hover = function() {
        return this.each(function() {
            var _this = $(this);
            var settings = ({
                perspective: 300,
                easing: "transform 0s ease",
                scale: "1",
                coefX: -0.02,
                coefY: -0.02,
                y: 0,
                x: 0
            });
            build = function(_this) {
                if ($(window).width() > 991) {
                    _this.on('mouseout', function(e) {
                        $('.cs-hover-press', this).css({
                            "transform": "perspective(" + settings.perspective + "px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)",
                            "transition": "transform 0s ease"
                        });
                    });
                    _this.on('mousemove', function(e) {
                        var parentOffset = $(this).offset();
                        var relX = e.pageX - parentOffset.left;
                        var relY = e.pageY - parentOffset.top;
                        relX = relX - ($(this).width() / 2);
                        relY = relY - ($(this).height() / 2);
                        settings.x = relX * settings.coefX * -1;
                        settings.y = relY * settings.coefY * 1;
                        $('.cs-hover-press', this).css({
                            "transform": "perspective(" + settings.perspective + "px) rotateY(" + settings.x + "deg) rotateX(" + settings.y + "deg) scale3d(" + settings.scale + "," + settings.scale + "," + settings.scale + ")",
                            "transition": settings.easing
                        });
                    });
                }
            }
            ;
            build(_this);
        });
    }
    $.fn.cs_faq = function() {
        return this.each(function() {
            var _this = $(this);

            build = function(_this) {
                _this.click(function(event) {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                    }
                    else {
                        $(this).addClass('active');
                    }
                });
            }
            ;
            build(_this);
        });
    }
    ;
}(jQuery));