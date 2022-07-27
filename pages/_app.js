import WebContextProvider from '../context/webContext';
import UserContextProvider from '../context/userContext';
import '../styles/globals.css';
import 'fomantic-ui-css/semantic.css';
import '../components/appointment/card.css';
import NavBar from '../components/navBar/NavBar';
import { Windmill } from '@windmill/react-ui';
const Layout = ({ children }) => (
  <>
    <NavBar />
    {children}
  </>
);

const MyApp = ({ Component, pageProps }) => (
  <Windmill>
    <WebContextProvider>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </WebContextProvider>
  </Windmill>
);

export default MyApp;
