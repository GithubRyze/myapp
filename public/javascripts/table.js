
                    var curRow = {};

                    $("#btn_select").empty();
                    var selectSql;
                    if(localStorage.getItem('admin') == 1){
                        selectSql = 'http://localhost:8001/bp_api/user/getAllUser';
                    }else{
                        selectSql = 'http://localhost:8001/bp_api/user/getUser';
                    }               
                     $.ajax({
                                beforeSend : function(xhr){
                                    xhr.setRequestHeader("token",localStorage.getItem('bloodToken'));
                                },
                                type: 'get',
                                url: selectSql,
                                data: {"userId" : localStorage.getItem('userID')},
                                dataType: 'JSON',
                                success: function (data, textStatus, jqXHR){
                                    console.log('row::'+JSON.stringify(data))
                                    var option = document.createElement("OPTION");
                                    $("#btn_select").append("<option value='"+0+"'>"+"All</option>");
                                    if(data.user.length != 0){
                                        for(var j = 0; j < data.user.length;j++){
                                            var option = document.createElement("OPTION");
                                            $("#btn_select").append("<option value='"+data.user[j].id+"'>"+data.user[j].name+"</option>");
                                        }   
                                    }
                                },
                                error: function () {
                             }
                    });  
                    

                    $("#btn_select").change(function(){

                        //console.log('btn_select value:' + $("#btn_select").val());
                        var id = $("#btn_select").val();
                        var link;
                        //console.log('btn_select:' + $("#btn_select").find("option:selected").text());
                        if(id == 0){
                            link = 'http://localhost:8001/bp_api/bloodrecord/allRecord';
                        }
                        else{
                            link = 'http://localhost:8001/bp_api/bloodrecord/queryUserRecord';
                        }
                        var params = {
                            url : link,
                            silent : true,
                            query : {
                                userId : id,
                            }
                        };
                         $("#boold_record_table").bootstrapTable('refresh', params);
                    });

                    $('#boold_record_table').bootstrapTable({
                    url:"http://localhost:8001/bp_api/bloodrecord/allRecord",//请求数据url
                    pageNumber : 1,
                    pageList: 10,//分页步进值
                    pageSize: 10, 
                    toolbar : '#toolbar',
                    queryParams: function (params) {
                        console.log("params ::"+JSON.stringify(params));
                        return {

                            offset: params.pageNumber,  //页码
                            limit: params.pageSize,   //页面大小
                            //search : params.search, //搜索
                            //order : params.order, //排序
                            //ordername : params.sort, //排序
                        };
                    },
                    queryParamsType : 'limit',
                    showHeader : true,
                    showColumns : true,
                    showRefresh : true,
                    pagination: true,//分页
                    sidePagination : 'server',//服务器端分页 会不会分页后无法编辑？？             
                    search: false,//显示搜索框
                    clickToSelect: true,
                    ajaxOptions : {headers: { "token": localStorage.getItem('bloodToken'),"client":'web'}},
                    //表格的列
                    columns: [
                        {
                            field: 'time',//域值
                            title: 'Data',//标题
                            visible: true,//false表示不显示
                           // sortable: false,//启用排序
                            width : '20%',
                            align: 'center',
                        },
                        {
                            field: 'sbp',//
                            title: 'Systolic(mmHg)',//标题
                            visible: true,//false表示不显示
                           // sortable: false,//启用排序
                            width : '10%',
                            editable:true,
                            align: 'center',
                        },
                        {
                            field: 'dbp',//域值
                            title: 'Diatolic(mmHg)',//内容
                            visible: true,//false表示不显示
                           // sortable: false,//启用排序
                            width : '10%',
                            editable:true,
                            align: 'center',
                        },
                         {
                            field: 'hb',//域值
                            title: 'Pulse',//内容
                            visible: true,//false表示不显示
                           // sortable: false,//启用排序
                            width : '10%',
                            editable:true,
                            align: 'center',
                        },
                        {
                            field: 'id',//域值
                            title: 'id',//内容
                            visible: false,//false表示不显示
                           // sortable: false,//启用排序
                            width : '35%',
                            editable:true,
                            align: 'center',
                        },
                        {
                            field: 'comment',//域值
                            title: 'comment',//内容
                            visible: true,//false表示不显示
                            //sortable: false,//启用排序
                            width : '50%',
                            editable:true,
                            align: 'center',
                            formatter : function (value, row, index) {
                                //return "<a href=\"#\" id=\"pencil\"><i class=\"icon-pencil\" style=\"padding-right: 5px\"></i>"[edit]"</a>"
                                if(row.commentID === null)
                                    value = 'comment';
                                else{
                                    $.ajax({
                                        beforeSend : function(xhr){
                                            xhr.setRequestHeader("token",localStorage.getItem('bloodToken'));
                                         },
                                        type : 'POST',
                                        url : 'http://localhost:8001/bp_api/comment/getComment',
                                        async:false,//异步false 可能会堵塞UI
                                        //bp_api/comment/getComment
                                        data : {"id" : row.commentID},
                                        dataType : 'JSON',
                                        success : function(data,textStatus,jqXHR){
                                               //console.log('data11111111::'+data);
                                               //console.log('row::'+JSON.stringify(data));
                                               //console.log(' data.commentText::'+ data.commentText);
                                               value = data.commentText;

                                        },
                                        error : function(){
                                                value = 'comment';
                                        }
                                    });
                                }

                                if(localStorage.getItem('admin') == 1){
                                    console.log('adminadmin::'+localStorage.getItem('admin'));
                                     return "<a href=\"#\" name=\"UserName\" data-type=\"textarea\" data-pk=\""+row.Id+"\" data-title=\"enter comment\">" + value + "</a>";
                                 }else{

                                 return value;
                             }
                            }
                        }
                    ],

            onClickRow: function (row, $element) {
                curRow = row;
                
                console.log('row::'+JSON.stringify(row));
                console.log('$element::'+JSON.stringify($element));
            },

          
            onLoadSuccess: function (data) {
                 
                            
                $("#boold_record_table a").editable({
                    type: 'textarea',
                    rows : 7,
                    validate : function(value){
                        if($.trim(value) == '') {
                            return 'This field is required';
                        }
                        if (value.length > 255) {
                            return 'text length can not > 255';
                        }
                    },
                     url: function (params) {
                        var requestUrl;
                        var comment;
                        if(curRow.commentID !== null){
                            requestUrl = 'http://localhost:8001/bp_api/comment/updateComment'
                            comment = {"id" : curRow.commentID,"commentText" : params.value};
                        }
                        else {
                            requestUrl = 'http://localhost:8001/bp_api/comment/addComment'
                            comment = {"commentText" : params.value,"commentUserID" : localStorage.getItem('userID'),"toUserID" : curRow.userId,"bloodID" : curRow.id};

                        }
                        $.ajax({
                            beforeSend : function(xhr){
                                xhr.setRequestHeader("token",localStorage.getItem('bloodToken'));
                            },
                            type: 'POST',
                            url: requestUrl,
                            data: comment,
                            dataType: 'JSON',
                            success: function (data, textStatus, jqXHR){
                                console.log('row::'+JSON.stringify(data));
                                curRow.commentID = data.comment_id;
                            },
                            error: function () {
                             //alert("error");
                             //$('#boold_record_table a').editable('toggleDisabled');//disable edit
                         }
                        });
                    }
                });
            },
        });