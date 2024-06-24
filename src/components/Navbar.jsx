import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div><Link to="/" className="logo"><h1>Sorella</h1></Link></div>
      <ul className="menu">
        <li><Link className="menu-link" to="/">Inicio</Link></li>
        <li><Link className="menu-link" to="/productos">Productos</Link></li>
        <li><Link className="menu-link" to="/productos/Indumentaria">Indumentaria</Link></li>
        <li><Link className="menu-link" to="/productos/Calzado">Calzado</Link></li>
        <li><Link className="menu-link" to="/productos/Accesorios">Accesorios</Link></li>
        <li><Link className="menu-link" to="/nosotros">Nosotros</Link></li>
        <li><Link className="menu-link" to="/contacto">Contacto</Link></li>
        <li><CartWidget /></li>
      </ul>
    </nav>
  );
}

export default Navbar;

 
