    /*-- GIFTASTIC -->
  <!-- ================================================================ -->
  <!-- STEP 1: create function to add buttons to the DOM                -->
  <!-- STEP 2: create function to perform AJAX get request              -->
  <!-- STEP 3: create clear function to clear out previous content      -->
  <!-- STEP 4: create function to pause GIF on click                    -->
  <!-- STEP 5: List additional metadata (title, tags, etc) for each gif -->
  <!-- ================================================================ -->*/

  
    // Initial array of movies
    var moviesArr = ["Finding Nemo", "Frozen", "Lion King","Moana", "Pocahontas", "Ratatouille", "Toy Story"];

 // displayMovieInfo function re-renders the HTML to display the appropriate content
 function displayMovieInfo() {

    var movie = $(this).attr("data-name");
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        console.log(queryURL);
        console.log(response);

      // Creating a div to hold the movie
      var movieDiv = $("<div class='movie'>");

      // Storing the rating data
      var rating = response.Rated;

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);

      // Displaying the rating
      movieDiv.append(pOne);

      // Storing the release year
      var released = response.Released;

      // Creating an element to hold the release year
      var pTwo = $("<p>").text("Released: " + released);

      // Displaying the release year
      movieDiv.append(pTwo);

      // Storing the plot
      var plot = response.Plot;

      // Creating an element to hold the plot
      var pThree = $("<p>").text("Plot: " + plot);

      // Appending the plot
      movieDiv.append(pThree);

      // Retrieving the URL for the image
      var imgURL = response.Poster;

      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

      // Appending the image
      movieDiv.append(image);

      // Putting the entire movie above the previous movies
      $("#movies-view").prepend(movieDiv);
    });

  }

   // Function for displaying movie data
   function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < moviesArr.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("btn btn-primary btn-sm");
        // Adding a data-attribute
        a.attr("data-name", moviesArr[i]);
        // Providing the initial button text
        a.text(moviesArr[i]);
        
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
        }
    }
  
  // This function handles events where a new movie is added
  $("#add-movie").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var movie = $("#movie-input").val().trim();

        // Adding movie from the textbox to our array
        moviesArr.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
        // clear movie input
        $("#movie-input").val("");
      });

      // on click, show gifs
      $(document).on("click", ".btn-sm", displayGifs);
     
      // Calling the renderButtons function to display the intial buttons
      renderButtons();
      
     // on click, show movie info
     $(document).on("click", ".btn-sm", displayMovieInfo);

  // Function to empty out the articles
    function clear() {
    $("#movies-view").empty();
    $("#gif-view").empty();
    }
  
    function displayGifs() {
      
        // Empty the region associated with the articles
        clear();

        // In this case, the "this" keyword refers to the button that was clicked
        var movies = $(this).attr("data-name");

        // Constructing a URL to search Giphy for the movies array
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            movies + "&api_key=dc6zaTOxFJmzC&limit=10";
     
        // Performing our AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data comes back from the API
            .then(function(response) {

                //console.log(queryURL);
                //console.log(response);

            // Storing an array of results in the results variable
            var results = response.data;

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {  

                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                        // Creating a div for the gif
                        var gifDiv = $("<div>");

                        // Storing the result item's title, rating, source, and type
                        
                        var title= results[i].title;
                        var rating = results[i].rating;    
                        var source = results[i].source;       
                        var type = results[i].type;
                        var stillImage = results[i].images.fixed_height_small_still.url;
                        var animateImage = results[i].images.fixed_height_small.url;    
                        // Creating a paragraph tag with the result item's rating
                        var pOne = $("<p>").html("<h3> Title: " + title + "</h3>");
                        var pTwo = $("<p>").html("<h4> Rating: " + rating + "</h4>");
                        var link = $("<a>")
                        .html("<p> Download Gif </p>")
                        .attr("href", animateImage)
                        .attr("download", "img.gif")


                        // Creating an image tag
                        var gifImage = $("<img>");

                        // Adding class and data-state attribute to the movieImage
                        gifImage.attr("class", type); 
                        gifImage.attr("data-state", "still"); 
                        gifImage.attr("data-still", stillImage);
                        gifImage.attr('data-animate', animateImage);     
                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                        gifImage.attr("src", results[i].images.fixed_height_small.url);

                        // Appending the paragraph and personImage we created to the "gifDiv" div we created
                        gifDiv.append(pOne);
                        gifDiv.append(pTwo);
                        gifDiv.append(gifImage);
                        gifDiv.append(link);

                        // Prepending the gifDiv to the "#movies-view" div in the HTML
                        $("#gif-view").prepend(gifDiv);

                        $(".gif").on("click", function() {
                        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                        var state = $(this).attr("data-state");
                        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                        // Then, set the image's data-state to animate
                        // Else set src to the data-still value
                            if (state === "still") {
                                $(this).attr("src", $(this).attr("data-animate"));
                                $(this).attr("data-state", "animate");
                            } else {
                                $(this).attr("src", $(this).attr("data-still"));
                                $(this).attr("data-state", "still");
                            }
                        });


                        
                    }
                }
            });
        }
