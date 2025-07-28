import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export default function HomePage() {
  // 애드센스 광고 컴포넌트
  const AdBanner = () => (
    <div className="container mx-auto px-4 py-4">
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-2442517902625121"
           data-ad-slot="1234567890"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>
        {typeof window !== 'undefined' && (window.adsbygoogle = window.adsbygoogle || []).push({})}
      </script>
    </div>
  );

  const calculators = [
    {
      title: '값의 퍼센트 계산',
      description: '전체 값에서 특정 비율이 차지하는 값을 계산합니다',
      href: '/value-of',
      example: '예: 200의 25%는?',
      icon: '📊',
      color: 'from-blue-500 to-indigo-600',
      features: ['실시간 계산', 'URL 공유', '계산 기록']
    },
    {
      title: '몇 퍼센트인지 계산',
      description: '한 값이 다른 값의 몇 퍼센트인지 계산합니다',
      href: '/what-is',
      example: '예: 50은 200의 몇%?',
      icon: '🔍',
      color: 'from-green-500 to-emerald-600',
      features: ['비율 분석', '달성률 확인', '점유율 계산']
    },
    {
      title: '변화율 계산',
      description: '값의 증가율 또는 감소율을 계산합니다',
      href: '/change-rate',
      example: '예: 100에서 150으로 변화?',
      icon: '📈',
      color: 'from-purple-500 to-pink-600',
      features: ['성장률 분석', '손익 계산', '추세 파악']
    },
    {
      title: '변화 후 값 계산',
      description: '퍼센트 증감 후의 값을 계산합니다',
      href: '/after-change',
      example: '예: 1000원에서 20% 할인?',
      icon: '🛒',
      color: 'from-orange-500 to-red-600',
      features: ['할인가 계산', '인상액 확인', '예상값 산출']
    },
  ]


  return (
    <div>
      {/* 상단 광고 */}
      <AdBanner />
      
      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              Percent Master
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              가장 빠르고 정확한 온라인 퍼센트 계산기<br/>
              복잡한 계산도 클릭 한 번으로 해결하세요
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">100% 무료</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">회원가입 불필요</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">모바일 최적화</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-80 h-80 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-20 blur-3xl"></div>
      </section>

      {/* 계산기 카드 섹션 */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          필요한 계산기를 선택하세요
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {calculators.map((calc) => (
            <Link key={calc.href} href={calc.href} className="group">
              <Card className="h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${calc.color}`}></div>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2 group-hover:text-blue-600 transition-colors">
                        {calc.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 text-base">
                        {calc.description}
                      </CardDescription>
                    </div>
                    <span className="text-5xl ml-4">{calc.icon}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-600 font-semibold mb-4">{calc.example}</p>
                  <div className="flex flex-wrap gap-2">
                    {calc.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>


      {/* CTA 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            지금 바로 시작하세요!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            복잡한 퍼센트 계산, 이제는 쉽고 빠르게
          </p>
          <Link 
            href="/value-of" 
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            계산 시작하기 →
          </Link>
        </div>
      </section>

      {/* 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Percent Master",
            "description": "가장 빠르고 정확한 온라인 퍼센트 계산기. 할인율, 증가율, 비율 계산을 무료로 이용하세요.",
            "url": "https://jjyu.co.kr/percent-master",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://jjyu.co.kr/percent-master/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "sameAs": [
              "https://www.facebook.com/percentmaster",
              "https://twitter.com/percentmaster"
            ]
          })
        }}
      />
    </div>
  )
}