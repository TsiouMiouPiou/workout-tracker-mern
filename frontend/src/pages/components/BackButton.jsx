import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';

const BackButton = ( {destination = '/'} ) => {
  return (
    <div className='text-5xl ml-10 mt-10'>
       <Link to={destination}>
       <IoMdArrowRoundBack />
       </Link>
    </div>
  )
}

export default BackButton