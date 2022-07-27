import React from 'react'
import modals from '../modals'

const Modal = ({name,data}) => {

    console.log(modals[0].name,'merhaba')
    const modall = modals.find(dizi => dizi.name === name)
    console.log(modall)
  return (  
    <div>
        <modall.element />
    </div>
  )
}

export default Modal