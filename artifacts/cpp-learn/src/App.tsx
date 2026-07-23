import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { AppLayout } from '@/components/layout/app-layout';
import { LanguageProvider, useLanguage } from '@/hooks/use-language';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import LanguageSelector from '@/components/language-selector';

// Pages
import Dashboard from '@/pages/dashboard';
import LessonBrowser from '@/pages/lessons';
import LessonDetail from '@/pages/lesson-detail';
import QuizPage from '@/pages/quiz';
import GlossaryList from '@/pages/glossary';
import GlossaryTerm from '@/pages/glossary-term';
import FullPlayground from '@/pages/playground';
import AchievementsPage from '@/pages/achievements';
import FlashcardsPage from '@/pages/flashcards';
import AITutorPage from '@/pages/ai-tutor';
import AIStudyPlanner from '@/pages/ai-study-planner';
import LearningHubPage from '@/pages/learning-hub';
import LoginPage from '@/pages/login';
import SignupPage from '@/pages/signup';
import ProfilePage from '@/pages/profile';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: false,
    },
  },
});

// Component that conditionally renders based on language selection
function AppRoutes() {
  const { hasSelectedLanguage } = useLanguage();
  const { isAuthenticated } = useAuth();

  // If no language selected, show the language selector
  if (!hasSelectedLanguage) {
    return <LanguageSelector />;
  }

  // Otherwise, show the main app with layout
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/lessons" component={LessonBrowser} />
        <Route path="/lessons/:id" component={LessonDetail} />
        <Route path="/quiz/:lessonId" component={QuizPage} />
        <Route path="/glossary" component={GlossaryList} />
        <Route path="/glossary/:slug" component={GlossaryTerm} />
        <Route path="/playground" component={FullPlayground} />
        <Route path="/ai-tutor" component={AITutorPage} />
        <Route path="/ai-study-planner" component={AIStudyPlanner} />
        <Route path="/learning-hub" component={LearningHubPage} />
        <Route path="/achievements" component={AchievementsPage} />
        <Route path="/flashcards" component={FlashcardsPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <LanguageProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
              <AppRoutes />
            </WouterRouter>
          </LanguageProvider>
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;