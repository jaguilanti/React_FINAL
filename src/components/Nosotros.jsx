import React, { useEffect } from 'react'
import './Nosotros.css'
const Nosotros = () => {

  useEffect(() => {

    const clickear = () => {
      console.log("Click");
    }

    window.addEventListener("click", clickear)

    return () => {
      window.removeEventListener("click", clickear)
    }

  }, [])

  return (
    <div className="about">
      <h1>¿Quienes Somos?</h1>
      <div>
        <p className="ap1">Sorella es un emprendimiento, un sueño que fuimos planenado y proyectando. Tiene su origen en Río Segundo, una ciudad del interior de Córdoba, donde nos brinda calidez, familiaridad y cariño. A fines del 2022 decidimos transformar este sueño y proyecto, en algo mucho mas grande, entonces nos trasladamos a una esquina epica de nuestra ciudad, la cual hicieron que Sorella crezca y se fortalezca cada dia un poco mas. <br/> Este sueño no hubiera sido posible sin todas esas clientas, familiares y amigos que nos impulsaron a crecer y que hacen que cada día sigamos avanzando en nuestro gran sueño.</p>
        <div className="a1">
          <h2>Nuestra Mision</h2>
          <p>Vestir a las mujeres del mundo con prendas exclusivas y unicas.</p>
          <h2>Nuestra Vision</h2>
          <p>Destacarnos a nivel nacional por la exclusividad y calidad de nuestras prendas</p>
        </div>
        <div className="a2">
          <h2>Nuestros Valores</h2>
          <p>Respeto, Responsabilidad, Compromiso, Autenticidad, Trabajo en equipo y Empatía</p>
        </div>

      </div>
    </div>
  )
}

export default Nosotros