import { lazy } from 'react';

const AllSubsPage = lazy(() => import('../pages/AllSubsPage'));
const ActiveSubsPage = lazy(() => import('../pages/ActiveSubsPage'));
const InActiveSubsPage = lazy(() => import('../pages/InActiveSubsPage'));
const AvailableSubsPage = lazy(() => import('../pages/AvailableSubsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const WastesPage = lazy(() => import('../pages/WastesPage/'));
const CoverPage = lazy(() => import('../pages/CoverPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));

export {
  ActiveSubsPage,
  InActiveSubsPage,
  AvailableSubsPage,
  NotFoundPage,
  AllSubsPage,
  WastesPage,
  CoverPage,
  LoginPage
};
