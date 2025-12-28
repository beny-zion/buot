import { Heebo } from 'next/font/google';
import './globals.css';

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '700', '800', '900'],
  variable: '--font-heebo',
});

export const metadata = {
  title: 'מצילים את הבריכות הטיפוליות - עצומה נגד ביטול טיפולי הידרותרפיה',
  description:
    'משרד הבריאות עומד לבטל את הזכאות לטיפולי הידרותרפיה מהביטוחים המשלימים. חתמו עכשיו!',
  icons: {
    icon: '/bti_logo.svg',
    apple: '/bti_logo.svg',
  },
  openGraph: {
    title: 'דחוף! עצומה נגד ביטול טיפולי הידרותרפיה',
    description: 'אל תתנו להם לייבש את זה! המים הם החמצן שלהם. חתמו עכשיו על העצומה.',
    images: ['/og-image.svg'],
    locale: 'he_IL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'דחוף! עצומה נגד ביטול טיפולי הידרותרפיה',
    description: 'המים הם החמצן שלהם. חתמו עכשיו!',
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
