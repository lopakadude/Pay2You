import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ScrollToTop from '../../utils/ScrollToTop';
import Header from '../icons/Header';
import styles from './styles.module.css';
import { Suspense, useEffect } from 'react';
import Footer from '../icons/Footer';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/all-subs', { replace: true });
    }
  }, [location, navigate]);

  return (
    <ScrollToTop>
      <div className={styles.layout}>
        <Header />
        <main className={styles.layout__main}>
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {/* <Loader size="l" /> */}
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
        <Footer/>
      </div>
    </ScrollToTop>
  );
}
