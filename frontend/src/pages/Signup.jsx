import { useState } from "react"
import { Link , useNavigate} from "react-router"
import axios from "axios"
const Signup = () => {
    const [loading, setloading] = useState(false) ;
    const navigate =  useNavigate() ;  
    const [data, setdata] = useState({
        name: "",
        password : "",
        username : "",
    })
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setloading(true) ;

        try{
    
        //consolelog("data : " ,data) ;
        const response = await axios.post('https://blogging-website-12.onrender.com/app/v1/user/signup' , data) ;
        const jwt = response.data.token ;
        //consolelog("jwt" ,jwt) ;
        localStorage.setItem('token' , jwt) ;
        localStorage.setItem('username', data.username) ;
        navigate('/blog') ;
        }
        catch(error){
             setloading(false) ;
            //consolelog(error) ;
        }

    }
  return (
   <div className="bg-slate-200 h-screen">
    <div className=" w-screen  bg-slate-200 p-9 flex flex-col gap-2 justify-center items-center">

        <div className="   p-12 flex flex-col gap-2 justify-center items-center " >
         <div className="flex flex-col gap-2  justify-center items-center  border-cyan-900 border-2 rounded-lg p-6">
         <h2>Create an account</h2>

         <div className="flex  ">
            <p>Already have an account?</p>
            <Link className="text-blue-900 font-bold text-md  " to = '/signin'  >Login</Link>
         </div>

         <form action="" className="gap-3 flex flex-col  ">

            <div className="flex flex-col gap-1   ">
                <label htmlFor="">Username</label>
                <input type="text" className="outline-none border-2 rounded-xl p-2 text-lg   " placeholder="Enter your username" onChange={(e) =>{setdata({...data , username:e.target.value})}}  />
            </div> 

            <div className="flex flex-col gap-1   ">
                <label htmlFor="">Name</label>
                <input type="text" className="outline-none border-2 rounded-xl p-2 text-lg   " placeholder="name" onChange={(e) =>{setdata({...data , name:e.target.value})}}  />
            </div>


            <div className="flex flex-col gap-1   " >
                <label htmlFor="">Password</label>
                <input type="text" placeholder="password" className="outline-none border-2 rounded-xl p-2 text-lg   " onChange={(e) =>{setdata({...data , password:e.target.value})}} />
            </div>



            <button className="m-2 hover:bg-blue-600 bg-blue-400 border-2 rounded-xl p-1 text-lg   " onClick={(e)=>{handleSubmit(e)}}>{loading ? "Loading..." :"Signup"}</button>

            

         </form>
         </div>
        </div>
        
        <div className="hidden md:flex p-9  md:flex-col justify-center items-center">
           
           <div className="p-3 flex flex-col gap-2">
            <h3 className="text-lg font-bold">
            Don't focus on having a great blog. Focus on producing a blog that's great for your readers.
             </h3>
              
            <div className="flex flex-col gap-0">
             <p className="text-ld font-semibold" >Brian Clark</p>
             
             </div>
             </div>
             
        </div>

    </div>
    </div>
  )
}
 
export default Signup ;