export function createLargeMapLayer() {
    return L.tileLayer('/resources/maps/white_orchard/4/{x}/{y}.jpg', {
        minZoom: 16,
        maxZoom: 18,
        tileSize: 256,
        attribution: '&copy; Your Attribution',
        getTileUrl: function(coords) {
            let { x, y } = coords;
            let yInverse = 7 - y; // Odwrócenie indeksu wiersza
            return `/resources/maps/white_orchard/4/${x}/${yInverse}.jpg`;
        }
    });
}
