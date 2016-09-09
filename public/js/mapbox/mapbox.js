_gwp.MapWarden.prototype = {
    setUpMap: function() {
        add_point_to_map();
        toolTipAdd();
        loadMapData();
        tooltipData();
        addGeocoder();
    },

    // takeDownMap: function() {}


    add_point_to_map: function(center) {
        var el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker(el)
            .setLngLat(center)
            .addTo(map);
    }

        toolTipAdd: function(center) {
        var popup = new mapboxgl.Popup({
                closeOnClick: true
            })
            .setLngLat(center)
            .setHTML('<h1>Hello World!</h1>')
            .addTo(map);
    }

    //////////////////////////////////////////////////////////
    ///// GeoJSON for Listing Placement + Tooltip Info ///////
    //////////////////////////////////////////////////////////

    coordToMarker: function(description, long, lat) {
        return {
            "type": "Feature",
            "properties": {
                "description": description,
                "iconSize": [20, 20],
                "icon": "circle"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [long, lat]
            }
        }
    }

    $.each(listingData, function(index, listing_hash) {
        var marker = coordToMarker(listing_hash.description, listing_hash.long, listing_hash.lat);
        markerPoints.push(marker);
    });

    loadMapData: function() {
        map.on('load', function() {
            // Add a GeoJSON source containing place coordinates and information.
            map.addSource("listings", {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": markerPoints
                }
            });
            // Add a layer showing the places.
            map.addLayer({
                "id": "listings",
                "type": "symbol",
                "source": "listings",
                "layout": {
                    "icon-image": "{icon}-15",
                    "icon-allow-overlap": true
                }
            });
        });
    }

    $('.marker').on('click', function() {
        toolTipAdd(center);
    });

    //////////////////////////////////////////////////////////
    ///////// Populates Tooltips Using Above Data ////////////
    //////////////////////////////////////////////////////////

    tooltipData: function() {
        map.on('click', function(e) {
            var features = map.queryRenderedFeatures(e.point, {
                layers: ['listings']
            });

            if (!features.length) {
                return;
            }

            var feature = features[0];

            // Populate the popup and set its coordinates
            // based on the feature found.
            var popup = new mapboxgl.Popup()
                .setLngLat(feature.geometry.coordinates)
                .setHTML(feature.properties.description)
                .addTo(map);
        });
    }
    //////////////////////////////////////////////////////////
    /////////// Original Loop for Custom Markers /////////////
    //////////////////////////////////////////////////////////

    // $.each(listings, function(listing_id, listing_hash) {
    //   var center = listing_hash["center"];
    //   add_point_to_map(center);
    // });


    //////////////////////////////////////////////////////////
    //////////// Coordinates on Mouse Location ///////////////
    //////////////////////////////////////////////////////////

    // map.on('mousemove', function (e) {
    //     document.getElementById('info').innerHTML =
    //         // e.point is the x, y coordinates of the mousemove event relative
    //         // to the top-left corner of the map
    //         JSON.stringify(e.point) + '<br />' +
    //             // e.lngLat is the longitude, latitude geographical position of the event
    //         JSON.stringify(e.lngLat);
    // });


    /// Add Geocoder ///
    addGeocoder: function() {
        map.addControl(new mapboxgl.Geocoder());
    }

}
