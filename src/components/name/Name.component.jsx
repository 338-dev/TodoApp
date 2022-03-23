import React,{useEffect,useState} from 'react'
import firebase from '../../Server/firebase';
import { addTodo, deleteTodo, removeTodo } from '../../actions/index';
import { useDispatch } from 'react-redux';
import "./Name.css"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Topbar from '../topbar/Topbar.component';

const Name = () => {


    var user=firebase.auth().currentUser;
    const navigate=useNavigate();

    const [name, setName] = useState("User");
    const [listname, setListname] = useState("");
    const [listtopic, setListtopic] = useState([]);

    
    useEffect(() => {
      if(user){
        const displayName = user.displayName;
        setName(displayName); 
        console.log(displayName)


        firebase.firestore().collection("todoList").doc(user.uid).collection("list").get()
        .then((querySnapshot) => {
            var arr=[]
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const qw=doc.id;
                const op=qw.split("_")
                const ty=op.join(" ")
                arr.push(ty)
                console.log(doc.id, " => ", doc.data());
            });
            setListtopic(arr)
            console.log(listtopic)
        })
           
    }
      
    }, [user]);
    
  
    const logout=()=>{
      firebase.auth().signOut();
      
    }

    const submit=()=>{
        firebase.firestore().collection("todoList").doc(user.uid).set({
            "registered":"yes"
        })
        .then(()=>{
            var sp=listname.split(" ")
            var qw=sp.join("_")
            //alert(qw)
            navigate(`/${"s-"+qw}`)
        })
    }
    const clicktopic=(key)=>{
        var sp=key.split(" ")
        var qw=sp.join("_")
        navigate(`/${"p-"+qw}`)
    }
  return (<>
  <Topbar/>
   {/* <div className="topbar">
    <div className='title'>
        Todo App
    </div>
    <div className='signout'>
        Hey! <span className='button'>{name}</span>
    </div>
   </div> */}
   <div className='listtopicnames'>
       {
           listtopic.map((key,value)=>{
               return(
                <div className='item' onClick={()=>{clicktopic(key)}}>
                    {key}
                </div>
               )
           })
       }
   </div> 
   
     <div className='main'>
        <div className='listName'>
            Name the list
        </div>
        <div>
            {/* <input type="text" placeholder='Enter the item'  className='listItem form-control'  />
            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="currentColor" className="bi bi-plus-circle img" viewBox="0 0 16 16" >
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg><span className="input-group-text" id="basic-addon1">@</span>
             */}
<div className="input-group mb-3 listItem" >
  <input type="text" className="form-control " placeholder="Enter the Name" value={listname}
            onChange={(e)=>{setListname(e.target.value)}} aria-label="Username" aria-describedby="basic-addon1"/>
</div>
           
                <div>
                <button className='btn btn-outline-danger submit' onClick={()=>submit(listname)}>Submit</button>
                </div>
        
            
            
        </div>
     </div>

     </>)
}

export default Name