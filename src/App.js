import './App.css';
import '../src/page/CSS/main.css';
import '../src/page/CSS/base.css';
import '../src/page/CSS/login.css';
import '../src/page/CSS/signUp.css';
import '../src/page/CSS/viewproduct.css';
import '../src/page/CSS/ckeditor.css';
import '../src/page/CSS/cart.css';
import '../src/page/CSS/order.css';
import '../src/page/CSS/orderStatus.css';

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './page/Login.jsx';
import Signup from './page/Signup.jsx';
import Layout from './layouts/Layout.jsx';

import Container from './components/homepage/Container.jsx';
import ProductPage from './page/ProductPage.jsx';
import Cart from './page/Cart.jsx';
import Order from './page/Order.jsx';
import OrderStatus from './page/OrderStatus.jsx';

import { CartProvider } from './context/CartContext.js';

import { ProductProvider } from './context/ProductContext.js';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("TẤT CẢ");

  useEffect(() => {
    async function getAllProduct() {
      try {
        const response = await axios.get('/product/getAll');
        if (response.status === 200) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllProduct();
  }, []);

  return (
    <CartProvider>
      
        <ProductProvider>
          <Router>
            <div className='App'>
              <Routes>
                {/* Routes cho người dùng */}
                <Route path="/" element={<Layout setFilter={setFilter} products={products} />}>
                  <Route path="/" element={<Container products={products} filter={filter} />} />
                  <Route path="/products/:productId" element={<ProductPage products={products} />} />
                  <Route path="/page/:page" element={<Container products={products} filter={filter} />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/orderStatus" element={<OrderStatus />} />
                </Route>

                {/* Routes cho trang đăng nhập/đăng ký */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                
              </Routes>
            </div>
          </Router>
        </ProductProvider>
      
    </CartProvider>
  );
}

export default App;
