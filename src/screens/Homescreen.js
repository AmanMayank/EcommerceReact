import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import Product from '../components/Product'
import {listProducts} from '../actions/productAction'

const Homescreen = () => {
    
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    useEffect(() =>{
        dispatch(listProducts())
    }, [dispatch])

   
    return (
        <>
            <h1>Latest Products</h1>
            <Button variant='light' className='btn-sm' onClick={() => products.sort((a,b) => a.price-b.price)}>
                Sort by Price
            </Button>
            <Button variant='dark' className='btn-sm'>
                <i class="far fa-window-close"></i>
            </Button>
            {loading ? <h2>Loading...</h2> : error? <h3>{error}</h3> : 
           
            <Row>
                {products.map(product => (
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                        <Product product = {product}/>
                    </Col>
                ))}
            </Row>   } 
            
        </>
    )
}

export default Homescreen
