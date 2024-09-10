export function createMediumMapLayer() {
    return L.tileLayer('/resources/maps/white_orchard/3/{x}/{y}.jpg', {
        minZoom: 13,
        maxZoom: 15,
        tileSize: 256,
        attribution: '&copy; Your Attribution',
        getTileUrl: function(coords) {
            let { x, y } = coords;
            let yInverse = 3 - y; // Odwrócenie indeksu wiersza
            return `/resources/maps/white_orchard/3/${x}/${yInverse}.jpg`;
        }
    });
}
