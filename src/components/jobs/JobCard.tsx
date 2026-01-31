import { MapPin, Clock, Rocket, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Job } from '@/lib/mockData';

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
}

export function JobCard({ job, onApply }: JobCardProps) {
  const isSpaceServices = job.businessUnit === 'Space Services';
  
  return (
    <div className="group rounded-xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-card hover:border-primary/20">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              {isSpaceServices ? (
                <Rocket className="h-4 w-4" />
              ) : (
                <Briefcase className="h-4 w-4" />
              )}
              <span>{job.department}</span>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className={isSpaceServices ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}
          >
            {job.businessUnit}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{job.posted}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex flex-wrap gap-1.5">
            {job.requirements.slice(0, 2).map((req, i) => (
              <span 
                key={i} 
                className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
              >
                {req.length > 25 ? req.slice(0, 25) + '...' : req}
              </span>
            ))}
            {job.requirements.length > 2 && (
              <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                +{job.requirements.length - 2} more
              </span>
            )}
          </div>
          <Button variant="hero" size="sm" onClick={() => onApply(job)}>
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}
