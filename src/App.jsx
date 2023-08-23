import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Navbar from './components/Navbar';
import { useIsFetching } from 'react-query';
import Loading from './components/Loading';
import Customers from './pages/Customers';

const App = () => {
  const isFetching = useIsFetching();

  return (
    <>
      {isFetching ? <Loading /> : null}
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Index />}
        />
        <Route
          path="/customers"
          element={<Customers />}
        />
      </Routes>
    </>
  );
};

export default App;
