import { LoaderCircle } from "lucide-react";
import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";

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
            <Route path="/" element={<MainPage />} />

            <Route path="/:sectionName" element={<BooksPage />} />

            <Route path="/:sectionName/:bookName/" element={<ChaptersPage />} />

            <Route
              path="/:sectionName/:bookName/:chapterId/:subChapterId?"
              element={<VersesPage />}
            />

            <Route path="/search" element={<SearchPage />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
