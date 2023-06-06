import React from "react";
import './bounding.css';
function Faceimg({url,box}){
    const boxcalculation=()=>{
        
    }
    return(
        <div className="w-80 flex justify-center ... parent">
            <img src={url} id="img"/>
            <div className="bbox">
            </div>
            {console.log(box.left)}
            {console.log(box.top)}
            {console.log(box.w)}
            {console.log(box.h)}
            <div className="bounding-box" style={{top:box.top,
            left:box.left,
            height:box.h,
            width:box.w,
            position:"absolute",
            border: "5px solid blue",fill:"none"}}></div>
        </div>
    );
}
export default Faceimg;