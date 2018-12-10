var root_url = "http://comp426.cs.unc.edu:3001/";

$(document).ready(() => {
    $('#login_btn').on('click', () => {
	
	let user = $('#user').val();
	let pass = $('#pass').val();

	console.log(user);
	console.log(pass);

	$.ajax(root_url + "sessions",
	       {
		   type: 'POST',
		   xhrFields: {withCredentials: true},
		   data: {
		       user: {
			   username: user,
			   password: pass
		       }
		   },
		   success: () => {
		       build_homepage_interface();
		   },
		   error: (jqxhr, status, error) => {
		       alert(error);
		   }
	       });
    });
});

var build_homepage_interface = function() {
    let body = $('body');
    body.empty();

        //creates navigation bar
        body.append('<div class ="navbar"></div>');
        //Setting up the spaces
        $('.navbar').append('<ul class="nav"></ul>');
        $('.nav').append('<li class ="nav_buttons" id ="flights_button"></li>');
        $('.nav').append('<li class ="nav_buttons" id ="airlines_button"></li>');
        $('.nav').append('<li class ="nav_buttons" id ="airports_button"></li>');
        $('.nav').append('<li class ="nav_buttons" id ="home_button"></li>');
        $('.nav').append('<li class ="nav_element" id ="banner"></li>');
        //adding the elements
        $('#home_button').append('<button id="home"> Home </button>');
       
        //airports
        $('#airports_button').append('<button id="airports"> Airports </button>');
            $('#airports_button').click(function(){
                build_airports_interface();
            })
       
        //airlines
        $('#airlines_button').append('<button id="airlines"> Airlines </button>');
       
        $('#airlines_button').click(function(){
            build_airlines_interface();
        })
       
        //flights
        $('#flights_button').append('<button id="flights"> Flights </button>');
       
        $('#flights_button').click(function(){
            build_flights_interface();
        })
       
        //banner
        $('#banner').append('<h3 class="navTitle"> RDU Adjustment Portal </h3>');
       
    //Header Section of Home Page
    body.append('<div class="header_section" id="hp"></div>');
    let header = $('#hp');
    header.append('<h1 class="title"> Welcome to RDU Adjustment Portal </h1>');
    header.append('<h4 class="subtitle"> With this portal, you have the freedom to update the logs for Airports, Airlines, and Flights that are associated with RDU.</h4> ');
    
    //Body Content of Home Page
    body.append('<div class="row"></div>');
    let row = $('.row');
    row.append('<div class="column3" id="ap"><h3>Airports</h3></div>')
    $("#ap").append('<img src="Airports.jpg" alt="airports" style="width:90%" height:"80px">')
         $('#ap').click(function(){
             build_airports_interface();
         })

    row.append('<div class="column3" id="al"><h3>Airlines</h3></div>')
    $("#al").append('<img src="Airlines.jpg" alt="airlines" style="width:90%" height:"80px">')
    $('#al').click(function(){
        build_airlines_interface();
    })


    row.append('<div class="column3" id="fl"><h3>Flights</h3></div>')
    $("#fl").append('<img src="Flights.jpg" alt="flights" style="width:90%" height:"80px">')
          $('#fl').click(function(){
                build_flights_interface();
             })

};

