
(function() {
mapboxgl.accessToken = 'pk.eyJ1IjoicG1pbGxlcmsiLCJhIjoiY2lyM3VjMzNsMDFkZHR4bHdxOWs1amt1MiJ9.nc1fPKTYXlgC1zVoYS2Oag';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-77.356746, 38.957575],
    zoom: 4
});


function add_point_to_map(center) {
  var el       =  document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker(el)
  .setLngLat(center)
  .addTo(map);
}

function toolTip(center){
  var popup = new mapboxgl.Popup({closeOnClick: false})
      .setLngLat(center)
      .setHTML('<h1>Hello World!</h1>')
      .addTo(map);
}

$('.marker').on('click', function() {
  toolTipAdd(center);
});

var listingData = [{
    listing_id: "welcome",
    long: -77.356746,
    lat: 38.957575,
    description: "Derp"
}, {
    listing_id: "home",
    long: -77.321264,
    lat: 38.943057,
    description: "Derp2"
}, {
    listing_id: "listing1",
    long: -77.321264,
    lat: 38.941288,
    description: "Derp2"
}, {
    listing_id: "listing2",
    long: -77.356746,
    lat: 38.957575,
    description: "Derp2"
}, {
    listing_id: "listing3",
    long: -77.358875,
    lat: 38.960888,
    description: "Derp3"
}, {
    listing_id: "listing4",
    long: -77.346688,
    lat: 38.939768,
    description: "Derp4"
}, {
    listing_id: "listing5",
    long: -77.353314,
    lat: 38.930013,
    description: "Derp5"
}, {
    listing_id: "listing6",
    long: -77.372076,
    lat: 38.973816,
    description: "Derp6"
}, {
    listing_id: "listing7",
    long: -77.345066,
    lat: 38.974635,
    description: "Derp7"
}, {
    listing_id: "listing8",
    long: -77.399277,
    lat: 38.946185,
    description: "Derp8"
}, {
    listing_id: "listing9",
    long: -77.396404,
    lat: 38.986175,
    description: "Derp9"
}]

//////////////////////////////////////////////////////////
///// GeoJSON for Listing Placement + Tooltip Info ///////
//////////////////////////////////////////////////////////
function coordinateToMarkerPoint(description, long, lat) {
    return {
        "type": "Feature",
        "properties": {
            "description": description,
            "icon": "marker"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [long, lat]
        }
    }
}


var markerPoints = []

$.each(listingData, function(listing_hash) {
    markerPoints.push(coordinateToMarkerPoint(listing_hash["description"], listing_hash["long"], listing_hash["lat"]))
});
console.log(markerPoints);

map.on('load', function() {
    // Add a GeoJSON source containing place coordinates and information.
    map.addSource("listings", {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": markerPoints
        }
    });
});


//////////////////////////////////////////////////////////
///////// Populates Tooltips Using Above Data ////////////
//////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////
////////// Listing Coordinates and Animation /////////////
//////////////////////////////////////////////////////////

var listings = {
    'welcome': {
        // bearing: 0,
        duration: 4000,
        center: [listingData[0].long, listingData[0].lat],
        zoom: 4
    },
    'home': {
        // bearing: 27,
        duration: 8000,
        center: [listingData[1].long, listingData[1].lat],
        zoom: 17.3
    },
    'listing1': {
        duration: 6000,
        center: [listingData[2].long, listingData[2].lat],
        // bearing: 150,
        zoom: 17.3
    },
    'listing2': {
        duration: 6000,
        // bearing: 90,
        center: [listingData[3].long, listingData[3].lat],
        zoom: 17.3,
    },
    'listing3': {
        duration: 6000,
        // bearing: 90,
        center: [listingData[4].long, listingData[4].lat],
        zoom: 17.3
    },
    'listing4': {
        duration: 6000,
        // bearing: 45,
        center: [listingData[5].long, listingData[5].lat],
        zoom: 17.3,
    },
    'listing5': {
        duration: 6000,
        // bearing: 180,
        center: [listingData[6].long, listingData[6].lat],
        zoom: 17.3
    },
    'listing6': {
        duration: 6000,
        // bearing: 90,
        center: [listingData[7].long, listingData[7].lat],
        zoom: 17.3
    },
    'listing7': {
        duration: 6000,
        // bearing: 90,
        center: [listingData[8].long, listingData[8].lat],
        zoom: 17.3
    },
    'listing8': {
        duration: 6000,
        // bearing: 90,
        center: [listingData[9].long, listingData[9].lat],
        zoom: 17.3
    },
    'listing9': {
        duration: 6000,
        // bearing: 90,
        center: [listingData[10].long, listingData[10].lat],
        zoom: 17.3
    }
};


//////////////////////////////////////////////////////////
/////////// Original Loop for Custom Markers /////////////
//////////////////////////////////////////////////////////

// $.each(listings, function(listing_id, listing_hash) {
//   var center = listing_hash["center"];
//   add_point_to_map(center);
// });

//////////////////////////////////////////////////////////
////////// Potential Loop for Custom Markers /////////////
//////////////////////////////////////////////////////////

geojson.features.forEach(function(marker) {
    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.width = marker.properties.iconSize[0] + 'px';
    el.style.height = marker.properties.iconSize[1] + 'px';

    el.addEventListener('click', function(e) {
      console.log("it works");
    });

    // add marker to map
    new mapboxgl.Marker(el, {offset: [-marker.properties.iconSize[0] / 2, -marker.properties.iconSize[1] / 2]})
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
});

//////////////////////////////////////////////////////////
////////// Map Reposition w/ Chapter Tracker /////////////
//////////////////////////////////////////////////////////

// On every scroll event, check which element is on screen
$('.scroll-wrap').on('scroll', function() {
    $.each(listings, function(listing_id, listing_hash) {
        if (isElementOnScreen(listing_id)) {
            setActiveListing(listing_id);
            e.preventDefault();
        }
    });
});

// The CSS id of the currently active chapter
var activeListingName = 'home';

function setActiveListing(listing_id) {
    // Ignore if the specified chapter is already active
    if (listing_id === activeListingName) return;
    // Update the map
    map.flyTo(listings[listing_id]);
    // Update the active listing
    document.getElementById(listing_id).setAttribute('class', 'active');
    document.getElementById(activeListingName).setAttribute('class', '');

    activeListingName = listing_id;
}


function isElementOnScreen(id) {
    var element = document.getElementById(id);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}

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

map.addControl(new mapboxgl.Geocoder());


})();
