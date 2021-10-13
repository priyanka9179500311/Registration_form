import React from 'react';
import { useState } from 'react';

const UpdateProfile = () => {
    const [email,setEmail] = useState('');
    return (
        <div>
            <h1>UpdateProfile Page</h1>
            <div className="col-sm-6 offset-sm-3">
                <form >

                    Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
                    <br />
                    First_Name<input type="text" />


                    <button >Update</button>


                </form>
            </div>
        </div>
    )
}

export default UpdateProfile;