
import '../src/page/CSS/main.css';
import '../src/page/CSS/base.css';
import '../src/page/CSS/login.css';
import '../src/page/CSS/signUp.css';
import '../src/page/CSS/viewproduct.css';
import '../src/page/CSS/ckeditor.css';
import '../src/page/CSS/cart.css';
import '../src/page/CSS/order.css';
import '../src/page/CSS/orderStatus.css';
import '../src/page/CSS/admin.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './page/Login.jsx';
import Signup from './page/Signup.jsx';
import Layout from './layouts/Layout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import Container from './components/homepage/Container.jsx';
import ProductPage from './page/ProductPage.jsx';
import Cart from './page/Cart.jsx';
import Order from './page/Order.jsx';
import OrderStatus from './page/OrderStatus.jsx';
import Admin from './page/Admin.jsx';
import CreateUser from './components/admin/user/CreateUser.jsx';
import UpdateUser from './components/admin/user/UpdateUser.jsx';
import ViewUser from './components/admin/user/ViewUser.jsx';
import CreateProduct from './components/admin/product/CreateProduct.jsx';
import UpdateProduct from './components/admin/product/UpdateProduct.jsx';
import ViewProduct from './components/admin/product/ViewProduct.jsx';
import { CartProvider } from './context/CartContext.js';
import { AdminProvider } from './context/AdminContext';
import { ProductProvider } from './context/ProductContext.js';
import { OrderProvider } from './context/OrderContext.js';
import axios from 'axios';
import AdminProduct from './page/AdminProduct.jsx';
import AdminUser from './page/AdminUser.jsx';
import AdminOrder from './page/AdminOrder.jsx';
function App() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("TẤT CẢ");


  useEffect(() => {
    async function getAllProduct() {
      try {
        const response = await axios.get('/product/getAllProduct');
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
      <AdminProvider> {/* Bọc toàn bộ ứng dụng trong AdminProvider */}
        <ProductProvider>
          <OrderProvider>
            <Router>
              <div className='App'>
                <Routes>
                  {/* Routes cho người dùng */}
                  <Route path="/" element={<Layout setFilter={setFilter} products={products} />}>
                    <Route path="/user/update/:userId" element={<UpdateUser />} />
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

                  {/* Routes cho admin */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route path="/admin" element={<Admin />} />
                    <Route path="user" element={<AdminUser />} />
                    <Route path="product/:productId" element={<ViewProduct />} />
                    <Route path="product/pages/:page" element={<AdminProduct />} />
                    <Route path="product" element={<AdminProduct />} />
                    <Route path="user/create" element={<CreateUser />} />
                    <Route path="user/update/:userId" element={<UpdateUser />} />
                    <Route path="user/:userId" element={<ViewUser />} />
                    <Route path="product/create" element={<CreateProduct />} />
                    <Route path="product/update/:productId" element={<UpdateProduct />} />
                    <Route path="order" element={<AdminOrder />} />

                  </Route>
                </Routes>
              </div>
            </Router>
          </OrderProvider>
        </ProductProvider>
      </AdminProvider>
    </CartProvider>

  );
}

export default App;
