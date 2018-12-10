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
    var find_RDU = function() {
        $.ajax(root_url + "airports",
        {
             type: 'GET',
             xhrFields: {withCredentials: true},
            success: (airports) => {
               for (let i = 0; i < airports.length; i++) {
                   
                   if (airports[i].code == "RDU") {
                        RDU_airport = airports[i];
                       // console.log(RDU_airport);
                       break;
                   }
                }
            }

      });

    }
    let body = $('body');
    var RDUnames=[], nonRDUnames=[];
    var RDUairlines=[], nonRDUairlines=[];
    //finds RDU AIrport
    var RDU_airport;
    find_RDU();
  
    
    
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
    $('.organize').append('<li class ="org_buttons" id="tools"> Tools: </li>');
    $('.organize').append('<li class ="org_buttons"><input id = "search" type="text" placeholder="Search for Airlines"></li>');
    $('.organize').append('<li class="org_buttons"><button class="org_buttons" id="new_airline"> Add New Airline </button></li>');
    $('.organize').append('<li class="org_buttons"><button class="org_buttons" id="refresh_airline"> Back to Airline List </button></li>');

    $('#refresh_airline').click(function(){
        createList();
    })
    $("#new_airline").click(function(){
        $('#search').css('display', 'none')
        $('#new_airline').css('display','none');
        $('.row').remove('.row');

        body.append('<div class=form></div>');
        $('.form').append('<div class="head" id=instructions></div>');
        $('#instructions').append("<h2> Create the Airline</h2>")
        $('.form').append('<div class="section" id=name></div>');
        $("#name").append('<h3 class="classification" id ="nametitle">Input Airline Name</h3>');
        $("#nametitle").append('<input id = "nameinput" type="text" placeholder="Name of Airline"></input>');

       
        $('.form').append('<div> <button class="create"> Create</button> <button class="cancel"> Cancel </button></div>');
       

       $('.cancel').click(function(){
        $('.form').remove('.form');
        $('.row').css("display", "block");
        
       })
       $('.create').click(function(){
           let nameinput = body.find("#nameinput");
            
           let name = $(nameinput).val();
           
            $('.form').remove('.form');
           make_airline(name);

       })
       $('.cancel').click(function(){
        
         $('.form').remove('.form');
            createList();

    })
        
    })
   
  //adding the elements
  //Search
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
 

   

 
   
    var listPresent = false;
    var createList = function() {
        $('#search').css('display', 'inline')
        $('#new_airline').css('display','inline');
         RDU_list = $("<ul id='RDU_list'></ul>");
         nonRDU_list = $("<ul id='nonRDU_list'></ul>");
         $(".form").remove(".form");
        body.append('<div class="row"></div>')
        console.log("created List")
    $('.anames').remove('.anames');
    //builds RDU side
    $('.row').append('<div class="c2" id="RDUlines" ></div>')
    $('#RDUlines').append('<h2> Airlines Associated with RDU </h2>');
    $('#RDUlines').append(RDU_list);
    //Build Non RDU airlines
        $('.row').append('<div class="c2" id="nonRDUlines" ></div>')
         $('#nonRDUlines').append('<h2> Airlines Not Associated with RDU </h2>');
        $('#nonRDUlines').append(nonRDU_list);
    let ArrivalList =[];
    let DepartList =[];
    let nonRDUFlights = [];
    RDUairlines = [];
    nonRDUairlines = [];
    RDU_list
    let a = 0, d=0, n = 0;

    ///// Having duplicate airlines needs to be fixed!!!!!!!



    $.ajax(root_url + "flights",
	   {
	       type: 'GET',
	       xhrFields: {withCredentials: true},
	       success: (flights) => {
            for (let i = 0; i < flights.length; i++) {
                if (flights[i].arrival_id == RDU_airport.id) {
                    ArrivalList[a] =flights[i];
                    a++;
                } else if ( flights[i].departure_id == RDU_airport.id) {
                    DepartList[d] = flights[i];
                    d++;
                } else {
                    nonRDUFlights[n] =flights[i];
                    n++;
                }
            }
            

            //Find Airlines
            $.ajax(root_url + "airlines",
	        {
	       type: 'GET',
	       xhrFields: {withCredentials: true},
	       success: (airlines) => {
            
               let r = 0, x = 0;
               ArrivalList[0];
            for (let i = 0; i < airlines.length; i++) {
                //Checking Arrival List
                for (let a = 0; a < ArrivalList.length; a++) {
                    if (ArrivalList[a].airline_id == airlines[i].id) {
                        let notInList = true;
                        if (r > 0) {
                            //console.log("in");
                            let num = 0;
                             while (num < RDUairlines.length && notInList) {
                                if(airlines[i].id == RDUairlines[num].id) {
                                    notInList = false;
                                    }
                                    num++;
                            }
                        }
                        if(notInList) {
                            RDUairlines[r] = airlines[i]
                            RDUnames[r] = airlines[i].name;
                            console.log(RDUnames[r] + "RDU airlines arriving");
                            r++;

                        }
                    }
                }

            }  

            //departing   
            for (let i = 0; i < airlines.length; i++) {
                //Departure List
                for (let a = 0; a < DepartList.length; a++) {
                    if (DepartList[a].airline_id == airlines[i].id) {
                        let notInList = true;
                        if (r > 0) {
                            let num = 0;
                             while (num < RDUairlines.length && notInList) {
                                if(airlines[i].id == RDUairlines[num].id) {
                                    console.log("duplicate found");
                                    notInList = false;
                                    }
                                    num++;
                            }
                        }

                            
                            if(notInList) {
                                RDUairlines[r] = airlines[i]
                                RDUnames[r] = airlines[i].name;
                                console.log(RDUnames[r] + "RDU airlines departing");
                                x++;
                               }

                    }
                }
            }
            x=0;
            for (let i = 0; i < airlines.length; i++) {
                //not RDU List
                for (let a = 0; a < RDUairlines.length; a++) {
                         var notRDU = true
                       
                            if (RDUairlines[a].id == airlines[i].id) {
                                notRDU = false;
                                break;
                                }
                            }

                            if(notRDU) {
                                nonRDUairlines[x] = airlines[i]
                                nonRDUnames[x] = airlines[i].name;
                                //console.log(nonRDUnames[x] + "nonRDU airlines");
                                
                                x++;
                               }

                    
                
            }
            
            RDUnames.sort();
            nonRDUnames.sort();
            for (let y =0; y < RDUairlines.length; y++) {
                for (let t =0; t < RDUnames.length; t++) {
                    if (RDUnames[y] == RDUairlines[t].name) {
                        $('#RDU_list').append('<li class="anames" id=' +RDUairlines[t].id+'><p class="names">' + RDUnames[y] + '</p></li');
                    }
                }  
            }

            for (let y =0; y < nonRDUairlines.length; y++) {
                for (let t =0; t < nonRDUnames.length; t++) {
                    if (nonRDUnames[y] == nonRDUairlines[t].name) {
                        $('#nonRDU_list').append('<li class="anames" id=' +nonRDUairlines[t].id+'><p class="names">' + nonRDUnames[y] + '</p></li');
                    }
                }  
            }

            $('.names').click(function(){
                let pt = $(this).parent()
                if ($(pt).attr('class') != 'anames clicked'){
                
                $(pt).addClass('clicked');
                airlineID =$(pt).attr('id')
                $(this).css('background-color', "lightblue");
                $(this).css('font-weight', 'bold');
                $(pt).append('<ul class=airline_info id=info_'+ airlineID+ '></ul')
                $('#info_' +airlineID).css('font-weight', 'normal');
                let depart = 0;
                let arrival = 0;
                for (let i = 0; i < DepartList.length; i++) {
                    if(DepartList[i].airline_id == airlineID) {
                        depart++;
                        console.log(depart);
                    }
                }

                for (let i = 0; i < ArrivalList.length; i++) {
                    if(ArrivalList[i].airline_id == airlineID) {
                        arrival++;
                        console.log(depart);
                    }
                }
                $('#info_' +airlineID).append('<li class="info_title" id="arriving">Number of Arriving Flights to RDU: ' + depart  + '</li>');
                $('#info_' +airlineID).append('<li class="info_title" id="departing">Number of Departing Flights from RDU: ' + arrival + '</li>');
                $('#info_' +airlineID).append('<li><button class="info_button" id="addRDUFlight"> Add a Flight to/from RDU </button></li>');

         
            
            
            
            } else {
                $(this).css('background-color', "white");
                $(this).css('font-weight', 'normal');
                $(pt).removeClass("clicked");
                
                var remove_this = this.firstChild.nextSibling;
                this.nextSibling.remove(remove_this);
            }
            console.log($($(this).find('#addRDUFlight')).innerHTML + "WHAY YOU NO WORK");
         

           $('#addRDUFlight') .click(function() {
               $('#search').css('display', 'none')
               $('#new_airline').css('display','none');
               
            $('.form').remove(".form");
            let parent = $($($(this).parent()).parent()).parent();
            let al_id = $(parent).attr('id');
            let arr_id, dep_id, arrival_port, departure_port, arr_time, dep_time, flight_number;
            console.log(RDU_airport.id);
            
            $('.row').remove('.row');
            console.log(parent);
            body.append('<div class="form"></form');
           // $('form').append('<div class="RDUflight"></div>');
            $('.form').append('<h2> Is this Flight Going to or From RDU');
            $('.form').append('<div class="form_div"></div>');
            $('.form_div').append('<input  type="radio"  id ="yes" name="yes_no" value="Yes"> <p class="radio">Yes </p>');
            $('.form_div').append('<input type="radio" id="no" name="yes_no" value="No"> <p class="radio"> No</p>');
            $('.form_div').append('<button class="create" id="s"> Submit </button');

            $("#s").click(function(){
                var votes = document.getElementsByName('yes_no');
                let value;

                for(let u= 0; u <votes.length; u++) {
                    if(votes[u].checked) {
                        value=votes[u].value;
                    }
                }
                $('.form').remove('.form');
                if(value =="Yes") {
                    body.append('<div class="form"></form');
                    $('.form').append('<h2> Is this Flight Arriving to or Departing From RDU');
                    $('.form').append('<div class="form_div"></div>');
                    $('.form_div').append('<input type="radio"  id ="yes" name="Arr_Dep" value="Arr"> <p class="radio"> Arriving </p>');
                    $('.form_div').append('<input type="radio" id="no" name="Arr_Dep" value="Dep"> <p class="radio"> Departing</p>');
                    $('.form_div').append('<button class="create" id="s"> Submit </button');

                    $("#s").click(function(){
                        let arr=true;
                        var votes = document.getElementsByName('Arr_Dep');
                        let value;
        
                        for(let u= 0; u <votes.length; u++) {
                            if(votes[u].checked) {
                                value=votes[u].value;
                            }
                        }
                        if (value == "Arr") {
                            arr_id = RDU_airport.id;
                            arrival_port =RDU_airport.name;
                        } else {
                            dep_id = RDU_airport.id;
                            departure_port =RDU_airport.name;
                            arr=false;
                        }

                        $('.form').remove('.form');
                        body.append('<div class="form"></form');
                        if (arr) {
                        $('.form').append('<h2> Which Airport is this flight departing from?</h2>');
                        } else {
                            $('.form').append('<h2> Which Airport is this flight going to?</h2>');
                        }
                        //Add search and ajax to get airports
                        $('.form').append('<div class="form_div"></ul>');
                        $('.form_div').append('<input id = "sa" type="text" placeholder="Search for Airports"></input>')
                        $('.form_div').append('<ul class="ap"></ul>');
                        //search function
                        $('#sa').keyup(function(){
                            var query = $(this).val().toLowerCase();
                    
                            $.ajax(root_url + "airports",
                            {
                                type: 'GET',
                                xhrFields: {withCredentials: true},
                                success: (airports) => {
                           
                               $('.apnames').remove('.apnames');
                    
                               let found;
                               for (let i = 0; i < airports.length; i++) {
                                   found =true;
                                   let q=0;
                                    
                                   while (q< query.length){
                                    
                                    let lowercase = airports[i].name.toLowerCase()
                                     if(query[q] != lowercase[q]) {
                                        found=false;
                                        break;
                                     }
                                     q = q+1;
                                }
                    
                                    if(found) {
                                        
                                        $('.ap').append('<li class="apnames" id='+airports[i].id+'>' + airports[i].name + '</li>');
                                        $('#' + RDU_airport.id).remove('#' + RDU_airport.id);
                                    }

                                 
                               }

                               $('.apnames').click(function(){
                                if(arr) {
                                    dep_id = $(this).attr('id');
                                    departure_port = this.innerHTML;
                                } else {
                                    console.log(this);
                                    arr_id = $(this).attr('id')
                                    arrival_port = this.innerHTML;
                                }

                                

                               $('.form').remove('.form');
                               body.append('<div class ="form"></div>');
                               $('.form').append('<h2> Please Enter in Arrival and Departure Times and Flight Number</h2>');
                               $('.form').append('<div class="form_div"></div>');
                               $('.form_div').append('<div class="departure_div"></div>');
                                    $('.departure_div').append('<h3>Departing from ' + departure_port + ' at: </h3>')
                                    $('.departure_div').append('<input class="last_info" id="dep_time" type="datetime-local" name="dept_time">')
                               $('.form_div').append('<div class="arrival_div"></div');
                                     $('.arrival_div').append('<h3>Arriving to ' + arrival_port+ ' at: </h3>')
                                     $('.arrival_div').append('<input class="last_info" id="arr_time" type="datetime-local" name="dept_time">')
                               $('.form_div').append('<div class="flightnumber_div"></div');
                                    $('.flightnumber_div').append('<h3>Enter Flight Number:  </h3>')
                                    $('.flightnumber_div').append('<input class="last_info" id="flightnumber" type="text" name="flight_number">');
                                $('.form_div').append('<button class="create" id="create_this_flight"> Create Flight </button>');

                                $('#create_this_flight').click(function(){
                                    dep_time = $('#dep_time').val();
                                    arr_time = $('#arr_time').val();
                                    flight_number = $('#flightnumber').val()
                                    console.log(dep_time == "");
                                    if(dep_time == "" || arr_time == "" || flight_number == "") {
                                        alert("Please fill in Info");
                                    } else if (dep_time > arr_time) {
                                        alert("Departure Time Cannot Be After Arrival Time");
                                    } else{

                                        $.ajax(root_url + "flights",
                                        {
                                        type: 'POST',
                                        data: {
                                            flight: {
                                            departs_at: dep_time,
                                            arrives_at: arr_time,
                                            number: flight_number,
                                            departure_id: dep_id,
                                            arrival_id: arr_id,
                                            airline_id: al_id
                                            },
                                        },
                                        xhrFields: {withCredentials: true},
                                        success: (flights) => {

                                            $('.form').remove('.form');
                                            createList();
                                            
                                        }
                                        });
                                    
                                 }
  


                                    
                                    
                                })




                            })
                    
                            
                         }
                    
                    
                                 
                            });
                    
                          })
                     
                        
                        
                    })
                   
                } else {
                    $(body).append('<h2 class="filler" >Sorry you cannot add flights unaffilliated with RDU</h2>');
                    $(body).append('<button class="cancel"> Cancel </button>');
                    $('.cancel').click(function(){
                        $('.filler').remove('.filler');
                        $('.cancel').remove('.cancel');
                        createList();
                    })
                }
            })
           
           })
            })

    
                     
        }
        
    });
     
        }
    });

    

 }
            
                      

  

    createList();
   
  var make_airline = function(name) {
    let airline_name = name;
        
	$.ajax(root_url + "airlines",
	       {
		   type: 'POST',
		   data: {
		       airline: {
               name: airline_name
		       }
		   },
		   xhrFields: {withCredentials: true},
		   success: (airlines) => {
             //  make_flight (airline_name);
               
		   }
           });
         createList();
       
    }
 

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