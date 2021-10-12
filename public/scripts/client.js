/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const loadTweets = function loadTweets () {
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
          
      <section class="article-header">
        <img class="tweet-profile-pic" src="${tweetData.user.avatars}">
        <div class="username"><h6>${tweetData.user.name}</h6> </div>
        <div class="tweetID"><h6>${tweetData.user.handle}</h6></div>
      </section>
              
      <section class="tweet-content">
        <p>${escape(tweetData.content.text)} </p>
      </section>

      <div>
        <hr class="solid">
      </div>

      <footer class="tweet-box-footer">
        <section class="time-ago">
        ${timeago.format(new Date(tweetData.created_at))}
        </section> 

        <section class="flag-icon">
          <i class="fas fa-flag"></i>
        </section> 

        <section class="retweet-icon">
          <i class="fas fa-retweet"></i>
        </section> 

        <section class="heart-icon">
          <i class="fas fa-heart"></i>
        </section> 

      </footer>
    </article>
    `;
  return markup;

  }

// A $( document ).ready() block.
$( document ).ready(function() {

  

  // to check if textarea is empty and no white space 
  

  $('#addTweet').submit( function (event) {
    console.log("Tweet Button clicked and handler for tweet button is called");
    event.preventDefault(); //cancel the submit action by calling .preventDefault()
    
    if ($(".textArea").val().length > 140) {
      return $('#error').text('❗️Error: Please shorten your message to 140 characters.');
     }

    if (!$.trim($(".textArea").val())) {
      return $('#error').text('❗️Error: Please enter text');
     }
     
     
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
      success:function(data){
        console.log("Success: loadTweets() called to display tweets");
        loadTweets(data);

      }
      
    })
    
    
  });
  
});


