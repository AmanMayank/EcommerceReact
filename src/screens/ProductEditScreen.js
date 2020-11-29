import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { listProductDetails, updateProduct } from '../actions/productAction'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id

    const[name, setName] = useState('')
    const[image, setImage] = useState('')
    const[price, setPrice] = useState(0)
    const[description, setDescription] = useState('')
    const[rating, setRating] = useState(0)
    const[countInStock, setCountInStock] = useState(0)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = productUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({ type: PRODUCT_UPDATE_RESET})
            history.push('/productlist')
        }else{
            if(!product.name || product.id === productId){
            dispatch(listProductDetails(productId))
        }else{
            setName(product.name)
            setImage(product.image)
            setPrice(product.price)
            setDescription(product.description)
            setRating(product.rating)
            setCountInStock(product.countInStock)
        }
        }
        
    }, [dispatch, history, productId, product, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            id:productId,
            name,
            image,
            price,
            description,
            rating,
            countInStock
        }))
        toast('Done!!', { autoClose: 2000 })
        
    }

    return (
        <>
            <Link to ='/productlist' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <h2>Loading...</h2>}
                {errorUpdate && <h3>{error}</h3>}
                {loading ? <h2>Loading...</h2> : error? <h3>{error}</h3> : (
                  <Form onSubmit = {submitHandler}>  
                   
                   <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type = 'name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                    </Form.Group>


                    <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type = 'text'
                        placeholder='Enter image url'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type = 'number'
                        placeholder='Enter price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type = 'text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                        type = 'number'
                        placeholder='Enter rating'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                        type = 'number'
                        placeholder='Enter Count In Stock'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Update</Button>
                    
                 </Form>
                )}
            </FormContainer>
            
        </>
    )
}

export default ProductEditScreen
