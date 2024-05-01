import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout';
import Home from './routes/home';
import Information from './routes/information';
import Attend from './routes/attend';
import Course from './routes/course';
import NoticeBoard from './routes/notice-board';
import Record from './routes/record';
import AttendForm from './routes/attend-form';
import { SuccessPage } from './routes/success';
import { FailPage } from './routes/fail';
import { CheckoutPage } from './routes/checkout';
import Login from './routes/login';
import AdminLayout from './components/admin-layout';
import AdminPage from './routes/admin-page';
import ProtectedRoute from './components/protected-route';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "information",
        element: <Information />,
      },
      {
        path: "attend",
        element: <Attend />,
      },
      {
        path: "course",
        element: <Course />,
      },
      {
        path: "record",
        element: <Record />,
      },
      {
        path: "noticeboard",
        element: <NoticeBoard />,
      },
      {
        path: "/attend/attend-form",
        element: <AttendForm />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/success",
        element: <SuccessPage />,
      },
      {
        path: "/fail",
        element: <FailPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <AdminPage />
      },
    ]
  }
]);

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {     background-color: white ;     color: black;     font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;   }
`;

function App() {

  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  )
}

export default App
