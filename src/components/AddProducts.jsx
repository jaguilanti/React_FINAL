
//Eliminar los ID del data.json, se generan automaticamente al subirlos al firebase

import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import dataJson from "../data/data.json";

const AddProducts = () => {

    const handleClickDatos = async () => {
        try{
            console.log("try")

            dataJson.forEach(( element ) => {
                addDoc(collection(db, "products-sorella"), element)                
            })
            alert("se han subido los datos")
        } catch ( error ) {
            console.log(error)
        }
    }

    return (
        <>
            <button onClick={handleClickDatos}>
                Cargar todos los datos
            </button>
        </>
    )
}

export default AddProducts;