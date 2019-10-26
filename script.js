var i;
var entries = [];
var rel_entries = [];
var categories = new Set();
var url = "https://docs.google.com/spreadsheets/d/1sPTrQGlMw7bZeuOxK9WZWazfpi-IYKFqSN-62wga3ww/edit?usp=sharing";

function format(source, params) {
  /*
  source: String
  params: Array
  replaces format strings in source with elements from params
  ex: "Hello {0}", ["Bob"] => "Hello Bob"
  */
  $.each(params,function (i, n) {
    source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
  })
  return source;
}

function categoriesScreen() {
  /*
  draws the screen with all of the categories
  */
  for (var i = 0; i < categories.size; i++) {
    // add each button from the caregories variable
    var categoryButton = '<button class="categoryButton">{0}</button>';
    $("body").append(format(categoryButton,[Array.from(categories)[i]]));
  }
  $(".categoryButton").on('click', function() {
    // creates sub-screen and back button by filtering entries by clicked category
    var category = this.innerText;
    $(".categoryButton").remove()
    $("body").append(backButton);
    $(".backButton").on('click', function(){
      // backbutton onclick function, deletes all entries and redraws category screen
      $(".collapsible").remove();
      $(".content").remove();
      $(".backButton").remove();
      categoriesScreen();
    });
    rel_entries = entries.filter(function(entry){
      // filter out entries based on clicked category
      return entry["Service ID"] == category;
    });
    rel_entries.forEach(function(entry){
      var array = $.map(entry, function(value, index) {
        // transform object into array for format function
        return [value];
      });
      $("body").append(format(collapsible,array));
    });
    $(".collapsible").on('click', function(){
      // onclick function for collapsibles, toggles extra information
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

var collapsible = '<button class="collapsible">' +
                  '  <div style="float: left; width:50%">{4}</div>' +
                  '  <div style="float: right; width:50%" align="right">{3}' +
                  '    <i onclick="alert(\'{1} {2}\')" class="fas fa-info-circle"></i>' +
                  '  </div>' +
                  '  <div align="left">{5}</div>' +
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
  alert(tutorial);
});

$("#language").on('click', function() {
  var url = new URL(document.URL);
  var search_params = new URLSearchParams(url.search);
  if (!search_params.has("en")) {
    url.href += "?en";
  } else {
    url.href = url.href.slice(0,-3)
  }
  window.location.href = url;
});


function init() {
  Tabletop.init( {key: url, callback: showInfo, simpleSheet: false});
}

function showInfo(data, tabletop) {
  console.log(data);
  var url = new URL(document.URL);
  var search_params = new URLSearchParams(url.search);
  var sheet;
  if (search_params.has("en")) {
    sheet = "English Sheet";
    $("#language").html("ES");
  } else {
    sheet = "Spanish Sheet";
  }
  for (var i = 0; i < data[sheet].elements.length; i++) {
    var content = data[sheet].elements[i];
    categories.add(content["Service ID"]);
    entries.push(content);
  }
  categoriesScreen();
}

window.addEventListener('DOMContentLoaded', init);
