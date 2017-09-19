
                var curRow = {};
                    $('#boold_record_table').bootstrapTable({
                    url:"http://localhost:8001/bp_api/bloodrecord/allRecord",//请求数据url
                    /*queryParams: function (params) {
                        return {
                            offset: params.offset,  //页码
                            limit: params.limit,   //页面大小
                            search : params.search, //搜索
                            order : params.order, //排序
                            ordername : params.sort, //排序
                        };
                    },*/
                    showHeader : true,
                    showColumns : true,
                    showRefresh : true,
                    pagination: true,//分页
                    sidePagination : 'client',//服务器端分页
                    //pageNumber : 1,
                    //pageList: [5, 10, 20, 50],//分页步进值
                    search: true,//显示搜索框
                    clickToSelect: true,
                    ajaxOptions : {headers: { "token": localStorage.getItem('bloodToken')}};
                    //表格的列
                    columns: [
                        {
                            field: 'time',//域值
                            title: 'Data',//标题
                            visible: true,//false表示不显示
                           // sortable: false,//启用排序
                            width : '20%',
                        },
                        {
                            field: 'sbp',//
                            title: 'Systolic(mmHg)',//标题
                            visible: true,//false表示不显示
                           // sortable: false,//启用排序
                            width : '10%',
                            editable:true,
                        },
                        {
                            field: 'dbp',//域值
                            title: 'Diatolic(mmHg)',//内容
                            visible: true,//false表示不显示
                           // sortable: false,//启用排序
                            width : '10%',
                            editable:true,
                        },
                         {
                            field: 'hb',//域值
                            title: 'Pulse',//内容
                            visible: true,//false表示不显示
                           // sortable: false,//启用排序
                            width : '10%',
                            editable:true,
                        },
                        {
                            field: 'id',//域值
                            title: 'id',//内容
                            visible: false,//false表示不显示
                           // sortable: false,//启用排序
                            width : '35%',
                            editable:true,
                        },
                        {
                            field: 'comment',//域值
                            title: 'comment',//内容
                            visible: true,//false表示不显示
                            //sortable: false,//启用排序
                            width : '50%',
                            editable:false,
                            formatter : function (value, row, index) {
                                //return "<a href=\"#\" id=\"pencil\"><i class=\"icon-pencil\" style=\"padding-right: 5px\"></i>"[edit]"</a>"
                                if(row.commentID === null)
                                    value = 'comment';
                                else{
                                    $.ajax({
                                        type : 'POST',
                                        url : 'http://localhost:8001/bp_api/comment/getComment',
                                        async:false,//异步false 可能会堵塞UI
                                        //bp_api/comment/getComment
                                        data : {"id" : row.commentID},
                                        dataType : 'JSON',
                                        success : function(data,textStatus,jqXHR){
                                               //console.log('data11111111::'+data);
                                               //console.log('row::'+JSON.stringify(data));
                                              // console.log(' data.commentText::'+ data.commentText);
                                               value = data.commentText;

                                        },
                                        error : function(){
                                                value = 'comment';
                                        }
                                    });
                                }
                               return "<a href=\"#\" name=\"UserName\" data-type=\"textarea\" data-pk=\""+row.Id+"\" data-title=\"enter comment\">" + value + "</a>";
                            }
                        }
                    ],

            onClickRow: function (row, $element) {
                curRow = row;
                console.log('row::'+JSON.stringify(row));
                console.log('$element::'+JSON.stringify($element));
            },

            onLoadSuccess: function (aa, bb, cc) {
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
                            comment = {"commentText" : params.value,"commentUserID" : 2,"toUserID" : curRow.userId,"bloodID" : curRow.id};

                        }
                        $.ajax({
                            type: 'POST',
                            url: requestUrl,
                            data: comment,
                            dataType: 'JSON',
                            success: function (data, textStatus, jqXHR){
                                
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