var i;
var entries = [];
var townships = new Set();

function format(source, params) {
    $.each(params,function (i, n) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
    })
    return source;
}

var collapsible = '<button class="collapsible">{0}' +
                  '  <div align="right">{1} {2} {3}</div>' +
                  '</button>' +
                  '<div class="content">' +
                  '  <p>{4}</p>' +
                  '  <p>{5}</p>' +
                  '  <p>{6}</p>'
                  '</div>'

blockspring.runParsed("read-worksheet-google-sheets", { "file_id": "1ekPrJc7Z9xoxihatWDXY88hS1Kj0gx2DQ0a1O0vF6oQ", "worksheet_id": "1457908608", "has_header": false}, { "api_key": "br_114955_edcef0380b1584c04100f3882e262d9f9785e92c" }, function(res){
  console.log(res.params);
  res.params.data = res.params.data.filter(function(array){
    return array[0] === "" ? false : true})
  for (var i = 1; i < res.params.data.length; i++) {
    var data = res.params.data[i];
    var content = [data[0],
                   (data[1] === "Sp" ? "🇲🇽" : "🇺🇸"),
                   (data[2] === "Yes" ? "🛂" : "✔"),
                   (data[3] === "Free" ? "" : "💵"),
                   data[4], data[5], data[6]]
    townships.add(data[4]);
    entries.push(content)
  }
  townships.forEach(function(val) {
    $("#township").append(format('<option value="{0}">{0}</option>',[val]));
    $("#township").children().last().click(function() {
      $(".collapsible").remove();
      rel_entries = entries.filter(function(entry){
        return entry[4] === val;
      });
      rel_entries.forEach(function(entry){
        $("body").append(format(collapsible,entry))
      });
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
  });
});