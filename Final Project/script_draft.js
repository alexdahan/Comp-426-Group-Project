var root_url = "http://comp426.cs.unc.edu:3001/";
var weather_map_key = '15fe6bd5574e8c58006ec0dc1706d482'; 

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

const build_navbar = function (title, subtitle) {
    const body = $('body');
    body.empty();

    //creates navigation bar
    body.append('<div class ="navbar"></div>');
    //Setting up the spaces
    $('.navbar').append('<ul class="nav"></ul>');

    const nav = $('.nav');
    nav.append('<li class ="nav_buttons" id ="flights_button"></li>');
    nav.append('<li class ="nav_buttons" id ="airlines_button"></li>');
    nav.append('<li class ="nav_buttons" id ="airports_button"></li>');
    nav.append('<li class ="nav_buttons" id ="home_button"></li>');
    nav.append('<li class ="nav_element" id ="banner"></li>');
    //adding the elements
    $('#home_button').append('<button id="home"> Home </button>');

    //airports
    const airports = $('#airports_button');
    airports.append('<button id="airports"> Airports </button>');
    airports.click(function () {
        build_airports_interface();
    });

    //airlines
    const airlines = $('#airlines_button');
    airlines.append('<button id="airlines"> Airlines </button>');

    airlines.click(function () {
        build_airlines_interface();
    });

    //flights
    const flights = $('#flights_button');
    flights.append('<button id="flights"> Flights </button>');

    flights.click(function () {
        build_flights_interface();
    });

    //banner
    $('#banner').append('<h3 class="navTitle"> RDU Adjustment Portal </h3>');

    //Header Section of Home Page
    body.append('<div class="header_section" id="hp"></div>');
    let header = $('#hp');
    header.append('<h1 class="title">' + title + '</h1>');
    header.append('<h4 class="subtitle">' + subtitle + '</h4> ');

    return body;
};

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

var build_flights_interface = function() {

  let body = $('body');
  body.empty();

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

  body.append('<div class="header_section" id="FL"></div>');
  let header = $('#FL');
  header.append('<h1 class="title"> Flight Adjustments </h1>');
  header.append('<h4 class="subtitle"> In this section, you can modify the status of a flight.</h4>');

  let flightlist = $('<div class="qlist"></div>');
  body.append(flightlist);

  $.ajax(root_url + "flights?filter[departure_id]=148709", {
    type: 'GET',
    xhrFields: {withCredentials: true},
    success: function(flights) {
      console.log(flights);

      for (var i=0; i<flights.length; i++) {
        let flightdiv = create_flight_div(flights[i]);
        let fid = flights[i].id;
        flightlist.append(flightdiv);
      }

    }

  })

}

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

const build_airports_interface = function () {
    const title = 'Airport Adjustments';
    const subtitle = 'In this section, you can add the create, edit, and delete the airports for each airline.';

    const body = build_navbar(title, subtitle);
    const main_content = $('<div class="airports-container"></div>');
    const form_container = $('<div id="airports-left"></div>');
    const airport_container = $('<div id="airports-right"></div>');

    main_content.append(form_container);
    main_content.append(airport_container);

    body.append(main_content);

    reset_airports();
};

const reset_airports = function () {
    init_airport_form();
    create_airports_list();
};

const init_airport_form = function () {
    const form_container = $('#airports-left');
    form_container.empty();

    const container = $('<div class="airports-create-container"></div>');

    const create = $('<button>Create Airport</button>');

    create.on('click', function () {
        create_airport_form('POST');
    });

    container.append($('<p>Click here to create a new airport:</p>'));
    container.append(create);

    form_container.append(container);
};

