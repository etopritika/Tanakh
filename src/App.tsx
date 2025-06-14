import { LoaderCircle } from "lucide-react";
import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import { ROUTES } from "./lib/routes";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

const AuthPage = React.lazy(() => import("./pages/AuthPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const BooksPage = React.lazy(() => import("./pages/BooksPage"));
const ChaptersPage = React.lazy(() => import("./pages/ChaptersPage"));
const VersesPage = React.lazy(() => import("./pages/VersesPage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const BlueprintsPage = React.lazy(() => import("./pages/BlueprintsPage"));
const CalendarPage = React.lazy(() => import("./pages/CalendarPage"));

function App() {
  return (
    <Router>
      <Layout>
        <Suspense
          fallback={
            <section className="flex h-full items-center justify-center py-6">
              <div className="flex space-x-2" role="status">
                <LoaderCircle
                  className="animate-spin"
                  aria-hidden="true"
                  focusable="false"
                />
                <p>Загрузка страницы...</p>
              </div>
            </section>
          }
        >
          <Routes>
            <Route
              path={ROUTES.blueprints}
              element={
                <PrivateRoute>
                  <BlueprintsPage />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.calendar}
              element={
                <PrivateRoute>
                  <CalendarPage />
                </PrivateRoute>
              }
            />
            <Route path={ROUTES.auth} element={<AuthPage />} />
            <Route
              path={ROUTES.forgotPassword}
              element={<ForgotPasswordPage />}
            />

            <Route
              path={ROUTES.home}
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.search}
              element={
                <PrivateRoute>
                  <SearchPage />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.section}
              element={
                <PrivateRoute>
                  <BooksPage />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.book}
              element={
                <PrivateRoute>
                  <ChaptersPage />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.chapter}
              element={
                <PrivateRoute>
                  <VersesPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
