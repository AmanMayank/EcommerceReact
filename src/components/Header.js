import React from 'react'
import {useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, Container} from 'react-bootstrap'

const Header = () => {

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    return (
        <header>
            <Navbar bg ="dark" variant ='dark' expand ="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Ecommerce</Navbar.Brand>
                    </LinkContainer>
                    <Nav className="mr-auto">
                    <LinkContainer to='/productlist'>
                        <Nav.Link href="/productlist">Products</Nav.Link>
                    </LinkContainer>
                    </Nav>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                    <LinkContainer to='/cart'>
                        <Nav.Link href="/cart"><i class="fas fa-shopping-cart"></i> ({cartItems.reduce((acc,item) => acc+item.qty, 0)}) Cart</Nav.Link>
                    </LinkContainer> 

                    <LinkContainer to='/Login'>
                        <Nav.Link href="/login"><i class="far fa-user"></i> Sign In</Nav.Link>
                    </LinkContainer>      
                        </Nav>
                    </Navbar.Collapse>
                </Container>
           </Navbar>
        </header>
    )
}

export default Header
