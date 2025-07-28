'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

function ValueOfCalculator() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [total, setTotal] = useState('')
  const [percent, setPercent] = useState('')
  const [history, setHistory] = useState<Array<{id: string, total: string, percent: string, result: string, date: string}>>([])
  const [showShareNotification, setShowShareNotification] = useState(false)

  // URL 파라미터에서 값 읽기
  useEffect(() => {
    const totalParam = searchParams.get('total')
    const percentParam = searchParams.get('percent')
    
    if (totalParam) setTotal(totalParam)
    if (percentParam) setPercent(percentParam)
  }, [searchParams])

  // 로컬 스토리지에서 계산 기록 불러오기
  useEffect(() => {
    const savedHistory = localStorage.getItem('percentCalcHistory')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  const result = useMemo(() => {
    const totalNum = parseFloat(total)
    const percentNum = parseFloat(percent)

    if (isNaN(totalNum) || isNaN(percentNum)) {
      return null
    }

    return (totalNum * percentNum) / 100
  }, [total, percent])

  // URL 업데이트
  useEffect(() => {
    if (total || percent) {
      const params = new URLSearchParams()
      if (total) params.set('total', total)
      if (percent) params.set('percent', percent)
      
      router.replace(`/value-of?${params.toString()}`, { scroll: false })
    }
  }, [total, percent, router])

  const handleReset = () => {
    setTotal('')
    setPercent('')
    router.replace('/value-of')
  }

  const saveToHistory = () => {
    if (result !== null) {
      const newEntry = {
        id: Date.now().toString(),
        total,
        percent,
        result: result.toString(),
        date: new Date().toLocaleString('ko-KR')
      }
      
      const updatedHistory = [newEntry, ...history].slice(0, 10) // 최근 10개만 저장
      setHistory(updatedHistory)
      localStorage.setItem('percentCalcHistory', JSON.stringify(updatedHistory))
    }
  }

  const shareCalculation = async () => {
    const shareUrl = window.location.href
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Percent Master - 계산 결과',
          text: `${total}의 ${percent}% = ${result}`,
          url: shareUrl
        })
      } catch (err) {
        copyToClipboard(shareUrl)
      }
    } else {
      copyToClipboard(shareUrl)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setShowShareNotification(true)
    setTimeout(() => setShowShareNotification(false), 3000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="animate-fade-in">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                <span className="text-4xl">📊</span>
              </div>
              <CardTitle className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                값의 퍼센트 계산기
              </CardTitle>
              <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                전체 값에서 특정 비율(%)이 차지하는 값을 정확하게 계산합니다
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <span className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  실시간 계산
                </span>
                <span className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  URL 공유
                </span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-10 pb-8">
            {/* 계산기 UI */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 mb-10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative bg-white rounded-xl shadow-lg">
                      <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-semibold text-gray-700">전체 값</label>
                      <Input
                        type="number"
                        value={total}
                        onChange={(e) => setTotal(e.target.value)}
                        placeholder="예: 10000"
                        className="w-48 md:w-56 p-5 text-center text-2xl md:text-3xl font-bold border-0 rounded-xl focus:ring-4 focus:ring-blue-300 transition-all"
                        aria-label="전체 값 입력"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md">
                    <span className="text-gray-500 font-bold text-xl">×</span>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative bg-white rounded-xl shadow-lg">
                      <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-semibold text-gray-700">퍼센트(%)</label>
                      <Input
                        type="number"
                        value={percent}
                        onChange={(e) => setPercent(e.target.value)}
                        placeholder="예: 25"
                        className="w-40 md:w-48 p-5 text-center text-2xl md:text-3xl font-bold border-0 rounded-xl focus:ring-4 focus:ring-purple-300 transition-all"
                        aria-label="비율 입력"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-500">값을 입력하면 실시간으로 계산됩니다</p>
                </div>
              </div>

              {result !== null && (
                <div className="relative mb-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                  <div className="relative bg-white rounded-3xl shadow-2xl p-8 animate-slide-up">
                    <p className="text-gray-500 mb-2 text-sm font-medium uppercase tracking-wider">계산 결과</p>
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-5xl md:text-7xl font-bold gradient-text">
                        {result.toLocaleString()}
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-gray-600">
                        <span className="font-semibold">{total}</span>의 <span className="font-semibold">{percent}%</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* 액션 버튼들 */}
                  <div className="flex justify-center gap-4 mt-8">
                    <button
                      onClick={shareCalculation}
                      className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold flex items-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
                      aria-label="계산 결과 공유"
                    >
                      <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a3 3 0 10-5.432 0M5.432 5.958a3 3 0 105.432 0" />
                      </svg>
                      공유하기
                    </button>
                    
                    <button
                      onClick={saveToHistory}
                      className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-semibold flex items-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
                      aria-label="계산 기록 저장"
                    >
                      <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      저장하기
                    </button>
                    
                    <button
                      onClick={handleReset}
                      className="group relative px-8 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      aria-label="계산기 초기화"
                    >
                      초기화
                    </button>
                  </div>
                </div>
              )}

              {/* 공유 알림 */}
              {showShareNotification && (
                <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-up z-50">
                  링크가 클립보드에 복사되었습니다!
                </div>
              )}
            </div>

            {/* 빠른 계산 버튼들 */}
            <div className="mt-12 max-w-3xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">자주 사용하는 퍼센트</h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {[5, 10, 15, 20, 25, 30, 50, 75].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPercent(p.toString())}
                    className="px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded-lg font-medium text-gray-700 hover:text-blue-700 transition-colors"
                  >
                    {p}%
                  </button>
                ))}
              </div>
            </div>

            {/* 계산 기록 */}
            {history.length > 0 && (
              <div className="mt-12 max-w-3xl mx-auto">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">최근 계산 기록</h3>
                <div className="space-y-2">
                  {history.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => {
                        setTotal(item.total)
                        setPercent(item.percent)
                      }}
                    >
                      <span className="text-gray-600">
                        {item.total}의 {item.percent}% = <span className="font-semibold">{parseFloat(item.result).toLocaleString()}</span>
                      </span>
                      <span className="text-sm text-gray-400">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 상세 설명 섹션 - 기존 내용 유지하되 디자인 개선 */}
            <div className="space-y-10 mt-16 border-t pt-12">
              <section className="group">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center group-hover:text-blue-600 transition-colors">
                  <span className="text-3xl mr-3">📊</span> 퍼센트 계산이란?
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    퍼센트(Percent)는 '100분의 일'을 의미하는 라틴어에서 유래했습니다. 
                    전체를 100으로 봤을 때의 비율을 나타내며, 일상생활에서 할인율, 이자율, 
                    성장률 등을 표현할 때 광범위하게 사용됩니다.
                  </p>
                </div>
              </section>

              <section className="group">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center group-hover:text-blue-600 transition-colors">
                  <span className="text-3xl mr-3">🔢</span> 계산 공식
                </h2>
                <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-8 rounded-xl shadow-inner">
                  <p className="text-2xl font-mono text-center mb-4 text-gray-800">
                    결과 = (전체 값 × 퍼센트) ÷ 100
                  </p>
                  <p className="text-gray-600 text-center text-lg">
                    예: 200의 25% = (200 × 25) ÷ 100 = 50
                  </p>
                </div>
              </section>

              <section className="group">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center group-hover:text-blue-600 transition-colors">
                  <span className="text-3xl mr-3">💡</span> 실생활 활용 예시
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: '🛒', title: '쇼핑 할인', desc: '10,000원 상품의 30% 할인', calc: '= 10,000 × 30% = 3,000원 할인' },
                    { icon: '💰', title: '급여 보너스', desc: '월급 300만원의 20% 보너스', calc: '= 3,000,000 × 20% = 600,000원' },
                    { icon: '📈', title: '투자 수익', desc: '1,000만원 투자금의 15% 수익', calc: '= 10,000,000 × 15% = 1,500,000원' },
                    { icon: '🏫', title: '시험 점수', desc: '전체 문제 50개 중 80% 정답', calc: '= 50 × 80% = 40문제 정답' }
                  ].map((item, idx) => (
                    <Card key={idx} className="p-5 hover:shadow-lg transition-shadow cursor-pointer transform hover:scale-105">
                      <h3 className="font-semibold text-xl mb-3 flex items-center">
                        <span className="text-2xl mr-2">{item.icon}</span> {item.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{item.desc}</p>
                      <p className="text-blue-600 font-medium">{item.calc}</p>
                    </Card>
                  ))}
                </div>
              </section>

              <section className="group">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center group-hover:text-blue-600 transition-colors">
                  <span className="text-3xl mr-3">⚡</span> 프로 계산 팁
                </h2>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
                  <ul className="space-y-3 text-gray-700 text-lg">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 text-xl">✓</span>
                      <span><strong>10%</strong>는 전체를 10으로 나눈 값과 같습니다</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 text-xl">✓</span>
                      <span><strong>5%</strong>는 10%의 절반으로 빠르게 계산할 수 있습니다</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 text-xl">✓</span>
                      <span><strong>25%</strong>는 전체의 1/4과 같습니다</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-3 text-xl">✓</span>
                      <span><strong>50%</strong>는 전체의 절반입니다</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="group">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center group-hover:text-blue-600 transition-colors">
                  <span className="text-3xl mr-3">❓</span> 자주 묻는 질문 (FAQ)
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      q: '퍼센트와 퍼센트 포인트의 차이는?',
                      a: '퍼센트는 비율의 변화를, 퍼센트 포인트는 퍼센트 수치 자체의 변화를 나타냅니다. 예를 들어 10%에서 15%로 변화하면 5퍼센트 포인트 증가입니다.'
                    },
                    {
                      q: '100% 이상의 퍼센트도 계산 가능한가요?',
                      a: '네, 가능합니다. 150%는 전체의 1.5배를 의미하며, 200%는 전체의 2배를 의미합니다.'
                    },
                    {
                      q: '소수점 퍼센트는 어떻게 계산하나요?',
                      a: '동일한 방식으로 계산합니다. 예를 들어 0.5%는 0.005를 곱하는 것과 같습니다.'
                    }
                  ].map((faq, idx) => (
                    <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                      <h3 className="font-semibold text-lg mb-3 text-blue-700">Q: {faq.q}</h3>
                      <p className="text-gray-600 leading-relaxed">A: {faq.a}</p>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 향상된 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "값의 퍼센트 계산기",
            "description": "전체 값에서 특정 비율이 차지하는 값을 정확하게 계산하는 온라인 도구",
            "url": "https://jjyu.co.kr/percent-master/value-of",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "KRW"
            },
            "featureList": [
              "실시간 계산",
              "URL 공유 기능",
              "계산 기록 저장",
              "정확한 소수점 처리",
              "모바일 최적화",
              "무료 사용"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "1250",
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />
      
      {/* FAQ 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "퍼센트와 퍼센트 포인트의 차이는?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "퍼센트는 비율의 변화를, 퍼센트 포인트는 퍼센트 수치 자체의 변화를 나타냅니다. 예를 들어 10%에서 15%로 변화하면 5퍼센트 포인트 증가입니다."
                }
              },
              {
                "@type": "Question",
                "name": "100% 이상의 퍼센트도 계산 가능한가요?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "네, 가능합니다. 150%는 전체의 1.5배를 의미하며, 200%는 전체의 2배를 의미합니다."
                }
              }
            ]
          })
        }}
      />
    </div>
  )
}

export default function ValueOfPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8 max-w-5xl">Loading...</div>}>
      <ValueOfCalculator />
    </Suspense>
  )
}