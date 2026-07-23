import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  RotateCw, ChevronLeft, ChevronRight, Shuffle, 
  Check, X, BookOpen, Brain
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  example?: string;
}

interface FlashcardDeckProps {
  cards: Flashcard[];
  title: string;
}

export function FlashcardDeck({ cards, title }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());
  const [needsReviewCards, setNeedsReviewCards] = useState<Set<string>>(new Set());
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>(cards);

  const currentCard = shuffledCards[currentIndex];
  const progress = ((currentIndex + 1) / shuffledCards.length) * 100;
  const masteredCount = masteredCards.size;
  const reviewCount = needsReviewCards.size;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(shuffledCards.length - 1);
    }
  };

  const handleMastered = () => {
    const newMastered = new Set(masteredCards);
    newMastered.add(currentCard.id);
    setMasteredCards(newMastered);
    
    // Remove from needs review if it was there
    const newReview = new Set(needsReviewCards);
    newReview.delete(currentCard.id);
    setNeedsReviewCards(newReview);
    
    handleNext();
  };

  const handleNeedsReview = () => {
    const newReview = new Set(needsReviewCards);
    newReview.add(currentCard.id);
    setNeedsReviewCards(newReview);
    
    // Remove from mastered if it was there
    const newMastered = new Set(masteredCards);
    newMastered.delete(currentCard.id);
    setMasteredCards(newMastered);
    
    handleNext();
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsShuffled(true);
  };

  const handleReset = () => {
    setShuffledCards(cards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredCards(new Set());
    setNeedsReviewCards(new Set());
    setIsShuffled(false);
  };

  const getCardStatus = (cardId: string) => {
    if (masteredCards.has(cardId)) return 'mastered';
    if (needsReviewCards.has(cardId)) return 'review';
    return 'unseen';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4 md:px-0">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              <Brain className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              {title}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {shuffledCards.length} flashcards
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleShuffle} 
              className="gap-2 flex-1 sm:flex-none"
            >
              <Shuffle className="w-4 h-4" />
              <span className="hidden sm:inline">Shuffle</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset} 
              className="gap-2 flex-1 sm:flex-none"
            >
              <RotateCw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <div className="bg-card border rounded-lg p-2 md:p-3 text-center">
            <div className="text-xl md:text-2xl font-bold text-green-500">{masteredCount}</div>
            <div className="text-xs text-muted-foreground">Mastered</div>
          </div>
          <div className="bg-card border rounded-lg p-2 md:p-3 text-center">
            <div className="text-xl md:text-2xl font-bold text-amber-500">{reviewCount}</div>
            <div className="text-xs text-muted-foreground">Review</div>
          </div>
          <div className="bg-card border rounded-lg p-2 md:p-3 text-center">
            <div className="text-xl md:text-2xl font-bold text-muted-foreground">
              {shuffledCards.length - masteredCount - reviewCount}
            </div>
            <div className="text-xs text-muted-foreground">Unseen</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs md:text-sm text-muted-foreground">
            <span>Card {currentIndex + 1} of {shuffledCards.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Flashcard */}
      <div className="relative" style={{ perspective: '1000px' }}>
        <div
          className={cn(
            "relative w-full min-h-[400px] md:h-[450px] cursor-pointer transition-transform duration-700",
            isFlipped && "[transform:rotateY(180deg)]"
          )}
          onClick={handleFlip}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front Side */}
          <Card
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8 text-center space-y-4",
              "bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg",
              isFlipped && "invisible"
            )}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex flex-wrap gap-2 justify-center mb-2">
              <Badge variant="outline">
                {currentCard.category}
              </Badge>
              {currentCard.difficulty && (
                <Badge variant={
                  currentCard.difficulty === 'easy' ? 'secondary' :
                  currentCard.difficulty === 'medium' ? 'default' : 'destructive'
                }>
                  {currentCard.difficulty}
                </Badge>
              )}
            </div>
            <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-primary opacity-50" />
            <h3 className="text-xl md:text-2xl font-bold px-4 max-w-full break-words">
              {currentCard.front}
            </h3>
            <div className="mt-auto pt-4">
              <Button variant="outline" size="sm" className="pointer-events-none">
                Click to reveal answer
              </Button>
            </div>
          </Card>

          {/* Back Side */}
          <Card
            className={cn(
              "absolute inset-0 flex flex-col p-6 md:p-8 space-y-4",
              "bg-gradient-to-br from-green-500/5 to-green-500/10 shadow-lg overflow-y-auto",
              !isFlipped && "invisible"
            )}
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="flex items-center justify-center mb-2">
              <Badge variant="outline" className="bg-green-500/10">
                Answer
              </Badge>
            </div>
            <div className="space-y-4 w-full flex-1">
              <p className="text-base md:text-lg leading-relaxed text-center px-2">
                {currentCard.back}
              </p>
              {currentCard.example && (
                <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-3 md:p-4 text-left mt-4">
                  <p className="text-xs text-zinc-400 mb-2 font-semibold">Example Code:</p>
                  <pre className="text-xs md:text-sm overflow-x-auto">
                    <code className="text-green-400 whitespace-pre-wrap break-words">
                      {currentCard.example}
                    </code>
                  </pre>
                </div>
              )}
            </div>
            <div className="text-center pt-2">
              <Button variant="outline" size="sm" className="pointer-events-none">
                Click to see question again
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Navigation and Actions */}
      <div className="space-y-4">
        {/* Mastery Buttons (only show when flipped) */}
        {isFlipped && (
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleNeedsReview();
              }}
              variant="outline"
              size="lg"
              className="gap-2 border-amber-500/50 hover:bg-amber-500/10 h-12 md:h-auto"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Need Review</span>
              <span className="sm:hidden">Review</span>
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleMastered();
              }}
              size="lg"
              className="gap-2 bg-green-600 hover:bg-green-500 h-12 md:h-auto"
            >
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Mastered!</span>
              <span className="sm:hidden">Got it!</span>
            </Button>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center gap-2">
          <Button
            onClick={handlePrevious}
            variant="outline"
            size="lg"
            className="gap-1 md:gap-2 flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </Button>

          <div className="flex gap-1 overflow-x-auto max-w-[200px] md:max-w-none px-2">
            {shuffledCards.map((card, index) => {
              const status = getCardStatus(card.id);
              return (
                <button
                  key={card.id}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsFlipped(false);
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all flex-shrink-0",
                    index === currentIndex && "w-6 md:w-8",
                    status === 'mastered' && "bg-green-500",
                    status === 'review' && "bg-amber-500",
                    status === 'unseen' && "bg-muted"
                  )}
                  title={`Card ${index + 1} - ${status}`}
                  aria-label={`Go to card ${index + 1}`}
                />
              );
            })}
          </div>

          <Button
            onClick={handleNext}
            variant="outline"
            size="lg"
            className="gap-1 md:gap-2 flex-shrink-0"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <Card className="p-3 md:p-4 bg-card/50">
        <p className="text-xs md:text-sm text-muted-foreground text-center">
          <span className="font-semibold">💡 Tip:</span>{' '}
          Click the card to flip • Use Next/Previous to navigate • Mark cards as Mastered or Need Review
        </p>
      </Card>
    </div>
  );
}
