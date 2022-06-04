import React from 'react'
import { Form } from '../../Components/form'
import {bodyShow,headerShow,belowFormText, showLogin, loginShow} from "../../Constants/login-page"

export const LoginPage = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center '> 
    <Form bodyShow={bodyShow} headerShow={headerShow} belowFormText={belowFormText} showLogin={showLogin} loginShow={loginShow} />
</div>
  )
}
