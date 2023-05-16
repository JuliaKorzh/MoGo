const menu = document.querySelector(".header__nav")
const btnOpen = document.querySelector(".header__btn-open")
const btnClose = document.querySelector(".header__btn-close")
const link = document.querySelectorAll (".nav__link")

btnOpen.addEventListener("click", function(){
   menu.classList.toggle("active");
   btnOpen.classList.toggle("active");
   btnClose.classList.toggle("active");
})
btnClose.addEventListener("click", function (){
   menu.classList.toggle("active");
   btnOpen.classList.toggle("active");
   btnClose.classList.toggle("active");
})

link.forEach((el)=>{
   el.addEventListener("click", function(){
      menu.classList.toggle("active");
      btnOpen.classList.toggle("active");
      btnClose.classList.toggle("active");
   })
})
