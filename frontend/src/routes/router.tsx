import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { FocusLayout } from "../layouts/FocusLayout";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import VocabularyListPage from "../pages/VocabularyListPage";
import VocabularyAddPage from "../pages/VocabularyAddPage";
import VocabularyEditPage from "../pages/VocabularyEditPage";
import VocabularyDetailPage from "../pages/VocabularyDetailPage";
import ReviewPage from "../pages/ReviewPage";
import ExercisePage from "../pages/ExercisePage";
import StatisticsPage from "../pages/StatisticsPage";
import SettingsPage from "../pages/SettingsPage";

/**
 * Router tập trung một chỗ để dễ thêm route mới ở các phase sau
 * (ví dụ: route bảo vệ bằng ProtectedRoute khi có authentication thật).
 *
 * 3 layout khác nhau theo ngữ cảnh:
 * - AuthLayout: login/register - centered, không có sidebar
 * - AppLayout: các trang chính - sidebar + topbar
 * - FocusLayout: review/exercise - immersive, không phân tâm
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "vocabulary", element: <VocabularyListPage /> },
      { path: "vocabulary/new", element: <VocabularyAddPage /> },
      { path: "vocabulary/:id", element: <VocabularyDetailPage /> },
      { path: "vocabulary/:id/edit", element: <VocabularyEditPage /> },
      { path: "statistics", element: <StatisticsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "/",
    element: <FocusLayout />,
    children: [
      { path: "review", element: <ReviewPage /> },
      { path: "exercises", element: <ExercisePage /> },
    ],
  },
]);
