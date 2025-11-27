import { useState } from 'react';
import './App.css';
import { QRCodeSVG } from 'qrcode.react';

function App() {
  const [activeTab, setActiveTab] = useState('offers');
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [showVideo, setShowVideo] = useState(false);

  const offers = [
    {
      id: 1,
      title: 'Weekend Special',
      product: 'Budvar Original 500ml',
      discount: '16%',
      oldPrice: 42,
      newPrice: 35,
      valid: 'Fri-Sun at partner locations',
      why: ['☀️ Sunny weekend expected', '📈 High outdoor demand', '🎯 You prefer Originals'],
      badge: 'Personalized for You',
      location: 'Pivnice U Medvídka (0.3km)',
    },
    {
      id: 2,
      title: 'Happy Hour',
      product: 'Budvar Dark 500ml',
      discount: '27%',
      oldPrice: 44,
      newPrice: 32,
      valid: 'Today 5-7 PM',
      why: ['🕐 Peak hour pricing', '🎵 Concert nearby tonight', '💡 Try something new!'],
      badge: 'Limited Time',
      location: 'Café Imperial (0.8km)',
    },
  ];

  const challenge = {
    title: 'Try 3 Budvar Varieties',
    progress: 2,
    total: 3,
    reward: '20% off + Brewery Tour Ticket',
    completed: ['Original', 'Dark'],
    remaining: ['Premium Light'],
  };

  const savings = {
    thisMonth: 387,
    thisYear: 1847,
    avgMonthly: 168,
    vs: 'non-app users',
  };

  const teamLead = {
    id: 1,
    name: 'Aguan',
    role: 'Team Lead',
    description: 'Responsible for being late and being late',
    image: '/ayxan.jpg'
  };

  const teamMembers = [
    { id: 2, name: 'Habibi', role: 'Hairdresser', description: 'Always cold, work as part-time hair washer', image: '/alex.jpeg' },
    { id: 3, name: '1 more shot and we go girl', role: 'Team building somethinh', description: 'Creative idea generator', image: '/katya.jpeg' },
    { id: 4, name: 'Lily', role: 'Crazy Cat Lady', description: 'Meow meow meow meow meow meow.....', image: '/lily.jpeg' },
    { id: 5, name: 'Lubos', role: 'Professional Bodyguard', description: 'Can carry all of us with one hand', image: '/lubos.jpeg' },
  ];

  const toggleCard = (id: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-budvar-gold to-budvar-gold-dark text-white p-4 sm:p-6 shadow-lg sticky top-0 z-50">
        <div className="w-full px-0">
          <h1 className="text-xl sm:text-2xl font-bold mb-1">Budvar Smart Offers</h1>
          <p className="text-xs sm:text-sm text-white/90">Hello, Jakub! 👋</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-3 sm:px-4 py-4 sm:py-6 pb-20 sm:pb-24">
        {/* Tab Navigation */}
        <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 bg-white rounded-xl p-1.5 sm:p-2 shadow-md">
          {[
            { id: 'offers', label: '🎯 Offers', },
            { id: 'challenges', label: '🎮 Challenges' },
            { id: 'savings', label: '💰 Savings' },
            { id: 'docs', label: '📄 Docs' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-budvar-gold text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Offers Tab */}
        {activeTab === 'offers' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-r from-budvar-gold/20 to-amber-100 rounded-xl p-3 sm:p-4 border-2 border-budvar-gold/30">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                ✨ Personalized Just For You
              </h2>
              <p className="text-xs sm:text-sm text-gray-700">
                AI-powered offers based on your preferences, location, and behavior
              </p>
            </div>

            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="bg-gradient-to-r from-budvar-gold to-budvar-gold-dark p-3 sm:p-4">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="bg-white/20 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full inline-block mb-2">
                        {offer.badge}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{offer.title}</h3>
                      <p className="text-white/90 text-xs sm:text-sm truncate">{offer.product}</p>
                    </div>
                    <div className="bg-white text-budvar-gold font-bold text-xl sm:text-2xl px-3 sm:px-4 py-1 sm:py-2 rounded-full flex-shrink-0">
                      -{offer.discount}
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  {/* Pricing */}
                  <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className="text-gray-400 line-through text-base sm:text-lg">{offer.oldPrice} CZK</span>
                    <span className="text-2xl sm:text-3xl font-bold text-budvar-gold">{offer.newPrice} CZK</span>
                    <span className="text-xs sm:text-sm text-green-600 font-semibold">
                      Save {offer.oldPrice - offer.newPrice} CZK
                    </span>
                  </div>

                  {/* Why This Offer */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border border-green-200">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <span>💡</span> Why This Offer?
                    </h4>
                    <div className="space-y-1.5 sm:space-y-2">
                      {offer.why.map((reason, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    <span>📍</span>
                    <span className="truncate">{offer.location}</span>
                  </div>

                  {/* Validity */}
                  <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Valid: {offer.valid}</p>

                  {/* Redeem Button */}
                  <button
                    onClick={() => setSelectedOffer(offer)}
                    className="w-full bg-gradient-to-r from-budvar-gold to-budvar-gold-dark text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                  >
                    🎫 Redeem with QR Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-xl">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">🎮 Active Challenge</h2>
                <div className="bg-white/20 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {challenge.progress}/{challenge.total}
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{challenge.title}</h3>

              {/* Progress Bar */}
              <div className="bg-white/20 rounded-full h-3 sm:h-4 mb-3 sm:mb-4 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-500"
                  style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                />
              </div>

              {/* Completed */}
              <div className="mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm text-white/80 mb-2">Completed:</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.completed.map((item) => (
                    <div key={item} className="bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm">
                      ✅ {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Remaining */}
              <div className="mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm text-white/80 mb-2">Try next:</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.remaining.map((item) => (
                    <div key={item} className="bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm border-2 border-white/30 border-dashed">
                      ⭕ {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reward */}
              <div className="bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 border-white/30">
                <p className="text-xs sm:text-sm text-white/80 mb-1">🏆 Reward:</p>
                <p className="font-bold text-base sm:text-lg">{challenge.reward}</p>
              </div>
            </div>

            {/* Gamification Info */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="font-bold text-base sm:text-lg mb-3">🎯 How Gamification Works</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span>🎮</span>
                  <span><strong>Personalized Challenges:</strong> Based on your purchase history and preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🏅</span>
                  <span><strong>Exclusive Rewards:</strong> Discounts, brewery tours, limited editions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>📈</span>
                  <span><strong>Progress Tracking:</strong> See your journey and unlock achievements</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Savings Tab */}
        {activeTab === 'savings' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Total Savings Hero */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 text-6xl sm:text-9xl opacity-10">💰</div>
              <div className="relative z-10">
                <p className="text-xs sm:text-sm text-white/80 mb-1 sm:mb-2">Your Savings This Year</p>
                <h2 className="text-3xl sm:text-5xl font-bold mb-2">{savings.thisYear} CZK</h2>
                <p className="text-sm sm:text-base text-white/90">
                  That's <strong>{savings.avgMonthly} CZK/month</strong> on average
                </p>
                <div className="bg-white/20 rounded-lg p-2 sm:p-3 mt-3 sm:mt-4">
                  <p className="text-xs sm:text-sm">
                    📊 <strong>387%</strong> more savings than {savings.vs}!
                  </p>
                </div>
              </div>
            </div>

            {/* Monthly Breakdown */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">📅 This Month</h3>
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl font-bold text-budvar-gold">{savings.thisMonth} CZK</span>
                <span className="text-green-600 font-semibold text-xs sm:text-sm">↑ 15% vs last month</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-3 sm:p-4 text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-budvar-gold">12</p>
                  <p className="text-xs sm:text-sm text-gray-600">Offers Redeemed</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 sm:p-4 text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">5</p>
                  <p className="text-xs sm:text-sm text-gray-600">Locations Visited</p>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 sm:p-6 text-center border-2 border-purple-200">
              <h3 className="font-bold text-base sm:text-lg mb-2">🎉 Share Your Success</h3>
              <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                Invite friends and both earn bonus offers!
              </p>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:shadow-lg transition-all text-sm sm:text-base">
                👥 Share & Earn Rewards
              </button>
            </div>
          </div>
        )}

        {/* Documentation Tab */}
        {activeTab === 'docs' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Case Study 3 Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">📄 Case Study 3</h2>
              <p className="text-blue-100 text-xs sm:text-sm">Strategy 2: AI-Targeted Precision Promotion Platform</p>
            </div>

            {/* Justification */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                1️⃣ Justification - Why Strategy 2?
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    title: 'Massive Margin Improvement',
                    desc: 'Reduces discount share from 30% to 12-15%, protecting margins while maintaining sales volume through precision targeting'
                  },
                  {
                    title: 'Data-Driven Personalization',
                    desc: 'AI algorithms analyze behavior, location, and preferences to deliver relevant offers, increasing conversion by 35%'
                  },
                  {
                    title: 'Customer Engagement & Retention',
                    desc: 'Gamification and rewards create emotional connection, increasing lifetime value by 4.5x vs regular customers'
                  },
                  {
                    title: 'Measurable ROI & Scalability',
                    desc: 'Digital platform provides real-time analytics on redemption rates, allowing continuous optimization at scale'
                  }
                ].map((reason, idx) => (
                  <div key={idx} className="border-l-4 border-budvar-gold pl-3 sm:pl-4">
                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{reason.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{reason.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 Key Features */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                2️⃣ Five Key Features
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: '🎯', title: 'AI-Powered Personalization', desc: 'Machine learning analyzes user behavior to deliver contextually relevant offers based on purchase history, location, time, and preferences' },
                  { icon: '💡', title: 'Transparent Pricing Rationale', desc: '"Why this offer?" cards explain the reasoning (weather, events, peak hours), building trust and reducing price sensitivity' },
                  { icon: '🎮', title: 'Gamified Challenges', desc: 'Reward-based challenges (Try 3 Varieties) encourage product discovery and increase basket size through engaging mechanics' },
                  { icon: '💰', title: 'Real-Time Savings Tracker', desc: 'Visual dashboard showing cumulative savings vs non-app users, reinforcing value and encouraging continued usage' },
                  { icon: '📍', title: 'Location-Based Targeting', desc: 'Geofencing triggers nearby offers when users are close to partner venues, driving foot traffic and spontaneous purchases' }
                ].map((feature, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <span className="text-2xl sm:text-3xl flex-shrink-0">{feature.icon}</span>
                      <div className="min-w-0">
                        <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{feature.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visualization Note */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border-2 border-green-200">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                3️⃣ Visualization & Content
              </h3>
              <p className="text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm">
                This working prototype demonstrates all 5 key features in action:
              </p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                <li>✓ <strong>Offers Tab:</strong> Personalized feed with AI targeting and transparency</li>
                <li>✓ <strong>Challenges Tab:</strong> Gamification with progress tracking</li>
                <li>✓ <strong>Savings Tab:</strong> Real-time savings dashboard with stats</li>
                <li>✓ <strong>QR Redemption:</strong> Click "Redeem" on any offer</li>
                <li>✓ <strong>Mobile-First Design:</strong> Optimized for iOS/Android</li>
              </ul>
            </div>

            {/* Technical Stack */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="font-bold text-base sm:text-lg mb-3">🛠️ Technical Stack</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Tailwind CSS', 'QR Codes', 'Geolocation API', 'Push Notifications'].map((tech) => (
                  <span key={tech} className="bg-budvar-gold/10 text-budvar-gold px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Free Beer Button */}
            <div className="bg-gradient-to-r from-budvar-gold to-budvar-gold-dark rounded-xl p-6 text-center shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">🍺 Special Offer!</h3>
              <p className="text-white/90 mb-4 text-sm sm:text-base">
                Want a free beer? Click the button below!
              </p>
              <button
                onClick={() => setShowVideo(true)}
                className="bg-white text-budvar-gold font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-base sm:text-lg"
              >
                🍺 Click for FREE BEER!
              </button>
            </div>

            {/* Team Section */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="font-bold text-base sm:text-lg mb-4">👥 Our Team</h3>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Team Lead - Centered */}
                <div className="col-span-2 flex justify-center">
                  <div
                    onClick={() => toggleCard(teamLead.id)}
                    className="relative h-48 sm:h-56 w-full max-w-[calc(50%-0.375rem)] sm:max-w-[calc(50%-0.5rem)] cursor-pointer"
                    style={{ perspective: '1000px' }}
                  >
                    <div
                      className="relative w-full h-full transition-transform duration-500"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: flippedCards.has(teamLead.id) ? 'rotateY(-180deg)' : 'rotateY(0deg)'
                      }}
                    >
                      {/* Front */}
                      <div
                        className="absolute w-full h-full rounded-xl bg-gradient-to-br from-budvar-gold to-budvar-gold-dark p-4 flex flex-col items-center justify-center"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <h4 className="font-bold text-sm sm:text-base text-white text-center mb-2">
                          {teamLead.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-budvar-gold-dark text-center bg-white/20 px-2 py-1 rounded-full mb-2">
                          {teamLead.role}
                        </p>
                        <p className="text-xs sm:text-sm text-white/90 text-center leading-relaxed">
                          {teamLead.description}
                        </p>
                        <p className="text-xs text-white/70 mt-3">Tap to see photo</p>
                      </div>

                      {/* Back */}
                      <div
                        className="absolute w-full h-full rounded-xl overflow-hidden border-2 border-budvar-gold"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(-180deg)'
                        }}
                      >
                        <img src={teamLead.image} alt={teamLead.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other Team Members */}
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => toggleCard(member.id)}
                    className="relative h-48 sm:h-56 cursor-pointer"
                    style={{ perspective: '1000px' }}
                  >
                    <div
                      className="relative w-full h-full transition-transform duration-500"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: flippedCards.has(member.id) ? 'rotateY(-180deg)' : 'rotateY(0deg)'
                      }}
                    >
                      {/* Front */}
                      <div
                        className="absolute w-full h-full rounded-xl bg-gradient-to-br from-budvar-gold to-budvar-gold-dark p-4 flex flex-col items-center justify-center"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <h4 className="font-bold text-sm sm:text-base text-white text-center mb-2">
                          {member.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-center text-budvar-gold-dark bg-white/20 px-2 py-1 rounded-full mb-2">
                          {member.role}
                        </p>
                        <p className="text-xs sm:text-sm text-white/90 text-center leading-relaxed">
                          {member.description}
                        </p>
                        <p className="text-xs text-white/70 mt-3">Tap to see photo</p>
                      </div>

                      {/* Back */}
                      <div
                        className="absolute w-full h-full rounded-xl overflow-hidden border-2 border-budvar-gold"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(-180deg)'
                        }}
                      >
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-500 text-center mt-4">
                Click on any card to see more details about the team member
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-3 sm:p-4" onClick={() => setShowVideo(false)}>
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">🍺 Your Free Beer!</h3>
              <button
                onClick={() => setShowVideo(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=2aYHeEzQmaX4uOqJ&autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* QR Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4" onClick={() => setSelectedOffer(null)}>
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 w-full mx-3 sm:max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4">Scan to Redeem</h3>
            <div className="bg-white p-4 sm:p-6 rounded-xl border-4 border-budvar-gold mb-3 sm:mb-4 flex items-center justify-center">
              <QRCodeSVG
                value={`BUDVAR-OFFER-${selectedOffer.id}-${selectedOffer.product}`}
                size={window.innerWidth < 640 ? 180 : 200}
                level="H"
                className="mx-auto"
              />
            </div>
            <div className="text-center mb-3 sm:mb-4">
              <p className="font-bold text-base sm:text-lg">{selectedOffer.title}</p>
              <p className="text-gray-600 text-sm sm:text-base truncate">{selectedOffer.product}</p>
              <p className="text-2xl sm:text-3xl font-bold text-budvar-gold mt-2">{selectedOffer.newPrice} CZK</p>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 text-center mb-3 sm:mb-4 px-2">
              Show this QR code at: {selectedOffer.location}
            </p>
            <button
              onClick={() => setSelectedOffer(null)}
              className="w-full bg-gray-200 text-gray-700 font-bold py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-gray-300 transition-all text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
