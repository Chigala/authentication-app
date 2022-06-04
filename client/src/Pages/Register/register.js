import React from 'react'
import { Form } from '../../Components/form'
import {header,body,bodyShow,headerShow,belowFormText,showLogin,loginShow } from '../../Constants/register-page'





export const RegisterPage = () => {
  return (
    <div className='w-screen h-screen lg:h-screen md:h-sreen flex justify-center items-center '> 
        <Form header={header} body={body} bodyShow={bodyShow} headerShow={headerShow} belowFormText={belowFormText} showLogin={showLogin} loginshow={loginShow} />
    </div>
  )
}
