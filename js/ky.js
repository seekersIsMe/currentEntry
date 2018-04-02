$(function(){
    $("#btn_1").click(function(){
        $.ajax({
            url:"http://w.huanqiu.com/apps/ygwifi/rss.php?cname=guonei",
            type: "post",
            cache: false,
            dataType:"xml",
            success:function(data){
                var frag=$("div");
                $(data).find("item").each(function(i){
                    var title=$(this).children("title");
                    var id_value=title.text();
                    frag.append("<li>"+id_value+"</li>");
                });
            },
            error:function(){
                alert("取不到数据")
            }
        });

    })
})
