import React from 'react'

const ButtonPrimary = ({text} : {text: string}) => {
  return (
    <div>       
         <span id="badge" className="ml px-10 py-3 bg-transparent border-2 border-white rounded-3xl text-md">
            {text}
            </span>
    </div>
  )
}

export default ButtonPrimary