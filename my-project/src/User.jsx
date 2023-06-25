import { useEffect, useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

 const [userRef] = useAutoAnimate();


 const filteredData = data.filter((f)=> 
     f.first_name.toLowerCase().includes(searchText.toLowerCase())
 )



  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = async function () {
    const response = await fetch("https://reqres.in/api/users?page=2");
    const resData = await response.json();
    setData(resData.data);
   
  };
  
  if (filteredData.length === 0 ){
    return <h1 className="m-60 text-3xl">No User Found</h1> 
  }

  return (
    <div className="max-w-lg mx-auto shadow-2xl  rounded-sm overflow-hidden md:max-w-2xl  " >
      <div >
        <input
          type="text"

          value={searchText}
          onChange={(e)=> setSearchText(e.target.value)}
          id="username"
          className="w-full hover:translate-y-0 translate-y-2  transform transition duration-300 ease-in-out h-10 px-4 text-sm peer bg-blue-50 border mb-4 shadow-lg outline-none rounded-lg  border-blue-300"

placeholder="Search by first name"
        />
       
      </div>
<div  ref={userRef} >
      {filteredData.map((d) => {
          return (
            <div className="flex items-center  text-black m-4  p-4 border-2 border-blue-400 rounded-2xl hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out " key={d.id}  >
              <img className="rounded-lg object-cover hover:bg-blue-600 transition duration-500 hover:scale-105 md:h-full md:w-48 " src={d.avatar} alt="user-name" />
              <div className="mx-10 bg-zinc-100 p-4 text-xl border-green-400 rounded-2xl ">
                <p className="font-bold text-xl bg-blue-100 rounded-xl p-2"> {d.first_name} {d.last_name} </p>
                <p >#{d.id}</p>

               
             
              </div>
            </div>
          );
        })}
        </div>
    </div>
  );
}

export default App;
