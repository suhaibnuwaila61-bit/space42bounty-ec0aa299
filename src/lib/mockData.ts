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
  businessUnit: 'Space Services' | 'Smart Solutions';
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
    missionMapping?: string;
    recommendedUnit?: 'Space Services' | 'Smart Solutions';
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
    title: 'Satellite Operations Engineer',
    department: 'Space Services',
    location: 'Abu Dhabi, UAE',
    type: 'Full-time',
    salary: 'Competitive',
    posted: '2 days ago',
    description: 'Join Space42\'s Space Services unit to operate and maintain our growing satellite constellation. You will be responsible for mission planning, satellite health monitoring, and coordination with ground stations.',
    requirements: [
      '5+ years of experience in satellite operations',
      'Strong understanding of orbital mechanics',
      'Experience with satellite telemetry systems',
      'Excellent communication skills',
      'Bachelor\'s degree in Aerospace Engineering or related field'
    ],
    businessUnit: 'Space Services'
  },
  {
    id: '2',
    title: 'Geospatial Analyst',
    department: 'Smart Solutions',
    location: 'Abu Dhabi, UAE',
    type: 'Full-time',
    salary: 'Competitive',
    posted: '1 week ago',
    description: 'Be part of our Smart Solutions team analyzing satellite imagery and geospatial data to deliver actionable insights for government and enterprise clients.',
    requirements: [
      '3+ years of geospatial analysis experience',
      'Proficiency in GIS tools (ArcGIS, QGIS)',
      'Experience with satellite imagery interpretation',
      'Strong analytical and problem-solving skills',
      'Knowledge of remote sensing technologies'
    ],
    businessUnit: 'Smart Solutions'
  },
  {
    id: '3',
    title: 'SatCom Systems Specialist',
    department: 'Space Services',
    location: 'Abu Dhabi, UAE',
    type: 'Full-time',
    salary: 'Competitive',
    posted: '3 days ago',
    description: 'Lead the development and optimization of satellite communication systems. Work with cutting-edge technology from our Yahsat heritage.',
    requirements: [
      '4+ years in satellite communications',
      'Experience with Ka-band and L-band systems',
      'Understanding of link budget analysis',
      'Strong technical documentation skills',
      'Excellent collaboration abilities'
    ],
    businessUnit: 'Space Services'
  },
  {
    id: '4',
    title: 'AI/ML Engineer - Earth Observation',
    department: 'Smart Solutions',
    location: 'Abu Dhabi, UAE',
    type: 'Full-time',
    salary: 'Competitive',
    posted: '5 days ago',
    description: 'Apply machine learning to satellite imagery for automated feature extraction, change detection, and predictive analytics in our Smart Solutions division.',
    requirements: [
      '3+ years in machine learning/AI',
      'Experience with computer vision',
      'Python proficiency (TensorFlow, PyTorch)',
      'Knowledge of remote sensing data',
      'Strong problem-solving mindset'
    ],
    businessUnit: 'Smart Solutions'
  }
];

