import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import CreateProduct from './pages/CreateProduct'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                  path="/profile"
                  element={
                      <ProtectedRoute>
                          <Profile />
                      </ProtectedRoute>
                  }
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/create-product" element={<CreateProduct />} /> {/* <- новый */}
              <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </main>
      <Footer />
    </div>
  )
}