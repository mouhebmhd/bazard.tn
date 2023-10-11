import { useState } from "react";
import Navbar from "../components/navbar/navbar";
import './profil.css'
function Profil()
{
return (
    <>
    <Navbar></Navbar>
    <div className="container">
        <div className="row mt-2">
            <h1 className="text-center pageTitle">Your Profil</h1>
        </div>
    </div>
    </>
 )
}
export default Profil;