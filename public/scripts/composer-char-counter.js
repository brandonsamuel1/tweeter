$(document).ready(function() {
  $('.tweetbox').on('keyup', function(event) {
    var remainingChar = 140 - $(this).val().length;
    var counter = $(this).siblings('.counter');

    counter.text(remainingChar)

    if(remainingChar < 0) {
      counter.css({color: 'red'});
    } else {
      counter.css({color: 'black'});
    }
  })
})