function getColor(d) {
  return d > 40  ? '#800026' :
         d > 30  ? '#BD0026' :
         d > 20  ? '#E31A1C' :
         d > 15 ? '#FC4E2A' :
         d > 10  ? '#FD8D3C' :
         d > 5  ? '#FED976' :
                    '#FFEDA0';
}

var nlMunicipality = "static/data/nyu_geojson.json"

var ginis = "static/data/dataframe_merged_apis.js"

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
  });

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/dark-v10",
  accessToken: API_KEY
  });

  var outdoormap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/outdoors-v11",
    accessToken: API_KEY
    });

    var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/satellite-v9",
      accessToken: API_KEY
      });

      var baseMaps = {
        "Satellite": satellitemap,
        "Outdoor": outdoormap,
        "Light": lightmap,
        "Dark": darkmap
    };

  var myMap = L.map("map",{
    center: [25.02, -100.52],
    zoom: 7,
    layers: [darkmap]
  });
  
  L.control.layers(baseMaps).addTo(myMap);

d3.json(nlMunicipality).then(function(data){
  console.log(data.features)

  L.geoJson(data,{
    style: function(feauture){
      return{
        color: "red",
        fillColor: getColor(feauture.properties.cve_mun)
      }
    }
  }).addTo(myMap);
});

d3.json(ginis).then(function(gini_data){
  var gini = gini_data.GINI
  console.log(gini)
});