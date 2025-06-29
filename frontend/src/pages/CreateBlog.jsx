import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from "notistack";
const CreateBlog = () => {
  const [data, setdata] = useState({
    title: "",
    content: "",
    name : ""
  })

  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar() ;
  
  const handle_submit = async (e) =>{
    // //consolelog(data) ;
    e.preventDefault() ;

    setdata({...data, name: localStorage.getItem('username')})
    
    const response = await axios.post(`https://blogging-website-12.onrender.com/app/v1/blog`, data, {
      headers : {
        Authorization: `Bearer ${localStorage.getItem('token')}` ,
      }
    }) ;
    //consolelog(response) ;
    if(response.status === 200){
      enqueueSnackbar('Blog Created Successfully' , {variant : 'success'} ); 
      navigate(`/blog`)
    }
  }


  return (


    <div>

        <div className="flex justify-between p-3 ">
            <h2 className="text-lg font-medium p-2">Blogs</h2>
            <div className="rounded-full p-2 text-lg bg-slate-600 text-white">{localStorage.getItem('username')}</div>
        </div>

        <hr className="border-t-4 p-3"/>


        <div className="flex flex-col gap-3">
            <input type="text"  onChange = {(e)=>{
                setdata({...data, 
                  title: e.target.value})
            }} placeholder="Enter the Title" className="border-2 border-blue-400 p-3 m-3 outline-none rounded-md" />

            <textarea placeholder="Enter the decription" onChange = {(e)=>{
                setdata({...data, 
                  content : e.target.value})

                }} className="border-2 border-blue-400 p-3 m-3 outline-none rounded-md h-48"  />

        </div>

        <button  onClick={(e)=>{handle_submit(e)}} className="bg-blue-500 p-2 m-3 rounded-lg text-white">Post</button>
    </div>
  )
}

export default CreateBlog ; 