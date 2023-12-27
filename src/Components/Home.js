import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Cards from './Cards';
const Home = () => {
  const [searchParameter,setSearchParameter]=useState("football");
  const [sort,setSort]=useState(false);
  return (
    <div style={{overflowX:'hidden'}}>
    <Navbar setSearchParameter={setSearchParameter} setSort={setSort}/>
   
     <Cards searchParameter={searchParameter} sort={sort}/>
    
     </div>
  )
}

export default Home
