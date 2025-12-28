import HeroSection from '@/components/HeroSection';
import CountdownTimer from '@/components/CountdownTimer';
import ContentSection from '@/components/ContentSection';
import SignatureForm from '@/components/SignatureForm';

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
      <ContentSection />
      <div className="py-16 px-4 bg-white">
        <SignatureForm />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-black mb-4">איגוד הבריכות הטיפוליות</h3>
          <p className="text-gray-300 mb-6">
            איגוד המספק טיפולי הידרותרפיה בבריכות טיפוליות לילדים עם צרכים מיוחדים
          </p>
          <p className="text-gray-400 text-sm">
            האתר נבנה במטרה לעצור את ביטול הזכאות לטיפולי הידרותרפיה
            מהביטוחים המשלימים
          </p>
        </div>
      </footer>
    </div>
  );
}
