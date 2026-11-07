import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Users, 
  Star, 
  Calendar, 
  CheckCircle, 
  Play, 
  BookOpen, 
  Medal,
  Filter,
  Search,
  Video,
  FileText,
  Download,
  MessageCircle,
  TrendingUp,
  Globe,
  Hand,
  Eye,
  Target,
  Zap,
  Shield,
  Code,
  Palette,
  BarChart,
  Monitor,
  Megaphone,
  X,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Accessibility,
  Heart,
  Share2,
  ExternalLink,
  Lightbulb,
  Brain,
  Award,
  User,
  MapPin,
  DollarSign,
  Timer,
  PlayCircle,
  Bookmark,
  Activity,
  Coffee,
  Camera,
  Scissors,
  Utensils,
  Calculator,
  Shirt,
  Music,
  Wrench,
  PenTool,
  Headphones,
  Languages
} from 'lucide-react';

interface Workshop {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  features: string[];
  nextSession: string;
  enrolled: number;
  rating: number;
  price: string;
  category: string;
  thumbnail?: string;
  lessons?: number;
  certificateIncluded?: boolean;
  language: string[];
  prerequisites?: string[];
  learningOutcomes: string[];
  isAccessible: boolean;
  maxStudents: number;
  deafFriendlyScore: number;
  instructorRating: number;
  completionRate: number;
  jobPlacementRate?: number;
  skillTags: string[];
  difficulty: number; // 1-5 scale
  recommendationScore?: number;
}

interface EnrollmentStatus {
  workshopId: number;
  status: 'enrolled' | 'in-progress' | 'completed' | 'paused';
  progress: number;
  enrolledDate: Date;
  lastActivity: Date;
}

