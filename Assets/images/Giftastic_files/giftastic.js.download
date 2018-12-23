/* Initial array for tv shows
--------------------------------------------- */
var tvShows = ["My So-Called Life", "Daria", "Fresh Prince of Bel-Air", "Twin Peaks", "Friends", "Ren & Stimpy", "The X-Files", "Seinfeld"];


/* Functions
--------------------------------------------- */

// Function for displaying the gifs
function displayTVInfo() {

  // In this case, the "this" keyword refers to the button that was clicked
  var tvShow = $(this).attr("data-name");

  // Empty out show-view div so that it doesn't append the new set of gifs to the old
  $("#show-view").empty();

  // Constructing a URL to search Giphy for the topic
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=eEacBKWjHC3UuNSgSp893vai6gnXgBzL&limit=10";

  // Creating an AJAX call for the specific tv show button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

  // Storing an array of results in the results variable
  var results = response.data;

  // Looping over every result item
  for (var i = 0; i < results.length; i++) {

    // Creating a div to hold the movie
    var tvDiv = $("<div class='col-md-4 mb-3'>");

    // Storing the rating data
    var rating = results[i].rating;
    
    // Creating an element to have the rating displayed
    var ratingHeading = $("<h4 class='mb-3 text-muted'>").text("Rating: " + rating);

    // Displaying the rating
    tvDiv.append(ratingHeading);

    // Retrieving the URL for the images
    var imgURL = results[i].images.downsized.url;
    var stillImgURL = results[i].images.downsized_still.url;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", stillImgURL).attr("data-still", stillImgURL).attr("data-animate", imgURL).attr("data-state", "still").attr("class", "gif").attr("width", "200");

    // Appending the image
    tvDiv.append(image);

    // Display the gifs
    $("#show-view").append(tvDiv);
  }

    // Animate giphy on click
    $(".gif").on("click", function() {
      
      // Get the value of the data-state attribute
      var state = $(this).attr("data-state");
      
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

      // Else set src to the data-still value
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  });
}

// Function for displaying tv show buttons
function renderButtons() {

  // Deleting buttons prior to adding new buttons so there are no repeats
  $("#buttons-view").empty();

  // Looping through the array of tv shows
  for (var i = 0; i < tvShows.length; i++) {

    // Then dynamicaly generate buttons for each tv show in the array
    var newBtn = $("<button class='btn btn-primary btn-sm' data-name='" + tvShows[i] + "'>").text(tvShows[i]);

    // Adding the button to the buttons-view div
    $("#buttons-view").append(newBtn);
  }
}

// Handles events where a tv show button is clicked
$("#add-show").on("click", function(event) {
  
  // Preventing the buttons default behavior when clicked (which is submitting a form)
  event.preventDefault();
  
  // This line grabs the input from the textbox
  var tvShow = $("#show-input").val().trim();

  // Adding tv show from the textbox to tvShows array
  tvShows.push(tvShow);

  // Calling renderButtons which handles the processing of the tvShows array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "btn-sm"
$(document).on("click", ".btn-sm", displayTVInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();