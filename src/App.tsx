/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import DealsPage from "./pages/DealsPage";
import OrderPage from "./pages/OrderPage";
import StoresPage from "./pages/StoresPage";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/stores" element={<StoresPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
