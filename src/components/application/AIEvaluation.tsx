import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Brain, MessageSquare, BarChart3, Shield, Sparkles, Rocket, MapPin } from 'lucide-react';

interface AIEvaluationProps {
  isEvaluating: boolean;
  onComplete: () => void;
}

const evaluationSteps = [
  { label: 'Transcribing voice response', icon: <MessageSquare className="h-4 w-4" /> },
  { label: 'Analyzing skills and experience', icon: <BarChart3 className="h-4 w-4" /> },
  { label: 'Mapping skills to mission areas', icon: <Sparkles className="h-4 w-4" /> },
  { label: 'Generating personalized recommendation', icon: <Brain className="h-4 w-4" /> },
];

// Simulated mission mapping result
const missionMapping = {
  recommendedUnit: 'Smart Solutions',
  fitScore: 87,
  explanation: 'Based on your analytical background and problem-solving approach, you are an excellent fit for our Smart Solutions unit. Your experience with data-driven decision making aligns well with our geospatial analytics projects.',
  keyStrengths: [
    'Strong analytical and problem-solving skills',
    'Clear communication of technical concepts',
    'Demonstrated leadership in complex projects'
  ]
};

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
            <Rocket className="h-16 w-16 text-primary animate-pulse" />
            <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-success animate-ping" />
          </div>
        </div>
        <h2 className="font-display text-xl font-semibold mb-2">Mapping Your Skills to Our Missions</h2>
        <p className="text-muted-foreground mb-8">Astra is analyzing your profile...</p>

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
    <div className="py-8">
      <div className="text-center mb-8">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-success-light mb-4">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-2">Application Submitted!</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Your application has been analyzed and forwarded to our HR team.
        </p>
      </div>

      {/* Skill-to-Mission Mapping Result */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold mb-1">Skill-to-Mission Mapping</h3>
            <p className="text-sm text-muted-foreground">AI-powered recommendation based on your profile</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
            <span className="font-medium">Recommended Unit</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              <Rocket className="h-3.5 w-3.5" />
              {missionMapping.recommendedUnit}
            </span>
          </div>

          <div className="p-4 rounded-lg bg-card border border-border">
            <h4 className="font-semibold mb-2 text-sm">Why This Match?</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {missionMapping.explanation}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-card border border-border">
            <h4 className="font-semibold mb-3 text-sm">Key Strengths Identified</h4>
            <ul className="space-y-2">
              {missionMapping.keyStrengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* What happens next */}
      <div className="rounded-xl border border-border bg-muted/30 p-6 mb-8">
        <h3 className="font-semibold mb-4">What happens next?</h3>
        <ol className="text-sm space-y-3">
          <li className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">1</span>
            <span>HR reviews your AI-analyzed application and mission mapping</span>
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

      <div className="flex items-start gap-3 rounded-lg bg-primary/5 border border-primary/20 p-4 text-sm mb-8">
        <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">AI assists, humans decide:</span> Our AI provides 
          skill-to-mission recommendations, but all final hiring decisions are made by human HR professionals.
        </p>
      </div>

      <div className="text-center">
        <Button variant="hero" size="lg" onClick={onComplete}>
          <Rocket className="h-4 w-4" />
          Back to Opportunities
        </Button>
      </div>
    </div>
  );
}
