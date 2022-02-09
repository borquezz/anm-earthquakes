# Geonames Earthquake Finder
The following project is a website designed to search for earthquakes in a specific area, using the GeoNames Recent Earthquake WebService (http://www.geonames.org/export/JSONwebservices.html#earthquakesJSON).

The webpage takes a city/location name as an input, fetches the earthquake data from Geonames and displays it using the Google Maps API. (https://developers.google.com/maps/documentation/javascript/overview?hl=es-419).

## Installation
To download, visualize and edit the project, you can simply clone the repository by typing:

    $ git clone https://github.com/borquezz/anm-earthquakes.git

After installing, don't forget to type <strong>npm install</strong> to install all the project dependencies.

## How To use
The project is almost ready to use as it is. However, due to privacy reasons, the Google Maps API Key was removed. In the header of <strong>index.html</strong>, there is a line that looks like this:

    <!-- Google Maps API -->
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
    
You need to enter your own Google API Key where it says <strong>YOUR_API_KEY</strong>. The API Key can be obtained for free in https://developers.google.com/maps/documentation/javascript/get-api-key

After that, you'll be good to go. You can open <strong>index.html</strong> with a local server in your machine and use it at will!
  
## Features
### Search city/location
Right below the map, you should see a textbox. In there, you can type any city/location, press enter (or the magnifying glass icon) and the map should show the 10 largest earthquakes in said city/location according to Geonames API.

### Search this location
Another alternative to the searchbox, is to freely zoom in/out and move the map to select a region. When you press the "Search this location" button, located right besides (desktop) or below (mobile) the searchbox, the Geonames API will be called to fetch the 10 largest earthquakes in the current map viewport.

### Search history
Each time you perform a search using the searchbox, your search will be stored in the map object. If you click on the searchbox again you should see your past searches as an option. This history is deleted with each page reload.

### World's largest earthquakes
At the end of the webpage, there's a section where you can see the 10 largest earthquakes during the past 12 months, and their data. You can also access this section via the "Largest Earthquakes" section in the navbar. On each earthquake, if you click on the button that says "show in map", you can see a marker to showcase the earthquake location and its data.


