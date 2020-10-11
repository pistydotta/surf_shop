mapboxgl.accessToken = 'pk.eyJ1IjoicGlzdHlkb3R0YSIsImEiOiJja2RxOHBwb3EwZjIzMnhvYnJ2ZmgwMWJ2In0.zcwWOWDyiazXbA5ra_Uu-Q';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: post.geometry.coordinates,
    zoom: 7
});


// code from the next step will go here!



// create a HTML element for each feature
var el = document.createElement('div');
el.className = 'marker';

// make a marker for each feature and add to the map
new mapboxgl.Marker(el)
    .setLngLat(post.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h3>' + post.title + '</h3><p>' + post.location + '</p>'))
    .addTo(map);

$('.toggle-edit-form').on('click', function () {
    $(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit')
    $(this).siblings('.edit-review-form').toggle()
})