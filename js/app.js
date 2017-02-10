$(document).ready(function(){

  function hamMenu(){
  var burgerItself = $('.burgerItself');
  var hamburgerRoll = $('.hamburgerRoll');

    burgerItself.on('click', function(){
      hamburgerRoll.slideToggle();
    });
  };

  hamMenu();

  function switchAnalysis(){
    var offOption = $('.onOffContainer').find('p:first-child');
    var onOption = $('.onOffContainer').find('p:last-child');
    var graphDiv = $('.graphDiv');

    offOption.on('click', function(){
      $(this).addClass('backgoundRed');
      $(this).next().removeClass('backgoundGreen');
      graphDiv.slideUp();
    });

    onOption.on('click', function(){
      $(this).addClass('backgoundGreen');
      $(this).prev().removeClass('backgoundRed');
      graphDiv.slideDown();
    });
  };

  switchAnalysis();
});
