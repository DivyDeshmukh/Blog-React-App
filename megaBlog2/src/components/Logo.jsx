import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div className={`max-w-[${width}] overflow-hidden h-[50px]`}>
      <img src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png" alt="Logo" className='h-full w-full object-cover' />
    </div>
  )
}

export default Logo;

