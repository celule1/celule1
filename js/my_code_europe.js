var map = L.map('map').fitWorld();
	var i=1;
	var urlParams = new URLSearchParams(window.location.search);
    var lat = parseFloat(urlParams.get('lat'));
    var lon =  parseFloat(urlParams.get('lon'));
    var range = parseInt(urlParams.get('range'));
    

	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);
	map.setView(new L.LatLng(lat, lon), 5);
	setLocation();

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
					L.circle([lat, lon], {	color: 'red',
										    fillColor: '#f03',
                                            fillOpacity: 0.5,
                                            radius: range
										}).addTo(map);
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
				map.setView(new L.LatLng(46.10, 25.10), 5); //center of Romania
			}
	