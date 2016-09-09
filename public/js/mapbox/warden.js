(function() {
    var MapWarden = _gwp.MapWarden;

    mapboxgl.accessToken = 'pk.eyJ1IjoicG1pbGxlcmsiLCJhIjoiY2lyM3VjMzNsMDFkZHR4bHdxOWs1amt1MiJ9.nc1fPKTYXlgC1zVoYS2Oag';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v9',
        center: [-77.356746, 38.957575],
        zoom: 12
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


    $(".flyby").on("click", function() {
        setUpMap();
    });

    $("#btn2").on("click", function() {
        takeDownMap();
    });
})();
