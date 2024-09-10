export function createMediumMapLayer(map) {
    var bounds = [];
    var startX = -0.12;
    var startY = 51.53;
    var width = 0.03;
    var height = 0.02;
    var cols = 16;
    var rows = 18;

    var layerGroup = L.layerGroup();
    
    for (var col = 0; col < cols; col++) {
        for (var row = 0; row < rows; row++) {
            var west = startX + col * width;
            var east = west + width;
            var north = startY - row * height;
            var south = north - height;
            bounds.push([[north, west], [south, east]]);
            var imageUrl = `/resources/maps/hos_velen/4/${col}/${16 - row}.jpg`;
            var index = col * rows + row;
            L.imageOverlay(imageUrl, bounds[index]).addTo(layerGroup);
        }
    }
    
    return layerGroup;
}

// export function createMediumMapLayer(map) {
//     var bounds = [];
//     var startX = -0.12;
//     var startY = 51.53;
//     var width = 0.03;
//     var height = 0.02;
//     var cols = 4;
//     var rows = 5;

//     var layerGroup = L.layerGroup();
    
//     for (var col = 0; col < cols; col++) {
//         for (var row = 0; row < rows; row++) {
//             var west = startX + col * width;
//             var east = west + width;
//             var north = startY - row * height;
//             var south = north - height;
//             bounds.push([[north, west], [south, east]]);
//             var fileExtension = (row === 0) ? 'png' : 'jpg';
//             var imageUrl = `/resources/maps/hos_velen/medium/${col}/${4 - row}.${fileExtension}`;
//             var index = col * rows + row;
//             L.imageOverlay(imageUrl, bounds[index]).addTo(layerGroup);
//         }
//     }
    
//     return layerGroup;
// }

