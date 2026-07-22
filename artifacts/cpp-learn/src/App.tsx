import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { AppLayout } from '@/components/layout/app-layout';

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
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: false,
    },
  },
});

function Router() {
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
        <Route path="/achievements" component={AchievementsPage} />
        <Route path="/flashcards" component={FlashcardsPage} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
