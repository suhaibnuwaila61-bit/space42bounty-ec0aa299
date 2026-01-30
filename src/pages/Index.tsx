import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JobCard } from '@/components/jobs/JobCard';
import { ApplicationFlow } from '@/components/application/ApplicationFlow';
import { jobs, type Job } from '@/lib/mockData';
import { Briefcase, Search, Sparkles, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedJob) {
    return (
      <ApplicationFlow 
        job={selectedJob} 
        onComplete={() => setSelectedJob(null)}
        onBack={() => setSelectedJob(null)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              AI-Powered Screening
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4 animate-slide-up">
              Find Your Next Great
              <span className="text-gradient-primary"> Opportunity</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Our innovative application process goes beyond your resume. 
              Showcase your communication skills and stand out to top employers.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search jobs by title, department, or location..."
                className="w-full h-14 rounded-xl border border-border bg-card pl-12 pr-4 text-foreground shadow-soft focus:outline-none focus:ring-2 focus:ring-ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: <Briefcase className="h-6 w-6" />,
                title: 'Beyond the Resume',
                description: 'Show your true potential through voice and written assessments'
              },
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: 'AI-Assisted Review',
                description: 'Get fair evaluations with transparent AI scoring'
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: 'Human Final Decision',
                description: 'Real HR professionals make all hiring decisions'
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="flex items-start gap-4 animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold">Open Positions</h2>
              <p className="text-muted-foreground">{filteredJobs.length} jobs available</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="/hr">
                <Users className="h-4 w-4" />
                HR Portal
              </a>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredJobs.map((job, i) => (
              <div 
                key={job.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <JobCard job={job} onApply={setSelectedJob} />
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No jobs found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
