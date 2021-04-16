$(".tvcart-txt_item:nth-child(1)").addClass("active");

$(function() {
    var $slider = $("#sync1");

    
    $slider.owlCarousel({
        items: 3,
        loop: true,
        smartSpeed: 1000,
        autoWidth: false,
        margin: 10,
        nav: true,
        autoplay: false,
        navText: ['<div class="slider-control slider-control-left"></div>', '<div class="slider-control slider-control-right"></div>'],
        itemsDesktop: true,
        itemsDesktopSmall: true,
        itemsTablet: true,
        itemsMobile: true,
        responsiveClass: true,
        lazyLoad: true,
        center: true,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            500: {
                items: 3
            }
        }
    });
    
    $slider.on("changed.owl.carousel", function(event) {
      var page = event.page.index;
      
      $(".tvcart-txt").children(".tvcart-txt_item").removeClass("active").eq(page).addClass("active");
    });
  });

  $(function() {
    var $slider = $(".tvcart-carousel_items");

    
    $slider.owlCarousel({
        items: 4,
        loop: true,
        smartSpeed: 1000,
        autoWidth: false,
        margin: 10,
        nav: false,
        autoplay: true,
        navText: ['<div class="slider-control slider-control-left"></div>', '<div class="slider-control slider-control-right"></div>'],
        itemsDesktop: true,
        itemsDesktopSmall: true,
        itemsTablet: true,
        itemsMobile: true,
        responsiveClass: true,
        lazyLoad: true,
        center: false,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            500: {
                items: 4
            }
        }
    });

});

//увеличение фотографии товара
if ($(".lightgallery").length) {
    $('#sync1').lightGallery({
        selector: '.item'
    });
}
  