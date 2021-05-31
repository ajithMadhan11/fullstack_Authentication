import pic from '../src/images/pic.png'
import React ,{useState,useEffect} from 'react';
import Signin, { isAutheticated } from './Signin';
import Signup from './signup';
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import { API } from './Backend';
export const authContex = React.createContext();


function App() {
  const history = useHistory();
const [state, setstate] = useState(false);
const [uname, setuname] = useState('ajith');
  const user=isAutheticated();
useEffect(() => {
  const checkAuth=()=>{
   
  
    if(user){
      setstate(true)
    }else{
      setstate(false)
    }
    
  }
  checkAuth()
}, []);


const signout=()=>{
  axios.get(`${API}/signout`,{ 
    withCredentials: true,
  })
  .then(function (response) {
    history.push('/signin')
    localStorage.removeItem("jwt");

    console.log(response);
  })
  .catch(function (error) {
    
    console.log(error);
  })
}



  return (
    <div className="App">
      <img className="head_image" src={pic} alt=""/>
      <h1>Full Stack Authentication</h1>
      <authContex.Provider value={uname}>
        {
          state?
          // <h1>Signed In</h1>
          <button className="btn_logout" onClick={signout}>Logout</button>
          :<Signin/>

        }
      </authContex.Provider>
   
    </div>
  );
}

export default App;