const create_airport_form = function (method) {
    const form_container = $('#airports-left');
    form_container.empty();

    const main_form = $('<form class="form"></form>');

    const airport_id = $('<input type="hidden" id="airports-id" disabled />');
    const airport_name = $('<input id="airports-name" type="text" />');
    const airport_code = $('<input id="airports-code" type="text" />');
    const airport_lat = $('<input id="airports-lat" type="text" />');
    const airport_long = $('<input id="airports-long" type="text" />');
    const airport_city = $('<input id="airports-city" type="text" />');
    const airport_info = $('<input id="airports-info" type="text" />');

    const input_names = ['Name', 'Code', 'Latitude', 'Longitude', 'City', 'Info'];
    const inputs = [
        airport_name, airport_code, airport_lat, airport_long, airport_city,
         airport_info
    ];

    main_form.append(airport_id);

    for (let i = 0; i < inputs.length; i++) {
        const input_container = $('<div class="airport-inputs"></div>');

        const name = input_names[i];
        const input = inputs[i];

        input_container.append($('<h4>' + name + ':</h4>'));
        input_container.append(input);

        main_form.append(input_container);
    }

    const buttons_container = $('<div class="airports-button-container"></div>');

    const submit = $('<button>Submit</button>');
    const cancel = $('<button>Cancel</button>');

    submit.on('click', function () {
        submit_airport(method);
    });
    cancel.on('click', init_airport_form);

    buttons_container.append(submit);
    buttons_container.append(cancel);

    main_form.append('<br />');
    main_form.append(buttons_container);

    main_form.on('submit', function (e) {
        e.preventDefault();
    });

    form_container.append(main_form);
    return inputs;
};

const create_airports_list = function () {
    const url = root_url + 'airports';

    $.ajax(url, {
        type: 'GET',
        xhrFields: {withCredentials: true},
        success: function (response) {
            create_airports_list_helper(response);
        },
        error: function (response) {
            alert(JSON.stringify(response));
            console.log(response);
        }
    });
};

const create_airports_list_helper = function (airports) {
    const table_header_names = ['', 'Name', 'Code', 'Latitude', 'Longitude', 'City', 'Info'];

    const airport_container = $('#airports-right');
    airport_container.empty();

    const main_table = $('<table></table>');
    const table_header_row = $('<tr></tr>');

    for (const name of table_header_names) {
        table_header_row.append($('<th>' + name + '</th>'));
    }

    table_header_row.append($('<th></th>'));
    main_table.append(table_header_row);

    for (const airport of airports) {
        create_airport_list_item(main_table, airport);
    }

    airport_container.append(main_table);

    set_weather_helper(airports, 0);
};

const create_airport_list_item = function (main_table, airport) {
    const table_header_names = ['Name', 'Code', 'Latitude', 'Longitude', 'City', 'Info'];
    const airport_id = airport.id;

    const new_row = $('<tr></tr>');
    const buttons = $('<td class="airports-list-buttons"></td>');

    const edit_button = $('<button>Edit</button>');
    const delete_button = $('<button>Delete</button>');

    const weather_map_datum = $('<td>' +
        '<span id="airports-weather-' + airport_id + '" class="airports-dot"></span>' +
        '</td>');

    new_row.append(weather_map_datum);

    for (let header of table_header_names) {
        header = header.replace(' ', '_').toLowerCase();

        let datum = '';
        if (airport.hasOwnProperty(header) && airport[header]) {
            datum = airport[header];
        }

        new_row.append('<td>' + datum + '</td>');
    }

    edit_button.on('click', function () {
        edit_airport(airport);
    });

    delete_button.on('click', function () {
        delete_airport(airport.id);
    });

    buttons.append(edit_button);
    buttons.append(delete_button);

    new_row.append(buttons);
    main_table.append(new_row);
};

const get_airport_helper = function () {
    const airport_name = $('#airports-name');
    const airport_code = $('#airports-code');
    const airport_lat = $('#airports-lat');
    const airport_long = $('#airports-long');
    const airport_city = $('#airports-city');
 
    const airport_info = $('#airports-info');

    return {
        name: airport_name.val(), code: airport_code.val(),
        latitude: airport_lat.val(), longitude: airport_long.val(),
      
        user_id: 1
    };
};

