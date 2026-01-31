import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JobCard } from '@/components/jobs/JobCard';
import { ApplicationFlow } from '@/components/application/ApplicationFlow';
import { AstraChatbot } from '@/components/chat/AstraChatbot';
import { jobs, type Job } from '@/lib/mockData';
import { Rocket, Search, Sparkles, Shield, Users, MapPin, Brain } from 'lucide-react';
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
              <Rocket className="h-4 w-4" />
              Space42 Digital Navigator
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4 animate-slide-up">
              Your Journey to Space
              <span className="text-gradient-primary"> Starts Here</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Join Space42 — the UAE's AI-powered SpaceTech leader. Our innovative application process 
              matches your skills to our missions in Space Services and Smart Solutions.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search roles by title, department, or location..."
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
                icon: <Brain className="h-6 w-6" />,
                title: 'Skill-to-Mission Mapping',
                description: 'Our AI matches your unique skills to the right team and projects'
              },
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: 'Explainable AI',
                description: 'Get transparent recommendations with clear reasoning'
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: 'Human Final Decision',
                description: 'AI assists, but real people make all hiring decisions'
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

      {/* Business Units Overview */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-center mb-8">Our Business Units</h2>
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="rounded-xl border border-border bg-card p-6 hover:shadow-card transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                  <Rocket className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">Space Services</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Satellite communications, mobility solutions, and managed services. Leveraging Yahsat's heritage in space operations.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Satellite Ops', 'SatCom', 'Ground Systems'].map(tag => (
                  <span key={tag} className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 hover:shadow-card transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-accent text-accent-foreground">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">Smart Solutions</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                AI-powered geospatial analytics and smart city solutions. Built on Bayanat's expertise in data intelligence.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Geospatial', 'AI/ML', 'Analytics'].map(tag => (
                  <span key={tag} className="inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold">Open Positions</h2>
              <p className="text-muted-foreground">{filteredJobs.length} opportunities at Space42</p>
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
              <p className="text-muted-foreground">No positions found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <AstraChatbot />
    </div>
  );
};

export default Index;
