import WebContextProvider from '../context/webContext';
import UserContextProvider from '../context/userContext';
import '../styles/globals.css';
import myTheme from '../styles/myTheme';
import 'fomantic-ui-css/semantic.css';
import '../components/appointment/card.css';
import NavBar from '../components/navBar/NavBar';
import { Windmill } from '@windmill/react-ui';
import Footer from '../components/footer/Footer';
const Layout = ({ children }) => (
  <>
    <NavBar />
    {children}
    <Footer />
  </>
);

const MyApp = ({ Component, pageProps }) => (
  <div className="bg-gradient-to-r from-slate-100 to-slate-400 border-0">
    <Windmill theme={myTheme} dark>
      <WebContextProvider>
        <UserContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContextProvider>
      </WebContextProvider>
    </Windmill>
  </div>
);

export default MyApp;
