var i;
var entries = [];
var rel_entries = [];
var townships = new Set();
var categories = new Set();

function format(source, params) {
    $.each(params,function (i, n) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
    })
    return source;
}

function createDropdown(dropdown, val) {
  console.log(dropdown);
  console.log(val);
  $("#" + dropdown).append(format('<option value="{0}">{0}</option>',[val]));
  $("#" + dropdown).children().last().click(function() {
    $(".collapsible").remove();
    rel_entries = entries.filter(function(entry){
      return (entry[5] === $("#township").val()
              && entry[0] === $("#category").val());
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
}

var collapsible = '<button class="collapsible">{1} - {6}' +
                  '  <div align="right">{2} {3} {4}</div>' +
                  '</button>' +
                  '<div class="content">' +
                  '  <p><a href="tel:{7}">{7}</a></p>' +
                  '  <p>{8}</p>' +
                  '  <p>{9}</p>' +
                  '  <p>{10}</p>'+
                  '  <p>{11}</p>'+
                  '</div>'

blockspring.runParsed("read-worksheet-google-sheets", { "file_id": "1ekPrJc7Z9xoxihatWDXY88hS1Kj0gx2DQ0a1O0vF6oQ", "worksheet_id": "1457908608", "has_header": false}, { "api_key": "br_114955_edcef0380b1584c04100f3882e262d9f9785e92c" }, function(res){
  console.log(res.params);
  res.params.data = res.params.data.filter(function(array){
    return array[0] === "" ? false : true})
  for (var i = 1; i < res.params.data.length; i++) {
    var data = res.params.data[i];
    var content = [data[0], data[1],
                   (data[2] === "Sp" ? "sp" : "en"),
                   (data[3] === "Yes" ? "🛂" : "✔"),
                   (data[4] === "Free" ? "free" : "💵"),
                   data[5], data[6], data[7], data[8], data[9], data[10], data[11]]
    townships.add(data[5]);
    categories.add(data[0]);
    entries.push(content)
  }
  for (var i = 0; i < townships.size; i++) {
    createDropdown("township",Array.from(townships)[i]);
  }
  for (var i = 0; i < categories.size; i++) {
    createDropdown("category",Array.from(categories)[i]);
  }
});