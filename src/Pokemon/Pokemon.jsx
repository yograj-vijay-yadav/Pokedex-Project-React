import './Pokemon.css';
import { Link } from 'react-router-dom';

function Pokemon({ name, image ,id }) {
  return (
   <div className="pokemon-card">
      <Link to={`/pokemon/${id}`}> 
        <div className='name'>{name}</div>
        <div className='img'><img src={image} alt={name}  style={{ width: "400px", height: "400px" }} /></div>
       </Link>
    </div>
  );
}

export default Pokemon;
