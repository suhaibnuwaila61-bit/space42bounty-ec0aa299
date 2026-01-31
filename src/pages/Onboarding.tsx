import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { AstraChatbot } from '@/components/chat/AstraChatbot';
import { onboardingChecklist, space42Info } from '@/lib/mockData';
import { CheckCircle2, Circle, MapPin, Clock, Shirt, Building2, Rocket, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Onboarding = () => {
  const [checklist, setChecklist] = useState(onboardingChecklist);

  const toggleItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = checklist.filter(item => item.completed).length;
  const progress = (completedCount / checklist.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-space py-16 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-medium mb-6 animate-fade-in">
              <Rocket className="h-4 w-4" />
              Welcome to Space42
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4 animate-slide-up">
              Your Day 1 at Space42
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Congratulations on joining our mission! Here's everything you need for a smooth first day.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Onboarding Progress</span>
              <span className="text-sm text-muted-foreground">{completedCount} of {checklist.length} completed</span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Checklist Section */}
      <section className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold mb-6">Day 1 Checklist</h2>
            
            <div className="space-y-4">
              {checklist.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`rounded-xl border p-5 cursor-pointer transition-all animate-slide-up ${
                    item.completed 
                      ? 'border-success bg-success-light' 
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 mt-0.5 ${item.completed ? 'text-success' : 'text-muted-foreground'}`}>
                      {item.completed ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <Circle className="h-6 w-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {completedCount === checklist.length && (
              <div className="mt-8 rounded-xl bg-success-light border border-success p-6 text-center animate-scale-in">
                <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-3" />
                <h3 className="font-display text-xl font-bold text-success mb-2">All Done!</h3>
                <p className="text-sm text-muted-foreground">
                  You've completed all Day 1 tasks. Welcome to the Space42 family!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold mb-6">Quick Info</h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">Headquarters</h3>
                </div>
                <p className="text-sm text-muted-foreground">{space42Info.locations.headquarters}</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">Working Hours</h3>
                </div>
                <p className="text-sm text-muted-foreground">{space42Info.culture.workHours}</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Shirt className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">Dress Code</h3>
                </div>
                <p className="text-sm text-muted-foreground">{space42Info.culture.dressCode}</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Rocket className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">Our Values</h3>
                </div>
                <p className="text-sm text-muted-foreground">{space42Info.culture.values.join(' • ')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AstraChatbot />
    </div>
  );
};

export default Onboarding;
