import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Homes from './component/Home/Homes.jsx';
import Shops from './component/Shop/Shops.jsx';
 
import Bottom from './component/bottom/Bottom.jsx';
 
import Blog from './component/blogs/Blog.jsx';
import Cart from './component/carts/Cart.jsx';
import ProductsBuy from './component/checkProduct/ProductsBuy.jsx';
import Profile from './profileAccount/Profile.jsx';
 
import AdminPanel from './component/Admin Panel/AdminPanel.jsx';
import DashBoard from './component/Admin Panel/DashBoard.jsx';
import PriceSection from './component/Subscription/PriceSection.jsx';
import Voice from './component/AI/Voice.jsx';
import PaymentPage from './Stripe/PaymentPage.jsx';
import SignIn from './component/SignContainer/SignIn.jsx';
import Login from './component/LoginContainer/Login.jsx';
import AddBlogs from './component/BlogPanel/AddBlog.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<><Bottom /></>} />
      <Route path='/shop' element={<Shops />} />
      <Route path='/login' element={<Login />} />
      <Route path='/sign' element={<SignIn />} />
      <Route path='/shop/:name' element={<Shops />} />
      <Route path='/blog' element={<Blog />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/product/:id' element={<ProductsBuy />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/blogpost' element={<AddBlogs />} />
      <Route path='/panel' element={<AdminPanel />} />
      <Route path='/panel/dashboard' element={<DashBoard />} />
      <Route path='/subscription' element={<PriceSection />} />
      <Route path='/voice' element={<Voice />} />
      <Route path='/paymentsuccess' element={<PaymentPage />} />



    </Route>
  )
)

createRoot(document.getElementById('root')).render(




  < RouterProvider router={router} />



)
