import { useEffect } from "react"

const UseTitle = ( title : string) => {
    useEffect(() => {
        document.title = title
    }, [title])
}

export default UseTitle