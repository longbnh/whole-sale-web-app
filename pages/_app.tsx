import "../styles/globals.css";
import "nprogress/nprogress.css";

import NProgress from "nprogress";
import type {AppProps} from "next/app";
import Router from "next/router";
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";

import {Provider} from "react-redux";
import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";

import store from "../app/store";
import {firebaseConfig} from "../app/firebase";
import {StyledEngineProvider} from "@mui/styled-engine";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    initializeApp(firebaseConfig);
    return (
        <StyledEngineProvider injectFirst>
            <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
        </StyledEngineProvider>
    );
}
