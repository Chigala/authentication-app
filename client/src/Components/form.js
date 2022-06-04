import React from 'react'
import { ReactComponent as Logo } from '../Assets/Logo/devchallenges.svg'
import { ReactComponent as Facebook } from '../Assets/Logo/Facebook.svg'
import { ReactComponent as Github } from '../Assets/Logo/Gihub.svg'
import { ReactComponent as Google } from '../Assets/Logo/Google.svg'
import { ReactComponent as Twitter } from '../Assets/Logo/Twitter.svg'
import { BiEnvelope } from 'react-icons/bi'
import { AiTwotoneLock } from 'react-icons/ai'
import {
  handleGoogle,
  handleGithub,
  handleTwitter
} from '../Pages/Login/login-logic'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '../Helper/form-validation'
import { handleRegister } from '../Pages/Register/register-logic'
import { handleLogin } from '../Pages/Login/login-logic'

export const Form = ({
  header,
  body,
  headerShow,
  bodyShow,
  belowFormText,
  showLogin,
  loginShow
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registerSchema)
  })

  return (
    <div className='lg:border-[1px] md:border-[1px]  lg:border-[#BDBDBD] lg:rounded-lg h-full md:h-fit lg:h-fit w-full lg:w-[25%] md:w-[25%] px-8 lg:px-10 md:px-10 py-7 space-y-8 lg:space-y-3 md:space-y-3'>
      <Logo className='w-24' />
      {headerShow && (
        <p className='font-bold text-lg lg-text-sm md:text-sm'>{header}</p>
      )}
      {bodyShow && (
        <p className='font-light text-base lg:text-[12px] md:text-[12px]'>
          {body}
        </p>
      )}
      {loginShow && <p className='font-bold text-base'>Login</p>}
      <form
        action=''
        onSubmit={
          loginShow ? handleSubmit(handleLogin) : handleSubmit(handleRegister)
        }
        className=' space-y-7 lg:space-y-2 md:space-y-2'
      >
        <div className='relative'>
          <input
            type='text'
            {...register('email')}
            name='email'
            placeholder='Email'
            className='border-[1px] w-full h-12 lg:h-6 md:h-8 border-[#BDBDBD] outline-none rounded-md lg:rounded-sm md:rounded-md placeholder:text-[9px]  pl-6 '
          />
          <p className='text-red-500 text-[8px]'>{errors.email?.message}</p>
          <BiEnvelope className='absolute left-2 top-5 lg:top-2 md:top-2 scale-150 lg:scale-125 md:scale-125 text-gray-500' />
        </div>
        <div className='relative'>
          <input
            type='password'
            name='password'
            {...register('password')}
            placeholder='Password'
            className='border-[1px] w-full h-12 lg:h-6 md:h-8 border-[#BDBDBD] outline-none rounded-md lg:rounded-sm md:rounded-md placeholder:text-[9px] pl-6 '
          />
          <p className='text-red-500 text-[8px]'>{errors.password?.message}</p>
          <AiTwotoneLock className='absolute left-2 top-5 lg:top-2 md:top-2 scale-150 lg:scale-125 md:scale-125 text-gray-500' />
        </div>
        <button
          type='submit'
          className='  w-full h-10 lg:h-6 md:h-6 text-white rounded-md  text-[9px] text-center bg-blue-600'
        >
          Start coding now
        </button>
      </form>
      <p className='text-xs lg:text-[8px] md:text-[8px] text-center'>
        {belowFormText}
      </p>
      <div className='flex justify-center space-x-6 lg:space-x-2 md:space-x-2 cursor-pointer'>
        <Google onClick={handleGoogle} />
        <Facebook />
        <Github onClick={handleGithub} />
        <Twitter onClick={handleTwitter} />
      </div>
      <p className=' text-xs lg:text-[8px] md:text-[8px] text-center'>
        {showLogin ? 'Already a member?' : "Don't have an account yet?"}
        <span className='text-blue-500 cursor-pointer '>
          {' '}
          {showLogin ? 'Login' : 'Register'}
        </span>{' '}
      </p>
    </div>
  )
}
