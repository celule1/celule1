var map = L.map('map').fitWorld();
var i=1;
var urlParams = new URLSearchParams(window.location.search);
var lat = parseFloat(urlParams.get('lat'));
var lon =  parseFloat(urlParams.get('lon'));
var azimuth = parseInt(urlParams.get('azimuth'));
var radius = parseInt(urlParams.get('radius'));
var angle =parseInt(urlParams.get('angle'));
/*
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);
	map.setView(new L.LatLng(lat, lon), 8);
*/
//////////////////////
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
            map = new L.Map('map', { center: new L.LatLng(51.505, -0.04), zoom: 13 }),
            drawnItems = L.featureGroup().addTo(map);
    L.control.layers({
        'osm': osm.addTo(map),
        "google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
            attribution: 'google'
        })
    }, { 'drawlayer': drawnItems }, { position: 'topleft', collapsed: false }).addTo(map);
    map.addControl(new L.Control.Draw({
        edit: {
            featureGroup: drawnItems,
            poly: {
                allowIntersection: false
            }
        },
        draw: {
            polygon: {
                allowIntersection: false,
                showArea: true
            }
        }
    }));

    map.on(L.Draw.Event.CREATED, function (event) {
        var layer = event.layer;

        drawnItems.addLayer(layer);
    });

/////////////////////
	//setLocation();

	function onLocationFound(e) {
		var radius = e.accuracy / 2;

		L.marker(e.latlng).addTo(map)
			.bindPopup("Esti la o distanta de " + radius.toFixed(2) + " metri fata de acest punct.").openPopup();

		L.circle(e.latlng, radius).addTo(map);
	}

	function onLocationError(e) {
		alert(e.message);
	}

	function myLocation()
	{
	map.on('locationfound', onLocationFound);
	map.on('locationerror', onLocationError);
	map.locate({setView: true, maxZoom: 20});
	}
	function setLocation()
		{
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);
					
	map.setView(new L.LatLng(lat, lon), 14);
	L.marker([lat, lon],{opacity:0.7}).addTo(map)
					.bindPopup(i+"")
					.openPopup();
	i++;
	var sector = L.circle([lat, lon], {
					color: 'red',
					radius: radius,
					weight: 1
					})
						.setSector(azimuth, angle)
						.bindPopup('Localizarea tintei')
						.addTo(map);
				
	map.fitBounds(sector.getBounds().pad(0.1));
			}
			
	function eraseLocation()
			{
			map.remove();
			map = new L.Map('map');
			L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);
			map.setView(new L.LatLng(46.10, 25.10), 8); //center of Romania
			}
	
