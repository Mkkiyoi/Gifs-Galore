// Giphy API Key: BI8J7kgveCI3Daz2lVtnHtpEMvS3Kq4S

(function() {

    'use strict';

    // Array of topics for gifs to display
    let TOPICS = ["My Neighbor Totoro", 
                  "Howl's Moving Castle", 
                  "Princess Mononoke", 
                  "Castle in the Sky", 
                  "Porco Rosso", 
                  "The Cat's Return", 
                  "The Wind Rises",
                  "Spirited Away", 
                  "Ponyo", 
                  "Kiki's Delivery Service",
                  "Nausicaa of the Valley of the Wind", 
                  "Whisper of the Heart", 
                  "From Up On Poppy Hill", 
                  "The Secret World of Arrietty"];

    // Global array storing static gif urls
    let static_gif_urls = [];

    // Global array storing animated gif urls
    let animated_gif_urls = [];

    // Global Array storing boolean flags denoting if 
    // the gif is currently animated or not.
    let isAnimated = [];


    /**
     * Displays all of the topics in TOPICS as button HTML elements. 
     */
    function displayButtons() {
        TOPICS.forEach(function(topic) {
            let button = $('<button>').text(topic);
            button.addClass('btn btn-secondary m-2');
            button.on('click', function() {
                getGifs(topic);
            });
            $('#buttons').append(button);
        });
    }

    /**
     * Gets gifs from Giphy API through ajax request based on the topic. 
     * @param {String} topic 
     * @returns JSON object
     */
    function getGifs(topic) {
        $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q=' + topic + '&api_key=BI8J7kgveCI3Daz2lVtnHtpEMvS3Kq4S&limit=9',
            method: 'GET',
        }).then(function(response) {
            displayGifs(response);
        });
    }

    /**
     * Displays gifs and gif ratings returned from ajax request to Giphy API.
     * @param {object} response
     */
    function displayGifs(response) {
        $('#gifs').empty();
        response.data.forEach(function(gif) {
            let rating = gif.rating;
            if (rating === 'g' || rating === 'pg') {

                // Store the static and animated gif URL's in the corresponding arrays
                let staticURL = gif.images.fixed_width_still.url;
                static_gif_urls.push(staticURL);
                let animatedURL = gif.images.fixed_width.url;
                animated_gif_urls.push(animatedURL);

                // Store boolean flag for each gif indicating if it is animated.
                isAnimated.push(false);

                // Create a new div for each gif
                let gifDiv = $('<div>').addClass('grid-item');

                // let cardBodyDiv = $('<div>').addClass('card-body');

                // Create rating paragraph and image with gif
                // let p = $('<p>').text('Rating: ' + gif.rating);
                let img = $('<img>').attr('src', staticURL);
                img.on({
                    'mouseenter': toggleGif,
                    'mouseleave': toggleGif
                });
                
                // Append the paragraph and image to the newly created bootstrap card
                // cardBodyDiv.append(p);
                gifDiv.append(img);
                // gifDiv.append(cardBodyDiv);

                // Append the div containing the gif to the gifs container.
                $('#gifs').append(gifDiv);
            }
        });
    }

    /**
     * On user click toggles the gif from static to animated.
     * @param {object} event 
     */
    function toggleGif(event) {
        
        // Get the image clicked and store its source url
        let image = $(event.target);
        let imageURL = image.attr('src');

        // Get the index of the image url in the static_gif_urls array
        // Check if that url exists in the array. If not, get the url from animated_gif_urls
        let imageIndex = static_gif_urls.indexOf(imageURL);
        if (imageIndex === -1) {
            imageIndex = animated_gif_urls.indexOf(imageURL);
        }

        // Check if the gif is currently animated. 
        // If it is animated, change the gif to the static version
        // If not, change the gif to the animated version.
        // Reset boolean flag to proper value.
        if (isAnimated[imageIndex]) {
            image.attr('src', static_gif_urls[imageIndex]);
            isAnimated[imageIndex] = false;
        } else {
            image.attr('src', animated_gif_urls[imageIndex]);
            isAnimated[imageIndex] = true;
        }
    }

    /**
     * On form submission, add a button with the topic entered into the form.
     */
    function addTopic() {
        event.preventDefault();
        let topic = $("#topic-input").val();
        let button = $('<button>').text(topic);
        button.addClass('btn btn-secondary m-2');
        button.on('click', function() {
            getGifs(topic);
        });
        $('#buttons').append(button);
    }

    /**
     * On document ready 
     */
    $(document).ready(function() {
        $('#submit').on('click', function(event) {
            addTopic();
        });
        displayButtons();
        var $grid = $('.grid').masonry({
            itemSelector: '.grid-item',
            percentPosition: true,
            columnWidth: '.grid-sizer'
        });
    });
})();