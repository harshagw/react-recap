import React from 'react'
import { CloseOutline, CheckmarkOutline } from 'react-ionicons';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  }).required();

const ContactForm = () => {

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });
      
  return (
      <>
        <div className='header'>
            <h2 className='heading'>Add a Contact</h2>
        </div>

        <div className='body'>
            <div className='contact-form'>
                <div class="input-div">
                    <label for="name">Name</label>
                    <input type="text" id="name"/>
                </div>

                <div class="input-div">
                    <label for="number">Phone number</label>
                    <input type="text" id="number"/>
                </div>

                <div class="input-div">
                    <label for="email">Email</label>
                    <input type="email" id="email"/>
                </div>
            </div>
        </div>

        <div className='footer'>
            <div className='left-button'>
                <CloseOutline className="left-icon" />
                <p>cancel</p>
            </div>

            <a href="#" className='action-button'>
                <CheckmarkOutline color="white" className="action-icon" />
            </a>
        </div>
      </>

  )
}

export default ContactForm