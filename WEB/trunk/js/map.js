(function() {
  window.onload = function() {
      var xyz = header.favorite_locations;
       //console.log(xyz.length); 
       for(var i =0;i < xyz.length;i++)
           {
    //           console.log(xyz[i]);
  //             $.each(xyz[i],function(bogus, element){
//		if(element.lat === null){alert('null');}
//		alert(element.lat +','+ element.lon);
  // });
           }
//console.log(var x = header.update_map.fav_locations);
var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    // Creating an object literal containing the properties 
    // you want to pass to the map  
    var options = {  
      zoom:8,  
      center: chicago,  
      mapTypeId: google.maps.MapTypeId.ROADMAP  
    };

    // Creating the map  
    var map = new google.maps.Map(document.getElementById('map'), options);
    
    // Creating an array which will contain the coordinates 
    // for New York, San Francisco and Seattle
    var places = [];

    // Adding a LatLng object for each city
    places.push(new google.maps.LatLng(41.850033, -87.1500523));
    places.push(new google.maps.LatLng(41.550033, -87.6500523));
    places.push(new google.maps.LatLng(42.850033, -88.6500523));

    
    // Creating a variable that will hold the InfoWindow object
    var infowindow;
    
    // Looping through the places array
    for (var i = 0; i < places.length; i++) {
      var shape = {
	  type: 'poly',
	  coord: [4,4, 29,4, 29,29, 22,29, 17,35, 16,35, 10,29,4,29,4,4]
	  }
	  var skull= new google.maps.MarkerImage('images/skull2.png',
	  new google.maps.Size(32,32)
	  );
	  
      // Adding the markers
      var marker = new google.maps.Marker({
        position: places[i],
        map: map,
        title: 'Friend number ' + i,
		icon: skull,
		shape: shape
		
      });
            
      // Wrapping the event listener inside an anonymous function 
      // that we immediately invoke and passes the variable i to.
      (function(i, marker) {

        // Creating the event listener. It now has access to the values of
        // i and marker as they were during its creation
        google.maps.event.addListener(marker, 'click', function() {
          
          if (!infowindow) {
            infowindow = new google.maps.InfoWindow();
          }
          
          // Setting the content of the InfoWindow
          infowindow.setContent('Friend Info:  ' + i);

          // Tying the InfoWindow to the marker 
          infowindow.open(map, marker);
          
        });

      })(i, marker);

    }
   
  };
})();
