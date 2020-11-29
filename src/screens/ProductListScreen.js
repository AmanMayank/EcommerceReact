import React, {useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { listProducts,deleteProduct, createProduct } from '../actions/productAction'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'

const ProductListScreen = ({history, match}) => {
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const {loading, error, products} = productList
    
    const productDelete = useSelector((state) => state.productDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete

    const productCreate = useSelector((state) => state.productCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, product: createdProduct} = productCreate

    useEffect(() =>{
        dispatch({ type:PRODUCT_CREATE_RESET})
        
        if(successCreate){
            history.push(`/product/${createdProduct.id}/edit`)
        }else{
            dispatch(listProducts())
        }
    },[dispatch, history, successDelete, successCreate, createdProduct])

    const deleteHandler =(id) =>{
        dispatch(deleteProduct(id))
        toast('Product Deleted', { autoClose: 2000 })
    }

    const createProductHandler=()=>{
        dispatch(createProduct())
    }

    return(
      
        <>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i class="fas fa-plus"></i>  Create Product
                </Button>
            </Col>
        </Row>
        {loadingDelete && <h2>Loading...</h2>}
        {errorDelete && <h3>{error}</h3>}
        {loadingCreate && <h2>Loading...</h2>}
        {errorCreate && <h3>{error}</h3>}
        {loading ? <h2>Loading...</h2> : error? <h3>{error}</h3> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>DESCRIPTION</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>Rs {product.price}</td>
                            <td>{product.description}</td>
                            <td>
                                <LinkContainer to={`product/${product.id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i class="far fa-edit"></i>
                                    </Button>
                                </LinkContainer>   
                            </td>
                            <td>
                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product.id)}>
                                    <i class="fas fa-trash-alt"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}  
        </>
    )
}

export default ProductListScreen
