import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import TabBar from './components/TabBar/TabBar';
import Home from './screens/Home/Home';
import FlashcardReview from './screens/FlashcardReview/FlashcardReview';
import SessionSummary from './screens/SessionSummary/SessionSummary';
import SOPList from './screens/SOPList/SOPList';
import SOPDetail from './screens/SOPDetail/SOPDetail';
import Catalogue from './screens/Catalogue/Catalogue';
import ProductDetail from './screens/ProductDetail/ProductDetail';

const SESSION_ROUTES = ['/review', '/summary'];

function Layout() {
  const location = useLocation();
  const isSessionRoute = SESSION_ROUTES.some(r => location.pathname.startsWith(r));

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<FlashcardReview />} />
        <Route path="/summary" element={<SessionSummary />} />
        <Route path="/sop" element={<SOPList />} />
        <Route path="/sop/:id" element={<SOPDetail />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/catalogue/:id" element={<ProductDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {!isSessionRoute && <TabBar />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
