var i;
var entries = [];

function format(source, params) {
    $.each(params,function (i, n) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
    })
    return source;
}

var collapsible = '<button class="collapsible">{0}</button>' +
                  '<div class="content">' +
                  '  <p>{1}</p>' +
                  '  <p>{2}</p>' +
                  '  <p>{3}</p>'
                  '</div>'

blockspring.runParsed("read-worksheet-google-sheets", { "file_id": "1ekPrJc7Z9xoxihatWDXY88hS1Kj0gx2DQ0a1O0vF6oQ", "worksheet_id": "1457908608", "has_header": false}, { "api_key": "br_114955_edcef0380b1584c04100f3882e262d9f9785e92c" }, function(res){
    console.log(res.params);
    for (var i = 1; i < res.params.data.length; i++) {
      $("body").append(format(collapsible,res.params.data[i]))
    }
    $(".collapsible").click(function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
});



