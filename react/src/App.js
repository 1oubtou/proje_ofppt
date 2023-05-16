import { Route, Routes , BrowserRouter } from "react-router-dom";
import { Home, Login, Register, Dashboard, ProductAdd, NotFoundPage, ProductEdit } from './pages/export';

function App() {
  const routes = [
    { name: '*', element: <NotFoundPage /> },
    { name: '/', element: <Home /> },
    { name: '/product', element: <Dashboard /> },
    { name: '/product/add', element: <ProductAdd /> },
    { name: '/login', element: <Login /> },
    { name: '/register', element: <Register /> },
    { name: '/product/:id', element: <ProductEdit /> },
  ]
  return (
    <div className="flex flex-col h-screen">
      <BrowserRouter>
          <Routes>
            {routes.map((item , i) => (
              <Route key={i} path={item.name} element={item.element} />
            ))}
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;