const enhancedWorkshops: Workshop[] = [
  // Technology & Programming
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    duration: "12 weeks",
    level: "Beginner",
    description: "Master full-stack web development from scratch with comprehensive visual tutorials, ASL support, and hands-on projects. Build real-world applications and portfolio pieces while learning HTML, CSS, JavaScript, React, and Node.js.",
    features: ["Visual learning", "Sign language support", "Hands-on projects", "Portfolio building", "Job placement assistance", "Lifetime access"],
    nextSession: "Monday, March 18, 2024",
    enrolled: 245,
    rating: 4.9,
    price: "Rp 2,500,000",
    category: "Technology",
    lessons: 48,
    certificateIncluded: true,
    language: ["English", "ASL", "Indonesian"],
    prerequisites: ["Basic computer skills", "Internet access"],
    learningOutcomes: ["Build responsive websites", "Create web applications", "Understand modern frameworks", "Deploy projects online"],
    isAccessible: true,
    maxStudents: 300,
    deafFriendlyScore: 98,
    instructorRating: 4.8,
    completionRate: 87,
    jobPlacementRate: 78,
    skillTags: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Full Stack"],
    difficulty: 2
  },
  {
    id: 2,
    title: "Python Programming & AI Fundamentals",
    instructor: "David Kim",
    duration: "10 weeks",
    level: "Beginner",
    description: "Start your programming journey with Python and explore artificial intelligence. Build practical projects while learning programming fundamentals, data structures, and basic AI concepts with comprehensive visual support.",
    features: ["Visual coding approach", "AI fundamentals", "Project-based learning", "Code review sessions", "Career guidance", "Industry connections"],
    nextSession: "Thursday, March 21, 2024",
    enrolled: 312,
    rating: 4.8,
    price: "Rp 1,800,000",
    category: "Programming",
    lessons: 40,
    certificateIncluded: true,
    language: ["English", "ASL", "Indonesian"],
    prerequisites: ["Basic computer skills", "Logical thinking"],
    learningOutcomes: ["Master Python programming", "Build AI applications", "Understand algorithms", "Create automation tools"],
    isAccessible: true,
    maxStudents: 400,
    deafFriendlyScore: 97,
    instructorRating: 4.8,
    completionRate: 85,
    jobPlacementRate: 89,
    skillTags: ["Python", "AI", "Machine Learning", "Data Structures", "Algorithms"],
    difficulty: 3
  },
  {
    id: 3,
    title: "Mobile App Development with Flutter",
    instructor: "Ahmad Rizki",
    duration: "8 weeks",
    level: "Intermediate",
    description: "Build cross-platform mobile apps using Flutter. Learn from Indonesian expert with full ASL support and hands-on projects for both Android and iOS platforms.",
    features: ["Cross-platform development", "Real app projects", "Publishing guidance", "ASL interpretation", "Mentorship program"],
    nextSession: "Saturday, March 23, 2024",
    enrolled: 89,
    rating: 4.7,
    price: "Rp 1,500,000",
    category: "Mobile Development",
    lessons: 32,
    certificateIncluded: true,
    language: ["Indonesian", "ASL"],
    prerequisites: ["Basic programming knowledge", "Mobile device for testing"],
    learningOutcomes: ["Build mobile apps", "Understand app architecture", "Publish to app stores", "Optimize app performance"],
    isAccessible: true,
    maxStudents: 150,
    deafFriendlyScore: 94,
    instructorRating: 4.6,
    completionRate: 88,
    jobPlacementRate: 82,
    skillTags: ["Flutter", "Dart", "Mobile Development", "App Store", "Android"],
    difficulty: 3
  },

  // Design & Creative
  {
    id: 4,
    title: "UX/UI Design for Accessibility",
    instructor: "Alex Thompson",
    duration: "6 weeks",
    level: "Beginner",
    description: "Learn to design inclusive, accessible user experiences that work for everyone. Master design thinking, prototyping, and user research with special focus on accessibility and deaf user needs.",
    features: ["Design thinking workshops", "Accessibility focus", "Portfolio development", "User research", "Prototype building", "Industry feedback"],
    nextSession: "Tuesday, March 19, 2024",
    enrolled: 198,
    rating: 4.7,
    price: "Rp 1,200,000",
    category: "Design",
    lessons: 24,
    certificateIncluded: true,
    language: ["English", "ASL", "Indonesian"],
    prerequisites: ["Basic design knowledge", "Creative mindset"],
    learningOutcomes: ["Design accessible interfaces", "Conduct user research", "Create prototypes", "Build design systems"],
    isAccessible: true,
    maxStudents: 250,
    deafFriendlyScore: 96,
    instructorRating: 4.6,
    completionRate: 88,
    jobPlacementRate: 82,
    skillTags: ["Figma", "User Research", "Prototyping", "Accessibility", "Design Systems"],
    difficulty: 2
  },
  {
    id: 5,
    title: "Graphic Design Mastery",
    instructor: "Nina Sari",
    duration: "8 weeks",
    level: "Beginner",
    description: "Master the fundamentals of graphic design including logo design, branding, and print design. Learn industry-standard tools with full visual instruction and ASL support.",
    features: ["Adobe Creative Suite", "Portfolio building", "Brand design projects", "Print design", "Digital design", "Client work simulation"],
    nextSession: "Wednesday, March 20, 2024",
    enrolled: 156,
    rating: 4.6,
    price: "Rp 950,000",
    category: "Design",
    lessons: 32,
    certificateIncluded: true,
    language: ["Indonesian", "ASL"],
    prerequisites: ["Basic computer skills", "Creative interest"],
    learningOutcomes: ["Master design principles", "Create professional logos", "Design marketing materials", "Build design portfolio"],
    isAccessible: true,
    maxStudents: 200,
    deafFriendlyScore: 93,
    instructorRating: 4.5,
    completionRate: 91,
    jobPlacementRate: 75,
    skillTags: ["Adobe Illustrator", "Photoshop", "Logo Design", "Branding", "Typography"],
    difficulty: 2
  },
  {
    id: 6,
    title: "Photography for Beginners",
    instructor: "Rico Pratama",
    duration: "4 weeks",
    level: "Beginner",
    description: "Learn the art of photography from composition to editing. Perfect for deaf individuals with visual storytelling approach and hands-on practice sessions.",
    features: ["Camera techniques", "Photo editing", "Portfolio development", "Visual storytelling", "Field trips", "Equipment guidance"],
    nextSession: "Friday, March 22, 2024",
    enrolled: 124,
    rating: 4.5,
    price: "Rp 750,000",
    category: "Photography",
    lessons: 16,
    certificateIncluded: true,
    language: ["Indonesian", "ASL"],
    prerequisites: ["Camera or smartphone", "Interest in visual arts"],
    learningOutcomes: ["Master camera basics", "Understand composition", "Edit photos professionally", "Build photography portfolio"],
    isAccessible: true,
    maxStudents: 100,
    deafFriendlyScore: 89,
    instructorRating: 4.4,
    completionRate: 92,
    skillTags: ["Photography", "Lightroom", "Composition", "Portrait", "Landscape"],
    difficulty: 1
  },

  // Business & Marketing
  {
    id: 7,
    title: "Digital Marketing for Small Business",
    instructor: "Michael Chen",
    duration: "6 weeks",
    level: "Intermediate",
    description: "Transform your marketing skills with cutting-edge digital strategies. Learn social media marketing, SEO, content creation, and analytics with full ASL interpretation.",
    features: ["Interactive lessons", "Real case studies", "ASL interpretation", "Industry mentorship", "Campaign planning tools", "Networking events"],
    nextSession: "Wednesday, March 20, 2024",
    enrolled: 156,
    rating: 4.8,
    price: "Rp 1,100,000",
    category: "Marketing",
    lessons: 24,
    certificateIncluded: true,
    language: ["English", "ASL", "Indonesian"],
    prerequisites: ["Basic marketing knowledge", "Social media familiarity"],
    learningOutcomes: ["Create marketing campaigns", "Analyze performance metrics", "Build brand strategies", "Master digital platforms"],
    isAccessible: true,
    maxStudents: 200,
    deafFriendlyScore: 95,
    instructorRating: 4.7,
    completionRate: 92,
    jobPlacementRate: 85,
    skillTags: ["SEO", "Social Media", "Content Marketing", "Analytics", "PPC"],
    difficulty: 3
  },
  {
    id: 8,
    title: "Social Media Strategy & Content Creation",
    instructor: "Lisa Garcia",
    duration: "4 weeks",
    level: "Beginner",
    description: "Master social media marketing with focus on visual content creation and accessibility. Learn platform-specific strategies, content planning, and community management.",
    features: ["Platform expertise", "Visual content focus", "Analytics mastery", "Community building", "Brand development", "Accessibility integration"],
    nextSession: "Saturday, March 23, 2024",
    enrolled: 134,
    rating: 4.6,
    price: "Rp 650,000",
    category: "Marketing",
    lessons: 16,
    certificateIncluded: true,
    language: ["English", "ASL", "Indonesian"],
    prerequisites: ["Social media experience", "Basic marketing knowledge"],
    learningOutcomes: ["Create engaging content", "Build online communities", "Analyze social metrics", "Develop brand voice"],
    isAccessible: true,
    maxStudents: 180,
    deafFriendlyScore: 93,
    instructorRating: 4.5,
    completionRate: 91,
    jobPlacementRate: 76,
    skillTags: ["Social Media", "Content Creation", "Community Management", "Analytics"],
    difficulty: 2
  },
  {
    id: 9,
    title: "Starting Your Own Business",
    instructor: "Budi Santoso",
    duration: "5 weeks",
    level: "Beginner",
    description: "Learn entrepreneurship basics from Indonesian business expert. Cover business planning, financial management, and marketing specifically for deaf entrepreneurs.",
    features: ["Business plan development", "Financial planning", "Legal guidance", "Marketing strategies", "Networking opportunities", "Mentorship program"],
    nextSession: "Monday, March 25, 2024",
    enrolled: 87,
    rating: 4.7,
    price: "Rp 800,000",
    category: "Business",
    lessons: 20,
    certificateIncluded: true,
    language: ["Indonesian", "ASL"],
    prerequisites: ["Business idea or interest", "Basic math skills"],
    learningOutcomes: ["Create business plan", "Understand finance basics", "Legal business setup", "Marketing your business"],
    isAccessible: true,
    maxStudents: 120,
    deafFriendlyScore: 91,
    instructorRating: 4.6,
    completionRate: 86,
    jobPlacementRate: 70,
    skillTags: ["Entrepreneurship", "Business Plan", "Finance", "Marketing", "Legal"],
    difficulty: 2
  },

  // Practical Skills
  {
    id: 10,
    title: "Barista & Coffee Art Mastery",
    instructor: "Cafe Maestro Team",
    duration: "3 weeks",
    level: "Beginner",
    description: "Learn professional barista skills including coffee brewing, latte art, and customer service. Perfect for those interested in coffee industry with full visual instruction.",
    features: ["Hands-on coffee making", "Latte art techniques", "Coffee knowledge", "Customer service", "Equipment training", "Industry connections"],
    nextSession: "Tuesday, March 19, 2024",
    enrolled: 165,
    rating: 4.6,
    price: "Rp 500,000",
    category: "Hospitality",
    lessons: 12,
    certificateIncluded: true,
    language: ["Indonesian", "ASL"],
    prerequisites: ["Interest in coffee", "Physical ability to work"],
    learningOutcomes: ["Master coffee brewing", "Create latte art", "Customer service skills", "Coffee shop operations"],
    isAccessible: true,
    maxStudents: 80,
    deafFriendlyScore: 92,
    instructorRating: 4.5,
    completionRate: 94,
    jobPlacementRate: 88,
    skillTags: ["Barista", "Latte Art", "Coffee", "Customer Service", "Food Service"],
    difficulty: 1
  },
  {
    id: 11,
    title: "Culinary Arts & Food Styling",
    instructor: "Chef Marina",
    duration: "6 weeks",
    level: "Intermediate",
    description: "Learn professional cooking techniques and food styling for social media. Visual learning approach perfect for deaf students with hands-on cooking sessions.",
    features: ["Professional cooking techniques", "Food styling", "Recipe development", "Kitchen safety", "Food photography", "Menu planning"],
    nextSession: "Thursday, March 21, 2024",
    enrolled: 98,
    rating: 4.8,
    price: "Rp 1,300,000",
    category: "Culinary",
    lessons: 24,
    certificateIncluded: true,
    language: ["Indonesian", "ASL"],
    prerequisites: ["Basic cooking knowledge", "Kitchen equipment access"],
    learningOutcomes: ["Master cooking techniques", "Food styling skills", "Recipe creation", "Food photography"],
    isAccessible: true,
    maxStudents: 60,
    deafFriendlyScore: 95,
    instructorRating: 4.7,
    completionRate: 89,
    jobPlacementRate: 78,
    skillTags: ["Cooking", "Food Styling", "Recipe Development", "Food Photography"],
    difficulty: 3
  },
  {
    id: 12,
    title: "Fashion Design & Tailoring Basics",
    instructor: "Sari Fashions",
    duration: "8 weeks",
    level: "Beginner",
    description: "Learn fashion design fundamentals and basic tailoring skills. Create your own clothing pieces with pattern making, sewing, and design principles.",
    features: ["Pattern making", "Sewing techniques", "Design principles", "Fabric knowledge", "Fashion sketching", "Portfolio building"],
    nextSession: "Saturday, March 23, 2024",
    enrolled: 76,
    rating: 4.5,
    price: "Rp 950,000",
    category: "Fashion",
    lessons: 32,
    certificateIncluded: true,
    language: ["Indonesian", "ASL"],
    prerequisites: ["Interest in fashion", "Basic drawing skills"],
    learningOutcomes: ["Design clothing", "Pattern making", "Sewing skills", "Fashion portfolio"],
    isAccessible: true,
    maxStudents: 40,
    deafFriendlyScore: 87,
    instructorRating: 4.4,
    completionRate: 85,
    skillTags: ["Fashion Design", "Tailoring", "Pattern Making", "Sewing", "Design"],
    difficulty: 2
  },

  // Arts & Culture
  {
    id: 13,
    title: "ASL Teaching & Cultural Competency",
    instructor: "Maria Rodriguez",
    duration: "12 weeks",
    level: "Advanced",
    description: "Become a certified ASL interpreter or teacher. Comprehensive program covering advanced ASL grammar, interpretation techniques, cultural competency, and teaching methodologies.",
    features: ["Advanced ASL techniques", "Cultural immersion", "Teaching methods", "Certification prep", "Practicum opportunities", "Community connections"],
    nextSession: "Wednesday, March 27, 2024",
    enrolled: 65,
    rating: 5.0,
    price: "Rp 2,800,000",
    category: "Communication",
    lessons: 48,
    certificateIncluded: true,
    language: ["ASL", "Indonesian", "English"],
    prerequisites: ["Intermediate ASL", "Cultural knowledge"],
    learningOutcomes: ["Master advanced ASL", "Teach ASL effectively", "Provide interpretation", "Understand deaf culture"],
    isAccessible: true,
    maxStudents: 80,
    deafFriendlyScore: 100,
    instructorRating: 5.0,
    completionRate: 95,
    jobPlacementRate: 98,
    skillTags: ["ASL", "Interpretation", "Teaching", "Deaf Culture", "Communication"],
    difficulty: 5
  },
  {
    id: 14,
    title: "Music Production for the Deaf",
    instructor: "Audio Visual Studio",
    duration: "10 weeks",
    level: "Intermediate",
    description: "Learn music production through visual and tactile methods. Use vibrations, visual music software, and collaborative techniques to create amazing music.",
    features: ["Visual music software", "Vibration techniques", "Collaborative production", "Beat making", "Audio editing", "Music theory visual"],
    nextSession: "Friday, March 22, 2024",
    enrolled: 54,
    rating: 4.9,
    price: "Rp 1,600,000",
    category: "Music",
    lessons: 40,
    certificateIncluded: true,
    language: ["Indonesian", "ASL"],
    prerequisites: ["Interest in music", "Computer access"],
    learningOutcomes: ["Create music tracks", "Use production software", "Understand music theory", "Collaborate with musicians"],
    isAccessible: true,
    maxStudents: 50,
    deafFriendlyScore: 96,
    instructorRating: 4.8,
    completionRate: 87,
    skillTags: ["Music Production", "Beat Making", "Audio Editing", "Music Software"],
    difficulty: 3
  },

  // Health & Wellness
  {
    id: 15,
    title: "Massage Therapy Certification",
    instructor: "Wellness Center Team",
    duration: "8 weeks",
    level: "Beginner",
    description: "Learn professional massage therapy techniques with full visual instruction. Perfect career path for deaf individuals with excellent hands-on skills.",
    features: ["Professional techniques", "Anatomy knowledge", "Client communication", "Business setup", "Certification prep", "Practice sessions"],
    nextSession: "Monday, March 18, 2024",
    enrolled: 92,
    rating: 4.7,
    price: "Rp 1,400,000",
    category: "Health & Wellness",
    lessons: 32,
    certificateIncluded: true,
    language: ["Indonesian", "ASL"],
    prerequisites: ["Physical fitness", "Interest in wellness"],
    learningOutcomes: ["Master massage techniques", "Understand anatomy", "Client consultation", "Start massage business"],
    isAccessible: true,
    maxStudents: 60,
    deafFriendlyScore: 91,
    instructorRating: 4.6,
    completionRate: 88,
    jobPlacementRate: 85,
    skillTags: ["Massage Therapy", "Anatomy", "Wellness", "Client Care", "Business"],
    difficulty: 2
  },

  // Data & Analytics
  {
    id: 16,
    title: "Data Science & Excel Mastery",
    instructor: "Dr. Emily Rodriguez",
    duration: "8 weeks",
    level: "Intermediate",
    description: "Learn data analysis using Excel and basic Python. Perfect introduction to data science with visual charts, graphs, and practical business applications.",
    features: ["Excel advanced techniques", "Data visualization", "Python basics", "Business applications", "Real datasets", "Career guidance"],
    nextSession: "Friday, March 22, 2024",
    enrolled: 89,
    rating: 4.8,
    price: "Rp 1,300,000",
    category: "Data Science",
    lessons: 32,
    certificateIncluded: true,
    language: ["English", "ASL", "Indonesian"],
    prerequisites: ["Basic Excel knowledge", "Math fundamentals"],
    learningOutcomes: ["Master Excel advanced features", "Create data visualizations", "Basic Python programming", "Business data analysis"],
    isAccessible: true,
    maxStudents: 150,
    deafFriendlyScore: 94,
    instructorRating: 4.7,
    completionRate: 84,
    jobPlacementRate: 82,
    skillTags: ["Excel", "Data Analysis", "Python", "Charts", "Business Intelligence"],
    difficulty: 3
  },

  // Language & Communication
  {
    id: 17,
    title: "English for Professional Communication",
    instructor: "Language Institute",
    duration: "10 weeks",
    level: "Intermediate",
    description: "Improve your professional English skills with focus on written communication, emails, and business vocabulary. Perfect for deaf professionals.",
    features: ["Business English", "Email writing", "Professional vocabulary", "Grammar improvement", "Writing practice", "Career applications"],
    nextSession: "Wednesday, March 20, 2024",
    enrolled: 147,
    rating: 4.6,
    price: "Rp 850,000",
    category: "Language",
    lessons: 40,
    certificateIncluded: true,
    language: ["English", "Indonesian", "ASL"],
    prerequisites: ["Basic English knowledge", "Writing ability"],
    learningOutcomes: ["Improve business English", "Professional email writing", "Better grammar", "Workplace communication"],
    isAccessible: true,
    maxStudents: 200,
    deafFriendlyScore: 92,
    instructorRating: 4.5,
    completionRate: 89,
    skillTags: ["English", "Business Communication", "Writing", "Grammar", "Professional"],
    difficulty: 2
  },

  // Creative Arts
  {
    id: 18,
    title: "Video Editing & Content Creation",
    instructor: "Creative Media Lab",
    duration: "6 weeks",
    level: "Beginner",
    description: "Learn video editing for social media and YouTube. Create engaging content with focus on visual storytelling perfect for deaf creators.",
    features: ["Video editing software", "Content planning", "Visual storytelling", "Social media optimization", "Equipment guidance", "Portfolio building"],
    nextSession: "Saturday, March 23, 2024",
    enrolled: 112,
    rating: 4.7,
    price: "Rp 900,000",
    category: "Media Production",
    lessons: 24,
    certificateIncluded: true,
    language: ["Indonesian", "ASL"],
    prerequisites: ["Basic computer skills", "Creative interest"],
    learningOutcomes: ["Master video editing", "Create social content", "Visual storytelling", "Content strategy"],
    isAccessible: true,
    maxStudents: 100,
    deafFriendlyScore: 95,
    instructorRating: 4.6,
    completionRate: 91,
    skillTags: ["Video Editing", "Content Creation", "Social Media", "Storytelling"],
    difficulty: 2
  }
];

