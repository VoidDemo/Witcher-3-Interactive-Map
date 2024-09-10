export function createSmallMapLayer() {
    return L.tileLayer('/resources/maps/white_orchard/2/{x}/{y}.ext', {
        minZoom: 0,
        maxZoom: 12,
        tileSize: 256,
        attribution: '&copy; Your Attribution',
        getTileUrl: function(coords) {
            let { x, y } = coords;
            let yInverse = 1 - y; // Odwrócenie indeksu wiersza
            let fileExtension = (x === 2) ? 'png' : 'jpg'; // Kolumna 2 używa plików PNG
            return `/resources/maps/white_orchard/2/${x}/${yInverse}.${fileExtension}`;
        }
    });
}
