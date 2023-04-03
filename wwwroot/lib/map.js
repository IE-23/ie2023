// Initialize the map
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -20.281549996910442,lng: 57.377 }, 
        zoom: 15,
        mapTypeControl: false
    });
    // Add marker for Middlesex University Mauritius Campus
    const campusMarker = new google.maps.Marker({
        map,
        position: { lat: -20.28051680323125, lng: 57.39527704007864 },
        animation: google.maps.Animation.BOUNCE
    });
    // Search for nearby hotels
    const request = {
        location: map.getCenter(),
        radius: "500",
        type: ["lodging"],
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    });
}

// Create a marker for each hotel
function createMarker(place) {
    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });

    // Add a click listener to the marker to display the hotel name
    const infowindow = new google.maps.InfoWindow({
        content: place.name,
    });
    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });
}