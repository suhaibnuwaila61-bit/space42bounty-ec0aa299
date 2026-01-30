import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, Mail, Phone, FileText, Play, CheckCircle2, 
  XCircle, AlertTriangle, Brain, MessageSquare, Shield,
  Star, TrendingUp, TrendingDown, Info
} from 'lucide-react';
import type { Candidate } from '@/lib/mockData';

interface CandidateProfileProps {
  candidate: Candidate;
  onBack: () => void;
  onUpdateStatus: (status: Candidate['status']) => void;
}

export function CandidateProfile({ candidate, onBack, onUpdateStatus }: CandidateProfileProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayRecording = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const scoreColor = 
    candidate.communicationScore === 'high' ? 'text-success' :
    candidate.communicationScore === 'medium' ? 'text-warning' : 'text-danger';

  const scoreBg = 
    candidate.communicationScore === 'high' ? 'bg-success-light' :
    candidate.communicationScore === 'medium' ? 'bg-warning-light' : 'bg-danger-light';

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Candidates
      </button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Header */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground font-bold text-xl">
                {candidate.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="font-display text-2xl font-bold">{candidate.name}</h1>
                  <Badge variant={candidate.status}>{candidate.status}</Badge>
                </div>
                <p className="text-muted-foreground">{candidate.appliedFor}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <a href={`mailto:${candidate.email}`} className="flex items-center gap-1.5 hover:text-primary">
                    <Mail className="h-4 w-4" />
                    {candidate.email}
                  </a>
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4" />
                    {candidate.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button 
                variant="success" 
                onClick={() => onUpdateStatus('approved')}
                disabled={candidate.status === 'approved'}
              >
                <CheckCircle2 className="h-4 w-4" />
                Approve
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onUpdateStatus('reviewed')}
                disabled={candidate.status === 'reviewed'}
              >
                <FileText className="h-4 w-4" />
                Mark Reviewed
              </Button>
              <Button 
                variant="danger" 
                onClick={() => onUpdateStatus('rejected')}
                disabled={candidate.status === 'rejected'}
              >
                <XCircle className="h-4 w-4" />
                Reject
              </Button>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-primary" />
              <h2 className="font-display text-lg font-semibold">AI Communication Analysis</h2>
            </div>

            <div className="rounded-lg bg-muted/50 p-4 mb-6">
              <p className="text-sm leading-relaxed">{candidate.aiAnalysis.explanation}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Clarity', value: candidate.aiAnalysis.clarity },
                { label: 'Grammar', value: candidate.aiAnalysis.grammar },
                { label: 'Confidence', value: candidate.aiAnalysis.confidence },
                { label: 'Vocabulary', value: candidate.aiAnalysis.vocabulary },
              ].map((metric) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{metric.label}</span>
                    <span className="font-medium">{metric.value}%</span>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 font-medium text-sm mb-3">
                  <TrendingUp className="h-4 w-4 text-success" />
                  Key Strengths
                </h3>
                <ul className="space-y-2">
                  {candidate.aiAnalysis.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Star className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-medium text-sm mb-3">
                  <TrendingDown className="h-4 w-4 text-warning" />
                  Areas to Improve
                </h3>
                <ul className="space-y-2">
                  {candidate.aiAnalysis.areasToImprove.map((area, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Transparency Notice */}
            <div className="flex items-start gap-3 rounded-lg bg-primary/5 border border-primary/20 p-4 mt-6 text-sm">
              <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground mb-1">AI Transparency Notice</p>
                <p className="text-muted-foreground">
                  This analysis is AI-generated to assist your decision. It should not be the sole 
                  basis for hiring decisions. Consider the full context of the candidate's background 
                  and conduct your own assessment.
                </p>
              </div>
            </div>
          </div>

          {/* Written Responses */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-lg font-semibold mb-4">Written Responses</h2>
            <div className="space-y-4">
              {candidate.writtenResponses.map((response, i) => (
                <div key={i} className="space-y-2">
                  <p className="font-medium text-sm">{response.question}</p>
                  <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
                    {response.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Voice Recording */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h2 className="font-display text-lg font-semibold">Voice Response</h2>
              </div>
              <Button variant="outline" size="sm" onClick={handlePlayRecording} disabled={isPlaying}>
                <Play className="h-4 w-4" />
                {isPlaying ? 'Playing...' : 'Play Recording'}
              </Button>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground mb-2 font-medium">AI Transcript:</p>
              <p className="text-sm italic">"{candidate.voiceTranscript}"</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Score Summary */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-semibold mb-4">Overall Score</h3>
            <div className={`${scoreBg} rounded-xl p-6 text-center mb-4`}>
              <p className={`font-display text-5xl font-bold ${scoreColor}`}>
                {candidate.overallScore}
              </p>
              <p className="text-sm text-muted-foreground mt-1">out of 100</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Badge variant={candidate.communicationScore} className="text-sm px-3 py-1">
                {candidate.communicationScore.toUpperCase()} Communication
              </Badge>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                <p>
                  Score based on English clarity, grammar, confidence, and vocabulary from voice and written responses.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-semibold mb-4">Application Details</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Applied</dt>
                <dd className="font-medium">{new Date(candidate.appliedDate).toLocaleDateString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Position</dt>
                <dd className="font-medium">{candidate.appliedFor}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Resume</dt>
                <dd className="font-medium">{candidate.cvUrl ? 'Uploaded' : 'Not provided'}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
