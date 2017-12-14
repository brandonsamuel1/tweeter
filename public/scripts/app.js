/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function() {

  var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];


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





