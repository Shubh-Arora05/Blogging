import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const FullBlog = () => {
  const { id } = useParams();
  //consolelog("kkjrrk", id);

  const [data, setdata] = useState({});

  const cre_fun = (item) =>{

    const options = { year: "numeric", month: "long", day: "numeric"} ;
    // //consolelog( "fdffn" ,response.data.createdAt) ;
    item.createdAt =  new Date( item.createdAt).toLocaleDateString(undefined, options) ;

    return item.createdAt ;


  }

  const lu_fun = (item) =>{

    const options = { year: "numeric", month: "long", day: "numeric"} ;
    // //consolelog( "fdffn" ,response.data.createdAt) ;
    item.updatedAt =  new Date(item.updatedAt).toLocaleDateString(undefined, options) ;

    return item.updatedAt ;


  }


  const fun = async () => {
    const response = await axios.get(
      `https://blogging-website-12.onrender.com/app/v1/blog/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );


    const ans = response;
    setdata(ans.data.response);
    //consolelog("ans : ", ans);
    // //consolelog("Authorization : " ,  localStorage.getdata('token') );
  };

  useEffect(() => {
    fun();
  }, []);
  return (
    <div>
      {/* <h1>{id}</h1> */}
      <div className="flex justify-between p-3 ">
        <h2 className="text-lg p-2">Blog</h2>
        <div className="rounded-full p-2 text-lg bg-slate-600 text-white">
          {localStorage.getItem("username")}
        </div>
      </div>

      <hr className="border-t-4 p-3" />

      <div  className="border-2 border-black rounded-lg m-3 p-3">
        <div className="pr-3 pl-3 flex gap-2">
        <div className=" p-2  text-lg   text-white">
              {/* <h1>{item.name[0].toUpperCase()}</h1> */}
              <h1 className="p-2 bg-slate-500 rounded-md ">{data.name}</h1>

       
            </div>

          <p>
            <span className="text-2xl">&#183;</span> Created Date  {cre_fun(data)}
          </p>

         
         
        </div>
        <div className="pl-3 pr-3">
          <h2 className="text-xl font-medium">Title: {data.title}</h2>
          <h4 className="text-xl font-medium">Description :</h4>
          
          <p>{data.content}</p>

          <p className="text-slate-600">Last Updated Date {lu_fun(data)}</p>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
