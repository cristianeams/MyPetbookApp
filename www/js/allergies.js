// ALLERGIES PAGE JS
//---------------------------------------------------------------------- 

document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);


function onDeviceReady() {

//----------------------
// Initialize Firebase
	var config = {
	    apiKey: "AIzaSyDyRm3-_rS5aGpattuN-cT3VfxhtYirTfk",
	    authDomain: "mypetbookapp-4d393.firebaseapp.com",
	    databaseURL: "https://mypetbookapp-4d393.firebaseio.com",
	    projectId: "mypetbookapp-4d393",
	    storageBucket: "mypetbookapp-4d393.appspot.com",
	    messagingSenderId: "353025423183"
	};
	firebase.initializeApp(config);
	
	// Save ALLERGIE Data Button from New Allergie Screen

	$('#save-allergie-btn').click(function(){
		var saveAllergieData = {
			allergicto: $('#new-allergie-name').val(),
    }

	// code to create an allergie id on database
	var allergieId = firebase.database().ref().child('users/pet/allergies').push().key;

	// const allergieData = {
 //   allergicto: "Perfum",
 // 	}

  // path to set the user key data to Firebase
  firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/allergies/" + allergieId).set(saveAllergieData);

	// return to main allergies page
  window.location.replace("./allergie.html");
});

	const users = firebase.database().ref('/users');

	// using the keys previously created to assign allergies
	const userKey = "-L7qtGJv81gwWN-2R1NS";
	const petKey = "-L7qujE6zObeeliWQj5p";

  // FUNCTION CHILD ADDED - Add vaccine related to a pet into Firebase

	firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/allergies/").on('child_added', function(data){
  
    const allergieId = data.key;
    const saveAllergieDataObj = data.val();

    $('#load-card').prepend(`<div id="${allergieId}"><div id="card" class="box-shadow-all-light">
      <section id="allergie-card" >
    		<section>
          <span id="menu-elipse"><a href="#">...</a></span>
          <!-- options elipse nav -->
          <nav id="elipse-options-nav" class="box-shadow-bottom-dark display-none">
            <ul>
              <li><a href="#" id="edit-allergie">Edit</a></li>
              <li><a href="#" id="allergie-calendar">Add Alert</a></li>
              <br>
              <br>
              <li><a href="#" id="delete-allergie" class="delete-option">Delete</a></li>
            </ul>
          </nav>
        </section>

        <section>
          <h4 id="field-info">Allergic to</h4>
          <p id="allergie-name">${saveAllergieDataObj.allergicto}</p>
        </section>
			</section>   
    </div></div>`)



    // Edit a specific Allergie Data Stored 

    $(`#${allergieId} #edit-allergie`).click(function(){
      $("#edit-card").removeClass("display-none");
      $("#load-card").addClass("display-none");

      $('#edit-allergie-id').val(allergieId);
      $('#edit-allergie-name').val(saveAllergieDataObj.allergicto);
    
    });	

    // Display the menu elipse for each card/allergieId

    $(`#${allergieId} #menu-elipse`).click(function() {
      $(`#${allergieId} #elipse-options-nav`).slideToggle("slow");
    });

    // Delete a specific allergie entry

    $(`#${allergieId} #delete-allergie`).click(function(event){
      firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/allergies/" + allergieId).remove();
    });

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/allergies/" + allergieId).on('child_removed', function(data){
      $(`#${allergieId}`).remove();
    });
  }); //End of function "on child_added"

	// Edit Allergie Button Submition Action from Edit Allergie Screen
  $('#edit-allergie-btn').click(function(){
    var editAllergieData = {
      allergicto: $('#edit-allergie-name').val()
    }
    var allergieId = $('#edit-allergie-id').val();

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/allergies/" + allergieId).set(editAllergieData);
    
    window.location.replace("./allergie.html");
  });


  // Delete Allergie Data Stored

  $("#delete-allergie").click(function(){
    $("#delete-card").removeClass("display-none");
    $("#load-card").addClass("display-none");
    var deleteAllergieData = getData();
    $('#delete-allergie-name').val(deleteAllergieData.allergicto);
    
  });

  // Add Allergie from Add Button on Bottom Screen

  $('#imgPop').click(function(){
    $(".cards").addClass("display-none");
    $('#new-card').removeClass("display-none");

  });

  // Display Edit Card after Choosing Edit Allergie Entry from Elipse Menu

  $('#edit-allergie').click(function(){
    $(".cards").addClass("display-none");
    $('#edit-card').removeClass("display-none");

  });

  // Display Delete Allergie Card after Choosing Entry from Elipse Menu

  $('#delete-allergie').click(function(){
    $(".cards").addClass("display-none");
    $('#delete-card').removeClass("display-none");
  });


  // POPUPS FOR SAVE BUTTON ON NEW, EDIT AND DELETE ALLERGIES SCREEN

  // Save Info popup

  $('#save-info').click(function(){
  $('#addAllergie').removeClass("display-none");
  }); 

  $("#addAllergie").click(function(){
    $("#addAllergie").addClass("display-none");
  });

  // Edit Info Popup
  $('#edit-info').click(function(){
  $('#editAllergie').removeClass("display-none");
  }); 

  $("#editAllergie").click(function(){
    $("#editAllergie").addClass("display-none");
  });


   // Delete Info Popup
  $('#delete-info').click(function(){
  $('#deleteAllergie').removeClass("display-none");
  }); 

  $("#deleteAllergie").click(function(){
    $("#deleteAllergie").addClass("display-none");
  });


};