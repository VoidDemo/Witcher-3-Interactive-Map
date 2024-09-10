export function createSmallMapLayer(map) {
    var bounds = [];
    var startX = -0.12;
    var startY = 51.53;
    var width = 0.03;
    var height = 0.02;
    var cols = 2;
    var rows = 3;

    var layerGroup = L.layerGroup();
    
    for (var col = 0; col < cols; col++) {
        for (var row = 0; row < rows; row++) {
            var west = startX + col * width;
            var east = west + width;
            var north = startY - row * height;
            var south = north - height;
            bounds.push([[north, west], [south, east]]);
            var fileExtension = (col === 1 && row === 2) ? 'png' : 'jpg';
            var imageUrl = `/resources/maps/hos_velen/small/${col}/${2 - row}.${fileExtension}`;
            var index = col * rows + row;
            L.imageOverlay(imageUrl, bounds[index]).addTo(layerGroup);
        }
    }
    
    return layerGroup;
}
