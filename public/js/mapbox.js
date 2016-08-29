
(function() {
mapboxgl.accessToken = 'pk.eyJ1IjoicG1pbGxlcmsiLCJhIjoiY2lyM3VjMzNsMDFkZHR4bHdxOWs1amt1MiJ9.nc1fPKTYXlgC1zVoYS2Oag';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-98, 38.88],
    minZoom: 2,
    zoom: 3
});

var chapters = {
'home': {
    bearing: 27,
    center: [-77.321264, 38.943057],
    zoom: 15.5
},
'listing1': {
    duration: 6000,
    center: [-77.321264, 39.943057],
    bearing: 150,
    zoom: 15
   },
'listing2': {
    bearing: 90,
    center: [-77.321264, 40.943057],
    zoom: 13,
    speed: 0.6
},
'listing3': {
    bearing: 90,
    center: [-77.321264, 41.943057],
    zoom: 12.3
},
'listing4': {
    bearing: 45,
    center: [-77.321264, 42.943057],
    zoom: 15.3,
    speed: 0.5
},
'listing5': {
    bearing: 180,
    center: [-77.321264, 43.943057],
    zoom: 12.3
},
'listing6': {
    bearing: 90,
    center: [-77.321264, 44.943057],
    zoom: 17.3
},
'listing7': {
    bearing: 90,
    center: [-77.321264, 45.943057],
    zoom: 14.3
}
};

// map.addControl(new mapboxgl.Geocoder());

//////////////////////////////////////////////////////////
////////// Map Reposition w/ Chapter Tracker /////////////
//////////////////////////////////////////////////////////

// On every scroll event, check which element is on screen
window.addEventListener('scroll', function(e) {
  var chapterNames = Object.keys(chapters);
  for (var i = 0; i < chapterNames.length; i++) {
      var chapterName = chapterNames[i];
      if (isElementOnScreen(chapterName)) {
          setActiveChapter(chapterName);
          break;
      }
  }
});


// Chapter Tracker
var activeChapterName = 'home';
function setActiveChapter(chapterName) {
  if (chapterName === activeChapterName) return;

  map.flyTo(chapters[chapterName]);

  document.getElementById(chapterName).setAttribute('class', 'active');
  document.getElementById(activeChapterName).setAttribute('class', '');

  activeChapterName = chapterName;
}

function isElementOnScreen(id) {
  var element = document.getElementById(id);
  var bounds = element.getBoundingClientRect();
  return bounds.top < window.innerHeight && bounds.bottom > 0;
}
})();
