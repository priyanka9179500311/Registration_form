import React from 'react';
import { useState } from 'react';
import axios from "./BaseUrl"
import './changePass.css';

const ChangePassword = () => {
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const ChangePass=(e)=>{
    e.preventDefault();
    let result = {old_password,new_password,confirm_password}
    console.log(result);

    const token = localStorage.getItem('auth_token')
    //console.log(token);

    const headers = {
      'Authorization': `Token ${token}`
    };

    console.log('**********',headers);


    axios.put('api/change-password/', result,{headers})
      .then((response) => {
        console.log(response.data);

        if(response.status === 200){
          console.log("okkkk");
        }
       

      }).catch((error) => {
        console.log(error);

      });

  }




  return (
    <div className="col-sm-6 offset-sm-3">
      <h1>ChangePassword Page</h1>
      <form method="post">
        old_password<input type="password" value={old_password} onChange={(e) => setOldPassword(e.target.value)} className="form-control" required />
        <br />
        new_password<input type="password" value={new_password} onChange={(e) => setNewPassword(e.target.value)} className="form-control" required />
        <br />
        confirm_password<input type="password" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" required />
        <br />

        <button onClick={ChangePass}>Submit</button>


      </form>


    </div>
  )
}

export default ChangePassword;