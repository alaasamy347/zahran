// Components
import Layout from "../components/global/Layout/Layout";
// Styles
import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
// Redux
import { Provider } from "react-redux";
import { store } from "../redux/store";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component
          {...pageProps}
          layout={Component.getLayout}
          checkout={Component.checkOut}
        />
      </Layout>
    </Provider>
  );
};

export default MyApp;
