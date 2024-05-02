var map = L.map('map', {center: [41.85,-87.659843], zoom: 10});
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '© OpenStreetMap' }).addTo(map);
map.doubleClickZoom.disable();
        
var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHlsZXJtdW5uIiwiYSI6ImNsbzdxeHpjNzA3bGEyc2w0NWsxdmpoOGMifQ.yUw0653YqFN2tg7KbwqPmw';
    
var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
    
var baseMaps = {
"Grayscale": grayscale,
"Streets": streets
};

var audioIcon = L.icon({
    iconUrl: 'icons8-map-pin-100.png',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
});

var marker = L.marker([41.8878889,-87.7651729], { icon: audioIcon
}).addTo(map);

marker.bindPopup('<h3>Local Redlining Struggles, Early 1960s</h3>' +
                    '<audio controls><source src="Gale_Cincotta.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>' +
                    '<p><i>Gale Cincotta</i>, Community Activist, Austin Neighborhood (Cincotta, 1977)</p>', {
                        className: 'custom-popup'
                    });

var letter = L.marker([41.7440405,-87.64305], { icon: audioIcon
}).addTo(map);

letter.bindPopup('<h3>Discrimination after the End of Legal Redlining, Late 1960s</h3>' +
                    '<audio controls><source src="Letter_For_Ownership.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>' +
                    '<p><i>Frank J. Williams</i>, Real Estate Agent, Location of First Real Estate Job (Willliams, 2018)</p>'
                    );

var tactics = L.marker([41.730082,-87.6627711], { icon: audioIcon
}).addTo(map);

tactics.bindPopup('<h3>Tactics Used to Stop Real Estate Agents from Selling Homes to Black Families, Early 1970s</h3>' +
                    '<p>In the office...' +
                    '<audio controls><source src="tactics_1.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>' +
                    '<p>In the neighborhood...' +
                    '<audio controls><source src="tactics_2.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>' +
                    '<p><i>Frank J. Williams</i>, Real Estate Agent, F. J. Williams Reality Office (Willliams, 2018)</p>'
                    );

var protest = L.marker([41.7400071,-87.6747107], { icon: audioIcon
}).addTo(map);

protest.bindPopup('<h3>Protest Against Real Estate Agent Selling to Black Families, 1971</h3>' +
                    '<audio controls><source src="tactics_3.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>' +
                    '<p><i>Frank J. Williams</i>, Real Estate Agent, North Beverly Neighborhood (Willliams, 2018)</p>'
                    );
                    
var bomb = L.marker([41.7220125,-87.6781262], { icon: audioIcon
}).addTo(map);

bomb.bindPopup('<h3>Tactics Used to Stop Real Estate Agents from Selling Homes to Black Families, 1975</h3>' +
                '<audio controls><source src="bomb.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>' +
                '<p><i>Frank J. Williams</i>, Real Estate Agent, Williams` Home (Willliams, 2018)</p>'
                );                       

var hope = L.marker([41.7296251,-87.6192459], { icon: audioIcon
}).addTo(map);

hope.bindPopup('<h3>Dreams of Homeownsership Achieved through Struggle, 1940s or 1950s</h3>' +
                '<p>This section happens to be the only residential district in this vast city where people of our group have been able to watch their dreams turn into a reality. Previous to the development of this locality it was impossible to acquire a loan for a home due to the fact that Bankers claim that negros allow their property to depreciate to such an extent that they are a bad investment but [during?] the [period?] with the F.H.A. [Federal Housing Authority] in full swing and so many homes being built for other groups a small [group?] of negroes with ideals the chief one being a home worked entirely toward this end and were successful. …There were many times during this fight that we felt that our dream was to no avail…<b>when people from other communities drive through to gaze and comment on our homes we want them to know that they didn’t just grow but they represent many years of thought planning, [illegible], and hard work.</b></p>' +
                '<p><i>Eunice Lyons Prescott</i>, Resident, Wester Chesterfield Neighborhood (Austin and Thomas, 2022)</p>');

