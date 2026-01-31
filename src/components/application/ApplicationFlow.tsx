import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Upload, FileText, Mic, CheckCircle2, AlertCircle, Shield, Gamepad2 } from 'lucide-react';
import type { Job } from '@/lib/mockData';
import { applicationQuestions, voicePrompt } from '@/lib/mockData';
import { VoiceRecorder } from './VoiceRecorder';
import { AIEvaluation } from './AIEvaluation';
import { ProblemSolvingGame } from './ProblemSolvingGame';

interface ApplicationFlowProps {
  job: Job;
  onComplete: () => void;
  onBack: () => void;
}

type Step = 'cv' | 'game' | 'questions' | 'voice' | 'evaluation' | 'complete';

const steps: { id: Step; label: string; icon: React.ReactNode }[] = [
  { id: 'cv', label: 'Resume', icon: <Upload className="h-4 w-4" /> },
  { id: 'game', label: 'Challenge', icon: <Gamepad2 className="h-4 w-4" /> },
  { id: 'questions', label: 'Questions', icon: <FileText className="h-4 w-4" /> },
  { id: 'voice', label: 'Voice Check', icon: <Mic className="h-4 w-4" /> },
  { id: 'evaluation', label: 'AI Review', icon: <CheckCircle2 className="h-4 w-4" /> },
];

export function ApplicationFlow({ job, onComplete, onBack }: ApplicationFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>('cv');
  const [cvUploaded, setCvUploaded] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [voiceRecorded, setVoiceRecorded] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationComplete, setEvaluationComplete] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameScore, setGameScore] = useState(0);

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      if (steps[nextIndex].id === 'evaluation') {
        setIsEvaluating(true);
        setCurrentStep('evaluation');
        // Simulate AI evaluation
        setTimeout(() => {
          setIsEvaluating(false);
          setEvaluationComplete(true);
        }, 3000);
      } else {
        setCurrentStep(steps[nextIndex].id);
      }
    }
  };

  const handlePrev = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'cv':
        return true; // CV is optional
      case 'game':
        return gameCompleted;
      case 'questions':
        return Object.keys(answers).length >= 1;
      case 'voice':
        return voiceRecorded;
      default:
        return false;
    }
  };

  const handleGameComplete = (score: number, timeSpent: number) => {
    setGameScore(score);
    setGameCompleted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-8">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Job Listings
          </button>
          <h1 className="font-display text-2xl font-bold">Apply for {job.title}</h1>
          <p className="text-muted-foreground mt-1">{job.department} • {job.location}</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-3">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  index <= currentStepIndex ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                  index < currentStepIndex 
                    ? 'border-primary bg-primary text-primary-foreground' 
                    : index === currentStepIndex
                    ? 'border-primary bg-primary/10'
                    : 'border-muted'
                }`}>
                  {index < currentStepIndex ? <CheckCircle2 className="h-4 w-4" /> : step.icon}
                </div>
                <span className="hidden sm:inline font-medium">{step.label}</span>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content */}
        <div className="rounded-xl border border-border bg-card p-8 shadow-card animate-fade-in">
          {currentStep === 'cv' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-semibold mb-2">Upload Your Resume</h2>
                <p className="text-muted-foreground text-sm">
                  This step is optional but recommended. Your resume helps us understand your background better.
                </p>
              </div>

              <div 
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer hover:border-primary/50 ${
                  cvUploaded ? 'border-success bg-success-light' : 'border-border'
                }`}
                onClick={() => setCvUploaded(true)}
              >
                {cvUploaded ? (
                  <div className="flex flex-col items-center gap-3">
                    <CheckCircle2 className="h-12 w-12 text-success" />
                    <p className="font-medium">resume_john_doe.pdf</p>
                    <p className="text-sm text-muted-foreground">Click to replace</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <Upload className="h-12 w-12 text-muted-foreground" />
                    <p className="font-medium">Click to upload your resume</p>
                    <p className="text-sm text-muted-foreground">PDF, DOC, or DOCX (max 5MB)</p>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4 text-sm">
                <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  You can skip this step if you prefer. The AI will evaluate your communication skills 
                  based on your written and voice responses.
                </p>
              </div>
            </div>
          )}

          {currentStep === 'game' && (
            <ProblemSolvingGame 
              onComplete={handleGameComplete}
              isCompleted={gameCompleted}
            />
          )}

          {currentStep === 'questions' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-semibold mb-2">Written Questions</h2>
                <p className="text-muted-foreground text-sm">
                  Please answer at least one question. These help us understand your fit for the role.
                </p>
              </div>

              <div className="space-y-6">
                {applicationQuestions.map((question, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block font-medium text-sm">
                      {question}
                      {index === 0 && <span className="text-danger ml-1">*</span>}
                    </label>
                    <textarea
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      rows={4}
                      placeholder="Type your answer here..."
                      value={answers[index] || ''}
                      onChange={(e) => setAnswers({ ...answers, [index]: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {(answers[index] || '').length} / 500 characters
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'voice' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-semibold mb-2">Voice Communication Check</h2>
                <p className="text-muted-foreground text-sm">
                  Record a short voice response to help us assess your English communication skills.
                </p>
              </div>

              <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                <p className="font-medium text-primary mb-2">Your prompt:</p>
                <p className="text-foreground">{voicePrompt}</p>
              </div>

              <VoiceRecorder 
                onRecordingComplete={() => setVoiceRecorded(true)}
                isRecorded={voiceRecorded}
              />

              <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4 text-sm">
                <Shield className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Privacy & Consent</p>
                  <p>
                    Your voice recording will be processed by AI to evaluate communication clarity. 
                    It will only be reviewed by HR staff if you advance to the next stage. 
                    By recording, you consent to this processing.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'evaluation' && (
            <AIEvaluation 
              isEvaluating={isEvaluating}
              onComplete={onComplete}
            />
          )}
        </div>

        {/* Navigation */}
        {currentStep !== 'evaluation' && (
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button 
              variant="hero" 
              onClick={handleNext}
              disabled={currentStep === 'voice' && !canProceed()}
            >
              {currentStep === 'voice' ? 'Submit Application' : 'Continue'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
