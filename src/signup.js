import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import pic from '../src/images/pic.png';
import {Link} from 'react-router-dom'





const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
     
      },
    },
  
  }));
  
const Signup = () => {
    const classes = useStyles();
    return (
        <div className="App">
                <img className="head_image" src={pic} alt=""/>
                <h1>Full Stack Authentication</h1>
                <div className="form_container">
                <h3>Sign up</h3>
      <form className={classes.root} noValidate autoComplete="off">
      <Input required placeholder="Name"  />
      <Input required placeholder="Last name"  />
      <Input type="email" required placeholder="Email"  />
      <Input type="text" required placeholder="User Info"  />
      <Input type="password" required placeholder="Password"  />
      <Input type="password" required placeholder="Conform Password"  />
      <button className="btn_signin">Sign up</button>
     
    
     
    </form>
    <p className="user_swap">Already have a account?<span><Link to="/signin">SignIn</Link></span></p>

      </div>
        </div>
    );
}

export default Signup;
