'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

export default function ChangeRatePage() {
  const [original, setOriginal] = useState('')
  const [newValue, setNewValue] = useState('')

  const result = useMemo(() => {
    const originalNum = parseFloat(original)
    const newNum = parseFloat(newValue)

    if (isNaN(originalNum) || isNaN(newNum) || originalNum === 0) {
      return null
    }

    return ((newNum - originalNum) / originalNum) * 100
  }, [original, newValue])

  const handleReset = () => {
    setOriginal('')
    setNewValue('')
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="animate-fade-in">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 pb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4">
                <span className="text-4xl">📈</span>
              </div>
              <CardTitle className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                변화율 계산기
              </CardTitle>
              <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                값의 증가율 또는 감소율을 퍼센트로 정확하게 계산합니다
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <span className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                  <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  성장률 분석
                </span>
                <span className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                  <svg className="w-4 h-4 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm1 2a1 1 0 000 2h5a1 1 0 100-2H5zm7 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  손익 계산
                </span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-10 pb-8">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative bg-white rounded-xl shadow-lg">
                      <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-semibold text-gray-700">이전 값</label>
                      <Input
                        type="number"
                        value={original}
                        onChange={(e) => setOriginal(e.target.value)}
                        placeholder="예: 100"
                        className="w-48 md:w-56 p-5 text-center text-2xl md:text-3xl font-bold border-0 rounded-xl focus:ring-4 focus:ring-purple-300 transition-all"
                        aria-label="이전 값 입력"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative bg-white rounded-xl shadow-lg">
                      <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-semibold text-gray-700">현재 값</label>
                      <Input
                        type="number"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        placeholder="예: 150"
                        className="w-48 md:w-56 p-5 text-center text-2xl md:text-3xl font-bold border-0 rounded-xl focus:ring-4 focus:ring-pink-300 transition-all"
                        aria-label="현재 값 입력"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-500">값의 변화율을 실시간으로 계산합니다</p>
                </div>
              </div>

              {result !== null && (
                <div className="relative mb-10">
                  <div className={`absolute inset-0 rounded-3xl blur-2xl opacity-30 animate-pulse ${
                    result > 0 ? 'bg-gradient-to-r from-green-200 to-emerald-200' : 'bg-gradient-to-r from-red-200 to-pink-200'
                  }`}></div>
                  <div className="relative bg-white rounded-3xl shadow-2xl p-8 animate-slide-up">
                    <p className="text-gray-500 mb-2 text-sm font-medium uppercase tracking-wider">변화율</p>
                    <div className="flex items-center justify-center gap-4">
                      {result > 0 ? (
                        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      ) : (
                        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                      )}
                      <div className={`text-5xl md:text-7xl font-bold ${
                        result > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {result > 0 ? '+' : ''}{result.toFixed(2)}%
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-gray-600">
                        <span className="font-semibold">{original}</span>에서 <span className="font-semibold">{newValue}</span>로 
                        <span className={`font-bold ${result > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {' '}{Math.abs(result).toFixed(2)}% {result > 0 ? '증가' : '감소'}
                        </span>
                      </p>
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
                <h3 className="text-lg font-semibold text-gray-700 mb-4">빠른 예시</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { from: 100, to: 120, label: '20% 상승' },
                    { from: 200, to: 150, label: '25% 하락' },
                    { from: 50, to: 100, label: '2배 증가' },
                    { from: 1000, to: 800, label: '20% 감소' }
                  ].map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setOriginal(example.from.toString())
                        setNewValue(example.to.toString())
                      }}
                      className="p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-sm"
                    >
                      <p className="font-semibold text-gray-700">{example.from} → {example.to}</p>
                      <p className="text-xs text-gray-500 mt-1">{example.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 상세 설명 */}
              <div className="space-y-10 mt-16 border-t pt-12">
                <section className="group">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center group-hover:text-purple-600 transition-colors">
                    <span className="text-3xl mr-3">📊</span> 변화율 계산이란?
                  </h2>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      변화율은 어떤 값이 다른 값으로 변할 때의 증가 또는 감소 비율을 퍼센트로 나타낸 것입니다. 
                      주식 시장, 매출 분석, 성장률 측정 등 다양한 분야에서 핵심 지표로 활용됩니다.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center group-hover:text-purple-600 transition-colors">
                    <span className="text-3xl mr-3">🔢</span> 계산 공식
                  </h2>
                  <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-8 rounded-xl shadow-inner">
                    <p className="text-2xl font-mono text-center mb-4 text-gray-800">
                      변화율(%) = (새 값 - 이전 값) ÷ 이전 값 × 100
                    </p>
                    <p className="text-gray-600 text-center text-lg">
                      예: (150 - 100) ÷ 100 × 100 = 50% 증가
                    </p>
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
            "name": "변화율 계산기",
            "description": "값의 증가율 또는 감소율을 정확하게 계산하는 온라인 도구",
            "url": "https://jjyu.co.kr/percent-master/change-rate",
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