export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Fatima Al-Rashid',
    email: 'fatima.rashid@email.com',
    phone: '+971 50 123 4567',
    appliedFor: 'Satellite Operations Engineer',
    appliedDate: '2024-01-15',
    communicationScore: 'high',
    overallScore: 92,
    status: 'pending',
    aiAnalysis: {
      clarity: 95,
      grammar: 92,
      confidence: 90,
      vocabulary: 88,
      explanation: 'Fatima demonstrates exceptional communication skills with clear articulation and professional vocabulary. Her responses show strong analytical thinking and deep understanding of satellite operations.',
      missionMapping: 'Based on your extensive satellite operations background and mission planning expertise, you are an excellent fit for our Space Services unit. Your experience with LEO constellations aligns perfectly with Space42\'s expanding satellite infrastructure.',
      recommendedUnit: 'Space Services',
      strengths: [
        'Clear and structured communication',
        'Strong technical vocabulary in aerospace',
        'Confident delivery with natural pacing',
        'Excellent problem-solving narrative'
      ],
      areasToImprove: [
        'Could provide more specific mission examples',
        'Slight hesitation on complex orbital scenarios'
      ]
    },
    writtenResponses: [
      {
        question: 'Why are you a good fit for Space42?',
        answer: 'With 6 years of experience in satellite operations at leading space agencies, I have led multiple mission control teams. I am passionate about the UAE\'s space ambitions and excited about Space42\'s vision of becoming a global space-tech leader.'
      }
    ],
    voiceTranscript: 'One of my most challenging experiences was during a critical satellite maneuver when we detected an anomaly in the attitude control system. I led the team through a systematic troubleshooting process, coordinated with ground stations across three continents, and successfully stabilized the satellite.',
    avatar: 'FA'
  },
  {
    id: '2',
    name: 'Omar Hassan',
    email: 'omar.h@email.com',
    phone: '+971 50 234 5678',
    appliedFor: 'Geospatial Analyst',
    appliedDate: '2024-01-14',
    communicationScore: 'medium',
    overallScore: 74,
    status: 'pending',
    aiAnalysis: {
      clarity: 72,
      grammar: 78,
      confidence: 70,
      vocabulary: 75,
      explanation: 'Omar shows solid technical understanding of geospatial analysis but could improve on articulating his thoughts more concisely. His responses demonstrate practical experience with GIS tools.',
      missionMapping: 'Your geospatial analysis skills and experience with satellite imagery make you a good candidate for our Smart Solutions unit. With some communication refinement, you could contribute effectively to our data analytics projects.',
      recommendedUnit: 'Smart Solutions',
      strengths: [
        'Good technical knowledge of GIS',
        'Enthusiastic about the field',
        'Practical project experience'
      ],
      areasToImprove: [
        'Reduce use of filler words',
        'Structure responses more clearly',
        'Work on grammatical consistency'
      ]
    },
    writtenResponses: [
      {
        question: 'Why are you a good fit for Space42?',
        answer: 'I have been working with satellite imagery for 4 years and really enjoy extracting insights from geospatial data. I am excited about joining a company that combines space technology with smart analytics.'
      }
    ],
    voiceTranscript: 'So, um, I had this project where we needed to, you know, analyze urban growth patterns using multi-temporal satellite imagery. I, uh, processed the data and created change detection maps which helped city planners understand development trends.',
    avatar: 'OH'
  },
  {
    id: '3',
    name: 'Sara Ahmed',
    email: 'sara.ahmed@email.com',
    phone: '+971 50 345 6789',
    appliedFor: 'SatCom Systems Specialist',
    appliedDate: '2024-01-13',
    communicationScore: 'high',
    overallScore: 88,
    status: 'reviewed',
    aiAnalysis: {
      clarity: 90,
      grammar: 92,
      confidence: 85,
      vocabulary: 86,
      explanation: 'Sara demonstrates strong communication abilities with a clear, professional tone. She effectively conveys complex satellite communication concepts and shows excellent technical depth.',
      missionMapping: 'Your deep expertise in satellite communications and Ka-band systems makes you an ideal fit for our Space Services unit. Your experience from Yahsat-heritage projects would be directly applicable to Space42\'s SATCOM operations.',
      recommendedUnit: 'Space Services',
      strengths: [
        'Excellent technical articulation',
        'Professional tone',
        'Strong SATCOM domain knowledge',
        'Clear strategic thinking'
      ],
      areasToImprove: [
        'Could be more assertive in delivery',
        'Sometimes over-explains technical concepts'
      ]
    },
    writtenResponses: [
      {
        question: 'Why are you a good fit for Space42?',
        answer: 'As a SATCOM specialist with 5 years at a leading telecommunications company, I have worked on Ka-band and L-band systems serving maritime and aviation sectors. I am drawn to Space42\'s mission of connecting the unconnected.'
      }
    ],
    voiceTranscript: 'In my previous role, I identified a significant signal degradation issue affecting our maritime customers. I conducted a thorough link budget analysis, identified the root cause in the ground segment, and implemented a solution that improved service availability by 15%.',
    avatar: 'SA'
  },
  {
    id: '4',
    name: 'Khalid Mohammed',
    email: 'khalid.m@email.com',
    phone: '+971 50 456 7890',
    appliedFor: 'AI/ML Engineer - Earth Observation',
    appliedDate: '2024-01-12',
    communicationScore: 'medium',
    overallScore: 71,
    status: 'pending',
    aiAnalysis: {
      clarity: 75,
      grammar: 70,
      confidence: 68,
      vocabulary: 72,
      explanation: 'Khalid has innovative ideas in ML for remote sensing but needs to work on delivering them more confidently. He shows potential but could benefit from more structured communication.',
      missionMapping: 'Your machine learning skills and interest in satellite imagery analysis align well with our Smart Solutions unit. With enhanced communication confidence, you could contribute significantly to our AI-driven analytics products.',
      recommendedUnit: 'Smart Solutions',
      strengths: [
        'Creative ML approaches evident',
        'Good understanding of remote sensing',
        'Passionate about AI applications'
      ],
      areasToImprove: [
        'Build more confidence in delivery',
        'Provide more concrete project examples',
        'Improve response structure'
      ]
    },
    writtenResponses: [
      {
        question: 'Why are you a good fit for Space42?',
        answer: 'I love applying machine learning to solve real-world problems using satellite data. I have built models for land cover classification and object detection. Space42\'s focus on smart solutions excites me.'
      }
    ],
    voiceTranscript: 'I worked on this project where, um, we used deep learning to detect changes in agricultural areas from satellite images. I trained a U-Net model and, um, achieved good accuracy in identifying crop stress.',
    avatar: 'KM'
  },
  {
    id: '5',
    name: 'Mariam Al-Zaabi',
    email: 'mariam.z@email.com',
    phone: '+971 50 567 8901',
    appliedFor: 'Geospatial Analyst',
    appliedDate: '2024-01-11',
    communicationScore: 'high',
    overallScore: 95,
    status: 'approved',
    aiAnalysis: {
      clarity: 96,
      grammar: 95,
      confidence: 94,
      vocabulary: 92,
      explanation: 'Mariam exhibits outstanding communication skills perfectly suited for client-facing geospatial consulting. Her responses are warm, professional, and demonstrate excellent domain expertise.',
      missionMapping: 'Your exceptional geospatial expertise combined with your outstanding communication skills makes you a perfect fit for our Smart Solutions unit. You would excel in client-facing roles, translating satellite data insights for government and enterprise stakeholders.',
      recommendedUnit: 'Smart Solutions',
      strengths: [
        'Exceptional verbal fluency',
        'Warm and professional tone',
        'Deep geospatial domain knowledge',
        'Excellent stakeholder communication'
      ],
      areasToImprove: [
        'Could incorporate more technical depth in explanations'
      ]
    },
    writtenResponses: [
      {
        question: 'Why are you a good fit for Space42?',
        answer: 'With 4 years in geospatial consulting, I have delivered insights to government clients across the GCC. I believe in making complex spatial data accessible and actionable. Space42\'s merger of Bayanat and Yahsat creates exciting opportunities.'
      }
    ],
    voiceTranscript: 'I worked with a government client who needed to monitor coastal development. I designed a multi-temporal analysis workflow using high-resolution satellite imagery, presented findings to senior stakeholders, and our recommendations were incorporated into their urban planning policies.',
    avatar: 'MA'
  },
  {
    id: '6',
    name: 'Ahmed Al-Dhaheri',
    email: 'ahmed.d@email.com',
    phone: '+971 50 678 9012',
    appliedFor: 'Satellite Operations Engineer',
    appliedDate: '2024-01-10',
    communicationScore: 'low',
    overallScore: 52,
    status: 'pending',
    aiAnalysis: {
      clarity: 55,
      grammar: 50,
      confidence: 48,
      vocabulary: 55,
      explanation: 'Ahmed shows technical potential but struggles with clear communication. His responses contain frequent grammatical errors and lack structure. Significant improvement needed in verbal communication for a senior operations role.',
      missionMapping: 'While your technical background shows promise, we recommend strengthening your communication skills before applying for senior operations roles. Consider our graduate training program as an alternative entry path.',
      strengths: [
        'Shows technical enthusiasm',
        'Willingness to learn'
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
        question: 'Why are you a good fit for Space42?',
        answer: 'I am good at satellite systems and have done some projects. Space is my favorite topic and I can learn fast. Looking for opportunity to grow in UAE space industry.'
      }
    ],
    voiceTranscript: 'Um... so... I was working on this... satellite project... where we had to... um... track the orbit. It was... uh... interesting but I... managed to... you know... complete the task eventually.',
    avatar: 'AD'
  }
];

