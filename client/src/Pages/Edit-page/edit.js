import React from 'react'
import { NavBar } from '../../Components/navbar'
import { userSchema } from '../../Helper/form-validation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useOnDrop} from './edit-logic'
// import { getImage } from '../../redux/data'
import { useState } from 'react'

import { BiCamera } from 'react-icons/bi'
import axios from "axios"

export const EditPages = () => {
   
  const user = useSelector(state => state.userData.data)
  const file = useSelector(state => state.imageData.data);


   const useHandleEdit = data => {
    //  const checkEmpty = (value) => {
    //   if(file === null){
    //     return false
    //   }
    //   else{
    //     return true  
    //   }
    //  }
    console.log("this handle edit function is working")
     const newData = {
       ...data, 
       file: file[0]
     }

     console.log(newData.file)
    
     const uploadToCloud = (body) => {
      console.log("this function is working well")
      const url = `http://localhost:5000/profile/update/${user._id}`
       axios.put(url, body).then(response => console.log(response.data)).catch(err=> console.error(err))
    }   

    uploadToCloud(newData )
    
  }
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userSchema)
  })
  const { image, getRootProps, getInputProps } = useOnDrop()


   

  return (
    <div>
      <NavBar name={user.name} photourl={user.photourl} />
      <div className='container flex flex-col px-4 md:mx-auto md:w-1/2 mt-6'>
        <div>
          <p>Back</p>
        </div>
        <div className='flex flex-col py-4 md:px-6 mt-2 space-y-8 md:space-y-3 container md:border-gray md:border-2 md:rounded-md '>
          <div className='space-y-2'>
            <p className='text-base  md:text-xl font-bold'>Change Info</p>
            <p>Changes will be reflected to every services</p>
          </div>
          <div className='flex flex-row items-center space-x-6'>
            <div {...getRootProps()} className='relative'>
              <img
                className='h-16 md:h-24 rounded-md'
                src={image ? image : user.photourl}
                alt=''
              />
              <div className='absolute top-10 left-10 scale-150 z-50 '>
                <BiCamera />
              </div>
            </div>
            <p className='text-[9px] md:text-xs'>CHANGE PHOTO</p>
          </div>
          <form
            action=''
            className='space-y-6'
            onSubmit={handleSubmit(useHandleEdit)}
          >
            {/* <input
              type='file'
              id='file'
              defaultValue={image}
              name='file'
              {...register('file')}
              {...getInputProps()}
              className=''
            />
            <label
              htmlFor='file'
              className='bg-blue-500 rounded-md  text-white pt-1 h-7 text-xs w-24 text-center hover:cursor-pointer'
            ></label> */}
            <div className='flex flex-col space-y-2'>
              <p className='text-xs'>Name</p>
              <input
                type='text'
                defaultValue={user.name}
                name='name'
                {...register('name')}
                placeholder='Enter your name'
                className='px-3 rounded-lg container outline-none border-[1px] border-gray md:w-3/4 h-7'
              />
              <p className='text-red-500 text-[8px]'>{errors.name?.message}</p>
            </div>
            <div className='flex flex-col space-y-2'>
              <p className='text-xs'>BIO</p>
              <textarea
                type='text'
                name='bio'
                {...register('bio')}
                defaultValue={user.bio ? user.bio : 'YOLO'}
                placeholder='Enter your Bio'
                className='px-3 pb-6 rounded-lg container outline-none border-[1px] border-gray md:w-3/4 h-16'
              ></textarea>

              <p className='text-red-500 text-[8px]'>{errors.bio?.message}</p>
            </div>
            <div className='flex flex-col space-y-2'>
              <p className='text-xs'>Phone number</p>
              <input
                type='text'
                name='phonenumber'
                {...register('phonenumber')}
                defaultValue={
                  user.phonenumber ? user.phonenumber : '..........'
                }
                placeholder='Enter your Phone number'
                className='px-3 rounded-lg container outline-none border-[1px] border-gray md:w-3/4 h-7'
              />
              <p className='text-red-500 text-[8px]'>
                {errors.phonenumber?.message}
              </p>
            </div>
            <div className='flex flex-col space-y-2'>
              <p className='text-xs'>Email</p>
              <input
                type='text'
                name='email'
                {...register('email')}
                defaultValue={user.email ? user.email : '........'}
                placeholder='Enter your Email'
                className=' px-3 rounded-lg container outline-none border-[1px] border-gray md:w-3/4 h-7'
              />
              <p className='text-red-500 text-[8px]'>{errors.email?.message}</p>
            </div>
            <div className='flex flex-col space-y-2'>
              <p className='text-xs'>Password</p>
              <input
                type='password'
                name='password'
                {...register('password')}
                defaultValue={'*********'}
                placeholder='Enter your Password'
                className='px-3 rounded-lg container outline-none border-[1px] border-gray md:w-3/4 h-7'
              />
              <p className='text-red-500 text-[8px]'>
                {errors.password?.message}
              </p>
            </div>
            <button
              type='submit'
              className='px-5 py-2 bg-blue-500 rounded-md text-white'
            >
              Save
            </button>
          </form>
        </div>
        <p className='mt-2 hidden md:inline '>Created by chigala</p>
      </div>
    </div>
  )
}
