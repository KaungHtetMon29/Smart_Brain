import React from "react";

 
function Navigation({signout}){
    return(
        <div className="w-1/2 justify-end text-right py-2 ...">
            <p className="mr-10 text-4xl ..." onClick={signout}>Sign out</p>
        </div>
    );
}
export default Navigation;