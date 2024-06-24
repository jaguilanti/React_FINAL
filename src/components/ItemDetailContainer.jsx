import React, { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config'; 

const ItemDetailContainer = () => {
    const [item, setItem] = useState(null);
    const { id } = useParams(); 

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const docRef = doc(db, 'products-sorella', id); 
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // Si el documento existe, establece el estado del item
                    setItem({ ...docSnap.data(), id: docSnap.id });
                } 
            } catch (error) {
                console.error(error); 
            }
        };

        fetchItem(); 
    }, [id]); 

    return (
        <div>
            {item ? <ItemDetail item={item} /> : <div>Cargando...</div>}
        </div>
    );
};

export default ItemDetailContainer;
