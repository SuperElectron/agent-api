'use client'


import React, {useState} from 'react'
import {FiHeart} from 'react-icons/fi'

const Heart = () => {
    const [favorite, setFavorite] = useState<boolean>(false);

    const toggleFavorite = () => {
        setFavorite(!favorite);
    }
    return (
        <div onClick={toggleFavorite} className='relative text-white cursor-pointer p-3'>
            <FiHeart size={25} className={favorite ? 'fill-red-500' : 'fill-black/30'}/>
        </div>
    )
}

export default Heart