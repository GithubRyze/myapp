 /*$(function(){  
    $('#send').click(function(){  
       
        console.log('test test');
         $.ajax({  
             type: "GET",  
             url: "test.json",  
             data: {username:$("#username").val(), content:$("#content").val()},  
             dataType: "json",  
             success: function(data){  
                         $('#resText').empty();   //清空resText里面的所有内容  
                         var html = '';   
                         $.each(data, function(commentIndex, comment){  
                               html += '<div class="comment"><h6>' + comment['username']  
                                         + ':</h6><p class="para"' + comment['content']  
                                         + '</p></div>';  
                         });  
                         $('#resText').html(html);  
                      }  
         });  
  
    });  
}); */
           
         window.ajaxOptions = {headers: { "token": localStorage.getItem('bloodToken')}};

         function login() {
            console.log('login ..............');
            $.ajax({
                type: "post",
                url: "http://localhost:8001/bp_api/user/login",
                data: $("form").serialize(),
                async: true,
                dataType: "json",
            })
            .done(function(result,textStatus,xhr) {
                localStorage.setItem('bloodToken',xhr.getResponseHeader('token'));
                 console.log("error_______"+JSON.stringify(result));

                console.log("error::::"+localStorage.getItem('bloodToken'));
                console.log("error::::"+result.user[0].role);
                localStorage.setItem('admin',result.user[0].role);
                localStorage.setItem('userID',result.user[0].id);
                window.location.href = 'static/index.html';
                //window.close();
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
                  
                return false;
        }