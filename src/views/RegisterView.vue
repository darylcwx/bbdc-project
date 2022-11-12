<template>
  <div>
    <br />
    <p><strong>Register</strong></p>
    <p>
      Note: Your login ID is now the last 4 digits of your NRIC, plus your
      birthday in DDMMYYYY format
    </p>
    <p id="errors"></p>
    <p><strong>Full Name as in NRIC</strong></p>
    <input type="text" name="fName" id="fName" placeholder="E.g. John Smith" />
    <p></p>
    <p><strong>Login ID</strong></p>
    <input
      type="text"
      name="login"
      id="login"
      placeholder="E.g. 123A01012000"
    />
    <p></p>
    <p><strong>Password</strong></p>
    <p>
      <input id="password" type="password" placeholder="Your Password here" />
    </p>
    <p><button @click="createUser">Register</button></p>
    <p>
      <router-link to="/signin"> Already have an account? Sign in here!</router-link>
    </p>
  </div>
</template>

<script setup>
/* eslint-disable */
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useRouter } from "vue-router"; // import router
import { useStore } from "@/pinia_store";

const store = useStore();

const router = useRouter(); // get a reference to our vue router

const db = getDatabase();
const usersRef = ref(db, "users");

function createUser() {
  let uname = document.getElementById("login").value;
  let pw = document.getElementById("password").value;
  let fName = document.getElementById("fName").value;
  let lastUser = 0;
  onValue(usersRef, (snapshot) => {
    var data = snapshot.val();
    lastUser = +Object.keys(data).pop();
  });

    if (uname && pw && fName) {
      let errors = checkRegErrors(uname, pw, fName);
      if (errors == null) {
        set(ref(db, "users/" + (lastUser + 1)), {
          username: uname,
          password: pw,
          fullName: fName,
          wallet: 0,
          progress: 0
        })
          .then(() => {
            router.push("/summary");
            store.$patch({
                userID: lastUser + 1,
                fullName: fName
            })
            return console.log("success");
          })
          .catch((error) => {
            // failed
            console.log(error);
            console.log(error.message);
          });
      } else {
        document.getElementById("errors").innerText = errors;
      }
    }
}

// helper function checkErrors that checks username and pw as input for errors
// return errors if found, else return null
function checkRegErrors(uname, pw, fName) {
  let nric1 = uname.slice(0, 3);
  let nric2 = uname.slice(3, 4);
  let birthday = uname.slice(4, uname.length);

  let errors = "";

  if (isNaN(nric1) || nric2 instanceof String || isNaN(birthday)) {
    errors += "Your Login ID does not follow the conventions above.\n";
  }
  if (uname.length > 12 || uname.length < 12) {
    errors += "Your Login ID is too short or too long.\n";
  }
  if (pw.length < 8) {
    errors += "Your Password is too short.\n";
  }
  if (/\d/.test(fName) || +fName==NaN) {
    errors += "Name is not valid / contains non-alphabet characters.\n";
  }

  if (errors) {
    return errors;
  } else {
    return null;
  }
}
</script>