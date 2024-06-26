import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import {
  ActiveSubsPage,
  InActiveSubsPage,
  AvailableSubsPage,
  AllSubsPage,
  NotFoundPage,
  // WastesPage,
  CoverPage,
  LoginPage,
  SubRulesPage,
  PrivacyPolicyPage,
} from './components';

import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<NotFoundPage />}>
        <Route element={<ProtectedRoute />}>
          <Route path="active-subs" element={<ActiveSubsPage />} />
          <Route path="inactive-subs" element={<InActiveSubsPage />} />
          <Route path="available-subs" element={<AvailableSubsPage />} />
          <Route path="all-subs" element={<AllSubsPage />} />
          {/* <Route path="wastes" element={<WastesPage />} /> */}
          <Route path="available-subs/:id" element={<CoverPage />} />
          <Route path="sub-rules" element={<SubRulesPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Route>
    </>
  ),
  {
    basename: '/',
  }
);

export default router;
