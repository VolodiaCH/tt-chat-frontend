import { Suspense } from "react";
import Layout from "../layout/Layout.tsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes.ts";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map(({ index, name, href, Component }) => (
          <Route
            index={index}
            key={name}
            path={href}
            element={
              <Suspense fallback={<div />}>
                <Component />
              </Suspense>
            }
          />
        ))}
      </Route>

      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};

export default AppRouter;
