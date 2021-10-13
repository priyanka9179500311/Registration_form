//import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import ChangePassword from './components/ChangePassword';
import Post from './components/Post';
import UpdateProfile from './components/UpdateProfile';


const App=()=>{
  return (
    <div>
     
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <PrivateRoute exact path="/home" component={Home}></PrivateRoute>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/post" component={Post}/>
          <Route component={Login} path="/" exact />
          <Route path="/changepass" component={ChangePassword} exact/>
          <Route path="/update" component={UpdateProfile}/>
        </Switch>
       
      </BrowserRouter>
    </div>
  );
}

export default App;
