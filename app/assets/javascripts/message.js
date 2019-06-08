$(function(){

  function buildHTML(message){
    var content_html = message.content == null ? "" : `<p class="contents__post__text">${message.content}</p>`
    var image_html = message.image.url == null ? "" : `<img class="contents__post__image" src="${message.image.url}"></img>`
    var html = 
    `<div class="contents__post">
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
})