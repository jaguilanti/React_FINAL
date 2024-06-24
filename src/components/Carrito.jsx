import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Carrito.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const Carrito = () => {
  const { carrito, precioTotal, vaciarCarrito, eliminarDelCarrito } = useContext(CartContext);

  const handleVaciar = () => {
    vaciarCarrito();
  };

  const handleEliminar = (id, size, color) => {
    eliminarDelCarrito(id, size, color);
  };

  return (
    <div className="container">
      <h1 className="main-title">Carrito</h1>

      {carrito.length > 0 ? (
        carrito.map((prod) => (
          <div key={`${prod.id}-${prod.size}-${prod.color}`} className="producto-carrito">
            <div className="producto-img">
              <img src={`${process.env.PUBLIC_URL}/${prod.imagen}`} alt={prod.titulo} />
            </div>
            <div className="producto-info">
              <h3>{prod.titulo}</h3>
              <p>Precio unit: ${prod.precio}</p>
              <p>Precio total: ${prod.precio * prod.cantidad}</p>
              <p>Cantidad: {prod.cantidad}</p>
              <p>Talla: {prod.size}</p>
              <p>Color: {prod.color}</p>
              <button type="button" className="btn btn-danger" onClick={() => handleEliminar(prod.id, prod.size, prod.color)}>Eliminar</button>
            </div>
          </div>
        ))
      ) : (
        <h2>El carrito está vacío :(</h2>
      )}

      {carrito.length > 0 && (
        <>
          <h2>Precio total: ${precioTotal()}</h2>
          <div className='botones-carrito'>
            <button type="button" className="btn btn-primary btn-sm" onClick={handleVaciar}>Vaciar Carrito</button>
            <Link type="button" className="btn btn-success" to="/checkout">Finalizar compra</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
