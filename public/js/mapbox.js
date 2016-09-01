
(function() {
mapboxgl.accessToken = 'pk.eyJ1IjoicG1pbGxlcmsiLCJhIjoiY2lyM3VjMzNsMDFkZHR4bHdxOWs1amt1MiJ9.nc1fPKTYXlgC1zVoYS2Oag';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-77.356746, 38.957575],
    zoom: 3
});

map.addControl(new mapboxgl.Geocoder());


// object = {
//   'setup': function() {
//
//   },
//   'teardown': function() {
//
//   }
// }
function add_point_to_map(center) {
  var el       =  document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker(el)
  .setLngLat(center)
  .addTo(map);
}


var listings = {
  'welcome':{
      bearing: 0,
      center: [-77.356746, 38.957575],
      minZoom: 13,
      zoom: 3
  },
  'home': {
      // bearing: 27,
      duration: 8000,
      speed: 1.2,
      center: [-77.321264, 38.943057],
      zoom: 17.3
  },
  'listing1': {
      duration: 6000,
      center: [-77.356864, 38.941288],
      bearing: 150,
      zoom: 17.3
     },
  'listing2': {
      bearing: 90,
      center: [-77.356746, 38.957575],
      zoom: 17.3,
      speed: 0.6
  },
  'listing3': {
      bearing: 90,
      center: [-77.358875, 38.960888],
      zoom: 17.3
  },
  'listing4': {
      bearing: 45,
      center: [-77.346688, 38.939768],
      zoom: 17.3,
      speed: 0.5
  },
  'listing5': {
      bearing: 180,
      center: [-77.353314, 38.930013],
      zoom: 17.3
  },
  'listing6': {
      bearing: 90,
      center: [-77.372076, 38.973816],
      zoom: 17.3
  },
  'listing7': {
      bearing: 90,
      center: [-77.345066, 38.974635],
      zoom: 17.3
  },
  'listing8': {
      bearing: 90,
      center: [-77.399277, 38.946185],
      zoom: 17.3
  },
  'listing9': {
      bearing: 90,
      center: [-77.396404, 38.986175],
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
document.querySelector('.scroll-wrap').addEventListener('scroll', function() {
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

})();
