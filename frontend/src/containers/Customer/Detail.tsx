

interface DetailProps extends React.HTMLAttributes<HTMLDivElement> {
    type: "real" | "potential"; 
}


const Detail = ({ type } : DetailProps) => {
  return (
    <div>Detail</div>
  )
}

export default Detail