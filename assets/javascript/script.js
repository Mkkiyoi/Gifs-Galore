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
                  "Porkorosso", 
                  "The cat's Return", 
                  "The Wind Rises",
                  "Spirited Away", 
                  "Ponyo", 
                  "Kiki's Delivery Service"];


    /**
     * Displays all of the topics in TOPICS as button HTML elements. 
     */
    function displayButtons() {
        TOPICS.forEach(function(topic) {
            let button = $('<button>').text(topic);
            $(button).addClass('btn btn-secondary m-2');
            $(button).on('click', function() {
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
        }).then(function (response) {
            console.log(response.data[0].images)
            $('#gifs').empty();
            response.data.forEach(function(gif) {
                if (gif.rating === 'g' || gif.rating === 'pg') {
                    let gifDiv = $('<div>');
                    $(gifDiv).addClass('m-2 float-right');
                    let p = $('<p>').text(gif.rating);
                    let img = $('<img>').attr('src', gif.images.fixed_width.url);
                    $(gifDiv).append(p);
                    $(gifDiv).append(img);
                    $('#gifs').append(gifDiv);
                }
            });
        });
    }

    function displayGifs() {

    }



    $(document).ready(function() {
        displayButtons();
    });
})();