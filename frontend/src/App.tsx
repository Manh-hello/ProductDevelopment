import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MultiPracticePage from './pages/MultiPracticePage';
import SentencePracticePage from './pages/SentencePracticePage';
import VocabularyPage from './pages/VocabularyPage';
import QuizPage from './pages/QuizPage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import AddVocabularyPage from './pages/AddVocabularyPage';
import VocabularyDetailPage from './pages/VocabularyDetailPage';
import EditVocabularyPage from './pages/EditVocabularyPage';
import PracticeHubPage from './pages/PracticeHubPage';
import ReverseQuizPage from './pages/ReverseQuizPage';
import PinyinPracticePage from './pages/PinyinPracticePage';
import PracticeResultPage from './pages/PracticeResultPage';
import SrsReviewPage from './pages/SrsReviewPage';
import SentenceOrderingPage from './pages/SentenceOrderingPage';
import ReviewCompletePage from './pages/ReviewCompletePage';
import TranslationPracticePage from './pages/TranslationPracticePage';
import FillBlankPage from './pages/FillBlankPage';
import SentenceCreationPage from './pages/SentenceCreationPage';
import TranslationHubPage from './pages/TranslationHubPage';
import WritingPracticePage from './pages/WritingPracticePage';
import DictationPage from './pages/DictationPage';
import ListeningPage from './pages/ListeningPage';
import SpeakingPage from './pages/SpeakingPage';
import StatisticsPage from './pages/StatisticsPage';
import AchievementsPage from './pages/AchievementsPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/practice/multi" element={<MultiPracticePage />} />
        <Route path="/sentences" element={<SentencePracticePage />} />
        <Route path="/vocabulary" element={<VocabularyPage />} />
        <Route path="/practice/quiz" element={<QuizPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/vocabulary/new" element={<AddVocabularyPage />} />
        <Route path="/vocabulary/:id" element={<VocabularyDetailPage />} />
        <Route path="/vocabulary/:id/edit" element={<EditVocabularyPage />} />
        <Route path="/practice" element={<PracticeHubPage />} />
        <Route path="/practice/reverse-quiz" element={<ReverseQuizPage />} />
        <Route path="/practice/pinyin" element={<PinyinPracticePage />} />
        <Route path="/practice/result" element={<PracticeResultPage />} />
        <Route path="/review" element={<SrsReviewPage />} />
        <Route path="/practice/sentence-order" element={<SentenceOrderingPage />} />
        <Route path="/review/complete" element={<ReviewCompletePage />} />
        <Route path="/practice/translation" element={<TranslationPracticePage />} />
        <Route path="/practice/fill-blank" element={<FillBlankPage />} />
        <Route path="/practice/sentence-creation" element={<SentenceCreationPage />} />
        <Route path="/practice/translation-hub" element={<TranslationHubPage />} />
        <Route path="/practice/writing" element={<WritingPracticePage />} />
        <Route path="/practice/dictation" element={<DictationPage />} />
        <Route path="/practice/listening" element={<ListeningPage />} />
        <Route path="/practice/speaking" element={<SpeakingPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
