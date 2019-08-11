var i;
var entries = [];
var rel_entries = [];
var categories = new Set();
var url = "https://docs.google.com/spreadsheets/d/1sPTrQGlMw7bZeuOxK9WZWazfpi-IYKFqSN-62wga3ww/edit?usp=sharing";

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
      return entry["Service ID"] == category;
    });
    rel_entries.forEach(function(entry){
      var array = $.map(entry, function(value, index) {
        return [value];
      });
      $("body").append(format(collapsible,array));
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
var dt = new Date(Date.now());
loadtime = dt + '';
var tutorial = '<table>' +
               '  <tr>' +
               '    <th>Legend</th>' +
               '  </tr>' +
               '  <tr>' +
               '    <td>Language</td>' +
               '    <td>EN or SP</td>' +
               '  </tr>' +
               '  <tr>' +
               '    <td>Documentation</td>' +
               '    <td>Required: Y, Not Required: N</td>' +
               '  </tr>' +
               '  <tr>' +
               '    <td>Cost</td>'
               '    <td>Free: F, Low Cost: Lo, Varies: V</td>' +
               '  </tr>' +
               '</table>';

$("#tutorial").on('click', function() {
  alert(tutorial)
});

function init() {
  Tabletop.init( {key: url, callback: showInfo, simpleSheet: false});
}

function showInfo(data, tabletop) {
  alert('Successfully processed!');
  console.log(data);
  for (var i = 0; i < data["Detail List"].elements.length; i++) {
    var content = data["Detail List"].elements[i];
    categories.add(content["Service ID"]);
    entries.push(content);
  }
  categoriesScreen();
}

window.addEventListener('DOMContentLoaded', init);

