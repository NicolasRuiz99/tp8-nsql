import axios from 'axios';
import Swal from 'sweetalert2';

//alert functions

const alertSuccess = () => {
    return Swal.fire(
        'Éxito!',
        'La operación a finalizado correctamente!',
        'success'
    )
}

const alertError = () => {
    return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Ocurrió un fallo!'
    })
}

const alertConfirm = () => {
    return Swal.fire({
        title: 'Confirmar operación',
        text: "Los cambios serán irreversibles!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
    })
}

//backend request functions

const list_restaurants = () => {
    return axios
        .get("http://localhost:5000/")
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}


export {
    alertConfirm,
    alertError,
    alertSuccess,
    list_restaurants
};