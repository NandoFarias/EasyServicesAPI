(function() {
    'use strict';

    angular
        .module('gmaps')
        .factory('gmapsService', gmapsService);

    gmapsService.$inject = ['$http'];

    /* @ngInject */
    function gmapsService($http) {
        var service = {
            refresh: refresh
        };
        return service;

        ////////////////

        function convertToMapPoints(response) {
            var locations = [];

            for(var i= 0; i < response.length; i++) {
                var engineer = response[i];

                // Create popup windows for each record
                var  contentString =
                    '<p><b>Nome</b>: ' + engineer.username +
                    '<br><b>skill</b>: ' + engineer.skill +
                    '</p>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
                locations.push({
                    latlon: new google.maps.LatLng(engineer.location[1], engineer.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    username: engineer.username,
                    skill: engineer.gender
	            });
	        }
	        return locations;
	    }

	    function initialize(latitude, longitude, locations) {

		    // Uses the selected lat, long as starting point
		    var myLatLng = {lat: latitude, lng: longitude};

		    // If map has not been created already...
		    if (!map){

		        // Create a new map and place in the index.html page
		        var map = new google.maps.Map(document.getElementById('map'), {
		            zoom: 3,
		            center: myLatLng
		        });
		    }

		    // Loop through each location in the array and place a marker
		    locations.forEach(function(n, i){
		        var marker = new google.maps.Marker({
		            position: n.latlon,
		            map: map,
		            title: "Big Map",
		            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
		        });

		        // For each marker created, add a listener that checks for clicks
		        google.maps.event.addListener(marker, 'click', function(e){

		            // When clicked, open the selected marker's message
		            //currentSelectedMarker = n;
		            n.message.open(map, marker);
		        });
		    });

		    // Set initial location as a bouncing red marker
		    var initialLocation = new google.maps.LatLng(latitude, longitude);
		    var marker = new google.maps.Marker({
		        position: initialLocation,
		        animation: google.maps.Animation.BOUNCE,
		        map: map,
		        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
		    });
		    //lastMarker = marker;

		}

        function refresh(latitude, longitude) {

            $http.get('/engineers').success(function(response){

                var locations = convertToMapPoints(response);

                initialize(latitude, longitude, locations);

                google.maps.event.addDomListener(window, 'load',
    				service.refresh(latitude, longitude));
            }).error(function(){});
        }
    }
})();