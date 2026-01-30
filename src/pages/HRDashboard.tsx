import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CandidateCard } from '@/components/hr/CandidateCard';
import { CandidateProfile } from '@/components/hr/CandidateProfile';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { candidates as initialCandidates, type Candidate } from '@/lib/mockData';
import { Search, Filter, Users, TrendingUp, Clock, CheckCircle2, Brain, Shield } from 'lucide-react';

type ScoreFilter = 'all' | 'high' | 'medium' | 'low';
type StatusFilter = 'all' | 'pending' | 'reviewed' | 'approved' | 'rejected';

export default function HRDashboard() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scoreFilter, setScoreFilter] = useState<ScoreFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filteredCandidates = candidates
    .filter(c => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          c.name.toLowerCase().includes(query) ||
          c.appliedFor.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .filter(c => scoreFilter === 'all' || c.communicationScore === scoreFilter)
    .filter(c => statusFilter === 'all' || c.status === statusFilter)
    .sort((a, b) => b.overallScore - a.overallScore);

  const handleUpdateStatus = (candidateId: string, status: Candidate['status']) => {
    setCandidates(prev => 
      prev.map(c => c.id === candidateId ? { ...c, status } : c)
    );
    if (selectedCandidate?.id === candidateId) {
      setSelectedCandidate({ ...selectedCandidate, status });
    }
  };

  const stats = {
    total: candidates.length,
    highScore: candidates.filter(c => c.communicationScore === 'high').length,
    pending: candidates.filter(c => c.status === 'pending').length,
    approved: candidates.filter(c => c.status === 'approved').length,
  };

  if (selectedCandidate) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-hero">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4">
            <CandidateProfile 
              candidate={selectedCandidate}
              onBack={() => setSelectedCandidate(null)}
              onUpdateStatus={(status) => handleUpdateStatus(selectedCandidate.id, status)}
            />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Header */}
      <section className="bg-gradient-hero py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-2xl lg:text-3xl font-bold">HR Dashboard</h1>
              <p className="text-muted-foreground">AI-assisted candidate screening</p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-primary/5 border border-primary/20 px-4 py-2">
              <Brain className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">AI Screening Active</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              { label: 'Total Applicants', value: stats.total, icon: <Users className="h-5 w-5" /> },
              { label: 'High Score', value: stats.highScore, icon: <TrendingUp className="h-5 w-5 text-success" /> },
              { label: 'Pending Review', value: stats.pending, icon: <Clock className="h-5 w-5 text-warning" /> },
              { label: 'Approved', value: stats.approved, icon: <CheckCircle2 className="h-5 w-5 text-success" /> },
            ].map((stat, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-4 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  {stat.icon}
                </div>
                <p className="font-display text-2xl font-bold mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search candidates..."
                className="w-full h-10 rounded-lg border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Score Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Score:</span>
              <div className="flex gap-1">
                {(['all', 'high', 'medium', 'low'] as ScoreFilter[]).map(filter => (
                  <Button
                    key={filter}
                    variant={scoreFilter === filter ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setScoreFilter(filter)}
                    className="capitalize"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <div className="flex gap-1">
                {(['all', 'pending', 'reviewed', 'approved'] as StatusFilter[]).map(filter => (
                  <Button
                    key={filter}
                    variant={statusFilter === filter ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter(filter)}
                    className="capitalize"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Notice */}
      <section className="py-4 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 text-sm">
            <Shield className="h-5 w-5 text-primary" />
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">AI assists, you decide:</span> Candidates are ranked by AI-generated 
              communication scores. Review AI explanations and use your judgment for final decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Candidate List */}
      <main className="flex-1 py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredCandidates.length} candidates, sorted by AI score
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="high">High: 80+</Badge>
              <Badge variant="medium">Medium: 60-79</Badge>
              <Badge variant="low">Low: &lt;60</Badge>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {filteredCandidates.map((candidate, i) => (
              <div 
                key={candidate.id}
                className="animate-slide-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <CandidateCard 
                  candidate={candidate}
                  onSelect={setSelectedCandidate}
                />
              </div>
            ))}
          </div>

          {filteredCandidates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No candidates match your filters.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
