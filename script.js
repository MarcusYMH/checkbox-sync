// Your Firebase configuration object
var firebaseConfig = {
  apiKey: "AIzaSyBo0NoFJJM8B5Dt7Ulf1TBmBgyvgUKTlyw",
  authDomain: "mypmps-9cee1.firebaseapp.com",
  databaseURL: "https://mypmps-9cee1.firebaseio.com",
  projectId: "mypmps-9cee1",
  storageBucket: "mypmps-9cee1.appspot.com",
  messagingSenderId: "382735697744",
  appId: "1:382735697744:web:6f6076c486cccdeab10e55",
  measurementId: "G-Q0NHHJNJ01"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Number of checkboxes
var numCheckboxes = 100;

// Create and insert checkboxes into the page
var container = document.getElementById("checkboxContainer");
for (var i = 1; i <= numCheckboxes; i++) {
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "checkbox" + i;
  checkbox.addEventListener("change", function() {
    var id = this.id;
    updateCheckboxState(id, this.checked);
  });
  container.appendChild(checkbox);
  container.appendChild(document.createTextNode(" Checkbox " + i));
  container.appendChild(document.createElement("br"));
  setupCheckboxListener("checkbox" + i);
}

// Function to update checkbox state in Firebase
function updateCheckboxState(id, checked) {
  database.ref("checkboxes/" + id).set({
    checked: checked
  });
}

// Function to set up a listener for each checkbox
function setupCheckboxListener(id) {
  database.ref("checkboxes/" + id).on("value", function(snapshot) {
    var status = snapshot.val();
    var checkbox = document.getElementById(id);
    if (status) {
      checkbox.checked = status.checked;
    }
  });
}
