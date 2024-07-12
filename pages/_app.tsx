import "../public/css/styles.css";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StyleProvider, ThemePicker } from "vcc-ui";
import { CarCatalogue, Learn, Shop } from "../src/components";

function HomePage() {
  return (
    <div>
      {typeof window === "undefined" ? null : (
        <React.StrictMode>
          <StyleProvider>
            <ThemePicker variant="light">
              <main>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<CarCatalogue />} />
                    <Route path="/learn/:id" element={<Learn />} />
                    <Route path="/shop/:id" element={<Shop />} />
                  </Routes>
                </BrowserRouter>
              </main>
            </ThemePicker>
          </StyleProvider>
        </React.StrictMode>
      )}
    </div>
  );
}

export default HomePage;
