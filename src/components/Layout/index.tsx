import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ScrollToTop from '../../utils/ScrollToTop';
import styles from './styles.module.css';
import { Suspense, useEffect } from 'react';

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
      </div>
    </ScrollToTop>
  );
}
