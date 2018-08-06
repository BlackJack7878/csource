(function ($) {
    if (!window.CSOURCE) {
        CSOURCE = {};
    }
    /*
     * Application Init, everything starts here
     *
     */
    CSOURCE.App = function() {
        return {
            exists: function(x) {
                if ($(x).length > 0) { return true; }
            },
            init: function() {
                // General

                // Roadmap
                if ($('.timeline').length) {
                  // define variables
                  var items = document.querySelectorAll(".timeline li");

                  // check if an element is in viewport
                  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
                  function isElementInViewport(el) {
                    var rect = el.getBoundingClientRect();
                    return (
                      rect.top >= 0 &&
                      rect.left >= 0 &&
                      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                      );
                  }

                  function callbackFunc() {
                    for (var i = 0; i < items.length; i++) {
                      if (isElementInViewport(items[i])) {
                        items[i].classList.add("in-view");
                      }
                    }
                  }

                  // listen for events
                  window.addEventListener("load", callbackFunc);
                  window.addEventListener("resize", callbackFunc);
                  window.addEventListener("scroll", callbackFunc);

                  if ($(window).width() < 600) {
                    $('.timeline ul li div').each(function(index, el) {
                      $(this).width($(this).closest('.timeline').width() - 91);
                    });

                    $(window).resize(function(event) {
                      $('.timeline ul li div').each(function(index, el) {
                        $(this).width($(this).closest('.timeline').width() - 91);
                      });
                    });
                  }
                }
              
              // Token dist. chart
              if ($('#tokenChart').length) {
                  var ctx = $("#tokenChart");

                  var cs_backgroundColor = [
                    'rgba(239, 63, 68, 1)',
                    'rgba(253, 101, 105, 1)',
                    'rgba(254, 143, 146, .7)',
                    'rgba(218, 21, 26, 1)',
                    'rgba(169, 8, 12, 1)',
                    'rgba(253, 108, 112, 1)'
                  ];

                  if ($('body').hasClass('cs-blue')) {
                    var cs_backgroundColor = [
                      'rgba(33, 199, 207, 1)',
                      'rgba(1, 134, 140, 1)',
                      'rgba(1, 188, 197, .7)',
                      'rgba(0, 75, 78, 1)',
                      'rgba(114, 223, 228, 1)',
                      'rgba(161, 239, 243, 1)'
                    ];
                  }
                  else if ($('body').hasClass('cs-green')) {
                    var cs_backgroundColor = [
                      'rgba(60, 197, 111, 1)',
                      'rgba(6, 151, 60, 1)',
                      'rgba(29, 183, 86, .7)',
                      'rgba(95, 214, 139, 1)',
                      'rgba(143, 232, 176, 1)',
                      'rgba(0, 94, 35, 1)'
                    ];
                  }
                  else if ($('body').hasClass('cs-pink')) {
                    var cs_backgroundColor = [
                      'rgba(223, 50, 159, 1)',
                      'rgba(181, 0, 114, 1)',
                      'rgba(231, 87, 177, .7)',
                      'rgba(215, 12, 140, 1)',
                      'rgba(240, 133, 200, 1)',
                      'rgba(113, 0, 71, 1)'
                    ];
                  }
                  else if ($('body').hasClass('cs-yellow')) {
                    var cs_backgroundColor = [
                      'rgba(254, 200, 7, 1)',
                      'rgba(157, 123, 0, 1)',
                      'rgba(255, 213, 61, .7)',
                      'rgba(200, 156, 0, 1)',
                      'rgba(255, 222, 103, 1)',
                      'rgba(121, 95, 0, 1)'
                    ];
                  }

                  data = {
                      datasets: [{
                          data: [40, 10, 15, 10, 5, 10],
                          backgroundColor: cs_backgroundColor,
                          borderColor: cs_backgroundColor,
                          borderWidth: 1
                      }],
                      // These labels appear in the legend and in the tooltips when hovering different arcs
                      labels: [
                          'Crowdsale',
                          'Advisors',
                          'Team',
                          'Masternodes',
                          'Airdrop',
                          'Project reserve'
                      ]
                  };

                  var myDoughnutChart = new Chart(ctx, {
                      type: 'doughnut',
                      data: data,
                      options: {
                          layout: {
                            padding: {
                              top: 50,
                              left: 0,
                              right: 0,
                              bottom: 0
                            }
                          },
                          legend: {
                              display: false
                          }
                      }
                  });
              }

              // Mobile menu
              $('.cs-mob-trigger').click(function(event) {
                if ($(this).hasClass('ready')) {
                  $(this).removeClass('ready');
                  $('.cs-header-mobile').css('display', 'none');
                  $('body').css('overflow', 'auto');
                  $('body').css('height', 'auto');
                }
                else {
                  $(this).addClass('ready');
                  $('.cs-header-mobile').css('display', 'block');
                  $('body').css('overflow', 'hidden');
                  $('body').css('height', '100%');
                }
              });

              $('.cs-header-mobile .cs-dropdown > a').click(function(event) {
                event.preventDefault();
              });

              $('.cs-header-mobile .cs-dropdown').click(function(event) {
                if($(this).hasClass('active')) {
                  $(this).removeClass('active');
                }
                else {
                  $(this).addClass('active');
                }
              });

              // Anchor scrolling
              $('.cs-anchor-scroll').click(function(event){
                event.preventDefault();
                var target = $(this).attr('target');
                $('html, body').animate({scrollTop:$(target).position().top - 100}, 2000);
              });

              // Animations

              if ($(window).width() > 991) {
                var s2 = '2s';
                var s3 = '3s';
                var s4 = '4s';

                $('.anim-left').waypoint(function(e, direction){
                  $(this['element']).each(function(index, el) {
                    $(this).css('animation', 'Left ' + s2 + ' forwards');
                  });
                }, {offset: '90%'});
                $('.anim-right').waypoint(function(e, direction){
                  $(this['element']).each(function(index, el) {
                    $(this).css('animation', 'Right ' + s2 + ' forwards');
                  });
                }, {offset: '90%'});

                $('.anim-left-slow').waypoint(function(e, direction){
                  $(this['element']).each(function(index, el) {
                    $(this).css('animation', 'Left ' + s3 + ' forwards');
                  });
                }, {offset: '90%'});
                $('.anim-right-slow').waypoint(function(e, direction){
                  $(this['element']).each(function(index, el) {
                    $(this).css('animation', 'Right ' + s3 + ' forwards');
                  });
                }, {offset: '90%'});

                $('.anim-rotate').waypoint(function(e, direction){
                  $(this['element']).each(function(index, el) {
                    $(this).css('animation', 'Rotate ' + s2 + ' forwards');
                  });
                }, {offset: '90%'});
                $('.anim-spin').waypoint(function(e, direction){
                  $(this['element']).each(function(index, el) {
                    $(this).css('animation', 'Spin ' + s2 + ' forwards');
                  });
                }, {offset: '90%'});

                $('.anim-spin-right').waypoint(function(e, direction){
                  $(this['element']).each(function(index, el) {
                    $(this).css('animation', 'Spin-Right ' + s2 + ' forwards');
                  });
                }, {offset: '90%'});

                $('.anim-drop').waypoint(function(e, direction){
                  $(this['element']).each(function(index, el) {
                    $(this).css('animation', 'Drop ' + s2 + ' forwards');
                  });
                }, {offset: '90%'});
                $('.anim-under').waypoint(function(e, direction){
                  $(this['element']).each(function(index, el) {
                    $(this).css('animation', 'Under ' + s2 + ' forwards');
                  });
                }, {offset: '90%'});
                $('.anim-under-slow').waypoint(function(e, direction){
                  $(this['element']).each(function(index, el) {
                    $(this).css('animation', 'Under ' + s3 + ' forwards');
                  });
                }, {offset: '90%'});
                $('.anim-under-slowest').waypoint(function(e, direction){
                  $(this['element']).each(function(index, el) {
                    $(this).css('animation', 'Under ' + s4 + ' forwards');
                  });
                }, {offset: '90%'});

                $('.anim-apear').waypoint(function(e, direction){
                  $(this['element']).each(function(index, el) {
                    $(this).css('animation', 'Apear ' + s2 + ' forwards');
                  });
                }, {offset: '90%'});

              }

              // Card animation on hover
              if ($('.cs-hover-press-wrapper').length) {
                  $('.cs-hover-press-wrapper').each(function(index, el) {
                    $(this).press_hover();
                  });
              }

              // FAQ
              if ($('.cs-about-faq-single').length) {
                $('.cs-about-faq-single').each(function(index, el) {
                  $(this).cs_faq();
                });
              }

              // Countdown timer for homepage #2
              if ($('#clock').length) {
                var d_current = new Date();
                var d_end = new Date();
                d_end.setHours(d_current.getHours() - 2);

                var d_left = (d_current.getTime() / 1000) - (d_end.getTime() / 1000);

                var clock = $('#clock').FlipClock(d_left, {
                  clockFace: 'DailyCounter',
                  countdown: true
                });
              }

              if ($('#cs-bar').length) {
                var elem = document.getElementById("cs-bar"); 
                var width = 1;
                var id = setInterval(frame, 10);
                function frame() {
                    if (width >= 60) {
                        clearInterval(id);
                    } else {
                        width++; 
                        elem.style.width = width + '%'; 
                    }
                }
              }

              if ($('#particles-js').length) {
                particlesJS.load('particles-js', 'particles.json', function() {
                  console.log('callback - particles.js config loaded');
                });
              }

            }
        };
    }();

    $(function() {
        CSOURCE.App.init();
    });
}(jQuery));