export const applicationQuestions = [
  'Why are you a good fit for Space42?',
  'Describe a challenging technical problem you solved and what you learned from the experience.',
  'How do you see yourself contributing to the UAE\'s space and technology ambitions?'
];

export const voicePrompt = 'Please describe a work challenge you solved and what you learned from the experience. Speak naturally for 30-60 seconds.';

// Space42 Company Information for AI Assistant
export const space42Info = {
  overview: 'Space42 is a UAE-based AI-powered SpaceTech company formed from the merger of Bayanat (geospatial analytics leader) and Yahsat (satellite communications pioneer). We are headquartered in Abu Dhabi.',
  
  businessUnits: {
    spaceServices: {
      name: 'Space Services',
      description: 'Operates satellite communications, mobility solutions, and managed services. Leverages Yahsat\'s heritage in satellite operations.',
      keyAreas: ['Satellite Communications', 'Maritime & Aviation Connectivity', 'Government Communications', 'Broadband Services']
    },
    smartSolutions: {
      name: 'Smart Solutions',
      description: 'Delivers AI-powered geospatial analytics and smart city solutions. Built on Bayanat\'s expertise in data analytics.',
      keyAreas: ['Geospatial Analytics', 'Earth Observation', 'AI/ML for Satellite Data', 'Smart City Solutions']
    }
  },
  
  locations: {
    headquarters: 'Abu Dhabi, UAE - Masdar City',
    offices: ['Al Yah Satellite Communications Company building in Abu Dhabi']
  },
  
  culture: {
    dressCode: 'Business casual is the norm. Smart attire for client meetings.',
    workHours: 'Sunday to Thursday, 8:00 AM to 5:00 PM (UAE Standard Time)',
    values: ['Innovation', 'Excellence', 'Integrity', 'Collaboration', 'UAE Vision']
  }
};

export const onboardingChecklist = [
  {
    id: 'badge',
    title: 'Collect Your Security Badge',
    description: 'Visit the Security Office on the ground floor with your ID to collect your access badge.',
    location: 'Ground Floor, Security Office',
    completed: false
  },
  {
    id: 'laptop',
    title: 'Set Up Your Workstation',
    description: 'IT will provide your laptop and help you set up email, VPN, and required software.',
    location: 'IT Help Desk, Floor 2',
    completed: false
  },
  {
    id: 'team',
    title: 'Meet Your Team',
    description: 'Your manager will introduce you to your team members and show you around the office.',
    location: 'Your Department Area',
    completed: false
  },
  {
    id: 'hr',
    title: 'Complete HR Paperwork',
    description: 'Finalize any remaining documentation with the HR team.',
    location: 'HR Office, Floor 3',
    completed: false
  },
  {
    id: 'orientation',
    title: 'Attend New Hire Orientation',
    description: 'Learn about Space42\'s mission, values, and policies in the welcome session.',
    location: 'Conference Room A, Floor 1',
    completed: false
  }
];
