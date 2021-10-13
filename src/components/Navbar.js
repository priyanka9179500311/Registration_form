import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useEffect} from 'react';
import { useHistory } from 'react-router';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';


const Navbar = () => {
    
    const history = useHistory();
    const logout = (e) => {
        e.preventDefault();
        //alert('okkkkk');
        localStorage.removeItem('auth_token');
        localStorage.clear();
        history.push('/');
        getTokenInLocalStorage()

    }
    const[isauthoken,setisauthoken] = useState(localStorage.getItem('auth_token') ?true:false);

    useEffect(()=>{
        
        getTokenInLocalStorage()
       
        // setInterval(()=>{
        //     getTokenInLocalStorage()

        // },1000)
    },)

    const getTokenInLocalStorage=()=>{

        if(localStorage.getItem('auth_token')){
            setisauthoken(true)
        } else{
            setisauthoken(false)
        }
    }
    return (
        <div>
            
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            {isauthoken?<li className="nav-item">
                                <Link className="nav-link" to="/home"><button>Home</button></Link>
                            </li>:""}
                        {isauthoken?"":<li className="nav-item">
                            <Link className="nav-link" to="/signup"><button>Signup</button></Link>
                        </li>}
                        {isauthoken?<li className="nav-item">
                                <Link className="nav-link" to="/post"><button>Post</button></Link>
                            </li>:""}
                        {isauthoken?"":<li className="nav-item">
                                <Link className="nav-link" to="/"><button>Login</button></Link>
                            </li>}

                        </ul>
                    </div>
                   
                    <div>
                    { isauthoken?<DropdownButton id="dropdown-basic-button" title="Dropdown">
                        <Dropdown.Item href="/update"><Button  variant="primary">UpdateProfile</Button></Dropdown.Item>
                        <Dropdown.Item href="/changepass"><Button  variant="success">ChangePassword</Button></Dropdown.Item>
                        <Button variant="primary" onClick={logout} type="submit">Logout</Button>
                    </DropdownButton>:""}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;