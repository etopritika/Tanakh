import { LoaderCircle } from "lucide-react";
import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";
import { ROUTES } from "./lib/routes";

const MainPage = React.lazy(() => import("./pages/MainPage"));
const BooksPage = React.lazy(() => import("./pages/BooksPage"));
const ChaptersPage = React.lazy(() => import("./pages/ChaptersPage"));
const VersesPage = React.lazy(() => import("./pages/VersesPage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));

function App() {
  return (
    <Router>
      <Layout>
        <Suspense
          fallback={
            <section className="flex h-full items-center justify-center py-6">
              <div className="flex space-x-2">
                <LoaderCircle className="animate-spin" />
                <p>Загрузка страницы...</p>
              </div>
            </section>
          }
        >
          <Routes>
            <Route path={ROUTES.home} element={<MainPage />} />
            <Route path={ROUTES.section} element={<BooksPage />} />
            <Route path={ROUTES.book} element={<ChaptersPage />} />
            <Route path={ROUTES.chapter} element={<VersesPage />} />
            <Route path={ROUTES.search} element={<SearchPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
