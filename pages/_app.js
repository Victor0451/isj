import React, { useState, useEffect } from "react";
import "@/styles/globals.css";
import { Layout } from "@/components/Layouts/Layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { WerchowProvider } from "@/context/WerchowProvider";
import "react-confirm-alert/src/react-confirm-alert.css";
require("dotenv").config();
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <WerchowProvider>
        <Component {...pageProps} />
        <ToastContainer
          className="toast-container"
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </WerchowProvider>
    </Layout>
  );
}
