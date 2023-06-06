import React, { useEffect, useState } from 'react';
import './App.css';
import Logo from './Logo';
import DataForm from './DataForm';
import Navigation from './Navigation';
import Signin from './Signin';
import Register from './Register';

function App() {
  const [signin,setsignin]=useState(false);
  const [register,setregister]=useState(false);
  const [user,setuser]=useState({
    id:'',
    name:'',
    email:'',
    entries:0,
    pw:''
  });

  // useEffect(()=>{
  //   fetch('http://localhost:3000/')
  //   .then(response=>response.json())
  //   .then(console.log)
  // })
  const loaduser=(data)=>{
    setuser(prevstate=>({...prevstate,id:data.id,name:data.name,email:data.email,entries:data.entries,pw:data.value}))
  }
  const entries=(data)=>{
    setuser(prevstate=>({...prevstate,entries:data}))
  }
  const clicksignin=()=>{
    setsignin(true);
  }
  const signout=()=>{
    setsignin(false);
    setregister(false);
  }
  const regist=()=>{
    setregister(true);
  }
  return (
    <div>
      {console.log(user.name)}
      <div className="App flex mx-40 ...">
        <Logo/>
        <Navigation signout={signout}/>
      </div>
      {
        signin===true?
        <DataForm uname={user.name} ent={user.entries} id={user.id}/>:
          register===false?
            <div className='flex justify-center'>
              <Signin sign={clicksignin} regist={regist} loaduser={loaduser}/>
            </div>:
            <div className='flex justify-center'>
              <Register sign={clicksignin} loaduser={loaduser}/>
            </div>
      }
      
    </div>
  );
}

export default App;
