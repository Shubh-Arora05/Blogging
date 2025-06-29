import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const [username, setusername] = useState('') ;
  const navigate = useNavigate();
  const [data, setdata] = useState([]) ;
  const fun = async ()=>{

    const response = await axios.get(`https://blogging-website-12.onrender.com/app/v1/blog/bulk` ,{
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('token')}` ,
      }
    }) ;
    const ans = await response.data.response ;
    //consolelog( "data : " , ans) ;
    setdata(ans) ;
    // //consolelog("Authorization : " , localStorage.getItem('token') ) 

    // setbooks(response.data);
    // setloading(false) ; 
    // return ans ;
    // //consolelog( "data : " , data) ;

    //consolelog( "username", localStorage.getItem('username')) ;
    setusername(localStorage.getItem('username')) ;
  }

  const cre_fun = (item) =>{

    const options = { year: "numeric", month: "long", day: "numeric"} ;
    // //consolelog( "fdffn" ,response.data.createdAt) ;
    item.createdAt =  new Date( item.createdAt).toLocaleDateString(undefined, options) ;

    return item.createdAt ;


  }

  const lu_fun = (item) =>{

    const options = { year: "numeric", month: "long", day: "numeric"} ;
    // //consolelog( "fdffn" ,response.data.createdAt) ;
    item.updatedAt =  new Date( item.updatedAt).toLocaleDateString(undefined, options) ;

    return item.updatedAt ;


  }


 
  
  
  useEffect(()=>{
  fun() ;


  // //consolelog( "data : " , data) ;
  }, []) ;

  const change_page = (id) =>{
    //consolelog("idididid " ,id) ;
    navigate(`fullblog/${id}`) ;

    // window.location.href = "fullblog/" + id ;
  }

  const update_page = (id) =>{
    //consolelog("idididid " ,id) ;
    navigate(`/updateblog/${id}`) ;

    // window.location.href = "fullblog/" + id ;
  }
  const create_page = () =>{
    navigate('/createblog') ;

    // window.location.href = "fullblog/" + id ;
  }

  return (
    <div>
      <div className="flex justify-between p-3 ">
        <h2 className="text-lg p-2">Blogs</h2>
        <div className="rounded-full  p-2  text-lg bg-slate-600 text-white">
          {username}
        </div>
      </div>



      <hr className="border-t-4 p-3" />


      <div>
        <div className="flex justify-between items-center p-3 text-md font-semibold bg-slate-300 border-2 m-2 rounded-xl">
            <h1>For Creating Blog Click Here</h1>
            <button  className="bg-blue-400 p-3 rounded-xl" onClick={()=>{create_page()}}>Create Blog</button>

        </div>
      </div>

      <div  >
        {data.map((item, index) => (

        <div key = {index} className="border-2 border-black rounded-lg m-3 p-3 ">
          <div className="pr-3 pl-3  flex justify-between gap-2">
            <div className=" p-2  text-lg   text-white">
              {/* <h1>{item.name[0].toUpperCase()}</h1> */}
              <h1 className="p-2 bg-slate-500 rounded-md ">{item.name}</h1>

       
            </div>
            

            {/* <p className="hidden md:flex">
              <span className="text-2xl  " >&#183;</span> {cre_fun(item)}
            </p> */}
              <div className="p-2 flex gap-6">
            <button className="bg-blue-400 p-1 border-2 rounded-md  hover:bg-blue-600 font-semibold  md:text-lg  text-sm"  onClick={()=>update_page(item._id) } >Update</button>
            <button className="bg-blue-400 p-1 border-2 rounded-md hover:bg-blue-600 font-semibold md:text-lg text-sm"  onClick={()=>change_page(item._id) }>Show</button>
          </div>
          </div>
          <div className="pl-3 pr-3">
            <h2 className="text-xl md:text-2xl  font-medium">{item.title}</h2>

            <p >
            {item.content}
            </p>

            <p className="text-slate-600">{lu_fun(item)}</p>



          </div>


          
        </div>
      

         ) 
      ) }
      </div>
      
    </div>
  );
};

export default Blog;
