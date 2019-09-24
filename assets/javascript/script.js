// Giphy API Key: BI8J7kgveCI3Daz2lVtnHtpEMvS3Kq4S

(function() {

    /**
     * NEED: 
     * displayGifs() -> displays the gifs returned by getGifs
     * getGifs(some thing to search) -> gets gifs from Giphy API and returns JSON
     * displayButtons() -> displays the topic buttons
     * 
     */

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

    let static_gif_urls = [];

    let animated_gif_urls = [];

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
                let gifDiv = $('<div>');
                gifDiv.addClass('m-2 float-left');

                // Create rating paragraph and image with gif
                let p = $('<p>').text('Rating: ' + gif.rating);
                let img = $('<img>').attr('src', staticURL);
                img.on('click', toggleGif);
                
                // Append the paragraph and image to the newly created div
                gifDiv.append(p);
                gifDiv.append(img);

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

        let image = $(event.target);
        let imageURL = image.attr('src');
        let imageIndex = static_gif_urls.indexOf(imageURL);
        if (imageIndex === -1) {
            imageIndex = animated_gif_urls.indexOf(imageURL);
        }
        if (isAnimated[imageIndex]) {
            image.attr('src', static_gif_urls[imageIndex]);
            isAnimated[imageIndex] = false;
        } else {
            image.attr('src', animated_gif_urls[imageIndex]);
            isAnimated[imageIndex] = true;
        }
    }

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

    $(document).ready(function() {
        $('#submit').on('click', function(event) {
            addTopic();
        });
        displayButtons();
    });
})();