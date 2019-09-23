// Giphy API Key: BI8J7kgveCI3Daz2lVtnHtpEMvS3Kq4S

(function() {

    /**
     * NEED: 
     * displayGifs() -> displays the gifs returned by getGifs
     * getGifs(some thing to search) -> gets gifs from Giphy API and returns JSON
     * displayButtons() -> displays the topic buttons
     * 
     */

    let TOPICS = ["My Neighbor Totoro", "Howl's Moving Castle", "Princess Mononoke", "Castle in the Sky"];

    function displayButtons() {
        TOPICS.forEach(function(topic) {
            let button = $('<button>').text(topic);
            $(button).addClass('btn btn-secondary');
            $(button).on('click', function() {
                getGifs(topic);
            });
            $('#buttons').append(button);
        });
    }

    function getGifs(topic) {

    }

    function displayGifs() {

    }



    $(document).ready(function() {
        displayButtons();
    });
})();