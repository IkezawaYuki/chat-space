$(function(){

  function buildHTML(message){
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
      `
    if(message.content != null){
      var content = `
      <p class="contents__post__text">
      ${message.content}
      </p>
      `
      html = html + content;
    }
    if(message.image.url != null){
      var image = `
      <img class="contents__post__image" src="${message.image.url}"></img>
      `
      html = html + image;
    }
    return html + "</div>";
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
      $(".inputBox__text").val("");
      $(".inputBox__label__input").val("");
      $('.contents').animate({scrollTop: $('.contents')[0].scrollHeight});
    }).fail(function(){
      alert("通信でエラーが発生しました。");
    })
  });
})