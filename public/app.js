// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "</p> <button onclick=location.href='https://www.sltrib.com" + data[i].link + "'>Link</button>");
      $("#articles").append("<button class='savearticle' data-id='" + data[i]._id + "'>Save</button>")
    }


  });
  
//   // When you click the savenote button
//   $(document).on("click", ".savearticle", function() {
//     // Grab the id associated with the article from the submit button
//     var thisId = $(this).attr("data-id");
  
//     // Run a POST request to change the note, using what's entered in the inputs
//     $.ajax({
//       method: "POST",
//       url: "/articles/" + thisId,
//       data: {
//         // Value taken from title input
//         title: $("#titleinput").val(),
//         // Value taken from note textarea
//         body: $("#bodyinput").val()
//       }
//     })
//       // With that done
//       .then(function(data) {
//         // Log the response
//         console.log(data);
//         // Empty the notes section
//         $("#notes").empty();
//       });
  
//     // Also, remove the values entered in the input and textarea for note entry
//     $("#titleinput").val("");
//     $("#bodyinput").val("");
//   });
  


$(document).on("click", ".savearticle", function handleArticleSave() {
    // This function is triggered when the user wants to save an article
    // When we rendered the article initially, we attatched a javascript object containing the headline id
    // to the element using the .data method. Here we retrieve that.
    var thisId = $(this).attr("data-id");
    // var articleToSave = $(this).parents(".panel").data();
    thisId.saved = true;
    // Using a patch method to be semantic since this is an update to an existing record in our collection
    $.ajax({
      method: "PUT",
      url: "/saved",
      data: thisId.saved
    }).then(function(data) {
    //   // If successful, mongoose will send back an object containing a key of "ok" with the value of 1
    //   // (which casts to 'true')
    //   if (data.ok) {
    //     // Run the initPage function again. This will reload the entire list of articles
    //     initPage();
    //   }
    });
  });


  function initPage() {
    // Empty the article container, run an AJAX request for any saved headlines
    articleContainer.empty();
    $.get("/api/headlines?saved=true").then(function(data) {
      // If we have headlines, render them to the page
      if (data && data.length) {
        renderArticles(data);
      }
      else {
        // Otherwise render a message explaing we have no articles
        renderEmpty();
      }
    });
  }