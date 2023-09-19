import {Outlet} from 'react-router-dom';
import Header from './Header';
import '../../css/common/Common.css';
import '../../css/common/Layout.css';

const Layout = () => {
    return (
        <div id="wrap">
            <Header />
            <main className="main">
                <Outlet />
            </main>
        </div>
    );
  };
  
  export default Layout;