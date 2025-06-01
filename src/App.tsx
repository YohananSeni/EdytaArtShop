import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AnimatePresence } from 'framer-motion';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Prints = lazy(() => import('./pages/Prints'));
const Originals = lazy(() => import('./pages/Originals'));
const Workshops = lazy(() => import('./pages/Workshops'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen w-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          } />
          
          <Route path="about" element={
            <Suspense fallback={<PageLoader />}>
              <About />
            </Suspense>
          } />
          
          <Route path="prints" element={
            <Suspense fallback={<PageLoader />}>
              <Prints />
            </Suspense>
          } />
          
          <Route path="originals" element={
            <Suspense fallback={<PageLoader />}>
              <Originals />
            </Suspense>
          } />
          
          <Route path="workshops" element={
            <Suspense fallback={<PageLoader />}>
              <Workshops />
            </Suspense>
          } />
          
          <Route path="product/:id" element={
            <Suspense fallback={<PageLoader />}>
              <ProductDetail />
            </Suspense>
          } />
          
          <Route path="event/:id" element={
            <Suspense fallback={<PageLoader />}>
              <EventDetail />
            </Suspense>
          } />
          
          <Route path="cart" element={
            <Suspense fallback={<PageLoader />}>
              <Cart />
            </Suspense>
          } />
          
          <Route path="checkout" element={
            <Suspense fallback={<PageLoader />}>
              <Checkout />
            </Suspense>
          } />
          
          <Route path="order-confirmation/:orderId" element={
            <Suspense fallback={<PageLoader />}>
              <OrderConfirmation />
            </Suspense>
          } />
          
          <Route path="*" element={
            <Suspense fallback={<PageLoader />}>
              <NotFound />
            </Suspense>
          } />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;