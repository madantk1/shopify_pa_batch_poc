import Head from "next/head";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/client";
import { AppProvider } from "@shopify/polaris";
import { Provider, useAppBridge } from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import translations from "@shopify/polaris/locales/en.json";
import { Grommet, ResponsiveContext } from "grommet";
import themeConfig from "../grommetConfig.json";

function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}

function MyProvider(props) {
  const app = useAppBridge();

  const client = new ApolloClient({
    fetch: userLoggedInFetch(app),
    fetchOptions: {
      credentials: "include",
    },
  });

  const Component = props.Component;

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Picsart Batch Editor</title>
        <meta
          name="description"
          content="Demo picsart batch editor integrated shopify app"
        />
      </Head>
      <Grommet full theme={themeConfig}>
        <Component {...props} />
      </Grommet>
    </ApolloProvider>
  );
}

const MyApp = ({ Component, pageProps, host }) => {
  return (
    <AppProvider i18n={translations}>
      <Provider
        config={{
          apiKey: API_KEY,
          host: host?.toString("base64"),
          forceRedirect: true,
        }}
      >
        <MyProvider Component={Component} {...pageProps} />
      </Provider>
    </AppProvider>
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    host: ctx.query.host,
  };
};

export default MyApp;