const categories = [
  { id: 'all', name: 'All Categories', icon: <BookOpen className="w-4 h-4" />, count: enhancedWorkshops.length },
  { id: 'technology', name: 'Technology', icon: <Code className="w-4 h-4" />, count: enhancedWorkshops.filter(w => w.category === 'Technology').length },
  { id: 'design', name: 'Design', icon: <Palette className="w-4 h-4" />, count: enhancedWorkshops.filter(w => w.category === 'Design').length },
  { id: 'marketing', name: 'Marketing', icon: <Megaphone className="w-4 h-4" />, count: enhancedWorkshops.filter(w => w.category === 'Marketing').length },
  { id: 'programming', name: 'Programming', icon: <Monitor className="w-4 h-4" />, count: enhancedWorkshops.filter(w => w.category === 'Programming').length },
  { id: 'business', name: 'Business', icon: <BarChart className="w-4 h-4" />, count: enhancedWorkshops.filter(w => w.category === 'Business').length },
  { id: 'hospitality', name: 'Hospitality', icon: <Coffee className="w-4 h-4" />, count: enhancedWorkshops.filter(w => w.category === 'Hospitality').length },
  { id: 'culinary', name: 'Culinary', icon: <Utensils className="w-4 h-4" />, count: enhancedWorkshops.filter(w => w.category === 'Culinary').length },
  { id: 'fashion', name: 'Fashion', icon: <Shirt className="w-4 h-4" />, count: enhancedWorkshops.filter(w => w.category === 'Fashion').length },
  { id: 'communication', name: 'Communication', icon: <Hand className="w-4 h-4" />, count: enhancedWorkshops.filter(w => w.category === 'Communication').length },
  { id: 'health & wellness', name: 'Health & Wellness', icon: <Heart className="w-4 h-4" />, count: enhancedWorkshops.filter(w => w.category === 'Health & Wellness').length }
];

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

