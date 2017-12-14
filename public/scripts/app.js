/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function() {

  function createTweetElement(tweet) {
    var tweetBody = tweet.content.text
    var tweetUserName = tweet.user.name
    var tweetAvatar = tweet.user.avatars.small
    var tweetHandler = tweet.user.handle
    var tweetFooter = moment(tweet.created_at).fromNow();

    return $(`<article class="tweet">
            <header class="tweetHead">
              <img src="${tweetAvatar}">
              <h2 class="tweetName">${tweetUserName}</h2>
              <h4 class="tweetHandle">${tweetHandler}</h4>

            </header>

            <p class="tweetBody">${tweetBody}</p>

            <footer class="tweetFoot">
              ${tweetFooter}
              <div class="icons">
                <i class="fa fa-flag" aria-hidden="true"></i>
                <i class="fa fa-retweet" aria-hidden="true"></i>
                <i class="fa fa-heart" aria-hidden="true"></i>
              </div>
            </footer>
          </article>`);
  }


  function renderTweets($tweetsContainer, tweetsArray) {
    console.log('$tweetsContainer', $tweetsContainer)
    $tweetsContainer.empty();
    for(var tweet of tweetsArray){
      var $tweetElement = createTweetElement(tweet);
      $tweetsContainer.prepend($tweetElement);
    }
  }

  $(function () {

    var $tweetsContainer = $(".allTweets");

    getTweets();

    $('#newTweetForm').on('submit', function (event) {
      event.preventDefault();
      console.log('submit event fired');
      var $form = $(this);
      console.log($form);
      var formData = $form.serialize();

      if(isValid($form)) {

        $.post('/tweets', formData)
        .success(() => {
          //$('.tweetbox').reset()
          console.log('posting tweets');
          getTweets();
        })
        .done(function() {
          $('.tweetbox').val('');
          console.log('done')
        })
        .error(err => alert(err));
      }

      getTweets();
    })

    // Getting all tweets from server

    function getTweets() {

      $.get('/tweets')
      .success(function(tweets) {
        console.log('getting tweets');
        renderTweets($tweetsContainer, tweets);
      });
    }

    getTweets();


    // Updating tweets on the same page

    var $button = $('#newTweetForm');
    $button.on('submit', function(event) {
      event.preventDefault();
      console.log('Performing my AJAX')
      $.ajax({
        url: '/tweets',
        method: 'GET',
        success: function(loadTweets){
          console.log('Success: ', loadTweets);
          renderTweets($('.allTweets'), loadTweets);
        }
      })
    })
  })

  // Alert message in tweet box is empty or has exceeded tweet character limit

  function isValid($form) {
    var maxTweetLength = 140
    var $textArea = $form.find('textarea');
    var inputLength = $textArea.val().length;

    if(!inputLength) {
      alert('Type something, I wanna hear your thoughts!');
      return false;
    } else if (inputLength > maxTweetLength) {
      alert('Whoa, slow down chatterbox!');
      return false;
    }

    return true;
  }

  $('.button').on('click', function() {
    $('.new-tweet').slideToggle(function() {
      $('.tweetbox').select();
    });
  })
})





