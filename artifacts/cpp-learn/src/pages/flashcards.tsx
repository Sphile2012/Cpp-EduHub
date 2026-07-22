import { useState } from "react";
import { useGetFlashcards } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, RotateCw, ArrowLeft, ArrowRight, Check, X, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FlashcardsPage() {
  const { data: allCards, isLoading } = useGetFlashcards();
  const [cards, setCards] = useState(allCards || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Sync state when data loads
  useState(() => {
    if (allCards && cards.length === 0) setCards(allCards);
  });

  if (isLoading) return <div className="p-12 text-center animate-pulse">Loading deck...</div>;
  if (!cards || cards.length === 0) {
    if (allCards) setCards(allCards);
    return <div className="p-12 text-center">Preparing cards...</div>;
  }

  const currentCard = cards[currentIndex];

  const handleFlip = () => setIsFlipped(!isFlipped);
  
  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const shuffle = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const shuffled = [...cards].sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setCurrentIndex(0);
    }, 150);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-bold font-handwriting text-primary flex items-center gap-3">
            <Layers className="w-8 h-8" /> Active Recall
          </h1>
          <p className="text-muted-foreground">Space bar to flip. Arrows to navigate.</p>
        </div>
        <div className="font-mono text-xl font-bold text-muted-foreground">
          {currentIndex + 1} / {cards.length}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative perspective-[1000px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + (isFlipped ? '-back' : '-front')}
            initial={{ rotateX: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleFlip}
            className="w-full max-w-2xl aspect-[3/2] cursor-pointer"
          >
            <div className={`w-full h-full rounded-3xl border-4 p-8 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden bg-card ${isFlipped ? 'border-primary/50' : 'border-border'}`}>
              <div className="absolute top-6 left-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {currentCard.category}
              </div>
              <div className="absolute top-6 right-6 text-muted-foreground opacity-50">
                <RotateCw className="w-5 h-5" />
              </div>
              
              <div className={`text-2xl md:text-4xl leading-relaxed ${!isFlipped ? 'font-bold' : 'font-mono text-primary'}`}>
                {isFlipped ? currentCard.back : currentCard.front}
              </div>
              
              <div className="absolute bottom-6 inset-x-0 text-center text-sm text-muted-foreground/50">
                Click anywhere to flip
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <Button variant="outline" size="icon" className="w-12 h-12 rounded-full" onClick={prevCard}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        {isFlipped ? (
          <div className="flex gap-4">
            <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10 gap-2 h-12 px-6 rounded-full" onClick={nextCard}>
              <X className="w-5 h-5" /> Review Again
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 h-12 px-6 rounded-full border-none" onClick={nextCard}>
              <Check className="w-5 h-5" /> Got It
            </Button>
          </div>
        ) : (
          <Button variant="secondary" className="h-12 px-8 rounded-full gap-2 text-lg font-bold" onClick={handleFlip}>
            <RotateCw className="w-5 h-5" /> Flip Card
          </Button>
        )}

        <Button variant="outline" size="icon" className="w-12 h-12 rounded-full" onClick={nextCard}>
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="mt-8 text-center">
        <Button variant="ghost" size="sm" onClick={shuffle} className="text-muted-foreground gap-2">
          <Shuffle className="w-4 h-4" /> Shuffle Deck
        </Button>
      </div>
    </div>
  );
}
