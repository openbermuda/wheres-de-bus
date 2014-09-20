/**
 * Created by i_000 on 20/09/2014.
 */
$(function(){
    var container = document.getElementById('map');

    var map = L.map (container).setView([32.294201, -64.783897], 13);

    L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'examples.map-i875mjb7'
    }).addTo(map);
/*

    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

    L.circle([51.508, -0.11], 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(map).bindPopup("I am a circle.");

    L.polygon([
        [32.29489, -64.78484],
        [32.29488, -64.7847],
        [32.29412, -64.78482],
        [32.29417, -64.78491]
    ]).addTo(map).bindPopup("Hamilton Bus Station.");

    */
    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }

    function gotoMap(e){
        var pos = e.target.getAttribute('data-position');
        var zoom = e.target.getAttribute('data-zoom');
        var name = e.target.getAttribute('data-name');
        var area = e.target.getAttribute('data-area');
/*
        if (area){
            var x = area.split('!');
            var points = new Array();
            for(var i=0,max=x.length; i<max; i++){
                var point = x[i].split(',');
                points.push(point);
            }
            map.polygon(points).addTo(map);
        }
*/
        if (pos && zoom) {
            var loc = pos.split(',');
            var z = parseInt(zoom);
            map.setView(loc, z, {animation: true});

            if (name){
                L.marker(loc)
                    .addTo(map)
                    .bindPopup(name)
                    .openPopup();
            }
        }

        return false;
    }

    map.on('click', onMapClick);

    $('.mapNav').on('click', gotoMap);

});