interface WorkshopPageProps {
  userAssessment?: {
    primaryGoal: string;
    experienceLevel: string;
    interests: string[];
    communicationPreferences: string[];
  };
}

export default function WorkshopPage({ userAssessment }: WorkshopPageProps) {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');
  const [enrolledWorkshops, setEnrolledWorkshops] = useState<number[]>([]);
  const [savedWorkshops, setSavedWorkshops] = useState<number[]>([]);
  const [enrollmentStatuses, setEnrollmentStatuses] = useState<EnrollmentStatus[]>([]);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [currentEnrollmentWorkshop, setCurrentEnrollmentWorkshop] = useState<Workshop | null>(null);

  // Enhanced recommendation algorithm
  const getRecommendedWorkshops = () => {
    if (!userAssessment) return enhancedWorkshops;
    
    return enhancedWorkshops.map(workshop => {
      let score = 0;
      
      // Match based on interests from assessment
      if (userAssessment.interests) {
        const workshopCategory = workshop.category.toLowerCase();
        const workshopTags = workshop.skillTags.map(tag => tag.toLowerCase());
        
        userAssessment.interests.forEach(interest => {
          const interestLower = interest.toLowerCase();
          
          // Direct category match
          if (workshopCategory.includes(interestLower) || interestLower.includes(workshopCategory)) {
            score += 30;
          }
          
          // Tag matching
          workshopTags.forEach(tag => {
            if (tag.includes(interestLower) || interestLower.includes(tag)) {
              score += 15;
            }
          });
          
          // Specific skill matching
          if (workshop.skillTags.some(skill => 
            skill.toLowerCase().includes(interestLower) || 
            interestLower.includes(skill.toLowerCase())
          )) {
            score += 20;
          }
        });
      }
// Experience level matching
      if (userAssessment.experienceLevel) {
        const userLevel = userAssessment.experienceLevel.toLowerCase();
        const workshopLevel = workshop.level.toLowerCase();
        
        if (workshopLevel === userLevel) {
          score += 25;
        } else if (
          (userLevel === 'beginner' && workshopLevel === 'beginner') ||
          (userLevel === 'intermediate' && workshopLevel === 'intermediate') ||
          (userLevel === 'advanced' && workshopLevel === 'advanced')
        ) {
          score += 20;
        }
      }
      
      // Boost high accessibility scores
      score += workshop.deafFriendlyScore * 0.2;
      
      // Boost high job placement rates
      if (workshop.jobPlacementRate) {
        score += workshop.jobPlacementRate * 0.15;
      }
      
      // Boost for ASL support
      if (workshop.language.includes('ASL')) {
        score += 10;
      }
      
      // Boost for Indonesian language support
      if (workshop.language.includes('Indonesian')) {
        score += 5;
      }
      
      return { ...workshop, recommendationScore: Math.min(score, 100) };
    }).sort((a, b) => (b.recommendationScore || 0) - (a.recommendationScore || 0));
  };

  const filteredWorkshops = getRecommendedWorkshops().filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.skillTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || workshop.category.toLowerCase() === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || workshop.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price') {
      const aPrice = parseInt(a.price.replace(/[^0-9]/g, ''));
      const bPrice = parseInt(b.price.replace(/[^0-9]/g, ''));
      return aPrice - bPrice;
    }
    if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
    if (sortBy === 'accessibility') return b.deafFriendlyScore - a.deafFriendlyScore;
    return b.enrolled - a.enrolled; // recommended/popularity by default
  });

  const handleEnroll = (workshop: Workshop) => {
    setCurrentEnrollmentWorkshop(workshop);
    setShowEnrollmentModal(true);
  };

  const confirmEnrollment = () => {
    if (currentEnrollmentWorkshop) {
      setEnrolledWorkshops(prev => [...prev, currentEnrollmentWorkshop.id]);
      const newEnrollment: EnrollmentStatus = {
        workshopId: currentEnrollmentWorkshop.id,
        status: 'enrolled',
        progress: 0,
        enrolledDate: new Date(),
        lastActivity: new Date()
      };
      setEnrollmentStatuses(prev => [...prev, newEnrollment]);
      setShowEnrollmentModal(false);
      setCurrentEnrollmentWorkshop(null);
    }
  };

  const toggleSaveWorkshop = (workshopId: number) => {
    setSavedWorkshops(prev => 
      prev.includes(workshopId) 
        ? prev.filter(id => id !== workshopId)
        : [...prev, workshopId]
    );
  };

  const getEnrollmentStatus = (workshopId: number) => {
    return enrollmentStatuses.find(status => status.workshopId === workshopId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="py-6 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Learn New Skills
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Master new skills with visual tutorials, ASL support, and hands-on projects designed for the deaf community
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 text-center shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="text-2xl font-bold text-indigo-600">{filteredWorkshops.length}</div>
                <div className="text-sm text-gray-600">Available Workshops</div>
              </div>
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 text-center shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">ASL Supported</div>
              </div>
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 text-center shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="text-2xl font-bold text-purple-600">{savedWorkshops.length}</div>
                <div className="text-sm text-gray-600">Saved Workshops</div>
              </div>
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 text-center shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="text-2xl font-bold text-blue-600">{enrolledWorkshops.length}</div>
                <div className="text-sm text-gray-600">Enrolled</div>
              </div>
            </div>
          </div>

          {/* Recommendation Banner */}
          {userAssessment && (
            <div className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Target className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">Personalized Recommendations</h3>
              </div>
              <p className="text-green-700">
                Based on your assessment, we've found {filteredWorkshops.filter(workshop => workshop.recommendationScore && workshop.recommendationScore > 60).length} highly recommended workshops matching your interests and experience level: {userAssessment.experienceLevel}
              </p>
            </div>
          )}

          {/* Category Filters */}
          <div className="mb-6">
            <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl'
                      : 'bg-white/80 backdrop-blur-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 shadow-lg'
                  }`}
                >
                  {category.icon}
                  <span className="font-medium">{category.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search workshops, instructors, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border text-gray-500 border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-lg bg-white/90 backdrop-blur-sm"
                />
              </div>
              
              <div className="md:col-span-2">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-4 py-4 border text-gray-500 border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg bg-white/90 backdrop-blur-sm"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level} Level</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-4 border text-gray-500 border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg bg-white/90 backdrop-blur-sm"
                >
                  <option value="recommended">Recommended</option>
                  <option value="popularity">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price">Lowest Price</option>
                  <option value="accessibility">Most Accessible</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                  <Filter className="w-4 h-4" />
                  <span>More Filters</span>
                </button>
              </div>
            </div>
          </div>

          {/* Workshop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredWorkshops.map((workshop) => {
              const enrollmentStatus = getEnrollmentStatus(workshop.id);
              return (
                <div
                  key={workshop.id}
                  className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 group overflow-hidden transform hover:scale-[1.02]"
                >
                  {/* Workshop Header with Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-lg ${
                        workshop.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        workshop.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {workshop.level}
                      </span>
                      {userAssessment && workshop.recommendationScore && workshop.recommendationScore > 70 && (
                        <span className="bg-white/90 text-indigo-600 px-2 py-1 rounded-full text-xs font-medium flex items-center animate-pulse shadow-lg">
                          <Target className="w-3 h-3 mr-1" />
                          Recommended
                        </span>
                      )}
                    </div>
                    
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => toggleSaveWorkshop(workshop.id)}
                        className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                          savedWorkshops.includes(workshop.id) 
                            ? 'bg-red-500 text-white shadow-lg' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${savedWorkshops.includes(workshop.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-white">
                        <div className="text-sm opacity-90 mb-1">{workshop.category}</div>
                        <h3 className="text-xl font-bold leading-tight mb-2">{workshop.title}</h3>
                        <div className="flex items-center space-x-2 text-sm">
                          <User className="w-4 h-4" />
                          <span>by {workshop.instructor}</span>
                          <div className="flex items-center ml-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span>{workshop.instructorRating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Workshop Content */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2 leading-relaxed">
                      {workshop.description.length > 120 ? `${workshop.description.substring(0, 120)}...` : workshop.description}
                    </p>

                    {/* Workshop Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg">
                        <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                        <span>{workshop.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg">
                        <Users className="w-4 h-4 mr-2 text-green-500" />
                        <span>{workshop.enrolled} enrolled</span>
                      </div>
                      <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg">
                        <BookOpen className="w-4 h-4 mr-2 text-purple-500" />
                        <span>{workshop.lessons} lessons</span>
                      </div>
                      <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-gray-600">{workshop.rating}</span>
                      </div>
                    </div>

                    {/* Accessibility Score */}
                    <div className="mb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-3 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Accessibility className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">
                            Accessibility Score: {workshop.deafFriendlyScore}%
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                i < Math.floor(workshop.deafFriendlyScore / 20) ? 'bg-green-500 shadow-md' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {workshop.skillTags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                          {tag}
                        </span>
                      ))}
                      {workshop.skillTags.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs shadow-md">
                          +{workshop.skillTags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Next Session */}
                    <div className="flex items-center text-sm text-gray-600 mb-4 bg-blue-50 rounded-xl p-3 shadow-lg">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <span>Next session: {workshop.nextSession}</span>
                    </div>

                    {/* Language Support */}
                    <div className="flex items-center mb-4 text-sm bg-gray-50 rounded-xl p-3 shadow-lg">
                      <Hand className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-gray-600">{workshop.language.join(', ')}</span>
                      {workshop.language.includes('ASL') && (
                        <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium shadow-md">
                          ASL Supported
                        </span>
                      )}
                    </div>

                    {/* Job Placement Rate */}
                    {workshop.jobPlacementRate && (
                      <div className="mb-4 bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 shadow-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800">
                              Job Placement Rate: {workshop.jobPlacementRate}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-green-600 bg-green-50 px-4 py-2 rounded-2xl shadow-md">
                        {workshop.price}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedWorkshop(workshop)}
                          className="px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-2xl hover:bg-indigo-50 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          View Details
                        </button>
                        {enrollmentStatus ? (
                          <div className="px-4 py-2 bg-green-100 text-green-800 rounded-2xl text-sm font-medium flex items-center shadow-lg">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Enrolled
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEnroll(workshop)}
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 text-sm font-medium shadow-xl hover:shadow-2xl transform hover:scale-105"
                          >
                            Enroll Now
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Enrollment Status Progress */}
                    {enrollmentStatus && (
                      <div className="mt-4 bg-green-50 border-2 border-green-200 rounded-2xl p-3 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-green-800">Progress</span>
                          <span className="text-sm text-green-600">{enrollmentStatus.progress}%</span>
                        </div>
                        <div className="w-full bg-green-200 rounded-full h-2 shadow-inner">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300 shadow-md"
                            style={{ width: `${enrollmentStatus.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredWorkshops.length === 0 && (
            <div className="text-center py-16 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20">
              <BookOpen className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No workshops found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse different categories</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedLevel('All');
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Workshop Detail Modal */}
          {selectedWorkshop && (
            <WorkshopDetailModal
              workshop={selectedWorkshop}
              isEnrolled={enrolledWorkshops.includes(selectedWorkshop.id)}
              enrollmentStatus={getEnrollmentStatus(selectedWorkshop.id)}
              onClose={() => setSelectedWorkshop(null)}
              onEnroll={() => handleEnroll(selectedWorkshop)}
              onSave={() => toggleSaveWorkshop(selectedWorkshop.id)}
              isSaved={savedWorkshops.includes(selectedWorkshop.id)}
            />
          )}

          {/* Enrollment Modal */}
          {showEnrollmentModal && currentEnrollmentWorkshop && (
            <EnrollmentModal
              workshop={currentEnrollmentWorkshop}
              onClose={() => setShowEnrollmentModal(false)}
              onConfirm={confirmEnrollment}
            />
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

// Workshop Detail Modal Component
function WorkshopDetailModal({ 
  workshop, 
  isEnrolled, 
  enrollmentStatus, 
  onClose, 
  onEnroll, 
  onSave, 
  isSaved 
}: { 
  workshop: Workshop; 
  isEnrolled: boolean; 
  enrollmentStatus?: EnrollmentStatus; 
  onClose: () => void; 
  onEnroll: () => void; 
  onSave: () => void; 
  isSaved: boolean; 
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Workshop Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Workshop Header */}
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    workshop.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    workshop.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {workshop.level}
                  </span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {workshop.category}
                  </span>
                  {workshop.certificateIncluded && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm flex items-center">
                      <Award className="w-3 h-3 mr-1" />
                      Certificate
                    </span>
                  )}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{workshop.title}</h2>
                <p className="text-lg text-indigo-600 font-medium mb-4">by {workshop.instructor}</p>
                
                {/* Instructor Rating */}
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span>Instructor: {workshop.instructorRating}</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span>Completion: {workshop.completionRate}%</span>
                  </div>
                  {workshop.jobPlacementRate && (
                    <div className="flex items-center">
                      <Target className="w-4 h-4 text-blue-500 mr-1" />
                      <span>Job Placement: {workshop.jobPlacementRate}%</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">About This Workshop</h3>
                <p className="text-gray-600 leading-relaxed">{workshop.description}</p>
              </div>

              {/* Learning Outcomes */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {workshop.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills You'll Gain */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Skills You'll Gain</h3>
                <div className="flex flex-wrap gap-2">
                  {workshop.skillTags.map((skill, index) => (
                    <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              {workshop.prerequisites && workshop.prerequisites.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Prerequisites</h3>
                  <div className="space-y-2">
                    {workshop.prerequisites.map((prereq, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 flex-shrink-0"></div>
                        {prereq}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Course Features */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Course Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Video className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">Video Lessons</div>
                    <div className="text-xs text-gray-600">{workshop.lessons} lessons</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Hand className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">ASL Support</div>
                    <div className="text-xs text-gray-600">Full interpretation</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">Community</div>
                    <div className="text-xs text-gray-600">Peer support</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">Certificate</div>
                    <div className="text-xs text-gray-600">Upon completion</div>
                  </div>
                </div>
              </div>

              {/* Accessibility Features */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility Features</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-800 text-sm">Sign language interpretation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-800 text-sm">Visual learning materials</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-800 text-sm">Written transcripts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-800 text-sm">Flexible pacing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-800 text-sm">Live Q&A sessions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-800 text-sm">Mobile accessibility</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-4">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{workshop.price}</div>
                  <div className="text-sm text-gray-600">Full course access</div>
                </div>

                {/* Workshop Stats */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{workshop.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-medium">{workshop.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lessons:</span>
                    <span className="font-medium">{workshop.lessons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Enrolled:</span>
                    <span className="font-medium">{workshop.enrolled} students</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Students:</span>
                    <span className="font-medium">{workshop.maxStudents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{workshop.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next session:</span>
                    <span className="font-medium text-sm">{workshop.nextSession}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Languages:</span>
                    <span className="font-medium text-sm">{workshop.language.join(', ')}</span>
                  </div>
                </div>

                {/* Accessibility Score */}
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <Accessibility className="w-5 h-5 mr-2" />
                    Accessibility Score
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="w-full mr-3">
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${workshop.deafFriendlyScore}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-bold text-green-600">
                      {workshop.deafFriendlyScore}%
                    </span>
                  </div>
                </div>

                {/* Enrollment Status or Actions */}
                {isEnrolled ? (
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800">Enrolled</span>
                      </div>
                      {enrollmentStatus && (
                        <div>
                          <div className="flex justify-between text-sm text-green-700 mb-1">
                            <span>Progress</span>
                            <span>{enrollmentStatus.progress}%</span>
                          </div>
                          <div className="w-full bg-green-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${enrollmentStatus.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2">
                      <PlayCircle className="w-5 h-5" />
                      <span>Continue Learning</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={onEnroll}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    >
                      <span>Enroll in Workshop</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={onSave}
                        className={`border border-gray-300 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-1 ${
                          isSaved ? 'bg-red-50 border-red-300 text-red-600' : 'text-gray-700'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                        <span>{isSaved ? 'Saved' : 'Save'}</span>
                      </button>
                      <button className="border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-1">
                        <ExternalLink className="w-4 h-4" />
                        <span>Preview</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* What's Included */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">This workshop includes:</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4" />
                      <span>{workshop.lessons} video lessons</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Hand className="w-4 h-4" />
                      <span>ASL interpretation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Downloadable resources</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>Community access</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Lifetime access</span>
                    </div>
                    {workshop.jobPlacementRate && (
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>Job placement assistance</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enrollment Modal Component
function EnrollmentModal({ workshop, onClose, onConfirm }: { workshop: Workshop; onClose: () => void; onConfirm: () => void; }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-white/20">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-green-600" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">Enroll in Workshop</h3>
          <p className="text-gray-600 mb-6">
            You're about to enroll in <strong>{workshop.title}</strong> by {workshop.instructor}.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold">{workshop.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">{workshop.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Level:</span>
                <span className="font-semibold">{workshop.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Next Session:</span>
                <span className="font-semibold text-xs">{workshop.nextSession}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
            >
              Confirm Enrollment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
      