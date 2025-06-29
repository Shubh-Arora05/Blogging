import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from "notistack";
const UpdateBlog = () => {

  const {id} = useParams() ;
  const navigate = useNavigate();
  const [data, setdata] = useState({
    title: "",
    content: "",
  });

  const {enqueueSnackbar} = useSnackbar() ;

  const fun = async () =>{

    const response = await axios.get(`https://blogging-website-12.onrender.com/app/v1/blog/${id}`,{
      headers : {
        Authorization: `Bearer ${localStorage.getItem('token')}` ,
      }
    }) ;
    if(localStorage.getItem('username') !== response.data.response.name){
      // alert('You are not the owner of this blog') ;
      enqueueSnackbar('You are not the owner of this blog' , {variant : 'success'} ); 
      navigate('/blog') ;
    }
    // console.log("response : = >" ,response.data.response) ;
    // console.log(response.data.response.content) ;
    // console.log(response.data.response.title) ;
    setdata({
      ...data,
      title: response.data.response.title,
      content: response.data.response.content,
    });
   

  } 

  useEffect(()=>{
    fun() ;
  },[])

  const handle_submit = async (e) => {
    e.preventDefault();
    console.log({
        title: data.title ,
        content :data.content,
    });
    const temp = {
        title: data.title ,
        content :data.content,
    }


    //  console.log("auth" , localStorage.getItem("token")) ;
   

    const response = await axios.put(`https://blogging-website-12.onrender.com/app/v1/blog/${id}`, data, {
        headers : {
          Authorization: `Bearer ${localStorage.getItem('token')}` ,
        }
      }) ;
      console.log( "updated response : => " ,response) ;
      console.log(response.status) ;
      if(response.status == 200 ){
        console.log("200") ;
        navigate('/blog');
      }


   
    console.log(response);
  };

  return (
    <div>
      <div className="flex justify-between p-3 ">
        <h2 className="text-lg p-2">Blogs</h2>
        <div className="rounded-full p-2 text-lg bg-slate-600 text-white">
          {localStorage.getItem('username')}
        </div>
      </div>

      <hr className="border-t-4 p-3" />

      <div className="flex flex-col gap-3">
        

        <input
          type="text"
          value = {data.title}
          onChange={(e) => {
            setdata({ ...data, title: e.target.value });
          }}
          placeholder="Enter the Title"
          className="border-2 border-blue-400 p-3 m-3 outline-none rounded-md"
        />

        <textarea
          value = {data.content}
          placeholder="Enter the decription"
          onChange={(e) => {
            setdata({ ...data, content: e.target.value });
          }}
          className="border-2 border-blue-400 p-3 m-3 outline-none rounded-md h-48"
        />
      </div>

      <button
        onClick={(e) => {
          handle_submit(e);
        }}
        className="bg-blue-500 p-2 m-3 rounded-lg text-white"
      >
        Post
      </button>
    </div>
  );
};

export default UpdateBlog;
