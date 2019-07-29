// 
//// Collections Carousel
// 
(function () {

  function setHeightForCarouselCollectionsControls () {
    const element = document.querySelector('#thumbCollection');
    const style = getComputedStyle(element);

    const height = style.height;

    const nodeList = document.querySelectorAll(".carousel-inner > .thumb-controls"); 

    let i;
    for (i = 0; i < nodeList.length; i++) {
      nodeList[i].style.height = height;
    }
  }

  // Usage
  setHeightForCarouselCollectionsControls ();

}());