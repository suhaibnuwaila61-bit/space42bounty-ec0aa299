export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  appliedFor: string;
  appliedDate: string;
  cvUrl?: string;
  communicationScore: 'high' | 'medium' | 'low';
  overallScore: number;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  aiAnalysis: {
    clarity: number;
    grammar: number;
    confidence: number;
    vocabulary: number;
    explanation: string;
    strengths: string[];
    areasToImprove: string[];
  };
  writtenResponses: {
    question: string;
    answer: string;
  }[];
  voiceTranscript?: string;
  avatar?: string;
}

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    posted: '2 days ago',
    description: 'We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining our web applications using React and TypeScript.',
    requirements: [
      '5+ years of experience with React',
      'Strong TypeScript skills',
      'Experience with state management (Redux, Zustand)',
      'Excellent communication skills',
      'Experience with testing frameworks'
    ]
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130,000 - $170,000',
    posted: '1 week ago',
    description: 'Join our product team to help shape the future of our platform. You will work closely with engineering, design, and stakeholders to deliver impactful features.',
    requirements: [
      '3+ years of product management experience',
      'Strong analytical skills',
      'Excellent written and verbal communication',
      'Experience with agile methodologies',
      'Technical background preferred'
    ]
  },
  {
    id: '3',
    title: 'UX Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$100,000 - $140,000',
    posted: '3 days ago',
    description: 'We need a talented UX Designer to create intuitive and beautiful user experiences for our products.',
    requirements: [
      '4+ years of UX design experience',
      'Proficiency in Figma',
      'Strong portfolio demonstrating user-centered design',
      'Experience with user research',
      'Excellent collaboration skills'
    ]
  },
  {
    id: '4',
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'London, UK',
    type: 'Full-time',
    salary: '£60,000 - £80,000',
    posted: '5 days ago',
    description: 'Help our customers succeed by providing exceptional support and guidance throughout their journey with our platform.',
    requirements: [
      '3+ years in customer success or account management',
      'Excellent communication skills',
      'Problem-solving mindset',
      'Experience with SaaS products',
      'Strong relationship-building abilities'
    ]
  }
];

