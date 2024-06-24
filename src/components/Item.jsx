import React from 'react';
import { Link } from 'react-router-dom';
import { toCapital } from '../helpers/toCapital';
import './Item.css'
const Item = ({ producto }) => {
    const rutaImagen = `${process.env.PUBLIC_URL}/${producto.imagen}`;
    return (
        <div className="producto">
            <img src={rutaImagen} alt={producto.titulo} />
            <div>
                <h4>{producto.titulo}</h4>
                <p>Precio: ${producto.precio}</p>
                <p>Categoría: {toCapital(producto.categoria)}</p>
                <p>Stock:{producto.stock}</p>
                <Link to={`/item/${producto.id}`}><p className="ver-mas">Ver Mas</p></Link>
            </div>
        </div>
    );
}

export default Item;