const set_airport_helper = function (airport) {
    const airport_id = $('#airports-id');
    const airport_name = $('#airports-name');
    const airport_code = $('#airports-code');
    const airport_lat = $('#airports-lat');
    const airport_long = $('#airports-long');
    const airport_city = $('#airports-city');
    const airport_info = $('#airports-info');

    airport_id.val(airport.id);
    airport_name.val(airport.name);
    airport_code.val(airport.code);
    airport_lat.val(airport.latitude);
    airport_long.val(airport.longitude);
    airport_city.val(airport.city);
   
    airport_info.val(airport.info);
};

const delete_airport = function (airport_id) {
    const url = root_url + 'airports/' + airport_id;

    $.ajax(url,
        {
            type: 'DELETE',
            xhrFields: {withCredentials: true},
            success: () => {
                reset_airports();
            }, error: (error) => {
                alert(JSON.stringify(error));
                console.log(error);
            }
        });
};

const edit_airport = function (airport) {
    create_airport_form('PUT');

    set_airport_helper(airport);

    const airport_name = $('#airports-name');
    const airport_code = $('#airports-code');

    airport_name.prop('disabled', true);
    airport_code.prop('disabled', true);
};

const submit_airport = function (method) {
    let url = root_url + 'airports';
    if (method === 'PUT') {
        const airport_id = $('#airports-id');
        url += '/' + airport_id.val();
    }

    const airport = get_airport_helper();
    airport.updated_at = new Date();

    $.ajax(url,
        {
            type: method,
            xhrFields: {withCredentials: true},
            data: {
                airport: airport
            },
            success: () => {
                reset_airports();
            }, error: (error) => {
                alert(error);
            }
        });
};

const create_weather_map_query = function (airport) {
    const lat = airport.latitude;
    const long = airport.longitude;
    const city = airport.city;

    if (lat && long) {
        return 'lat=' + lat + '&lon=' + long + '&appid=' + weather_map_key;
    } else if (city) {
        return 'q=' + city + ',us&appid=' + weather_map_key;
    }

    return undefined;
};

const set_weather_helper = function (airports, index) {
    if (index >= airports.length) {
        return;
    }

    get_weather_right_now(airports, index);
};

const get_weather_right_now = function (airports, index) {
    // Zip is more accurate if we can use it
    //https://api.openweathermap.org/data/2.5/weather?zip=04462,us&appid=15fe6bd5574e8c58006ec0dc1706d482
    const airport = airports[index];
    const weather_map_datum = $('#airports-weather-' + airport.id);

    const next = function () {
        set_weather_helper(airports, index + 1);
    };

    const query = create_weather_map_query(airport);
    if (!query) {
        next();
        return;
    }

    const url = 'https://api.openweathermap.org/data/2.5/weather?' + query;
    $.ajax(url, {
        type: 'GET',
        success: function (response) {
            const weather = response.weather[0].main;
            if (weather === 'Snow') {
                // Check if prediction or happening currently
                get_weather_forecast(airports, index);
            } else {
                weather_map_datum.css('background-color', 'green');
                next();
            }
        },
        error: function (error) {
            console.log(error);
            next();
        }
    });
};

const get_weather_forecast = function (airports, index) {
    const airport = airports[index];
    const weather_map_datum = $('#airports-weather-' + airport.id);

    const next = function () {
        set_weather_helper(airports, index + 1);
    };

    const query = create_weather_map_query(airport);
    if (!query) {
        next();
        return;
    }

    const url = 'https://api.openweathermap.org/data/2.5/forecast?' + query;
    $.ajax(url, {
        type: 'GET',
        success: function (response) {
            const weather_list = response.list;
            for (const data in weather_list) {
                const time_right_now = new Date();
                const prediction_time = new Date(data.dt);

                const weather = data.weather.main;

                if (weather === 'Snow') {
                    if (prediction_time > time_right_now) {
                        // Output yellow dot
                        weather_map_datum.css('background-color', 'yellow');
                    } else {
                        // Output red dot
                        weather_map_datum.css('background-color', 'red');
                    }
                } else {
                    // Green dot
                    weather_map_datum.css('background-color', 'green');
                }

                next();
            }
        },
        error: function (error) {
            console.log(error);
            next();
        }
    });
};