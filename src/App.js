import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Homescreen from './screens/Homescreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <main className='py-3'>
          <Container>
            <Route path ='/' component={Homescreen} exact/>
            <Route path ='/productlist' component={ProductListScreen} />
            <Route path = '/product/:id/edit' component={ProductEditScreen}/> 
            <Route path ='/product/:id' component={ProductScreen} exact/>
            <Route path ='/cart/:id?' component={CartScreen} />
          </Container>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
