export type ViewMode = 'public' | 'admin' | 'auth';

export type AdminTab = 
  | 'dashboard' 
  | 'users' 
  | 'schools' 
  | 'programs' 
  | 'reports' 
  | 'analytics' 
  | 'settings' 
  | 'logs' 
  | 'backup'
  | 'students'
  | 'teachers'
  | 'classes'
  | 'attendance';

export interface DaycareCenter {
  id: string;
  name: string;
  code: string;
  isHq?: boolean;
  address: string;
  district: string;
  ownerName: string;
  ownerRole: string;
  ownerPhone: string;
  ownerEmail: string;
  enrolled: number;
  capacity: number;
  teachersCount: number;
  staffCount: number;
  ratio: string;
  programs: string[];
  subscriptionTier: 'Enterprise Multi' | 'Pro Annual' | 'Growth Tier' | 'Trial Tier (Expired)';
  subscriptionDaysLeft: number;
  monthlyFee: number;
  status: 'Active' | 'Expiring' | 'Grace Period';
  attendanceRate: number;
  retentionRate: number;
  monthlyRevenue: number;
  qualityScore: number;
  trendText: string;
  trendType: 'positive' | 'warning' | 'neutral';
}

export interface UserItem {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  role: 'DAYCARE_OWNER' | 'DAYCARE_ADMIN' | 'TEACHER' | 'TEACHER (Early)' | 'SUPER_ADMIN';
  verified?: boolean;
  centerName: string;
  centerLocation: string;
  planName: string;
  planDetails: string;
  daysLeft: number;
  planStatus: 'Active' | 'Expiring Soon' | 'Grace Period' | 'Managed';
  nextBillingDate: string;
  billingMethod: string;
  autoRenew: boolean;
  userStatus: 'Active' | 'Restricted' | 'Pending';
  enrolledKids?: number;
  maxKids?: number;
  enrolledStaff?: number;
  maxStaff?: number;
}

export interface ProgramItem {
  id: string;
  code: string;
  name: string;
  emoji: string;
  ageBracket: string;
  enrolled: number;
  capacity: number;
  ratio: string;
  ratioType: string;
  campusesCount: number;
  totalCampuses: number;
  tuition: number;
  tuitionType: string;
  curriculumStatus: string;
  statusType: 'active' | 'bilingual' | 'accredited' | 'stem' | 'universal';
  description: string;
  category: 'Early Years' | 'Preschool & Pre-K' | 'Kindergarten' | 'Enrichment & After-School';
}

export interface GalleryItem {
  id: string;
  title: string;
  ageBracket: string;
  summary: string;
  image: string;
  category: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  badge: string;
  badgeColor: string;
  summary: string;
  image: string;
  content: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
