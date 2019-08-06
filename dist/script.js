var i;
var entries = [];
var rel_entries = [];
var categories = new Set();

function format(source, params) {
  $.each(params,function (i, n) {
    source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
  })
  return source;
}

function categoriesScreen() {
  for (var i = 0; i < categories.size; i++) {
    var categoryButton = '<button class="categoryButton">{0}</button>';
    $("body").append(format(categoryButton,[Array.from(categories)[i]]));
  }
  $(".categoryButton").on('click', function() {
    var category = this.innerText;
    $(".categoryButton").remove()
    $("body").append(backButton);
    $(".backButton").on('click', function(){
      $(".collapsible").remove();
      $(".content").remove();
      $(".backButton").remove();
      categoriesScreen();
    });
    rel_entries = entries.filter(function(entry){
      return entry[0] == category;
    });
    rel_entries.forEach(function(entry){
      $("body").append(format(collapsible,entry));
    });
    $(".collapsible").on('click', function(){
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  });
}

var collapsible = '<button class="collapsible">{5} - {4}' +
                  '  <div align="right">{1} {2} {3}</div>' +
                  '</button>' +
                  '<div class="content">' +
                  '  <p><a href="tel:{6}">{6}</a></p>' +
                  '  <p>{7}</p>' +
                  '  <p>{8}</p>' +
                  '  <p>{9}</p>' +
                  '  <p>{10}</p>'+
                  '  <p>{11}</p>'+
                  '</div>';

var backButton = '<button class="backButton">\<-- Back</button>';

blockspring.runParsed("read-worksheet-google-sheets", { "file_id": "1sPTrQGlMw7bZeuOxK9WZWazfpi-IYKFqSN-62wga3ww", "worksheet_id": "1878156380", "has_header": false}, { "api_key": "br_114955_edcef0380b1584c04100f3882e262d9f9785e92c" }, function(res){
  console.log(res.params);
  res.params.data = res.params.data.filter(function(array){
    return array[0] === "" ? false : true})
  for (var i = 1; i < res.params.data.length; i++) {
    var content = res.params.data[i];
    categories.add(content[0]);
    entries.push(content);
  }
  categoriesScreen();
  
  
});