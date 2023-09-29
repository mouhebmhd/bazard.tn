import logo from '../../../assets/logo.png';
import { BsPerson, BsCart2, BsSearch } from 'react-icons/bs';
function Navbar()
{
   return (    
   <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
   <a className="navbar-brand p-1" href="#">
     <img src={logo} width="50" height="50" alt="" />
   </a>
         <button
             className="navbar-toggler"
             type="button"
             data-bs-toggle="collapse"
             data-bs-target="#navbarNav"
             aria-controls="navbarNav"
             aria-expanded="false"
             aria-label="Toggle navigation"
         >
             <span className="navbar-toggler-icon"></span>
         </button>
   <div className="collapse navbar-collapse" id="navbarNav">
     <ul className="navbar-nav d-flex flex-row col mx-5 justify-content-center gap-4 ">
       <li className="nav-item mx-2 active">
         <a className="nav-link" href="/">
           Home
         </a>
       </li>
       <li className="nav-item mx-2">
         <a className="nav-link" href="/about">
           About
         </a>
       </li>
       <li className="nav-item mx-2">
         <a className="nav-link" href="/products">
           Products
         </a>
       </li>
       <li className="nav-item mx-2">
         <a className="nav-link" href="/categories">
           Categories
         </a>
       </li>
       <li className="nav-item mx-2">
         <a className="nav-link" href="/contact">
           Contact Us
         </a>
       </li>
     </ul>
     <div className="avatar-container d-flex gap-3">
       <div className="col h3"><BsSearch></BsSearch></div>
       <div className="col h3"><span className='cartCount'>0</span><BsCart2></BsCart2> </div>
       <div className="col h3"><BsPerson></BsPerson></div>
     </div>
   </div>
 </nav>)
}
export default Navbar;