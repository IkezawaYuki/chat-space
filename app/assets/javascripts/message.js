$(function(){
  function buildHTML(message){
    var content_html = message.content == null ? "" : `<p class="contents__post__text">${message.content}</p>`
    var image_html = message.image.url == null ? "" : `<img class="contents__post__image" src="${message.image.url}"></img>`
    var html = 
    `<div class="contents__post" data-id="${message.id}">
      <div class="contents__post__head">
        <div class="user_name">
          ${message.user_name}
        </div>
        <div class="date">
          ${message.created_at}
        </div>
      </div>
      ${content_html}
      ${image_html}
    </div>
    `
    return html;
  }

  $(".new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href;
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: "JSON",
      processData: false,
      contentType: false
    }).done(function(data){
      var html = buildHTML(data);
      $(".contents").append(html);
      $(".new_message")[0].reset();
      $('.contents').animate({scrollTop: $('.contents')[0].scrollHeight});
    }).fail(function(){
      alert("通信でエラーが発生しました。");
    })
  });

  var reloadMessages = function(){
    var url = window.location.href;
    url = url.replace("/messages", "/api/messages");
    if (url.match(/\/groups\/\d+\/api\/messages/)){
      var last_message_id = $(".contents__post").last().data("id");
      $.ajax({
        url:url,
        type: "GET",
        data:{id: last_message_id},
        dataType:"json"
      }).done(function(messages){
        if(messages.length != 0){
          var insertHTML = "";
          messages.forEach(function(message){
          var html = buildHTML(message);
          insertHTML = insertHTML + html;
        });
        $(".contents").append(insertHTML);
        $('.contents').animate({scrollTop: $('.contents')[0].scrollHeight});
        }
      }).fail(function(){
        alert("自動更新に失敗しました。");
      });
    }else{
      clearInterval(reloadMessages);
    }
  }

  var buildMessageHTML = function(message) {
    var message_content_html = message.content == null ? "" : `<p class="lower-message__content">${message.content}</p>`
    var message_image_html = message.image.url == null ? "" : `<img src="${message.image.url}" class="lower-message__image" >`
      var html = '<div class="message" data-id=' + message.id + '>' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          message_content_html +
          message_image_html +
        '</div>' +
      '</div>'
    return html;
  };

  setInterval(reloadMessages, 5000);
})