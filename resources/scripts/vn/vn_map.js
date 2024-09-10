export function createVelenMapLayer(map) {
    function getZoomLevels(z) {
        switch (z) {
            case 1:
                return { minZoom: 8, maxZoom: 10 };
            case 2:
                return { minZoom: 11, maxZoom: 12 };
            case 3:
                return { minZoom: 13, maxZoom: 15 };
            case 4:
                return { minZoom: 16, maxZoom: 18 };
            case 5:
                return { minZoom: 19, maxZoom: 22 };
            case 6:
                return { minZoom: 23, maxZoom: 25 }; // Możesz dostosować maxZoom dla z=6
            default:
                return { minZoom: 8, maxZoom: 25 };
        }
    }

    // Tworzenie TileLayer z odpowiednimi parametrami
    return L.tileLayer(function (coords) {
        const zoomLevels = getZoomLevels(coords.z);
        
        // Ustawienie odpowiedniego rozszerzenia pliku
        let extension = 'jpg';
        if ((coords.z == 1 && coords.y == 2) || (coords.z == 2 && coords.y == 4)) {
            extension = 'png';
        }

        // Zwrócenie ścieżki do kafelka
        return `/resources/maps/hos_velen/${coords.z}/${coords.x}/${coords.y}.${extension}`;
    }, {
        tileSize: 256,
        tms: true,  // Odwrócenie numeracji Y
        minZoom: 8,
        maxZoom: 24,  // Ustawione ogólnie, ale zarządzane dynamicznie
        bounds: L.latLngBounds(
            [51.53, -0.12],   // Górny lewy róg (Północny Zachód)
            [51.51, -0.09]    // Dolny prawy róg (Południowy Wschód)
        ),
        attribution: 'Mapa Velen (Hearts of Stone)'
    }).on('tileloadstart', function (e) {
        const z = e.tile.coords.z;
        const zoomLevels = getZoomLevels(z);
        map.options.minZoom = zoomLevels.minZoom;
        map.options.maxZoom = zoomLevels.maxZoom;
    });
}
