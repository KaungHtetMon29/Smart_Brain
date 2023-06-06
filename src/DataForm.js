import React, { useState } from "react";
import Faceimg from "./Faceimg";
import Counts from "./Counts";
// const raw = JSON.stringify({
//     "user_app_id": {
//       "user_id": "clarifai",
//       "app_id": "main"
//     },
//     "inputs": [
//         {
//             "data": {
//                 "image": {
//                     "url": "https://m.media-amazon.com/images/M/MV5BODg3MzYwMjE4N15BMl5BanBnXkFtZTcwMjU5NzAzNw@@._V1_.jpg"
//                 }
//             }
//         }
//     ]
//   });
  
function DataForm({uname,ent,id}){
    const [input,setinput]=useState('');
    const [box,setbox]=useState({});
    const [entries,setentries]=useState(ent);
    
    const oninputchange = (event)=>{
        setinput(event.target.value);
    }
    const cal=(para)=>{
        const boxdata=para.outputs[0].data.regions[0].region_info.bounding_box;
        const size=document.getElementById('img');
        const width =size.width;
        const height=size.height; 
        
        return{
            left:(width* boxdata.left_col)+"px",
            top:(height * boxdata.top_row)+"px",
            w:((width*boxdata.right_col)-(width* boxdata.left_col))+"px",
            h:((height*boxdata.bottom_row)-(height * boxdata.top_row))+"px"
        };
        
    }
    const dbox=(box)=>{
        setbox(box);
    }
    const submit=(e)=>{
        e.preventDefault()
        console.log(uname);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key 7403b870ff63497bae93f225228cb5c4'
            },
            body: JSON.stringify({
                "user_app_id": {
                  "user_id": "clarifai",
                  "app_id": "main"
                },
                "inputs": [
                    {
                        "data": {
                            "image": {
                                "url": input
                            }
                        }
                    }
                ]
              })
        };
        fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
        .then(response => {
            if(response){
                fetch('http://localhost:3000/image',{
            method:'put',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                id:id
            })
            }).then(response=>response.json()).then(data=>setentries(data[0].entries))
            }

            return response.json();
            
        })
        .then(result =>  dbox(cal(result)))
        .catch(error => console.log('error', error));
    }
    return (
            <div className="flex flex-col justify-center mx-60 rounded-lg ...">
                <Counts ent={entries}/>
                <div className="flex justify-center bg-orange-600 p-10 mx-40 my-10 ...">
                    <form>
                        <input type="text" placeholder="Paste image link here" className="w-96 py-1 px-10 ..." onChange={oninputchange}/>
                        <button className="bg-neutral-950  text-white px-10 py-1 ..." onClick={submit}>Submit</button>
                    </form>
                    
                </div>
                <div className="flex justify-center ...">
                <Faceimg url={input} box={box}/>
                </div>
                
            </div>
        
        
    );
}

export default DataForm;