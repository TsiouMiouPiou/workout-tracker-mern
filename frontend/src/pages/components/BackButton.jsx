import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';

const BackButton = ( {destination = '/'} ) => {
  return (
    <div className='text-5xl'>
       <Link to={destination}>
       <IoMdArrowRoundBack />
       </Link>
    </div>
  )
}

export default BackButton