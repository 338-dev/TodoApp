import React,{useEffect,useState} from 'react'
import firebase from '../../Server/firebase';
import { addTodo, deleteTodo, removeTodo } from '../../actions/index';
import { useDispatch } from 'react-redux';
import "./Todolist.css"
import { useSelector } from 'react-redux';
import plus from "./plus.png"
import { Navigate, useNavigate } from 'react-router-dom';
import Topbar from '../topbar/Topbar.component';

const TodoList = () => {


    var user=firebase.auth().currentUser;
   
    const [name, setName] = useState("User");
   const [message, setMessage] = useState(false);

    const [listname, setListname] = useState("");
    const [signout, setSignout] = useState(0);

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const list=useSelector((state)=>state.todoReducers.list);
  
    useEffect(() => {
      if(user){
        const displayName = user.displayName;
        setName(displayName); 
        console.log(displayName)
           var arr=window.location.pathname;
          // alert(arr)
           if(arr[1]==='p' && arr[2]==='-')
           {
               firebase.firestore().collection("todoList").doc(user.uid).collection("list").doc(arr.substring(3)).get().then((doc)=>{
                doc.get("list").map((id,data)=>{
                    //console.log()
                    dispatch(addTodo(id.data))
                })
                
               })
            //alert(arr.substring(3))
            }
    }
      
    }, [user]);
    
  
    const logout=()=>{
      firebase.auth().signOut();
      
    }

    // const message=()=>{
        
    //     return(
    //         <div className='message'>
    //             List has been added
    //         </div>
    //     )
    // }
    const submit=()=>{
        var arr=window.location.pathname;
        firebase.firestore().collection("todoList").doc(user.uid).collection("list").doc(arr.substring(3)).set({
            list:list
        })
        .then(()=>{
            setMessage(true);
        })
    }
  return (<>
  <Topbar/>
     <div className='main'>
     <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-arrow-left-circle-fill left" viewBox="0 0 16 16" onClick={()=>dispatch(removeTodo(),navigate("/name"))}>
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
</svg>
        <div className='listName'>
            Create the list
        </div>
        <div>
            {/* <input type="text" placeholder='Enter the item'  className='listItem form-control'  />
            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="currentColor" className="bi bi-plus-circle img" viewBox="0 0 16 16" >
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg><span className="input-group-text" id="basic-addon1">@</span>
             */}
<div className="input-group mb-3 listItem" >
  <input type="text" className="form-control " placeholder="Enter the Item" value={listname}
            onChange={(e)=>{setListname(e.target.value)}} aria-label="Username" aria-describedby="basic-addon1"/>
  <span className="input-group-text" id="basic-addon1" onClick={()=>dispatch(addTodo(listname),setListname(''))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg></span>
</div>
            <div className="showItems">
                {
                    list.map((element)=>{
                        return(
                            <div>
                                <div className='container'key={element.id}>
                                <h3 style={{"width":"100%"}}>
                                   {element.data}
                                   </h3>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"
                                onClick={()=>dispatch(deleteTodo(element.id))}>
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
                                </div>
                                
                            </div>
                             
                        )
                    })
                }
                <div>
                    <div style={{"display":"flex"}}>
                    <button className='btn btn-outline-danger clearList' onClick={()=>dispatch(removeTodo())}>Clear List</button>
                <button className='btn btn-outline-danger submitList' onClick={()=>submit(list)}>Submit List</button>
                {
             message===true?<div className='message1'>
                <center> <h3>Your list has been submitted</h3></center>
             <center>
             <button className='btn btn-outline-primary' onClick={()=>setMessage(false)}>done</button></center></div>:""
         }
                    </div>
               </div>
            </div>
            
            
        </div>
     </div>

     </>)
}

export default TodoList