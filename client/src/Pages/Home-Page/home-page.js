import React from 'react'
import { NavBar } from '../../Components/navbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/user-slice'
import {useNavigate} from 'react-router-dom'



export const HomePage = () => {

  const user = useSelector(state => state.userData.data)
  const navigate = useNavigate(); 
  // const pending = useSelector(state => state.userData.pending)

 
  console.log(user)

  

  return (
    <div className='w-screen h-screen overflow-x-hidden'>
      <NavBar name={user.name} photourl={user.photourl} />
      <div className='w-full h-fit text-center mt-4 lg:mt-10 md:mt-10 space-y-1'>
        <h1 className='text-base font-semibold'>Personal Info</h1>
        <p className='text-[9px] lg:text-xs md:text-xs '>
          Basic info, like your name and phone
        </p>
      </div>
      <div className='w-full h-screen mt-8 relative '>
        <div className='lg:border-[#E0E0E0] md:border-[#E0E0E0] lg:border-[1px] md:border-[1px] w-full lg:w-7/12 md:w-7/12 h-full mx-auto'>
          <div className='border-b-[1px]  w-full h-[15%]'>
            <div className='flex justify-between px-6 items-center py-3 '>
              <div className='flex flex-col'>
                <p className='text-base font-semibold'>Profile</p>
                <p className='text-gray-400 w-4/5 lg:w-full md:w-full'>
                  Some info may be visible to other people
                </p>
              </div>
              <button onClick={() =>navigate("/edit")} className='border-[1px] border-[#E0E0E0] px-5 rounded-lg py-1 '>
                Edit
              </button>
            </div>
          </div>
          <div className='grid  grid-cols-4 lg:grid-cols-3 md:grid-cols-3 border-b-[1px] w-full h-[14%] px-6 space-x-8 '>
            <p className='my-auto col-span-3 lg:col-span-1 md:col-span-1 text-gray-400'>
              Photo
            </p>
            <img
              className='h-12 lg:h-[70%] md:h-[70%] mt-5 lg:mt-1 md:mt-1 w-12 rounded-md '
              src={user.photourl}
              alt=''
            />
          </div>
          <div className='grid grid-cols-3 lg:grid-cols-3 md:grid-cols-3 items-center border-b-[1px] lg:border-b-[1px] md:border-b-[1px] w-full h-[14%] px-6 space-x-8'>
            <p className='text-gray-400  col-span-1 lg:col-span-1 md:col-span-1'>
              Name
            </p>
            <p>{user.name}</p>
          </div>
          <div className='grid  grid-cols-3 items-center border-b-[1px] lg:border-b-[1px] md:border-b-[1px] w-full h-[14%] px-6 space-x-8'>
            <p className='text-gray-400'>BIO</p>
            <p className='col-start-2 col-span-3'>
              {user.bio?user.bio: "................................"}
            </p>
          </div>
          <div className='grid grid-cols-3 items-center border-b-[1px] lg:border-b-[1px] md:border-b-[1px] w-full h-[14%] px-6 space-x-8'>
            <p className='text-gray-400'>PHONE</p>
            <p>{user.phonenumber?user.phonenumber: "................................"}</p>
          </div>
          <div className='grid grid-cols-3 items-center border-b-[1px] lg:border-b-[1px] md:border-b-[1px] w-full h-[14%] px-6 space-x-8'>
            <p className='text-gray-400'>EMAIL</p>
            <p>{user.email?user.email:"................................"}</p>
          </div>
          <div className='grid grid-cols-3 items-center  w-full h-[14%] px-6 space-x-8'>
            <p className='text-gray-400'>PASSWORD</p>
            <p>**********</p>
          </div>
          <div className=' hidden absolute lg:flex md:flex -bottom-5 justify-between w-7/12 px-2'>
            <p className='text-gray-500 font-bold text-[8px]'>
              created by Chigala kingsley
            </p>
            <p className='text-gray-500 font-bold text-[8px]'>
              devchallenges.io
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
