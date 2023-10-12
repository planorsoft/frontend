import { useState } from 'react'

const useForceUpdate = () => {
    const [, setToggle] = useState(false);
    return () => setToggle(toggle => !toggle);
}

export default useForceUpdate