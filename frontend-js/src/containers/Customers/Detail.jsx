import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types'

function Detail({ isPontential }) {
  const { id } = useParams();

  console.log(isPontential, id);
  
  return (
    <div>Detail</div>
  )
}

Detail.propTypes = {
  isPontential: PropTypes.bool
}

export default Detail