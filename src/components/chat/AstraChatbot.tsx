import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send, Rocket, Briefcase, UserCheck } from 'lucide-react';
import { space42Info, onboardingChecklist } from '@/lib/mockData';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

interface AstraChatbotProps {
  onNavigateToOnboarding?: () => void;
}

const welcomeMessage = "Hi! I'm Astra, your Space42 Guide. 🚀\n\nAre you exploring career opportunities at Space42, or are you a new hire getting ready for Day 1?";

export function AstraChatbot({ onNavigateToOnboarding }: AstraChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: welcomeMessage,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [userType, setUserType] = useState<'candidate' | 'new-hire' | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Detect user type
    if (!userType) {
      if (lowerMessage.includes('candidate') || lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('apply') || lowerMessage.includes('opportunit')) {
        setUserType('candidate');
        return "Welcome, future Space42 team member! 🌟\n\nI'm here to help you learn about our exciting opportunities. We have two main business units:\n\n**Space Services** - Satellite communications & connectivity\n**Smart Solutions** - AI-powered geospatial analytics\n\nWhat would you like to know more about? You can ask about specific roles, our company culture, or the application process!";
      }
      if (lowerMessage.includes('new hire') || lowerMessage.includes('day 1') || lowerMessage.includes('first day') || lowerMessage.includes('onboarding') || lowerMessage.includes('starting')) {
        setUserType('new-hire');
        return "Welcome to Space42! 🎉 Congratulations on joining our mission to transform space technology!\n\nI can help you with:\n• Your Day 1 Checklist\n• Office locations & facilities\n• Company policies & culture\n• Meeting your team\n\nWould you like me to show you your onboarding checklist, or do you have specific questions?";
      }
    }

    // Candidate-specific responses
    if (userType === 'candidate' || lowerMessage.includes('space42') || lowerMessage.includes('company')) {
      if (lowerMessage.includes('bayanat') || lowerMessage.includes('yahsat') || lowerMessage.includes('merger')) {
        return `Space42 was formed from the merger of two UAE space industry leaders:\n\n**Bayanat** - A pioneer in geospatial intelligence and AI analytics\n**Yahsat** - The UAE's flagship satellite communications company\n\nThis merger created a unique AI-powered SpaceTech company capable of delivering end-to-end space and smart solutions. We're now one of the region's most ambitious space technology companies!`;
      }
      if (lowerMessage.includes('space services') || lowerMessage.includes('satellite') || lowerMessage.includes('satcom')) {
        return `**Space Services** is one of our core business units:\n\n${space42Info.businessUnits.spaceServices.description}\n\n**Key Areas:**\n${space42Info.businessUnits.spaceServices.keyAreas.map(a => `• ${a}`).join('\n')}\n\nWe have roles like Satellite Operations Engineer and SatCom Systems Specialist. Would you like to explore specific positions?`;
      }
      if (lowerMessage.includes('smart solutions') || lowerMessage.includes('geospatial') || lowerMessage.includes('analytics')) {
        return `**Smart Solutions** leverages AI and satellite data:\n\n${space42Info.businessUnits.smartSolutions.description}\n\n**Key Areas:**\n${space42Info.businessUnits.smartSolutions.keyAreas.map(a => `• ${a}`).join('\n')}\n\nRoles include Geospatial Analyst and AI/ML Engineer. Interested in learning more?`;
      }
      if (lowerMessage.includes('apply') || lowerMessage.includes('application') || lowerMessage.includes('how do i')) {
        return "Our application process is unique! 🎯\n\nInstead of just reviewing resumes, we use **Skill-to-Mission Mapping** to match your abilities with the right team:\n\n1. **Upload your CV** (optional)\n2. **Complete a problem-solving challenge**\n3. **Answer written questions**\n4. **Record a voice response**\n5. **AI provides personalized recommendations**\n\nScroll down on the home page to see our open positions and start your application!";
      }
    }

    // New hire-specific responses
    if (userType === 'new-hire') {
      if (lowerMessage.includes('checklist') || lowerMessage.includes('day 1') || lowerMessage.includes('first day')) {
        return `Here's your Day 1 Checklist:\n\n${onboardingChecklist.map((item, i) => `${i + 1}. **${item.title}**\n   📍 ${item.location}`).join('\n\n')}\n\nWould you like more details about any of these steps?`;
      }
      if (lowerMessage.includes('badge') || lowerMessage.includes('security') || lowerMessage.includes('access')) {
        return "🔐 **Security Badge Collection**\n\nVisit the Security Office on the Ground Floor with:\n• Your Emirates ID or Passport\n• Signed offer letter\n• Work permit (if applicable)\n\nThe office is open 8 AM - 4 PM, Sunday to Thursday. Your badge grants access to all general areas and your department floor.";
      }
      if (lowerMessage.includes('laptop') || lowerMessage.includes('computer') || lowerMessage.includes('it ') || lowerMessage.includes('equipment')) {
        return "💻 **IT Setup**\n\nHead to the IT Help Desk on Floor 2. They'll provide:\n• Your laptop with pre-configured software\n• Email and Microsoft 365 access\n• VPN credentials for remote work\n• Slack and internal tools access\n\nBring your badge - they'll need to verify your identity!";
      }
      if (lowerMessage.includes('hq') || lowerMessage.includes('headquarters') || lowerMessage.includes('abu dhabi') || lowerMessage.includes('office') || lowerMessage.includes('location') || lowerMessage.includes('address')) {
        return `📍 **Abu Dhabi Headquarters**\n\nOur main office is located in Masdar City, Abu Dhabi - a hub for sustainable technology and innovation.\n\n**Getting There:**\n• By car: Ample parking available\n• By metro: Masdar City is accessible via the planned metro extension\n• By bus: Multiple routes serve Masdar City\n\nReception is on the ground floor. Don't forget your badge!`;
      }
      if (lowerMessage.includes('dress') || lowerMessage.includes('wear') || lowerMessage.includes('attire') || lowerMessage.includes('clothing')) {
        return `👔 **Dress Code at Space42**\n\n${space42Info.culture.dressCode}\n\n**Day-to-day:** Smart casual - collared shirts, blouses, dress pants, closed-toe shoes\n**Client meetings:** Business formal recommended\n**Fridays:** More relaxed, but still professional\n\nWhen in doubt, slightly overdress for your first week!`;
      }
      if (lowerMessage.includes('hours') || lowerMessage.includes('time') || lowerMessage.includes('schedule') || lowerMessage.includes('when')) {
        return `⏰ **Working Hours**\n\n${space42Info.culture.workHours}\n\n**Flexibility:** We offer flexible working arrangements for most roles. Discuss with your manager.\n**Ramadan hours:** Reduced hours apply during the holy month.\n**Remote work:** Many positions support hybrid arrangements.`;
      }
    }

    // General responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 👋 How can I help you today? Are you a candidate exploring opportunities or a new hire getting ready for your first day?";
    }

    if (lowerMessage.includes('thank')) {
      return "You're welcome! 🌟 Is there anything else you'd like to know about Space42? I'm here to help!";
    }

    // Default response
    return userType === 'new-hire' 
      ? "I'd be happy to help! You can ask me about:\n• Your Day 1 checklist\n• Office location & facilities\n• Dress code & work hours\n• IT setup & equipment\n• Meeting your team\n\nWhat would you like to know?"
      : "Great question! I can tell you about:\n• Space42's business units (Space Services & Smart Solutions)\n• The Bayanat + Yahsat merger\n• Available positions\n• Our application process\n\nWhat interests you most?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickAction = (type: 'candidate' | 'new-hire') => {
    const message = type === 'candidate' 
      ? "I'm a candidate exploring career opportunities"
      : "I'm a new hire starting soon";
    
    setInput(message);
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSend();
    }, 100);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-gradient-primary px-5 py-4 text-primary-foreground shadow-xl transition-all hover:scale-105 hover:shadow-glow ${isOpen ? 'hidden' : ''}`}
      >
        <div className="relative">
          <Rocket className="h-6 w-6" />
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-accent"></span>
          </span>
        </div>
        <span className="font-semibold">Ask Astra</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
                  <Rocket className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Astra</h3>
                  <p className="text-xs opacity-90">Your Space42 Guide</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 hover:bg-primary-foreground/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted text-foreground rounded-bl-md'
                  }`}
                >
                  <div className="whitespace-pre-line">{message.content}</div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions (shown when no user type selected) */}
          {!userType && messages.length === 1 && (
            <div className="px-4 pb-2 flex gap-2">
              <button
                onClick={() => handleQuickAction('candidate')}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
              >
                <Briefcase className="h-4 w-4" />
                I'm a Candidate
              </button>
              <button
                onClick={() => handleQuickAction('new-hire')}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-accent/20 bg-accent/5 px-3 py-2.5 text-sm font-medium text-accent hover:bg-accent/10 transition-colors"
              >
                <UserCheck className="h-4 w-4" />
                I'm a New Hire
              </button>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border p-3">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about Space42..."
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!input.trim()}
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
