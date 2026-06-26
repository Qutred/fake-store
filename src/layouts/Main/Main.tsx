import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Outlet } from 'react-router-dom';
import MainContainerStyles from './Main.module.css';

const Main = () => {
  return (
    <div className={MainContainerStyles.layoutContainer}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
