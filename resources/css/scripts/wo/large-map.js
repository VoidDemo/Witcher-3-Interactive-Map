export function createLargeMapLayer(map) {
    var bounds = [];
    var startX = -0.12;
    var startY = 51.53;
    var width = 0.03;
    var height = 0.02;
    var cols = 10;
    var rows = 8;

    var layerGroup = L.layerGroup();
    
    for (var col = 0; col < cols; col++) {
        for (var row = 0; row < rows; row++) {
            var west = startX + col * width;
            var east = west + width;
            var north = startY - row * height;
            var south = north - height;
            bounds.push([[north, west], [south, east]]);
            var imageUrl = `/resources/maps/white_orchard/large/${col}/${7 - row}.jpg`;
            var index = col * rows + row;
            L.imageOverlay(imageUrl, bounds[index]).addTo(layerGroup);
        }
    }
    
    return layerGroup;
}


