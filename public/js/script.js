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
        var unitType = droppedUnit.data('unit'); // Get the type of unit

        // Create an object based on the unitType
        var unit = createUnit(unitType);
        
        // Store the unit in the cell's data
        $(this).data('unit', unit);
        
        // Update the appearance of the cell
        $(this).html('<img src="images/' + unit.image + '" alt="' + unitType + '">');
        
        // Perform actions based on the unit
        handleUnitActions(unit);
        
        }
    });

    // Function to create a unit object based on its type
    function createUnit(unitType) {
        var unit = {};
        switch (unitType) {
            case 'FireElementalist':
                unit = { name: 'Fire Elementalist', image: 'FireElementalistModel.png', health: 100, attack: 20, range: 4, attackSpeed: .4};
                break;
            case 'BallisticsMajor':
                unit = { name: 'Ballistics Major', image: 'BallisticsModel.png', health: 80, attack: 10, range: 8, attackSpeed: .9};
                break;
            case 'MartialArtsMajor':
                unit = { name: 'Martial Arts Major', image: 'MartialArtsModel.png', health: 120, attack: 35, range: 1, attackSpeed: .7};
                break;
            case 'EarthElementalist':
                unit = { name: 'Earth Elementalist', image: 'EarthElementalistModel.png', health: 150, attack: 20, range: 1, attackSpeed: .2};
                break;
            case 'KnighthoodMajor':
                unit = { name: 'Knighthood Major', image: 'KnighthoodModel.png', health: 200, attack: 15, range: 1, attackSpeed: .5};
                break;
            case 'WaterElementalist':
                unit = { name: 'Water Elementalist', image: 'WaterElementalistModel.png', health: 90, attack: 15, range: 3, attackSpeed: .6};
                break;
            case 'EngineeringMajor':
                unit = { name: 'Engineering Major', image: 'EngineeringModel.png', health: 100, attack: 20, range: 1, attackSpeed: .4};
                break;
            default:
                break;
        }
        return unit;
    }

    // Function to perform actions based on the unit
    function handleUnitActions(unit) {
        // Example: Log the unit's name and stats
        console.log('Unit placed: ' + unit.name);
        console.log('Health: ' + unit.health);
        console.log('Attack: ' + unit.attack);
        // Perform other actions as needed
    }
});