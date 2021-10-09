

$(document).ready(function() {
console.log("Test: composer-char-counter.js file has loaded to the DOM")


// $( ".textArea" ).change(function() {
//   alert( "Handler for .change() called when a change occurs in text area." );
// });

// This will add a click event listener to all elements with the "button" class
// $(".button").on("click", (event) => {
//   alert( "You clicked the Tweet button." );

// })

$( "textArea" ).keyup(function() {
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


