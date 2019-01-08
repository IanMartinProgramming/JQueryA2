// Script for A2

// Variable for using ui-block and ui-grid
// Currently just in footer navbar
var alpha = ["a", "b", "c"];

var xmlData;
var rowID;

// Document ready function
$(document).ready(function() {
   console.log("in doc ready");

   // AJAX function
   $.ajax({
      type: "GET",
      url: "dataFiles/a2.xml",
      dataType: "xml",
      success: getData,
      error: function(e) {
         alert(e.status + "-" + e.statusText);
      }
   });

   // Click header to show data
   $("#data").hide();
   $("#showData").click(function() {
      $("#data").toggle("slow");
   });
}); // End of doc ready

function getData(xml) {
   console.log("in getData");
   xmlData = xml;
   // Get title from XML
   $("header").find("#homeHeader").append($(xml).find("title").text());

   // Populate data section under header
   $("#data").html();
   $("#data").append(
      "Name: " + $(xml).find("studentName").text() + "<br>" +
      "Login: " + $(xml).find("studentName").attr("studentLogin") + "<br>" +
      "Student #: " + $(xml).find("studentNumber").text() + "<br>" +
      "Program: " + $(xml).find("studentNumber").attr("program") + "<br>"
   );

   // Populate main page with computers and icons
   $("#computers").html();
   // Set up unordered list for computers
   $("#computers").append(
      "<ul id='computerList'>" +
      "</ul>"
   );
   // Populate unordered list
   $(xml).find("computer").each(function(n) {
      // Making custom icons
      // get file name from xml, remove extension for CSS/Icon name
      var fileName = $(this).find("image").text();
      var iconName = fileName.split('.')[0];
      // Generating CSS for custom icons
      $("style").append(
         ".ui-icon-" + iconName + ":after {" +
         "background-image: url('images/" + fileName + "');" +
         "background-size: 22px 22px;}"
      );
      // Create links
      $("#computerList").append(
         "<li id=" + n + "><a href='#individual' class='ui-btn ui-icon-" +
         iconName + " ui-btn-icon-left'>" +
         $(this).attr("make") + "</a></li>"
      );
   });

   // Build navbar
   $("#navigation").html(
      "<ul id='navlist' class='ui-grid-b'>" +
      "</ul>"
   );
   // Put links in navbar from xml file
   $(xml).find("computerStore").each(function(n) {
      // Making custom icons
      // get file name from xml, remove extension for CSS/Icon name
      var fileName = $(this).find("storeIcon").text();
      var iconName = fileName.split('.')[0];
      // Generating CSS for custom icons
      $("style").append(
         ".ui-icon-" + iconName + ":after {" +
         "background-image: url('images/" + fileName + "');" +
         "background-size: 22px 22px;}"
      );
      // Create links
      $("#navlist").append(
         "<li class='ui-block-" + alpha[n] + "'>" +
         "<a href='" + $(this).find("storeName").attr("url") +
         "' target='_blank' class='ui-btn ui-icon-" + iconName +
         " ui-btn-icon-left'>" +
         $(this).find("storeName").text() +
         "</a></li>"
      );
   })
}

$(document).on("click", "#computerList >li", function() {
   rowID = $(this).closest("li").attr("id");
   console.log(rowID);
   showComputer(xmlData, rowID);
});

function showComputer(xmlData, rowID) {
   $("header").find("#ind-Header").html($(xmlData).find("computer:nth(" + rowID + ")").attr("make"));
   $("#ind-data").html(
      "<img src='images/" + $(xmlData).find("computer:nth(" + rowID + ")").find("image").text() + "' " +
      "alt='" + $(xmlData).find("computer:nth(" + rowID + ")").attr("make") + "' " +
      "height='200px'><br>" + "<p id='thisComputer'>" +
      "Price: " + $(xmlData).find("price:nth(" + rowID + ")").text() + "<br>" +
      "Processor Speed: " + $(xmlData).find("ProcessorSpeed:nth(" + rowID + ")").text() + "<br>" +
      "Available RAM: " + $(xmlData).find("ram:nth(" + rowID + ")").text() + "<br>" +
      "Hard Drive Capacity: " + $(xmlData).find("HardDriveSize:nth(" + rowID + ")").text() + "<br></p>"
   );
}