var hope = L.marker([41.8778754,-87.7305186], { icon: audioIcon
}).addTo(map);

hope.bindPopup('<h3>Fear of a Racially Changing Neighborhood, June 21, 1963</h3>' +
                '<p>Well, the mystery of who bought the Young-Parker house has been solved as more or less expected, the blackies moved in today. It somehow gives me a squeamish feeling to be confronted with the actual fact of having them in our block. The question is what course to follow. How long before no whites will be renting here any more.</p>' +
                '<p><i>Lillian Gartz</i>, Resident, West Garfield Park Neighborhood (Austin and Thomas, 2022)</p>');

var renewal

$.getJSON("renewal_project.geojson",function(data){
    renewal = L.geoJson(data, {
        onEachFeature: onEachFeatureFunc,
        color: '#BC95E3', weight: 2
    }).addTo(map);
});



$.getJSON("invest_redline.geojson",function(data){
    redline = L.geoJson(data, {
        style: styleFunc,   
    }).addTo(map);
});

$.getJSON("investment.geojson",function(data){
    neighborhoodsLayer = L.geoJson(data, {
        style: styleFunc,
    }).addTo(map);

    var overlayLayer = {
        "Urban Renewal Projects": renewal,
        "All Census Tracts": neighborhoodsLayer,
        "Redlined Census Tracts": redline,
    };
    L.control.layers(baseMaps, overlayLayer).addTo(map);

    map.eachLayer(function (layer) {
        if (layer === renewal) {
            layer.bringToFront();
        }
    });
});

// Set style function that sets fill color property equal to blood lead
function styleFunc(feature) {
    return {
        fillColor: setColorFunc(feature.properties.aggregate),
        fillOpacity: 1,
        weight: 0,
        opacity: 1
    };
}

// Set function for color ramp, you can use a better palette
function setColorFunc(density){
    return density > 21471.88 ? '#02472b' :
        density > 10723.16 ? '#379e54' :
        density > 5985.25 ? '#bce395' :
        density > 0 ? '#ffffe5' :
                        '#BFBCBB';
};

// Now we’ll use the onEachFeature option to add the listeners on our state layers:
function onEachFeatureFunc(feature, layer){
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomFeature
    });
    var customPopupClass = 'custom-popup';

    // Bind popup with custom class
    layer.bindPopup('Project Name: ' + feature.properties.project, {
        className: customPopupClass
    });
}

function highlightFeature(e){
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    // for different web browsers
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

// Define what happens on mouseout:
function resetHighlight(e) {
    renewal.resetStyle(e.target);
}

// As an additional touch, let’s define a click listener that zooms to the state: 
function zoomFeature(e){
    console.log(e.target.getBounds());
    map.fitBounds(e.target.getBounds().pad(1.5));
}

// Add Scale Bar to Map
L.control.scale({position: 'bottomleft'}).addTo(map);

// Create Leaflet Control Object for Legend
var legend = L.control({position: 'bottomright'});

// Function that runs when legend is added to map
legend.onAdd = function (map) {
    // Create Div Element and Populate it with HTML
    var div = L.DomUtil.create('div', 'legend');            
    div.innerHTML += '<b>Annual Aggregate Investment</b><br />';
    div.innerHTML += '<b>per Capita</b><br />';
    div.innerHTML += 'by Census Tract<br />';
    div.innerHTML += '<br>';
    div.innerHTML += '<i style="background: #02472b"></i><p>$21,471.89-$402,056.13</p>';
    div.innerHTML += '<i style="background: #379e54"></i><p>$10,723.17-$21,471.88</p>';
    div.innerHTML += '<i style="background: #bce395"></i><p>$5,985.26-$10,723.16</p>';
    div.innerHTML += '<i style="background: #ffffe5"></i><p>$237.05-$5,985.25</p>';
    div.innerHTML += '<hr>';
    div.innerHTML += '<i style="background: #BFBCBB"></i><p>No Data</p>';
    
    // Return the Legend div containing the HTML content
    return div;
};

// Add Legend to Map
legend.addTo(map);