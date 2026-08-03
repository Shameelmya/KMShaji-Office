import { User } from '../types';

export const fallbackConfig = {
  apiKey: "AIzaSyDVGf-1JOJqQIK5TGKjQ_O70KSBrN3uG58",
  authDomain: "km-shaji-office-a83cc.firebaseapp.com",
  projectId: "km-shaji-office-a83cc",
  storageBucket: "km-shaji-office-a83cc.firebasestorage.app",
  messagingSenderId: "481235909399",
  appId: "1:481235909399:web:b37bc1693a8fbf61209552"
};

export const DEFAULT_CATEGORIES = [
  'CMDRF',
  'NORKA Santhwana',
  'tgrantz',
  'Invitation',
  'Road Complaint',
  'Help Request',
  'Personal Complaint',
  'Confidential Info'
];

export const DEFAULT_DESIGNATIONS = [
  'Citizen',
  'Panchayath President',
  'Panchayath Secretary',
  'Ward Member',
  'Asha Worker',
  'Political Leader',
  'Others'
];

export const INPUT_TYPES = [
  'Letter',
  'Phone Call',
  'Direct Visit',
  'WhatsApp Message',
  'Email',
  'Others'
];

export const LOCAL_BODIES = [
  'Vengara Panchayath',
  'AR Nagar Panchayath',
  'Kannamangalam Panchayath',
  'Othukkungal Panchayath',
  'Parappur Panchayath',
  'Thennala Panchayath',
  'Other'
];

export const EXT_LINKS: Record<string, string> = {
  'CMDRF': 'https://donation.cmdrf.kerala.gov.in/',
  'NORKA Santhwana': 'https://sso.norkaroots.kerala.gov.in/login?ref=main&client_id=99dd0c83-dad4-4cb7-90e4-19e9f1ffe7e5',
  'tgrantz': 'https://tgrantz.kerala.gov.in/'
};

export const DEFAULT_USERS: User[] = [
  { id: 'admin', name: 'KM Shaji (MLA)', role: 'admin', pass: 'KMShaji@2026', enabled: true, canInput: true, canSeeReports: true, canSeeGlobal: true, canSeeGlobalOverview: true, canSeeDraftsView: true, canEditGlobalOverview: true, canEditOwnInputs: true, canReassign: true, canGenerateUpdationReport: true, canSeeRecentUpdations: true, phone: '', whatsapp: '' }
];

export const ISLAMIC_QUOTES = [
  {
    arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَنْ تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا وَإِذَا حَكَمْتُمْ بَيْنَ النَّاسِ أَنْ تَحْكُمُوا بِالْعَدْلِ ۚ",
    malayalam: "തീർച്ചയായും അമാനത്തുകൾ (ബാധ്യതകൾ) അതിൻ്റെ അവകാശികൾക്ക് കൊടുത്തു വീട്ടണമെന്നും, ജനങ്ങൾക്കിടയിൽ തീർപ്പുകൽപ്പിക്കുകയാണെങ്കിൽ നീതിയോടെ വേണം തീർപ്പുകൽപ്പിക്കാനെന്നും അല്ലാഹു നിങ്ങളോട് കൽപ്പിക്കുന്നു. (ഖുർആൻ 4:58)"
  },
  {
    arabic: "اعْدِلُوا هُوَ أَقْرَبُ لِلتَّقْوَىٰ ۖ",
    malayalam: "നിങ്ങൾ നീതി പാലിക്കുക; അതാണ് ഭക്തിയോട് ഏറ്റവും അടുത്തത്. (ഖുർആൻ 5:8)"
  },
  {
    arabic: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ",
    malayalam: "ജനങ്ങളിൽ ഏറ്റവും ഉത്തമൻ ജനങ്ങൾക്ക് ഏറ്റവും ഉപകാരം ചെയ്യുന്നവനാണ്. (ഹദീസ്)"
  }
];
