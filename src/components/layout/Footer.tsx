import { Shield, Lock, Eye, Rocket } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Rocket className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">Space42</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Skill-to-Mission Mapping</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Data Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>Human Final Decision</span>
            </div>
          </div>
          
          <p className="max-w-2xl text-xs text-muted-foreground">
            <strong>Privacy Notice:</strong> Your application data, including voice recordings, is processed securely. 
            AI analysis assists HR teams but does not make final hiring decisions. 
            All data is handled in compliance with UAE data protection regulations.
          </p>
          
          <p className="text-xs text-muted-foreground">
            © 2024 Space42. AI-Powered SpaceTech for a Connected Future.
          </p>
        </div>
      </div>
    </footer>
  );
}
