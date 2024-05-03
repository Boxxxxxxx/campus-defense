//On Load
$(function() {
    // Preload images
    var tiles = ['img/TileLight.png', 'img/TileMedium.png', 'img/TileDark'];
    $.each(tiles, function(index, value) {
        $('<img/>')[0].src = 'public/' + value;
    });
    var ally_models = ['img/FireElementalistModel.png', 'img/BallisticsModel.png', 'img/MartialArtsModel.png', 'img/EarthElementalistModel.png', 'img/KnighthoodModel.png', 'img/WaterElementalistModel.png', 'img/EngineeringModel.png'];

    /* Preload sounds
    var sounds = ['sound1.mp3', 'sound2.mp3', 'sound3.mp3'];
    $.each(sounds, function(index, value) {
        $('<audio/>')[0].src = 'sounds/' + value;
    });
    */
    // Other initialization code
});