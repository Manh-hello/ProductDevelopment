import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import VocabularyListPage from "../pages/VocabularyListPage";
import VocabularyNewPage from "../pages/VocabularyNewPage";

/**
 * Router tập trung một chỗ để dễ thêm route mới ở các phase sau
 * (ví dụ: route bảo vệ bằng ProtectedRoute khi có authentication ở Phase 3).
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "vocabulary", element: <VocabularyListPage /> },
      { path: "vocabulary/new", element: <VocabularyNewPage /> },
    ],
  },
]);
