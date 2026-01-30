import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Brain, MessageSquare, BarChart3, Shield, Sparkles } from 'lucide-react';

interface AIEvaluationProps {
  isEvaluating: boolean;
  onComplete: () => void;
}

const evaluationSteps = [
  { label: 'Transcribing voice response', icon: <MessageSquare className="h-4 w-4" /> },
  { label: 'Analyzing grammar and clarity', icon: <BarChart3 className="h-4 w-4" /> },
  { label: 'Evaluating communication confidence', icon: <Sparkles className="h-4 w-4" /> },
  { label: 'Generating comprehensive score', icon: <Brain className="h-4 w-4" /> },
];

export function AIEvaluation({ isEvaluating, onComplete }: AIEvaluationProps) {
  const [currentEvalStep, setCurrentEvalStep] = useState(0);

  useEffect(() => {
    if (isEvaluating) {
      const interval = setInterval(() => {
        setCurrentEvalStep((s) => {
          if (s >= evaluationSteps.length - 1) {
            clearInterval(interval);
            return s;
          }
          return s + 1;
        });
      }, 700);
      return () => clearInterval(interval);
    }
  }, [isEvaluating]);

  if (isEvaluating) {
    return (
      <div className="py-12 text-center">
        <div className="mb-8">
          <div className="relative inline-flex">
            <Brain className="h-16 w-16 text-primary animate-pulse" />
            <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-success animate-ping" />
          </div>
        </div>
        <h2 className="font-display text-xl font-semibold mb-2">AI is reviewing your application</h2>
        <p className="text-muted-foreground mb-8">This will only take a moment...</p>

        <div className="max-w-sm mx-auto space-y-3">
          {evaluationSteps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 rounded-lg p-3 transition-all ${
                index < currentEvalStep 
                  ? 'bg-success-light text-success' 
                  : index === currentEvalStep
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {index < currentEvalStep ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : index === currentEvalStep ? (
                <div className="h-5 w-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
              ) : (
                step.icon
              )}
              <span className="text-sm font-medium">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 text-center">
      <div className="mb-6">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-success-light">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </div>
      </div>
      
      <h2 className="font-display text-2xl font-bold mb-2">Application Submitted!</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Thank you for applying. Our AI has analyzed your responses and your application 
        has been forwarded to the HR team for review.
      </p>

      <div className="rounded-xl border border-border bg-muted/30 p-6 max-w-md mx-auto mb-8">
        <h3 className="font-semibold mb-4">What happens next?</h3>
        <ol className="text-sm text-left space-y-3">
          <li className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">1</span>
            <span>HR reviews your AI-analyzed application</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">2</span>
            <span>If shortlisted, you'll receive an interview invitation</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">3</span>
            <span>You'll be notified of the decision within 5-7 business days</span>
          </li>
        </ol>
      </div>

      <div className="flex items-start gap-3 rounded-lg bg-primary/5 border border-primary/20 p-4 max-w-md mx-auto text-sm mb-8">
        <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <p className="text-left text-muted-foreground">
          <span className="font-medium text-foreground">AI assists, humans decide:</span> Our AI provides 
          recommendations, but all final hiring decisions are made by human HR professionals.
        </p>
      </div>

      <Button variant="hero" size="lg" onClick={onComplete}>
        Back to Job Listings
      </Button>
    </div>
  );
}
