import HeroSection from '@/components/HeroSection';
import CountdownTimer from '@/components/CountdownTimer';
import ContentSection from '@/components/ContentSection';
import SignatureForm from '@/components/SignatureForm';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';

export const metadata = {
  title: 'מצילים את הבריכות הטיפוליות - עצומה נגד ביטול טיפולי הידרותרפיה',
  description:
    'משרד הבריאות עומד לבטל את הזכאות לטיפולי הידרותרפיה מהביטוחים המשלימים. אלפי ילדים עם צרכים מיוחדים יאבדו את הטיפול היחיד שעובד. חתמו עכשיו!',
  openGraph: {
    title: 'מצילים את הבריכות הטיפוליות - עצומה נגד ביטול טיפולי הידרותרפיה',
    description:
      'אל תתנו להם לייבש את זה! חתמו על העצומה נגד ביטול טיפולי ההידרותרפיה לילדים עם צרכים מיוחדים.',
    type: 'website',
    locale: 'he_IL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'מצילים את הבריכות הטיפוליות - עצומה דחופה',
    description:
      'המים הם החמצן שלהם. חתמו עכשיו נגד ביטול טיפולי ההידרותרפיה לילדים עם צרכים מיוחדים.',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <CountdownTimer />
      <HeroSection />

      {/* Progress Bar Section */}
      <div className="py-6 md:py-12 px-4 bg-white">
        <ProgressBar />
      </div>

      <ContentSection />
      <div className="py-8 md:py-16 px-4 bg-white">
        <SignatureForm />
      </div>

      <Footer />
    </div>
  );
}
