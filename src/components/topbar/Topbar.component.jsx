import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import firebase from '../../Server/firebase';

import "./Topbar.css"

const Topbar = () => {
    var user=firebase.auth().currentUser;
   
    const [name, setName] = useState("User");
   const [message, setMessage] = useState(false);

    const [listname, setListname] = useState("");
    const [signout, setSignout] = useState(0);

    const navigate=useNavigate();
   
    useEffect(() => {
      if(user){
        const displayName = user.displayName;
        setName(displayName); 
        console.log(displayName)
          
    }
      
    }, [user]);
    
  
    const logout=()=>{
      firebase.auth().signOut();
      
    }
  return (
   
<div className="topbar">
<div className='title'>
    Todo App
</div>
<div className='signout'>
    Hey! <span className=''>
<a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={()=>signout===0?setSignout(1):setSignout(0)}>
{name}

</a>
{signout===1?<div className='clickso'onClick={()=>{logout()}}>
    Sign out
</div>:""}
</span>
</div>
</div>
  )
}

export default Topbar
