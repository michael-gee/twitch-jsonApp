function getStreamers() {
  
  var streamers = [
    "forsenlol",
    "freecodecamp",
    "sodapoppin",
    "ice_poseidon",
    "imaqtpie",
    "towelliee",
    "reckful",
    "emilycc",
    "watchmeblink1",
    "woundman",
    "vallcor",
    "rioting_ruby",
    "sjow",
    "kaceytron",
    "gdhayward",
    "summit1g",
    "lirik"
];
  
streamers.sort();
  
  // "A" FOR LOOP
  for(var a = 0; a < streamers.length; a++) {
    //API URL to get Channel Info
    var twitchDataURL = 'https://api.twitch.tv/kraken/channels/' + streamers[a] + "?client_id=5d4ufb3tx5irs1dmbv2j3jakdv14xqd";
    
    //AJAX Call to Twitch to get Channel Info
     $.ajax({
      type: "GET",
      url: twitchDataURL,
      headers: {
        "Client-ID": "5d4ufb3tx5irs1dmbv2j3jakdv14xqd"
      },
      success: function(channelData){
        
      //Gets Name from previous JSON response
      var twitchOnlineURL = 'https://api.twitch.tv/kraken/streams/' + channelData.name + "?client_id=5d4ufb3tx5irs1dmbv2j3jakdv14xqd";
      
    //Ajax call to see if streamer is online
    $.ajax({
      type: "GET",
      url: twitchOnlineURL,
      headers: {
        "Client-ID": "5d4ufb3tx5irs1dmbv2j3jakdv14xqd"
      },
      success: function(onlineData){

      if(onlineData.stream !== null) {
        displayOnline(channelData);
     } else {
       displayOffline(channelData);
     }    
        
      } // 2nd ajax success function bracket end
       
    }); // 2nd ajax call end
        
  } // success function bracket end
       
}); // MAIN DATA ajax bracket end
    
} // "A" for loop Bracket end
  
} // getStreamers() bracket end

getStreamers();

// displayOnline function
function displayOnline(channelData) {
  var resultHTML = "";

  // Streamer Logo Div
    resultHTML += "<a class='online-link' href='https://www.twitch.tv/" + channelData.name + "' target='_blank'>";
    resultHTML += "<div class='online-user'>";
  resultHTML += "<div class='twitch-result'>";
     
  // Streamer Profile Image
  resultHTML += "<div class='streamer-logo'>";
  resultHTML += "<img src='" + channelData.logo + "' alt='" + channelData.name + " logo'>";
  resultHTML += "</div>";

  // Streamer Name Div
  resultHTML += "<div class='streamer-name'>";
  resultHTML += "<p>" + channelData.display_name + "</p>";
  resultHTML += "</div>";

  //Streamer Status Div
  resultHTML += "<div class='streamer-status'>";
  resultHTML += "<p class='online-stream-status' style='padding-top: 15px'>" + channelData.status + "</p>";
  resultHTML += "</div>";
 
  resultHTML += "</div>";
  resultHTML += "</div></a>";

  $(".online").append(resultHTML);
}

// displayOffline function
function displayOffline(channelData) {
  var resultHTML = "";

  // Streamer Logo Div
    resultHTML += "<a class='offline-link' href='https://www.twitch.tv/"+channelData.name+"' target='_blank'>";
    resultHTML += "<div class='offline-user'>";
  resultHTML += "<div class='twitch-result'>";
  
  // Streamer Profile Image
  resultHTML += "<div class='streamer-logo'>";
  resultHTML += "<img src='" + channelData.logo + "' alt='" + channelData.name + " logo'>";
  resultHTML += "</div>";

  // Streamer Profile Name Div
  resultHTML += "<div class='streamer-name'>";
  resultHTML += "<p>" + channelData.display_name + "</p>";
  resultHTML += "</div>";

  //Streamer Profile Status Div
  resultHTML += "<div class='streamer-status' style='padding-top:30px'>";
  resultHTML += "<p>Offline</p>";
  resultHTML += "</div>";
 
  resultHTML += "</div>";
  resultHTML += "</div></a>";;

  $(".offline").append(resultHTML);
}

// BUTTON FUNCTIONS
//ALL BUTTON
$("#all-button").on("click", function(){
  $(".online-user").css("display", "block");
  $(".offline-user").css("display", "block");
});

//ONLINE BUTTON
$("#online-button").on("click", function(){
  $(".online-user").css("display", "block");
  $(".offline-user").css("display", "none");
});

//OFFLINE BUTTON
$("#offline-button").on("click", function(){
  $(".online-user").css("display", "none");
  $(".offline-user").css("display", "block");
});
