//Aqui formateamos valores en caso de que alguno tenga minuscula en la primera letra lo pasamos a mayus
export function toCapital(str) {
    if (!str) {
        return ""; // Retorna una cadena vacía si str es null o undefined
    }

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
