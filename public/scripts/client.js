/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const loadTweets = function () {
  $.ajax({
    type: 'GET',
    url: "/tweets",
    dataType: 'JSON'
  })
  .done(function(data) {
    console.log("Sucess: rendering tweets");
    renderTweets(data);
  })
}

// loadTweets();

const renderTweets = function(tweets) {
// loops through tweets

  $('.tweets-container').empty();
  for(const tweet of tweets){
    // calls createTweetElement for each tweet
    const $newtweet = createTweetElement(tweet);
    // Test / driver code (temporary)
    console.log($newtweet); // to see what it looks like
    // takes return value and appends it to the tweets container
    $('.tweets-container').prepend($newtweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
}

//Preventng cross-site scripting with an escape function
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};



/** 
 * function takes a tweet object and is responsible for returning 
 * a tweet article element containing the entire HTML structure of the tweet 
 **/
function createTweetElement(tweetData) {

   const markup = `
    <article class="tweet-data">
      
      <div class="tweet-header"> 
        <div>
          <img class="tweet-profile-pic" src="${tweetData.user.avatars}">
          <h6 class="username">${tweetData.user.name}</h6>
        </div>
      
        <h6 class="tweetID">${tweetData.user.handle}</h6>
      </div>

      <p class="tweet-content">${escape(tweetData.content.text)}</p>

      <hr class="solid">
 
      <footer class="tweet-footer">
        <div class="time-ago">${timeago.format(new Date(tweetData.created_at))}</div> 
        <div class ="tweet-icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
     
    </article>
    `;
  return markup;

  }

// A $( document ).ready() block.
$( document ).ready(function() {

  loadTweets();

  // to check if textarea is empty and no white space 
  

  $('#addTweet').submit( function (event) {
    console.log("Tweet Button clicked and handler for tweet button is called");
    event.preventDefault(); //cancel the submit action by calling .preventDefault()
    
    if (!$.trim($(".textArea").val())) {
      return $('#error').text('❗️Error: Please enter text');
    }

    if ($(".textArea").val().length > 140) {
      return $('#error').text('❗️Error: Please shorten your message to 140 characters.');
    }


     $('#error').text('');
     
     
    /** jQuery .serialize() function turns a set of form data into a query string. 
     * This serialized data should be sent to the server 
     * in the data field of the AJAX POST request
     */
    let tweetText = $(this).serialize();
    
    console.log(tweetText);

    $.ajax({
      type: "POST",
      url: '/tweets',
      data: tweetText,
      // success:function(){
      //   console.log("Success: loadTweets() called to display tweets");
      //   loadTweets();

      // }
      
    })
    .then(() => {
      $('.textArea').val('');
      $('.counter').val(140);
      loadTweets();
    })
    
  });

});


