import React from 'react'

const Footer = () => {
    const clickHandler=()=>{
        const githubUrl = 'https://github.com/jaydwivedi12';
        window.open(githubUrl, '_blank')
    }
  return (
    <div>
       <div className='bg-orange-50 border-2 py-10 flex flex-wrap justify-around items-center '>
         <div className='flex items-center text-center'>
        Designed & Developed by <span className='font-bold'>Jay</span>
         </div>
         <div className="font-bold hover:cursor-pointer" onClick={clickHandler}> 
         <i className="fa-brands fa-github fa-2xl">&nbsp;</i>jaydwivedi12
         </div>
       </div>
    </div>
  )
}

export default Footer
