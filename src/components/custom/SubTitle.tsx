import React from 'react'

export const SubTitle = ({text} : {text: string}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-8 ">
    <p className="mt-4 text-neutral-500 font-medium tracking-tight text-lg leading-6 text-center ">
    {text.split('<br/>').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </p>
</div>
  )
}
