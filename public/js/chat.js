var socket = io();

var adjustMessageWrapperHeight = function () {
    $('#msg-wrapper').css({
      bottom: $('#message-form').outerHeight(),
      height: $(document).outerHeight() - $('#message-form').outerHeight()
    });
};

var scrollMessageWrapper = function (scrollDuration) {
  $('#msg-wrapper').animate({
    scrollTop: $('#msg-wrapper')[0].scrollHeight
  }, scrollDuration);
};

$(document).ready(function () {
  adjustMessageWrapperHeight();
  $(window).resize(debounce(adjustMessageWrapperHeight, 1000));

  scrollMessageWrapper(1000);

  var username = undefined;

  $('#modalform').submit(function () {
    var formInput = $('#modalform').find('#username').val().trim();
    if (formInput !== '') {
      username = formInput;
      $('#modal').animate({top: '-150%'}, 500, function () {
        $('#modal').remove();
      });
    }
    return false;
  });

  $('#message-form').submit(function () {
    if (username !== undefined) {
      socket.emit('chat message', {username: username, text: $('#message-box').val()});
      $('#message-box').val('');
    }
    return false;
  });

  socket.on('chat message', function (msg) {
    var leftoverScroll = $('#msg-wrapper')[0].scrollHeight
                          - $('#msg-wrapper').scrollTop()
                          - $('#msg-wrapper').outerHeight();
    var message = $('<li>').text(msg.text).prepend($('<strong>').text(msg.username + ': '));
    $('#messages').append(message);
    // Only scroll if we're already at the end (+/- 10px). Otherwise,
    // user is probably reading old chat messages.
    if (leftoverScroll < 10) {
      scrollMessageWrapper(50);
    }
  });
});
