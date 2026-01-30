import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, Star, TrendingUp, MessageSquare } from 'lucide-react';
import type { Candidate } from '@/lib/mockData';

interface CandidateCardProps {
  candidate: Candidate;
  onSelect: (candidate: Candidate) => void;
}

export function CandidateCard({ candidate, onSelect }: CandidateCardProps) {
  const scoreColor = 
    candidate.communicationScore === 'high' ? 'text-success' :
    candidate.communicationScore === 'medium' ? 'text-warning' : 'text-danger';

  const scoreBg = 
    candidate.communicationScore === 'high' ? 'bg-success-light' :
    candidate.communicationScore === 'medium' ? 'bg-warning-light' : 'bg-danger-light';

  return (
    <div 
      className="group rounded-xl border border-border bg-card p-5 shadow-soft transition-all duration-200 hover:shadow-card hover:border-primary/20 cursor-pointer"
      onClick={() => onSelect(candidate)}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground font-semibold text-sm">
          {candidate.avatar}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {candidate.name}
            </h3>
            <Badge variant={candidate.status}>{candidate.status}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{candidate.appliedFor}</p>
          
          {/* Key Strengths */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {candidate.aiAnalysis.strengths.slice(0, 2).map((strength, i) => (
              <span 
                key={i}
                className="inline-flex items-center gap-1 rounded-md bg-primary/5 px-2 py-0.5 text-xs text-primary"
              >
                <Star className="h-3 w-3" />
                {strength.length > 30 ? strength.slice(0, 30) + '...' : strength}
              </span>
            ))}
          </div>
        </div>

        {/* Score */}
        <div className="text-right shrink-0">
          <div className={`${scoreBg} rounded-lg px-3 py-2 mb-2`}>
            <div className="flex items-center gap-1.5">
              <TrendingUp className={`h-4 w-4 ${scoreColor}`} />
              <span className={`font-display text-lg font-bold ${scoreColor}`}>
                {candidate.overallScore}
              </span>
            </div>
          </div>
          <Badge variant={candidate.communicationScore}>
            <MessageSquare className="h-3 w-3 mr-1" />
            {candidate.communicationScore}
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Applied {new Date(candidate.appliedDate).toLocaleDateString()}
        </p>
        <Button variant="ghost" size="sm" className="group-hover:bg-primary/10">
          View Details
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
