// Mapa Leaflet
var mapa = L.map('mapid').setView([10, -84], 8);

// Definición de capas base

//Primer capa base

var capa_osm = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
  {
    maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(mapa);	

// Segunda capa base
var capa_hot = L.tileLayer(
    'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
   {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
   }
).addTo(mapa);

// Tercera capa base
var capa_esri = L.tileLayer(
	'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
	{
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	}
	).addTo(mapa);	
	
// Conjunto de capas base
var capas_base = {
  "OSM": capa_osm,
  "OSM Forest" : capa_hot,
  "ESRI": capa_esri
  
};  
	    
// Control de capas
control_capas = L.control.layers(capas_base).addTo(mapa);	

// Control de escala
L.control.scale().addTo(mapa);


// Capa vectorial impacto proyectos por canton en formato GeoJSON
$.getJSON("https://francini-ap.github.io/demo_datos_pnud/proyectos_canton.geojson", function(geodata) {
  var capa_protectos = L.geoJson(geodata, {
    style: function(feature) {
	  return { 'color': "#0000FF", 'weight': 1.5, 'fillOpacity': 0.50 }
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Cantón</strong>: " + feature.properties.canton+ "<br>" + "<strong>Cantidad Proyectos</strong>: " + feature.properties.n_proyectos;
      layer.bindPopup(popupText);
    }
	
   
  }).addTo(mapa);

  control_capas.addOverlay(capa_protectos  , 'Impacto proyectos PNUD a nivel cantonal');

});	

// Capa vectorial proyecto paisajes productivos en formato GeoJSON
$.getJSON("https://francini-ap.github.io/demo_datos_pnud/paisajes_productivos3.geojson", function(geodata) {
  var capa_pp = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': " #32CD32 ", 'weight': 1.5, 'fillOpacity': 0.25}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Nombre Sector</strong>: " + feature.properties.nombre_cb+ "<br>" + "<strong>Persona Cordinadora</strong>: " + feature.properties.cordinador + "<br>" + "<strong>Información Proyecto<br></h1>Enlace a <a href = 'https://www.cr.undp.org/content/costarica/es/home/projects/paisajes-productivos.html'>Paisajes Productivos</a>";
      layer.bindPopup(popupText);
    }	

  }).addTo(mapa);

  control_capas.addOverlay(capa_pp , 'Proyecto Paisajes Productivos');

});	

// Control de escala
   L.control.scale ({position:'topright', imperial: false}).addTo(mapa)
   