import './agents.css'
import Navbar from '../components/navbar/navbar';
import { useEffect,useState } from 'react';
import axios from 'axios';
function Agents(){
  function activateAgent(agentID){
    axios.put('http://localhost:3030/agent/activateAgent/'+agentID)
    .then(response=>{
      console.log(response.data);
      window.location.reload()
    })
    .catch(error=>{
      console.log(error)
    })
  }
  function blockAgent(agentID){
    axios.put('http://localhost:3030/agent/blockAgent/'+agentID)
    .then(response=>{
      console.log(response.data);
      window.location.reload()
    })
    .catch(error=>{
      console.log(error)
    })
  }
  function restoreAgent(agentID){
    axios.put('http://localhost:3030/agent/restoreAgent/'+agentID)
    .then(response=>{
      console.log(response.data);
      window.location.reload()
    })
    .catch(error=>{
      console.log(error)
    })
  }
  function unBlockAgent(agentID){
    axios.put('http://localhost:3030/agent/unBlockAgent/'+agentID)
    .then(response=>{
      console.log(response.data);
      window.location.reload()
    })
    .catch(error=>{
      console.log(error)
    })
  }
  function deleteAgent(agentID){
    axios.delete('http://localhost:3030/agent/deleteAgent/'+agentID)
    .then(response=>{
      console.log(response.data);
      window.location.reload()
    })
    .catch(error=>{
      console.log(error)
    })
  }
    const currentUser=localStorage.getItem('currentUser');
    const [agents,setAgents]=useState([]);
    useEffect(()=>{
        console.log(currentUser)
        axios.get('http://localhost:3030/agent/getAllAgents/')
        .then(response=>{
            setAgents(response.data)
            console.log(response)
        })
        .catch(error=>{
            console.log(error)
        })
    },[currentUser])
    if(agents){
return (
<>
<Navbar />
<div className='container-fluid '>
  <div className='row mt-2'>
    <div className='col-12 sidebar bg-white d-flex flex-xl-nowrap '>
    
    </div>
    <h2 className='text-center productsTitle'>Manage Agents</h2>
    <div className='container-fluid m-0 p-0'>
              <div className='row justify-content-center gap-3'>
               {agents.map(agent=>{
                  return<div key={agent._id} className='card col-xl-3 col-md-4 col-sm-6'  style={{ width: '20rem' }}>
                 <div className='card-img-top avatarImage d-flex justify-content-center'  alt='Card image cap' ></div>
                 <div className='card-body'>
                   <p className='card-title'>
                   <span className='fw-bold'>Full Name </span> {agent.name}
                   </p>
                   <p className='card-title'>
                   <span className='fw-bold'>Phone Number </span> {agent.phone}
                   </p>
                   <p className='card-title'>
                   <span className='fw-bold'>Email </span> {agent.email}
                   </p>
                   <p className='card-title'>
                   <span className='fw-bold'>Status </span> 
                   {agent.etatCompte=='active' && <span className='text-success fw-bold'>{agent.etatCompte} </span>}
                   {agent.etatCompte=='blocked' && <span className='text-warning fw-bold'>{agent.etatCompte} </span>}
                   {agent.etatCompte=='deleted' && <span className='text-danger fw-bold'>{agent.etatCompte} </span>}
                   {agent.etatCompte=='suspended' && <span className='text-info fw-bold'>{agent.etatCompte} </span>}
                   </p>
                   <div className='col d-flex justify-content-center flex-column row-gap-2'>
                   {agent.etatCompte=='active' && <button className='btn btn-danger' onClick={()=>deleteAgent(agent._id)}>Delete Agent</button>}
                   {agent.etatCompte=='active' && <button className='btn btn-primary text-light' onClick={()=>blockAgent(agent._id)}>Block Agent</button>}
                   {agent.etatCompte=='blocked' && <button className='btn btn-warning text-light' onClick={()=>unBlockAgent(agent._id)}>UnBlock Agent</button>}
                   {(agent.etatCompte=='blocked' || agent.etatCompte=='suspended') && <button className='btn btn-success text-light' onClick={()=>activateAgent(agent._id)}>Activate Agent</button>}
                   {(agent.etatCompte=='deleted') && <button className='btn btn-danger text-light' onClick={()=>restoreAgent(agent._id)}>Restore Agent</button>}

                     
                   </div>
                 </div>
               </div>
               })}
                   
              </div>
            </div>

    </div>
    </div>
</>)}}
export default Agents;