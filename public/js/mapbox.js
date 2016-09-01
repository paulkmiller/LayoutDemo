
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


map.on('load', function () {
    // Add a GeoJSON source containing place coordinates and information.
    map.addSource("listings", {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "properties": {
                    "description" : "<p>Testing Content for Home</p>",
                    "icon": "marker"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [coords.home.long, coords.home.lat]
                }
            }]
        }
    });

    // Add a layer showing the listings.
    map.addLayer({
        "id": "listings",
        "type": "symbol",
        "source": "listings",
        "layout": {
            "icon-image": "{icon}-15",
            "icon-allow-overlap": true,
            "icon-padding": 4
        }
    });
});

map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['listings'] });

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


var coords = {
  welcome:  { long: -77.356746, lat: 38.957575 },
  home:     { long: -77.321264, lat: 38.943057 },
  listing1: { long: -77.356864, lat: 38.941288 },
  listing2: { long: -77.356746, lat: 38.957575 },
  listing3: { long: -77.358875, lat: 38.960888 },
  listing4: { long: -77.346688, lat: 38.939768 },
  listing5: { long: -77.353314, lat: 38.930013 },
  listing6: { long: -77.372076, lat: 38.973816 },
  listing7: { long: -77.345066, lat: 38.974635 },
  listing8: { long: -77.399277, lat: 38.946185 },
  listing9: { long: -77.396404, lat: 38.986175 }
}

var listings = {
  'welcome':{
      bearing: 0,
      duration: 4000,
      center: [coords.welcome.long, coords.welcome.lat],
      zoom: 4
  },
  'home': {
      // bearing: 27,
      duration: 8000,
      center: [coords.home.long, coords.home.lat],
      zoom: 17.3
  },
  'listing1': {
      duration: 6000,
      center: [coords.listing1.long, coords.listing1.lat],
      bearing: 150,
      zoom: 17.3
     },
  'listing2': {
      bearing: 90,
      center: [coords.listing2.long, coords.listing2.lat],
      zoom: 17.3,
      sped: 0.6
  },
  'listing3': {
      bearing: 90,
      center: [coords.listing3.long, coords.listing3.lat],
      zoom: 17.3
  },
  'listing4': {
      bearing: 45,
      center: [coords.listing4.long, coords.listing4.lat],
      zoom: 17.3,
  },
  'listing5': {
      bearing: 180,
      center: [coords.listing5.long, coords.listing5.lat],
      zoom: 17.3
  },
  'listing6': {
      bearing: 90,
      center: [coords.listing6.long, coords.listing6.lat],
      zoom: 17.3
  },
  'listing7': {
      bearing: 90,
      center: [coords.listing7.long, coords.listing7.lat],
      zoom: 17.3
  },
  'listing8': {
      bearing: 90,
      center: [coords.listing8.long, coords.listing8.lat],
      zoom: 17.3
  },
  'listing9': {
      bearing: 90,
      center: [coords.listing9.long, coords.listing9.lat],
      zoom: 17.3
  }
};

$.each(listings, function(listing_id, listing_hash) {
  var center = listing_hash["center"];
  add_point_to_map(center);
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

////////////////////// Coords //////////////////////
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
