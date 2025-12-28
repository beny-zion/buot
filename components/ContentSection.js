import { Heart, MapPin, Shield, Quote } from 'lucide-react';

export default function ContentSection() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Main message */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            למה זה קריטי <span className="text-sky-600">עכשיו</span>?
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            טיוטת משרד הבריאות עומדת לבטל את הזכאות לטיפולי הידרותרפיה בבריכות טיפוליות
            מהביטוחים המשלימים (שב"ן). זו לא רק החלטה בירוקרטית - זו גזירה שתשנה את חייהם
            של אלפי ילדים ומשפחות.
          </p>
        </div>

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 - Who will be affected */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-sky-500 hover:shadow-xl transition-shadow">
            <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-sky-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">מי ייפגע?</h3>
            <ul className="space-y-3 text-gray-700 leading-relaxed">
              <li>• ילדים עם הפרעות קשב והיפראקטיביות</li>
              <li>• ילדים עם ליקויי התפתחות</li>
              <li>• ילדים על הספקטרום האוטיסטי</li>
              <li>• ילדים עם מוגבלויות פיזיות</li>
              <li>• משפחות שהטיפולים הללו הם הישועה היומיומית שלהן</li>
            </ul>
          </div>

          {/* Card 2 - Periphery impact */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-orange-500 hover:shadow-xl transition-shadow">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">פגיעה בפריפריה</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>תושבי הפריפריה ייפגעו הכי קשה.</strong> בערים כמו קרית שמונה, אילת,
              ובאר שבע - אין חלופות.
            </p>
            <p className="text-gray-700 leading-relaxed">
              כשהספקים היחידים יהיו פרטיים ויקרים, רק משפחות אמידות ממרכז הארץ יוכלו להרשות
              לעצמן את הטיפולים. <strong>זו יצירת רפואה לעשירים בלבד.</strong>
            </p>
          </div>

          {/* Card 3 - War impact */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-red-500 hover:shadow-xl transition-shadow">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">דווקא עכשיו?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              אנחנו במלחמה. ילדים עוברים טראומות. משפחות שבורות רגשית ופיזית.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>דווקא עכשיו הטיפולים האלה קריטיים יותר מתמיד.</strong> המים
              והטבע מרגיעים, מחזקים, ומחזירים תקווה. לקחת אותם עכשיו זה לא סתם קיצוץ - זה
              אכזריות.
            </p>
          </div>
        </div>

        {/* Expert quote */}
        <div className="bg-gradient-to-br from-sky-600 to-sky-800 rounded-2xl shadow-2xl p-10 text-white relative overflow-hidden">
          <Quote className="absolute top-4 right-4 w-24 h-24 text-white/10" />
          <div className="relative z-10">
            <p className="text-2xl md:text-3xl font-bold leading-relaxed mb-6 italic">
              "זו יצירת רפואה לעשירים בלבד, בניגוד גמור לעקרון השוויון בבריאות. משפחות
              בפריפריה ומשפחות בעלות הכנסה נמוכה פשוט לא יוכלו להרשות לעצמן את הטיפולים
              האלה. זה לא קיצוץ תקציבי - זו גזירה חברתית."
            </p>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur w-16 h-16 rounded-full flex items-center justify-center">
                <Quote className="w-8 h-8" />
              </div>
              <div>
                <p className="font-black text-xl">שמוליק בן יעקב</p>
                <p className="text-sky-100">יו"ר האגודה לזכויות החולה</p>
              </div>
            </div>
          </div>
        </div>

        {/* The Solution */}
        <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-10 text-center">
          <h3 className="text-3xl font-black text-gray-900 mb-4">מה אפשר לעשות?</h3>
          <p className="text-xl text-gray-700 mb-6 leading-relaxed max-w-3xl mx-auto">
            כל חתימה נוספת מגבירה את הלחץ הציבורי על משרד הבריאות. אנחנו לא נשב בשקט בזמן
            שגוזרים על הילדים שלנו. <strong>חתמו, שתפו, תעשו רעש!</strong>
          </p>
          <a
            href="#sign-form"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-black text-2xl py-5 px-12 rounded-full transition-all transform hover:scale-105 shadow-xl"
          >
            חתמו עכשיו למטה ↓
          </a>
        </div>
      </div>
    </div>
  );
}
