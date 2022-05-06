import React from 'react'
const Contact = ({name, url}) => {
    return (
        <div className='contact'>
            <img src="https://picsum.photos/200/300?random=1"/>
            <h5 className='contact-name'>Harsh Agarwal</h5>
        </div>
    );
}

const ContactList = () => {
  return (
    <>
        <div className='header'>
            <h2 className='heading'>Contacts</h2>
        </div>
        
        <div className='body'>
            <div className='contacts-header'>
                <h4>All</h4>
                <h4 className='add-button'>+</h4>
            </div>
        
            <div className='contacts'>
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
            </div>
        </div>
        
    </>
  )
}

export default ContactList