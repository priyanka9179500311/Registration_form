import React from 'react';
import { useState } from 'react';
import './signup.css';
import axios from './BaseUrl';


const Signup = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const [date_of_birth, setDate] = useState("");


  const signup = (e) => {
    e.preventDefault();
    let items = { first_name, last_name, email, password, date_of_birth }
    console.log(items);

    axios.post('/api/register/', items, {
      Method: 'POST',
      Headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      data: {
        "first_name": "",
        "last_name": "",
        "email": "",
        "password": "",
        "confirm_password": "",
        "date_of_birth": null,
      }
    })
      .then((response) => {
        console.log(response.data);

        if (response.status === 201)
          localStorage.setItem("apiData", JSON.stringify(response.data)); {
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
          setConfirm_Password('');
          setDate('');
          console.log("Data Send Successful");
        } 
        if (("password") !== "undefined" && ("confirm_password") !== "undefined") {
            if (("password") != ("confirm_password")) {
            return  false;
            

          }

        }

      }).catch((error, response) => {

        if (error.response.status === 400) {
          alert(error.response.data.email);
        }



      });


  }

  return (
    <div>
      <h1>Signup Page</h1>

      <div className="col-sm-6 offset-sm-3">
        <form method="post">

          First name<input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} className="form-control" required />
          <br />
          Last name<input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} className="form-control" required />
          <br />module
          Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
          <br />
          Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
          <br />
          Confirm Password<input type="password" value={confirm_password} onChange={(e) => setConfirm_Password(e.target.value)} className="form-control" required />
          <br />
          Date of birth<input type="string" value={date_of_birth} onChange={(e) => setDate(e.target.value)} className="form-control" placeholder="yyyy/mm/dd" required />
          <br />


          <button onClick={signup}>Sign Up</button>


        </form>


      </div>
    </div>
  )
}

export default Signup;
