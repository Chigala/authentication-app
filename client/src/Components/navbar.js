import React from 'react'
import { ReactComponent as Logo } from '../Assets/Logo/devchallenges.svg'
import { MdKeyboardArrowDown } from 'react-icons/md'
import DropDownMenu from './dropDown'

export const NavBar = ({ name,photourl }) => {
  return (
    <div className='px-5 lg:px-8 md:px-8 pt-4 flex justify-between w-full h-fit'>
      <div className='my-auto'>
        <Logo />
      </div>

      <div className='flex space-x-2 items-center'>
        <img
          className='h-6 w-6 rounded-md object-fill'
          src={photourl}
          alt=''
        />
        <p className='hidden lg:inline md:inline text-black'>{name}</p>
        {/* <MdKeyboardArrowDown className='hidden lg:inline md:inline'/> */}
        <DropDownMenu />
      </div>
    </div>
  )
}