export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 123-4567',
    appliedFor: 'Senior Frontend Developer',
    appliedDate: '2024-01-15',
    communicationScore: 'high',
    overallScore: 92,
    status: 'pending',
    aiAnalysis: {
      clarity: 95,
      grammar: 92,
      confidence: 90,
      vocabulary: 88,
      explanation: 'Sarah demonstrates exceptional communication skills with clear articulation and professional vocabulary. Her responses show strong analytical thinking and the ability to explain complex technical concepts in accessible terms.',
      strengths: [
        'Clear and structured communication',
        'Strong technical vocabulary',
        'Confident delivery with natural pacing',
        'Excellent problem-solving narrative'
      ],
      areasToImprove: [
        'Could provide more specific examples',
        'Slight hesitation on complex questions'
      ]
    },
    writtenResponses: [
      {
        question: 'Why are you a good fit for this role?',
        answer: 'With 6 years of experience in frontend development, I have led multiple React projects from conception to production. I am passionate about creating intuitive user experiences and have a track record of mentoring junior developers while maintaining high code quality standards.'
      }
    ],
    voiceTranscript: 'One of my most challenging work experiences was when we had to migrate a legacy application to a modern React architecture within a tight deadline. I led the technical planning, created a phased migration strategy, and coordinated with stakeholders to ensure minimal disruption. We completed the project two weeks ahead of schedule.',
    avatar: 'SC'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    email: 'michael.r@email.com',
    phone: '+1 (555) 234-5678',
    appliedFor: 'Senior Frontend Developer',
    appliedDate: '2024-01-14',
    communicationScore: 'medium',
    overallScore: 74,
    status: 'pending',
    aiAnalysis: {
      clarity: 72,
      grammar: 78,
      confidence: 70,
      vocabulary: 75,
      explanation: 'Michael shows solid technical understanding but could improve on articulating his thoughts more concisely. His responses are generally clear but occasionally include filler words and some grammatical inconsistencies.',
      strengths: [
        'Good technical knowledge',
        'Enthusiastic and engaged',
        'Honest about limitations'
      ],
      areasToImprove: [
        'Reduce use of filler words',
        'Structure responses more clearly',
        'Work on grammatical consistency'
      ]
    },
    writtenResponses: [
      {
        question: 'Why are you a good fit for this role?',
        answer: 'I have been working with React for 4 years and really enjoy building user interfaces. I learn quickly and am excited about the opportunity to work on challenging projects with a great team.'
      }
    ],
    voiceTranscript: 'So, um, I had this project where we needed to, you know, improve the performance of our dashboard. I, uh, analyzed the component rendering and implemented memoization which, like, improved load times by about 40 percent.',
    avatar: 'MR'
  },
  {
    id: '3',
    name: 'Emily Watson',
    email: 'emily.watson@email.com',
    phone: '+1 (555) 345-6789',
    appliedFor: 'Product Manager',
    appliedDate: '2024-01-13',
    communicationScore: 'high',
    overallScore: 88,
    status: 'reviewed',
    aiAnalysis: {
      clarity: 90,
      grammar: 92,
      confidence: 85,
      vocabulary: 86,
      explanation: 'Emily demonstrates strong communication abilities with a clear, professional tone. She effectively conveys complex product concepts and shows excellent stakeholder communication skills.',
      strengths: [
        'Excellent narrative structure',
        'Professional tone',
        'Data-driven communication',
        'Clear strategic thinking'
      ],
      areasToImprove: [
        'Could be more assertive in delivery',
        'Sometimes over-explains concepts'
      ]
    },
    writtenResponses: [
      {
        question: 'Why are you a good fit for this role?',
        answer: 'As a product manager with 5 years of experience in B2B SaaS, I have successfully launched 12 major features that increased user engagement by 45%. I excel at translating business requirements into actionable roadmaps and fostering cross-functional collaboration.'
      }
    ],
    voiceTranscript: 'In my previous role, I identified a significant gap in our onboarding process that was causing a 30% drop-off rate. I conducted user interviews, analyzed the data, and proposed a redesigned flow. After implementation, we saw drop-off reduce to 12% within three months.',
    avatar: 'EW'
  },
  {
    id: '4',
    name: 'James Kim',
    email: 'james.kim@email.com',
    phone: '+1 (555) 456-7890',
    appliedFor: 'UX Designer',
    appliedDate: '2024-01-12',
    communicationScore: 'medium',
    overallScore: 71,
    status: 'pending',
    aiAnalysis: {
      clarity: 75,
      grammar: 70,
      confidence: 68,
      vocabulary: 72,
      explanation: 'James has creative ideas but needs to work on delivering them more confidently. His grammar is generally good with some minor inconsistencies. He shows potential but could benefit from more structured communication.',
      strengths: [
        'Creative thinking evident',
        'Good visual communication references',
        'Passionate about design'
      ],
      areasToImprove: [
        'Build more confidence in delivery',
        'Provide more concrete examples',
        'Improve response structure'
      ]
    },
    writtenResponses: [
      {
        question: 'Why are you a good fit for this role?',
        answer: 'I love creating designs that solve real problems. I have experience with user research and have designed apps that people actually enjoy using. I am always learning new design trends and tools.'
      }
    ],
    voiceTranscript: 'I worked on this mobile app redesign where, um, the existing interface was pretty confusing for users. I did some user testing and found the main pain points, then created a new design that was much simpler. Users really liked it.',
    avatar: 'JK'
  },
  {
    id: '5',
    name: 'Anna Martinez',
    email: 'anna.m@email.com',
    phone: '+1 (555) 567-8901',
    appliedFor: 'Customer Success Manager',
    appliedDate: '2024-01-11',
    communicationScore: 'high',
    overallScore: 95,
    status: 'approved',
    aiAnalysis: {
      clarity: 96,
      grammar: 95,
      confidence: 94,
      vocabulary: 92,
      explanation: 'Anna exhibits outstanding communication skills perfectly suited for a customer-facing role. Her responses are warm, professional, and demonstrate excellent empathy and problem-solving abilities.',
      strengths: [
        'Exceptional verbal fluency',
        'Warm and empathetic tone',
        'Excellent active listening indicators',
        'Professional and confident'
      ],
      areasToImprove: [
        'Could incorporate more industry-specific terminology'
      ]
    },
    writtenResponses: [
      {
        question: 'Why are you a good fit for this role?',
        answer: 'With 4 years in customer success, I have maintained a 98% customer retention rate and consistently receive top satisfaction scores. I believe in building genuine relationships with clients and proactively identifying opportunities to help them achieve their goals.'
      }
    ],
    voiceTranscript: 'I once had a client who was considering churning due to implementation challenges. I scheduled a call to understand their concerns, worked with our technical team to create a custom solution, and personally guided them through the process. They not only stayed but became one of our biggest advocates.',
    avatar: 'AM'
  },
  {
    id: '6',
    name: 'David Thompson',
    email: 'david.t@email.com',
    phone: '+1 (555) 678-9012',
    appliedFor: 'Senior Frontend Developer',
    appliedDate: '2024-01-10',
    communicationScore: 'low',
    overallScore: 52,
    status: 'pending',
    aiAnalysis: {
      clarity: 55,
      grammar: 50,
      confidence: 48,
      vocabulary: 55,
      explanation: 'David shows technical potential but struggles with clear communication. His responses contain frequent grammatical errors and lack structure. Significant improvement needed in verbal communication for a senior role.',
      strengths: [
        'Shows technical enthusiasm',
        'Willing to learn'
      ],
      areasToImprove: [
        'Improve grammatical accuracy',
        'Build confidence in speaking',
        'Structure responses more logically',
        'Reduce long pauses and hesitations'
      ]
    },
    writtenResponses: [
      {
        question: 'Why are you a good fit for this role?',
        answer: 'I am good at coding and have done many projects. React is my favorite and I can make websites. Looking for new opportunity to grow.'
      }
    ],
    voiceTranscript: 'Um... so... I was working on this... project... where we had to... um... fix some bugs in the code. It was... uh... challenging but I... managed to... you know... solve it eventually.',
    avatar: 'DT'
  }
];

export const applicationQuestions = [
  'Why are you a good fit for this role?',
  'Describe a challenging project you worked on and how you overcame obstacles.',
  'What are your career goals for the next 3-5 years?'
];

export const voicePrompt = 'Please describe a work challenge you solved and what you learned from the experience. Speak naturally for 30-60 seconds.';
