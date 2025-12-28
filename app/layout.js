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
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
