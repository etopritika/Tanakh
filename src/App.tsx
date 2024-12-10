import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const SectionsPage = React.lazy(() => import("./pages/SectionsPage"));
const BooksPage = React.lazy(() => import("./pages/BooksPage"));
const ChaptersPage = React.lazy(() => import("./pages/ChaptersPage"));
const VersesPage = React.lazy(() => import("./pages/VersesPage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Завантаження...</div>}>
        <Routes>
          <Route path="/sections" element={<SectionsPage />} />

          <Route path="/sections/:sectionName/books" element={<BooksPage />} />

          <Route
            path="/sections/:sectionName/books/:bookName/chapters"
            element={<ChaptersPage />}
          />

          <Route
            path="/sections/:sectionName/books/:bookName/chapters/:chapterId/verses"
            element={<VersesPage />}
          />

          <Route
            path="/sections/:sectionName/search/:query"
            element={<SearchPage />}
          />

          <Route path="*" element={<Navigate to="/sections" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
