/*__________BTN CLOSE RIGHT MENU__________________*/

const btnClose = document.querySelector(".right-menu__btnclose");
const btnOpen = document.querySelector(".header__btn");
const menuRight = document.querySelector(".right-menu");

btnOpen.addEventListener("click", ()=>{
   menuRight.classList.toggle("right-menu--active")
})
btnClose.addEventListener("click", ()=>{
   menuRight.classList.toggle("right-menu--active")
});

/*_SLICK____*/
$(function(){
   $(".start__slider").slick({
      dots: true,
      arrows: false,
      fade: true,
      autoplay: true,
   });
   $(".collection__slider").slick({
      dots: true,
      arrows: false,
      slidesToShow: 8,
      slidesToScroll: 8,
      responsive: [
         {
           breakpoint: 1380,
           settings: {
             slidesToShow: 6,
             slidesToScroll: 6
           }
         },
         {
            breakpoint: 1050,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4
              
            }
          },
          {
            breakpoint: 710,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
              
            }
          },
          {
            breakpoint: 520,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
              
            }
          },
       ]
   });
   $(".blog-slider__box").slick({
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev"><img class="slider__arrow slider__arrow-back" src="./images/dist/arrow-left.svg" alt="arrow"/></button>',
      nextArrow: '<button type="button" class="slick-next"><img class="slider__arrow slider__arrow-next" src="./images/dist/arrow-recht.svg" alt="arrow"/></button>'  

   });
})
   const container = document.querySelector(".gallery__mixer");
   let mixer;
   if(container){
      mixer = mixitup(container,{
         load:{
            filter:".category-living",
         }
      });
   }



Fancybox.bind();

//_______________Menu mobile

const btnMenuMobile = document.querySelector(".header__btn-open")
const menuMobile = document.querySelectorAll(".menu")
btnMenuMobile.addEventListener("click", ()=>{
   menuMobile.forEach(el =>{
      el.classList.toggle("menu--active")
   })
 
})