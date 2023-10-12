import { LoaderIcon } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center w-full'>
        <LoaderIcon className="m-10 h-6 w-6 animate-spin" />
    </div>
    )
}

export default Loader