var build_airlines_interface = function() {
    let body = $('body');
    var RDUnames=[], nonRDUnames=[];
    body.empty();
  //creates navigation bar
  body.append('<div class ="navbar"></div>');
  //Setting up the spaces
  $('.navbar').append('<ul class="nav"></ul>');
  $('.nav').append('<li class ="nav_buttons" id ="flights_button"></li>');
  $('.nav').append('<li class ="nav_buttons" id ="airlines_button"></li>');
  $('.nav').append('<li class ="nav_buttons" id ="airports_button"></li>');
  $('.nav').append('<li class ="nav_buttons" id ="home_button"></li>');
  $('.nav').append('<li class ="nav_element" id ="banner"></li>');
  //adding the elements
  $('#home_button').append('<button id="home"> Home </button>');
         $('#home_button').click(function(){
              build_homepage_interface();
            })
  //airports
  $('#airports_button').append('<button id="airports"> Airports </button>');
      $('#airports_button').click(function(){
          build_airports_interface();
      })
 
  //airlines
  $('#airlines_button').append('<button id="airlines"> Airlines </button>');
 
  $('#airlines_button').click(function(){
      build_airlines_interface();
  })
 
  //flights
  $('#flights_button').append('<button id="flights"> Flights </button>');
 
  $('#flights_button').click(function(){
      build_flights_interface();
  })
 
  //banner
  $('#banner').append('<h3 class="navTitle"> RDU Adjustment Portal </h3>');
   
  //Where Airline List is Created
  let RDU_list = $("<ul id='RDU_list'></ul>");
  let nonRDU_list = $("<ul id='nonRDU_list'></ul>");

  body.append('<div class="header_section" id="AL"></div>');
  let header = $('#AL');
    header.append('<h1 class="title"> Airline Adjustments </h1>');
    header.append('<h4 class="subtitle"> In this section, you can add the number of flights associated with each airline, modify which airlines are associated with RDU, and delete/create new airlines of interest.</h4> ');

    header.append('<div class="tools" id="ALT"></div>');
    $('.tools').append('<ul class="organize"></ul>');
  $('.organize').append('<li class ="org_buttons" id ="search_button"></li>');

  //adding the elements
  //Search
  $('#search_button').append('<input id = "search" type="text" placeholder="Search">');
  
      $('#search').keyup(function(){
        var query = $(this).val().toLowerCase();

        $.ajax(root_url + "airlines",
        {
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (airlines) => {
       
           if(listPresent) {
            $('.anames').remove();
           }

           let found;
           for (let i = 0; i <RDUnames.length; i++) {
               found =true;
               let q=0;
                
               while (q< query.length){
                
                let lowercase = RDUnames[i].toLowerCase()
                 if(query[q] != lowercase[q]) {
                    found=false;
                    break;
                 }
                 q = q+1;
            }

                if(found) {
                    RDU_list.append('<li class="anames" id='+i+'>' + RDUnames[i] + '</li>');
                }
           }

           for (let i = 0; i <nonRDUnames.length; i++) {
            found =true;
            let q=0;
             
            while (q< query.length){
             
             let lowercase = nonRDUnames[i].toLowerCase()
              if(query[q] != lowercase[q]) {
                 found=false;
                 break;
              }
              q = q+1;
         }

             if(found) {
                 nonRDU_list.append('<li class="anames" id='+i+'>' + nonRDUnames[i] + '</li>');
             }
        }
    
        listPresent=true;
        
     }


             
        });

      })
 

    body.append('<div class="row"></div>')
    //build RDU Airlines
    $('.row').append('<div class="c2" id="RDUlines" ></div>')
      $('#RDUlines').append('<h2> Airlines Associated with RDU </h2>');
      $('#RDUlines').append(RDU_list);
    //Build Non RDU airlines
    $('.row').append('<div class="c2" id="nonRDUlines" ></div>')
      $('#nonRDUlines').append('<h2> Airlines Not Associated with RDU </h2>');
      $('#nonRDUlines').append(nonRDU_list);
    
    
    
    //body.append(airline_list);
 
   
    let airline_add_div = $("<div>Name: <input id='new_airline_name' type='text'><br>" +
			    "<button id='make_airline'>Create</button></div>");

    body.append(airline_add_div);
    var listPresent = false;

    var createList = function() {
    
    $.ajax(root_url + "airlines",
	   {
	       type: 'GET',
	       xhrFields: {withCredentials: true},
	       success: (airlines) => {

            let r= 0, l=0;
		   for (let i=0; i<airlines.length; i++) {
               
               if(airlines[i].info == "RDU") {
                RDUnames[r] = airlines[i].name;
                
                r++;
               } else {
                nonRDUnames[l] = airlines[i].name;
              
                l++;
               }
           }
            RDUnames.sort();
            nonRDUnames.sort();
           if(listPresent) {
            $('.anames').remove();
           }

           for (let i=0; i<r; i++) {
             RDU_list.append('<li class="anames" id=RDU'+i+'>' + RDUnames[i] + '</li>');
             listPresent=true;
              } 
            
            for (let i=0; i<l; i++)  {
                nonRDU_list.append('<li class="anames" id='+i+'>' + nonRDUnames[i] + '</li>'); 
                listPresent=true;
              }
            }
         
           
        
	   });

    }  

    createList();

    // $('#make_airline').on('click', () => {
	// let airline_name = $('#new_airline_name').val();
    //     $(airline_name).css("text-transform", "uppercase");
    //     console.log(airline_name);
	// $.ajax(root_url + "airlines",
	//        {
	// 	   type: 'POST',
	// 	   data: {
	// 	       airline: {
	// 		   name: airline_name
	// 	       }
	// 	   },
	// 	   xhrFields: {withCredentials: true},
	// 	   success: (airline) => {
    //            //airline_list.append("<li>" + airline.name + "</li>");
    //            createList();
	// 	   }
	//        });
    // });
	

};

