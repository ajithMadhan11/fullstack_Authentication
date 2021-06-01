import React,{useState} from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import pic from '../src/images/pic.png';
import {Link,useHistory} from 'react-router-dom'
import { API } from './Backend';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
     
      },
    },
  
  }));

const Signup = () => {
  let history=useHistory();
  const [user, setuser] = useState({
    name:'',
    lastname:'',
    email:'',
    userinfo:'',
    password:'',
    cpassword:''
  });
  const {name,lastname,email,userinfo,password,cpassword}=user;

  const handleChange =name => e=>{
    setuser({...user,[name]:e.target.value})
  }
  
  const signupUser =(e)=>{
      e.preventDefault();
      if(name=='' || lastname ==''|| email==''||userinfo==''||password==''||cpassword==''){
        return alert("please fill all the fields")
      }
      let payload = user;

        axios.post(`${API}/signup`, payload,{ 
          withCredentials: true,
        })
        .then(res=>{
          alert("success")
          history.push("/signin");
        })
        .catch(err =>{
      
          console.log(err.response.data);
        })
  }

    const classes = useStyles();
    return (
        <div className="App">
                <img className="head_image" src={pic} alt=""/>
                <h1>Full Stack Authentication</h1>
                <div className="form_container">
                <h3>Sign up</h3>
      <form className={classes.root} noValidate autoComplete="off">
      <Input required placeholder="Name" value={name} onChange={handleChange('name')} />
      <Input required placeholder="Last name"  value={lastname} onChange={handleChange('lastname')}/>
      <Input type="email" required placeholder="Email"  value={email} onChange={handleChange('email')}/>
      <Input type="text" required placeholder="User Info"  value={userinfo} onChange={handleChange('userinfo')}/>
      <Input type="password" required placeholder="Password"  value={password} onChange={handleChange('password')}/>
      <Input type="password" required placeholder="Conform Password"  value={cpassword} onChange={handleChange('cpassword')}/>
      <button className="btn_signin" onClick={signupUser}>Sign up</button>
     
    
     
    </form>
    <p className="user_swap">Already have a account?<span><Link to="/signin">SignIn</Link></span></p>

      </div>
        </div>
    );
}

export default Signup;
