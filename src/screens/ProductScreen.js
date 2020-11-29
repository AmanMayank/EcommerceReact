import React ,{ useState,useEffect} from 'react'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import{Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails} from '../actions/productAction'

toast.configure()
const ProductScreen = ({ history,match}) => {
    const[qty, setQty] = useState(1)
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    useEffect(() =>{
        dispatch(listProductDetails(match.params.id))
    },[dispatch, match])

    const addToCartHandler = () => {
        toast('Added to Cart', { autoClose: 2000 })
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <>
          <Link className='btn btn-light my-3' to='/'>Go Back</Link>

          {loading ? <h2>Loading...</h2> : error? <h3>{error}</h3> : (
              <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value = {product.rating}/>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price : Rs {product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description : {product.description}
                    </ListGroup.Item>

                </ListGroup>
              </Col>

              <Col md={3}>
                  <Card>
                      <ListGroup variant='flush'>
                          <ListGroup.Item>
                              <Row>
                                  <Col>
                                        Price :
                                  </Col>
                                  <Col>
                                        <strong>Rs {product.price} </strong>
                                  </Col>
                              </Row>
                          </ListGroup.Item>

                          <ListGroup.Item>
                              <Row>
                                  <Col>Qty</Col>
                                  <Col>
                                    <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                        {[...Array(product.countInStock).keys()].map(x=> (
                                            <option key={x+1} value ={x+1}>{x+1}</option>
                                        ))}
                                    </Form.Control>
                                  </Col>
                              </Row>
                          </ListGroup.Item>

                          <ListGroup.Item>
                              <Button onClick={addToCartHandler} className='btn-block' type='button'>Add To Cart</Button>
                          </ListGroup.Item>
                      </ListGroup>
                  </Card>
              </Col>
          </Row>
          )}

          
        </>
    )
}

export default ProductScreen