let create_flight_div = function(flight) {

  let fid = flight.id;
  var arrivalname;

  $.ajax(root_url + "airports", {
    type: 'GET',
    async:false,
    xhrFields: {withCredentials: true},
    success: function(airports) {
      for (var i=0; i<airports.length; i++) {
        if (airports[i].id === flight.arrival_id) {
          arrivalname = airports[i].name;
          //  console.log("matched");
          //  console.log(arrivalname);
        }
      }
    }
  })

  var fstatus;

  $.ajax(root_url + "instances?filter[flight_id]=" + encodeURIComponent(fid),  {
    type: 'GET',
    async: false,
    xhrFields: {withCredentials: true},
    success: function(instances) {
      if (instances.length == 0) {
        fdate = prompt("Date of flight: ");

        $.ajax(root_url + "instances", {
          type: 'POST',
          xhrFields: {withCredentials: true},
          data: {"instance":{
            "flight_id": fid,
            "date": fdate,
            "is_cancelled": false
          }},
          dataType: "json",
          success: function(response) {
            console.log(response);
          }
        });
      }
      for (var i=0; i<instances.length; i++) {
        if (instances[i].is_cancelled) {
          fstatus = "Cancelled";
        }
        else {
          fstatus = "On Time";
        }
      }
    }
  })

  let flightdiv = $('<div class="flight" id="fid_' + flight.id + '"></div>');
  console.log(arrivalname);
  flightdiv.append('<div class="dest">Destination: ' + arrivalname + '</div>');

  flightdiv.append('<div class="number">Flight Number: ' + flight.number + '</div>');
  flightdiv.append('<div class="deptime">Departure: ' + flight.departs_at + '</div>');
  flightdiv.append('<div class="arrtime">Arrival: ' + flight.arrives_at + '</div>');
  flightdiv.append('<div class="status">Status: ' + fstatus + '</div>');

  delaybtn = $('<button class="delay">Delay Flight</button>');
  delaybtn.click(function() {
    newdeptime = prompt("Enter new departure time:");
    newarrtime = prompt("Enter new arrival time");

    // flight.departs_at = newdeptime;
    // flight.arrives_at = newarrtime;

    $.ajax(root_url + 'flights/' + encodeURIComponent(fid), {
      type: 'PATCH',
      xhrFields: {withCredentials: true},
      data: {"flight":{
        "departs_at": newdeptime,
        "arrives_at": newarrtime
        }
      },
      dataType: "json",
      success: function(response) {
        console.log(response);
      }
    });
    //build_flights_interface();
    flightdiv.find(".deptime").replaceWith('<div class="deptime">Departure: ' + newdeptime + '</div>');
    flightdiv.find(".arrtime").replaceWith('<div class="arrtime">Arrival: ' + newarrtime + '</div>');
    flightdiv.find(".status").replaceWith('<div class="status">Status: Delayed</div>');
  })
  flightdiv.append(delaybtn);

  cancelbtn = $('<button class="cancel">Cancel Flight</button>');
  cancelbtn.click(function() {

    $.ajax(root_url + "instances?filter[flight_id]=" + encodeURIComponent(fid),  {
      type: 'GET',
      xhrFields: {withCredentials: true},
      success: function(instances) {
        console.log(instances);

        if (instances != null) {

          for (var i=0; i<instances.length; i++) {

            iid = instances[i].id;

            $.ajax(root_url + "instances/" + encodeURIComponent(iid), {
              type: 'PATCH',
              xhrFields: {withCredentials: true},
              data: {"instance":{
                "is_cancelled": true
              }},
              dataType: "json",
              success: function(response) {
                console.log(response);
              }
            });
          }
        }

        else {

          fdate = prompt("Date of flight: ");

          $.ajax(root_url + "instances", {
            type: 'POST',
            xhrFields: {withCredentials: true},
            data: {"instance":{
              "flight_id": fid,
              "date": fdate,
              "is_cancelled": true
            }},
            dataType: "json",
            success: function(response) {
              console.log(response);
            }
          });
        }

      }
    })

    flightdiv.find(".status").replaceWith('<div class="status">Status: Cancelled</div>');
  })

  flightdiv.append(cancelbtn);

  ontimebtn = $('<button class="ontime">On Time</button>');
  ontimebtn.click(function() {

    $.ajax(root_url + "instances?filter[flight_id]=" + encodeURIComponent(fid),  {
      type: 'GET',
      xhrFields: {withCredentials: true},
      success: function(instances) {
        console.log(instances);

        if (instances != null) {

          for (var i=0; i<instances.length; i++) {

            iid = instances[i].id;

            $.ajax(root_url + "instances/" + encodeURIComponent(iid), {
              type: 'PATCH',
              xhrFields: {withCredentials: true},
              data: {"instance":{
                "is_cancelled": false
              }},
              dataType: "json",
              success: function(response) {
                console.log(response);
              }
            });
          }
        }

        else {

          fdate = prompt("Date of flight: ");

          $.ajax(root_url + "instances", {
            type: 'POST',
            xhrFields: {withCredentials: true},
            data: {"instance":{
              "flight_id": fid,
              "date": fdate,
              "is_cancelled": false
            }},
            dataType: "json",
            success: function(response) {
              console.log(response);
            }
          });
        }

      }
    })

    flightdiv.find(".status").replaceWith('<div class="status">Status: On Time</div>');
  })

  flightdiv.append(ontimebtn);

  return flightdiv;
 }


