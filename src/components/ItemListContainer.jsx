import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import './ItemListContainer.css';

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);
    const { categoria } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productosRef = collection(db, "products-sorella");
                let q = productosRef;

                if (categoria) {
                    q = query(productosRef, where("categoria", "==", categoria));
                }
                                
                const querySnapshot = await getDocs(q);
                const obtenerProductos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                setProductos(obtenerProductos);
            } catch(error) {
                console.log(error);
            }
        }
        
        fetchData();
    }, [categoria]);

    return (
        <div className="container-ITC">
            <ItemList productos={productos} />
        </div>
    );
}

export default ItemListContainer;



