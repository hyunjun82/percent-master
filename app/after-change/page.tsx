'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

export default function AfterChangePage() {
  const [original, setOriginal] = useState('')
  const [percent, setPercent] = useState('')
  const [type, setType] = useState('increase') // 'increase' or 'decrease'

  const result = useMemo(() => {
    const originalNum = parseFloat(original)
    const percentNum = parseFloat(percent)

    if (isNaN(originalNum) || isNaN(percentNum)) {
      return null
    }

    let calculatedValue
    if (type === 'increase') {
      calculatedValue = originalNum * (1 + percentNum / 100)
    } else {
      calculatedValue = originalNum * (1 - percentNum / 100)
    }

    return calculatedValue
  }, [original, percent, type])

  const difference = result !== null ? Math.abs(result - parseFloat(original)) : null
  
  const handleReset = () => {
    setOriginal('')
    setPercent('')
    setType('increase')
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="animate-fade-in">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 pb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-200 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-red-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-4">
                <span className="text-4xl">🛒</span>
              </div>
              <CardTitle className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                변화 후 값 계산기
              </CardTitle>
              <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                퍼센트 증감 후의 최종 값을 쉽고 빠르게 계산합니다
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <span className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                  <svg className="w-4 h-4 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                  할인가 계산
                </span>
                <span className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                  <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  인상액 확인
                </span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-10 pb-8">
            <div className="max-w-3xl mx-auto">
              {/* 계산 타입 선택 */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex rounded-xl bg-gray-100 p-1">
                  <button
                    onClick={() => setType('increase')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      type === 'increase'
                        ? 'bg-white text-orange-600 shadow-md'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                      증가
                    </span>
                  </button>
                  <button
                    onClick={() => setType('decrease')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      type === 'decrease'
                        ? 'bg-white text-red-600 shadow-md'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                      </svg>
                      감소
                    </span>
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 mb-10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative bg-white rounded-xl shadow-lg">
                      <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-semibold text-gray-700">원래 값</label>
                      <Input
                        type="number"
                        value={original}
                        onChange={(e) => setOriginal(e.target.value)}
                        placeholder="예: 10000"
                        className="w-48 md:w-56 p-5 text-center text-2xl md:text-3xl font-bold border-0 rounded-xl focus:ring-4 focus:ring-orange-300 transition-all"
                        aria-label="원래 값 입력"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md">
                      {type === 'increase' ? (
                        <span className="text-orange-500 font-bold text-xl">+</span>
                      ) : (
                        <span className="text-red-500 font-bold text-xl">−</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className={`absolute inset-0 ${
                      type === 'increase' 
                        ? 'bg-gradient-to-r from-orange-400 to-yellow-600' 
                        : 'bg-gradient-to-r from-red-400 to-pink-600'
                    } rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity`}></div>
                    <div className="relative bg-white rounded-xl shadow-lg">
                      <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-semibold text-gray-700">변화율(%)</label>
                      <Input
                        type="number"
                        value={percent}
                        onChange={(e) => setPercent(e.target.value)}
                        placeholder="예: 20"
                        className="w-40 md:w-48 p-5 text-center text-2xl md:text-3xl font-bold border-0 rounded-xl focus:ring-4 focus:ring-red-300 transition-all"
                        aria-label="변화율 입력"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-500">
                    {type === 'increase' ? '증가' : '감소'}할 퍼센트를 입력하세요
                  </p>
                </div>
              </div>

              {result !== null && (
                <div className="relative mb-10">
                  <div className={`absolute inset-0 rounded-3xl blur-2xl opacity-30 animate-pulse ${
                    type === 'increase' 
                      ? 'bg-gradient-to-r from-orange-200 to-yellow-200' 
                      : 'bg-gradient-to-r from-red-200 to-pink-200'
                  }`}></div>
                  <div className="relative bg-white rounded-3xl shadow-2xl p-8 animate-slide-up">
                    <p className="text-gray-500 mb-2 text-sm font-medium uppercase tracking-wider">최종 결과</p>
                    <div className="flex items-center justify-center gap-4">
                      <div className={`text-5xl md:text-7xl font-bold ${
                        type === 'increase' ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {result.toLocaleString()}
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-gray-600">
                        <span className="font-semibold">{original}</span>에서 {' '}
                        <span className={`font-bold ${type === 'increase' ? 'text-orange-600' : 'text-red-600'}`}>
                          {percent}% {type === 'increase' ? '증가' : '감소'}
                        </span>
                      </p>
                      {difference !== null && (
                        <p className="text-sm text-gray-500 mt-2">
                          {type === 'increase' ? '증가액' : '할인액'}: {' '}
                          <span className="font-semibold">{difference.toLocaleString()}</span>
                        </p>
                      )}
                    </div>
                    
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={handleReset}
                        className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold shadow-md hover:shadow-lg"
                        aria-label="계산기 초기화"
                      >
                        다시 계산하기
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 예시 계산 */}
              <div className="mt-12">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">실생활 예시</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { original: 50000, percent: 30, type: 'decrease', label: '30% 할인', icon: '🛍️' },
                    { original: 100000, percent: 10, type: 'increase', label: '10% 인상', icon: '📈' },
                    { original: 30000, percent: 50, type: 'decrease', label: '반값 세일', icon: '💸' },
                    { original: 200000, percent: 15, type: 'increase', label: '15% 부가세', icon: '🧾' }
                  ].map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setOriginal(example.original.toString())
                        setPercent(example.percent.toString())
                        setType(example.type as 'increase' | 'decrease')
                      }}
                      className="p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-sm"
                    >
                      <p className="text-2xl mb-1">{example.icon}</p>
                      <p className="font-semibold text-gray-700">{example.original.toLocaleString()}원</p>
                      <p className="text-xs text-gray-500 mt-1">{example.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 상세 설명 */}
              <div className="space-y-10 mt-16 border-t pt-12">
                <section className="group">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center group-hover:text-orange-600 transition-colors">
                    <span className="text-3xl mr-3">💰</span> 할인가 계산의 핵심
                  </h2>
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      할인율을 적용한 최종 가격을 계산할 때는 원가에서 할인 비율만큼을 빼는 것이 핵심입니다. 
                      예를 들어 30% 할인은 원가의 70%를 지불한다는 의미입니다.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center group-hover:text-orange-600 transition-colors">
                    <span className="text-3xl mr-3">🔢</span> 계산 공식
                  </h2>
                  <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-8 rounded-xl shadow-inner">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xl font-semibold text-gray-700 mb-2">증가 시:</p>
                        <p className="text-2xl font-mono text-center text-gray-800">
                          최종값 = 원래값 × (1 + 증가율 ÷ 100)
                        </p>
                      </div>
                      <div className="border-t pt-4">
                        <p className="text-xl font-semibold text-gray-700 mb-2">감소 시:</p>
                        <p className="text-2xl font-mono text-center text-gray-800">
                          최종값 = 원래값 × (1 - 감소율 ÷ 100)
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="group">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center group-hover:text-orange-600 transition-colors">
                    <span className="text-3xl mr-3">🛒</span> 쇼핑 할인 꿀팁
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-5 hover:shadow-lg transition-shadow">
                      <h3 className="font-semibold text-xl mb-3 text-orange-600">중복 할인 계산법</h3>
                      <p className="text-gray-600 mb-2">
                        20% 할인 후 추가 10% 할인은 총 30% 할인이 아닙니다!
                      </p>
                      <p className="text-sm text-gray-500">
                        첫 할인 후 가격에 추가 할인이 적용됩니다.
                      </p>
                    </Card>
                    <Card className="p-5 hover:shadow-lg transition-shadow">
                      <h3 className="font-semibold text-xl mb-3 text-red-600">부가세 포함 가격</h3>
                      <p className="text-gray-600 mb-2">
                        표시 가격에 10% 부가세가 별도라면 실제 지불액은 더 높습니다.
                      </p>
                      <p className="text-sm text-gray-500">
                        부가세 포함 여부를 꼭 확인하세요.
                      </p>
                    </Card>
                  </div>
                </section>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "변화 후 값 계산기",
            "description": "퍼센트 증감 후의 최종 값을 계산하는 온라인 도구. 할인가, 인상액 계산에 최적화",
            "url": "https://jjyu.co.kr/percent-master/after-change",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "KRW"
            }
          })
        }}
      />
    </div>
  )
}
