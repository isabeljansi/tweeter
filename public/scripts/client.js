/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


  // Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

function createTweetElement(tweetData) {

  /** Within the client.js file, 
   * we're going to define a function createTweetElement 
   * that takes in a tweet object and is responsible for 
   * returning a tweet <article> element 
   * containing the entire HTML structure of the tweet.
   */

   const markup = `

   <article class="tweet-data">
        
   <section class="article-header">
       
        <img class="tweet-profile-pic" src="${tweetData.user.avatars}">
            <div class="username"><h6>${tweetData.user.name}</h6> </div>
            <div class="tweetID"><h6>${tweetData.user.handle}</h6></div>
       </section>
          
            <section class="tweet-content">
            <p>${tweetData.content.text} Tweet Content test 1 hello world. I can have 140 characters. Some text that might not have any meaning but require it to format my page. See you soon folks.</p>
            </section>

            <div>
              <hr class="solid">
            </div>

       <footer class="tweet-box-footer">
           <section class="time-ago">
           ${tweetData.created_at}
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
const $tweet = createTweetElement(tweetData);
// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('.tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});

