import React ,{useState,useContext} from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import pic from '../src/images/pic.png'
import {Link,useHistory} from 'react-router-dom'
import { API } from "./Backend";

const axios = require('axios').default;


export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

 const authenticate = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
};



const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
     
      },
    },
  
  }));
  
const Signin = () => {


    const classes = useStyles();
 const [state, setstate] = useState(
  {
     email:'ajithmadhan113@gmail.com',
     password:'aspirine'
 });
const [error, seterror] = useState('');
 const {email ,password} = state;
  const [name, setname] = useState('');


 const handleChange = name => event => {
    setstate({ ...state, [name]: event.target.value });
  };  
  const history = useHistory();
 async function signin(e){
        e.preventDefault();
        if(email=='' || password=='') return alert("Please fill all fields")
        
        let payload = state;

        axios.post(`${API}/signin`, payload,{ 
          withCredentials: true,
        })
        .then(res=>{
         
        
          setname(res.data.user.name);
          authenticate(res.data.token);
          history.push("/");
        })
        .catch(err =>{
          seterror(err.response.data);
          console.log(err.response.data);
        })
  
    }

    return (
    <div className="App">
            <img className="head_image" src={pic} alt=""/>
            <h1>Full Stack Authentication</h1>
            <div className="form_container">
            <h3>Sign In</h3>
            {error?
            <p className="alert_mes">{error.err || 'something went wrong check credentials again'}</p>:
          ''
        }
      <form className={classes.root} noValidate autoComplete="off">
    
      <Input type="email" required placeholder="Email" value={email} onChange={handleChange('email')}/>
      <Input type="password" required placeholder="Password" value={password} onChange={handleChange('password')} />
      <button className="btn_signin" onClick={signin} >Signin</button>
   </form>

    <p className="user_swap">Don't have a account?<span><Link to="/signup">Signup</Link></span></p>
      
      </div>
        </div>
    );
}

export default Signin;
