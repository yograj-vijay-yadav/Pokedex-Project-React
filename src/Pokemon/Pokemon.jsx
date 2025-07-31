import './Pokemon.css';

function Pokemon({ name, image }) {
  return (
    <div className="pokemon-card">
      <div className='name'>{name}</div>
      <div className='img'><img src={image} alt={name}  style={{ width: "400px", height: "400px" }} /></div>
    </div>
  );
}

export default Pokemon;
