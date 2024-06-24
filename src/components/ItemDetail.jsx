import React, { useState, useEffect, useContext } from 'react';
import { toCapital } from '../helpers/toCapital';
import ItemCount from './ItemCount';
import { CartContext } from '../context/CartContext';
import Swal from 'sweetalert2';
import './ItemDetail.css';

const ItemDetail = ({ item }) => {
  const { carrito, agregarAlCarrito } = useContext(CartContext);

  const [selectedSize, setSelectedSize] = useState(''); // Estado para la talla seleccionada
  const [selectedColor, setSelectedColor] = useState(''); // Estado para el color seleccionado
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad total a agregar al carrito
  const [stockDisponible, setStockDisponible] = useState(0); // Estado para el stock disponible de la talla y color seleccionados
  const [showSizeColorOptions, setShowSizeColorOptions] = useState(false); // Estado para mostrar las opciones de talla y color

  const rutaImagen = `${process.env.PUBLIC_URL}/${item.imagen}`;

  useEffect(() => {
    // Verificar si el producto es de indumentaria o calzado para mostrar opciones de talla y color
    if (item.categoria === 'Indumentaria' || item.categoria === 'Calzado') {
      setShowSizeColorOptions(true);
    } else {
      setShowSizeColorOptions(false);
      // Mostrar el stock disponible para accesorios
      setStockDisponible(item.stock);
    }
  }, [item.categoria, item.stock]);

  useEffect(() => {
    // Actualizar el stock disponible del producto según la talla y color seleccionados
    if (selectedSize && selectedColor && (item.categoria === 'Indumentaria' || item.categoria === 'Calzado')) {
      const productoSeleccionado = item.talles.find(
        (talle) => talle.nombre === selectedSize && talle.colores.some(color => color.nombre === selectedColor)
      );
      if (productoSeleccionado) {
        setStockDisponible(productoSeleccionado.stock);
        // Ajustar la cantidad si es mayor al stock disponible
        if (cantidad > productoSeleccionado.stock) {
          setCantidad(productoSeleccionado.stock);
        }
      }
    } else {
      // Si no se ha seleccionado talla y color, mostrar el stock general del producto
      setStockDisponible(item.stock);
    }
  }, [selectedSize, selectedColor, item.talles, cantidad, item.stock, item.categoria]);

  useEffect(() => {
    // Verificar si el producto ya está en el carrito y actualizar la cantidad
    const productoEnCarrito = carrito.find(
      (prod) => prod.id === item.id && prod.size === selectedSize && prod.color === selectedColor
    );
    if (productoEnCarrito) {
      setCantidad(productoEnCarrito.cantidad);
    } else {
      setCantidad(1); // Reiniciar cantidad si no está en el carrito
    }
  }, [carrito, item.id, selectedSize, selectedColor]);

  const handleRestar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleSumar = () => {
    if (stockDisponible > cantidad) {
      setCantidad(cantidad + 1);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `No hay suficiente stock disponible de este producto.`,
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  const handleAgregar = () => {
    if (selectedSize && selectedColor && (item.categoria === 'Indumentaria' || item.categoria === 'Calzado')) {
      // Agregar el producto al carrito con talla y color seleccionados
      agregarAlCarrito(item, cantidad, selectedSize, selectedColor);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (!selectedSize && !selectedColor && (item.categoria === 'Indumentaria' || item.categoria === 'Calzado')) {
      // Si no hay opciones de talla y color (para indumentaria y calzado), mostrar mensaje para seleccionar
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Selecciona la talla y el color para ver el stock disponible.',
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      // Para accesorios 
      agregarAlCarrito(item, cantidad);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <div className="container">
      <div className="producto-detalle">
        <div className="contenedor-img">
          <img src={rutaImagen} alt={item.titulo} />
        </div>

        <div>
          <h3 className="titulo">{item.titulo}</h3>
          <p className="descripcion">{item.descripcion}</p>
          <p className="categoria">Categoría: {toCapital(item.categoria)}</p>
          <p className="precio">${item.precio}</p>

          <div className='labels'>
            {/* Seleccionar Talla */}
          {(item.categoria === 'Indumentaria' || item.categoria === 'Calzado') && (
            <div>
              <label>Selecciona la Talla:</label>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                <option value="">Selecciona una talla</option>
                {item.talles.map((talle) => (
                  <option key={talle.nombre} value={talle.nombre}>
                    {talle.nombre} ({talle.stock} disponibles)
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Seleccionar Color */}
          {(item.categoria === 'Indumentaria' || item.categoria === 'Calzado') && selectedSize && (
            <div>
              <label>Selecciona el Color:</label>
              <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                <option value="">Selecciona un color</option>
                {item.talles
                  .find((talle) => talle.nombre === selectedSize)
                  ?.colores?.map((color) => (
                    <option key={color.nombre} value={color.nombre}>
                      {color.nombre}
                    </option>
                  ))}
              </select>
            </div>
          )}
          </div>

          {/* Mostrar contador de stock disponible y botón de agregar al carrito */}
          {stockDisponible > 0 && (
            <ItemCount
              cantidad={cantidad}
              handleSumar={handleSumar}
              handleRestar={handleRestar}
              handleAgregar={handleAgregar}
            />
          )}

          {/* Mostrar mensaje de producto agotado si no hay stock */}
          {stockDisponible === 0 && (
            <p className="agotado">{item.categoria === 'Indumentaria' || item.categoria === 'Calzado' ? 'Selecciona la talla y el color para ver el stock disponible.' : 'Este producto está agotado.'}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;


