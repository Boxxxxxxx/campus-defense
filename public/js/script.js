//On Load
$(function() {
    // Preload images
    var tiles = ['TileLight.png', 'TileMedium.png', 'TileDark.png'];
    $.each(tiles, function(index, value) {
        $('<img/>')[0].src = 'images/' + value;
    });
    var ally_models = ['FireElementalistModel.png', 'BallisticsModel.png', 'MartialArtsModel.png', 'EarthElementalistModel.png', 'KnighthoodModel.png', 'WaterElementalistModel.png', 'EngineeringModel.png'];
    $.each(ally_models, function(index, value) {
        $('<img/>')[0].src = 'images/' + value;
    });

    /* Preload sounds
    var sounds = ['sound1.mp3', 'sound2.mp3', 'sound3.mp3'];
    $.each(sounds, function(index, value) {
        $('<audio/>')[0].src = 'sounds/' + value;
    });
    */

    //Place tiles
    var numRows = 5;
    var numCols = 10;
    var alternateRows = true; // Variable to alternate between TileLight/TileMedium and TileMedium/TileDark
    
    // Function to toggle the alternateRows variable
    function toggleAlternateRows() {
        alternateRows = !alternateRows;
    }
    
    // Function to get the background image URL with scaled dimensions based on the row and column index
    function getBackgroundImage(row, col) {
        var index;
        if (alternateRows) {
            index = (col % 2 === 0) ? 0 : 1;
        } else {
            index = (col % 2 === 0) ? 1 : 2;
        }
        var imageUrl = 'images/' + tiles[index];
        return 'url(' + imageUrl + ')'; // Adjusted path
    }

    // Create the grid of tiles
    var $board = $('#board');
    for (var i = 0; i < numRows; i++) {
        var $row = $('<tr></tr>');
        for (var j = 0; j < numCols; j++) {
            var $cell = $('<td></td>');
            $cell.css({
                'background-image': getBackgroundImage(i, j),
                'background-size': 'cover', // Scale the background image to cover the cell
                'background-repeat': 'no-repeat', // Prevent the background image from repeating
                'background-position': 'center' // Center the background image within the cell
            });
            $row.append($cell);
        }
        $board.append($row);
        toggleAlternateRows(); // Toggle after each row is added
    }

    // Make units draggable
    $('.draggable').draggable({
        revert: 'invalid', // If not dropped on a valid target, revert the element
        helper: 'clone', // Use a clone of the element while dragging
        zIndex: 100, // Set higher z-index to ensure the dragged element is on top
        opacity: 0.7 // Reduce opacity while dragging
    });
    
    // Make tiles droppable
    $('#board td').droppable({
        accept: '.draggable', // Only accept draggable units
        drop: function(event, ui) {
        var droppedUnit = $(ui.draggable); // Get the dropped unit
        var college = droppedUnit.data('college'); // Get the college of the unit
        // Implement logic to handle dropping the unit onto the tile
        // You can use the droppedUnit and college variables to determine the unit and its college
        // You may want to update game state or display information based on the dropped unit
        }
    });
});