import React from 'react';
import './login.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from './BaseUrl';


const Login = () => {  
  useEffect(() => {
    if(localStorage.getItem('auth_token')){
      history.push('/home');
    }
  }, [])
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    let items = { email, password }
    console.log(items);


    console.log()

    axios.post(`/api/login/`, items)
      .then((response) => {
        console.log(response.data);
        
        if (response.status === 200) {
          localStorage.setItem("auth_token", (response.data.auth_token));
          localStorage['id'] = response.data.id
          localStorage['email'] = response.data.email
          setEmail('');
          setPassword('');
          alert("Data Send Successful");
          history.push('/home');
        }
        

      }).catch(error => {
        console.log(error);
        
        if (error.response.status === 400) {
          console.log(error.response.data.email);
        }else if(error.response.status === 500){
            alert("failed")
        }else if(error.response.status === 404){
            console.log(error.response.data.detail)
        }
      
      });



  }

  return (
    <div>
      <h1>Login Page</h1>

      <div className="col-sm-6 offset-sm-3">
        <form method="post">
          Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
          <br />
          Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
          <br />

          <button onClick={login}>Login</button>


        </form>


      </div>
    </div>
  )
}

export default Login;

