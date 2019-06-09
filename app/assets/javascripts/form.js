$(document).on('turbolinks:load', function(){
  var group_user = [];
  var search_list = $("#user-search-result");
  var join_user_list = $("#chat-group-users");

  function appendUserHTML(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
  </div>`
    search_list.append(html);
  }

  function appendErrMsgHTML(msg){
    var html = `
      <div class='chat-group-user clearfix' id='chat-group-user-22'>
        <p class='chat-group-user__name'>${msg}</p>
      </div>`
    search_list.append(html);
  }

  function appendJoinUserList(user_id, user_name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
        <input name='group[user_ids][]' type='hidden' value='${user_id}'>
        <p class='chat-group-user__name'>${user_name}</p>
        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
      </div>`
    join_user_list.append(html);
  }

  $(document).on("keyup", "#user-search-field",function(){
    var words = $("#user-search-field").val();
    if(words.length == 0){
      search_list.empty();
      return;
    }
    $.ajax({
      type: "GET",
      url: "/users",
      data:{keyword: words},
      dataType: "json"
    }).done(function(users){
      search_list.empty();
      if(users.length !== 0){
        users.forEach(function(user){
          appendUserHTML(user);
        })
      }else{
        appendErrMsgHTML("一致するユーザーはいません。");
      }
    }).fail(function(){
      alert("error");
    });
  });

  $(document).on("click", ".user-search-add", function(){
      var user_id = $(this).attr("data-user-id");
      var user_name = $(this).attr("data-user-name"); 
      $(this).parent().remove();
      appendJoinUserList(user_id, user_name);
  });

  $(document).on("click", ".user-search-remove", function(){
    console.log(this);
    $(this).parent().remove();
  })
})
