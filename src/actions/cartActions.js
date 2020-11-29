import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const addToCart = (id, qty) => async(dispatch, getState) => {
    const response = await fetch("https://my-json-server.typicode.com/AmanMayank/Products/products?id="+id)
    const data = await response.json()
    const [item] = data 

    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            product:item.id,
            name:item.name,
            image:item.image,
            price:item.price,
            countInStock:item.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}