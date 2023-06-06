import React, { useState } from "react";


function Signin({sign,regist,loaduser}){
    // const [name,setname]=useState('');
    // const [pw,setpw]=useState('');
    const [user,setuser]=useState(
        {
            id:'',
            name:'',
            email:'',
            entries:null,
            pw:''
        }
    );
    const [trans,settrans]=useState(
        {
            id:"",
            name:"",
            email:"",
            entries:null,
            pw:""
        }
    );
    const onpwchange=(e)=>{
        setuser(prevstate=>({...prevstate,pw:e.target.value}))
    }
    const onnamechange=(e)=>{
        setuser(prevstate=>({...prevstate,name:e.target.value}))
        
    }
    const load=(e)=>{
        // settrans(prevstate=>({...prevstate,id:e.id,name:e.name,email:e.email,entries:e.entries,date:e.date}));
        trans.id=e.id;
        trans.name=e.name;
        trans.email=e.email;
        trans.entries=e.entries
      }
    const click=(e)=>{
        e.preventDefault();
        if(!user.name|| !user.pw){
            alert("add full data in the form")
        }else{
            fetch('http://localhost:3000/signin',{
            method:'post',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                email:user.name,
                paw:user.pw
            })
        })
        .then(response=> response.json())
        .then(data=>{
            console.log(data);
            if (data!==false){
                load(data);
                loaduser(trans);
                sign();
            }
            else{
                alert("please check your password or user name");
            }
        })
        }
        
        
    }
    return(
        <div className="lg:w-5/12 md:6/12 w-10/12">
            <div className="bg-white shadow-3xl flex items-center justify-center">
                <form className="p-2 md:p-4">
                <div className="flex items-center text-lg mb-6 md:mb-8">
                    <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                    <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
                    </svg>
                    <input onChange={onnamechange} type="text" className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Username" required/>
                </div>
                <div className="flex items-center text-lg mb-6 md:mb-8">
                    <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                    <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
                    </svg>
                    <input onChange={onpwchange} type="password" id="password" className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Password" required/>
                </div>
                <button className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full" onClick={click}>Login</button>
                </form>
            </div>
            <div className="flex justify-center">
                <p className="cursor-pointer" onClick={regist}>Register</p>
            </div>
        </div>
  
    );

}
export default Signin;