import { Unit, Enemy, FireElementalist, BallisticsMajor, MartialArtsMajor, EarthElementalist, KnighthoodMajor, WaterElementalist, EngineeringMajor, Slime } from './entities.js';


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
    var enemy_models = ['SlimeModel.png'];
    $.each(enemy_models, function(index, value) {
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
        var spawnPoint = $('<td class="spawn"></td>');
        $row.append(spawnPoint)
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
        var unit = createUnit(unitType, $(this));
        
        // Store the unit in the cell's data
        $(this).data('unit', unit);
        
        // Update the appearance of the cell
        $(this).html('<img src="images/' + unit.image + '" alt="' + unitType + '">');
        }
    });

    // Create function to instantiate unit objects
    function createUnit(unitType, cell) {
        let unit;
        switch (unitType) {
            case 'FireElementalist':
                unit = new FireElementalist();
                unit.setCurrentCell(cell);
                break;
            case 'BallisticsMajor':
                unit = new BallisticsMajor();
                unit.setCurrentCell(cell);
                break;
            case 'MartialArtsMajor':
                unit = new MartialArtsMajor();
                unit.setCurrentCell(cell);
                break;
            case 'EarthElementalist':
                unit = new EarthElementalist();
                unit.setCurrentCell(cell);
                break;
            case 'KnighthoodMajor':
                unit = new KnighthoodMajor();
                unit.setCurrentCell(cell);
                break;
            case 'WaterElementalist':
                unit = new WaterElementalist();
                unit.setCurrentCell(cell);
                break;
            case 'EngineeringMajor':
                unit = new EngineeringMajor();
                unit.setCurrentCell(cell);
                break;
            default:
                unit = null;
                break;
        }
        if (unit) {
            unit.startEnemyCheck();
        }
        return unit;
    }

    // Function to spawn enemies
    function spawnEnemy() {
        // Get all spawn points
        var $spawnPoints = $('.spawn');
        
        // Randomly select a spawn point
        var randomIndex = Math.floor(Math.random() * $spawnPoints.length);
        var $randomSpawnPoint = $spawnPoints.eq(randomIndex);
        
        // Create a new Slime enemy instance
        var slime = new Slime();
        
        // Set the current cell for the Slime enemy
        slime.currentCell = $randomSpawnPoint;

        // Create the enemy element
        var $enemy = $('<div class="enemy"><img src="images/SlimeModel.png" alt=""></div>');
        
        // Append the enemy to the spawn point
        $randomSpawnPoint.append($enemy);

        // Scale up the enemy
        $enemy.css({
            'transform': 'scale(1.5)' // Adjust the scale factor as needed
        });
            
        // Start the movement of the Slime enemy
        slime.startMovement();
    }

    // Set interval to spawn enemies every 10-15 seconds
    var enemySpawnInterval = setInterval(spawnEnemy, getRandomInt(10000, 15000)); // Random time between 10,000ms and 15,000ms

    // Function to get random integer between min and max values
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});