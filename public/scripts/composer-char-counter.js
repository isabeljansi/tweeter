

$(document).ready(function() {
console.log("Test: composer-char-counter.js file has loaded to the DOM")

$( ".textArea" ).keyup(function() {
  let myTweetLength = $(this).val().length;
  console.log(myTweetLength);
  $(".counter").text (140 - myTweetLength);
  if (myTweetLength > 140 ) {
    $(".counter").css("color", "red");
  } else {
    $(".counter").css("color", "black");
  }
});


});


