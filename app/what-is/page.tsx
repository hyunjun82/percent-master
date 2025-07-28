'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

export default function WhatIsPage() {
  const [part, setPart] = useState('')
  const [total, setTotal] = useState('')

  const result = useMemo(() => {
    const partNum = parseFloat(part)
    const totalNum = parseFloat(total)

    if (isNaN(partNum) || isNaN(totalNum) || totalNum === 0) {
      return null
    }

    return (partNum / totalNum) * 100
  }, [part, total])

  const handleReset = () => {
    setPart('')
    setTotal('')
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="animate-fade-in">
        <Card className="shadow-lg">
          <CardHeader className="text-center bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="text-3xl md:text-4xl font-bold gradient-text mb-3">
              비율 퍼센트 계산기
            </CardTitle>
            <p className="text-gray-600 text-lg">
              한 값이 다른 값의 몇 퍼센트인지 정확하게 계산합니다
            </p>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 text-lg md:text-2xl">
              <Input
                type="number"
                value={part}
                onChange={(e) => setPart(e.target.value)}
                placeholder="부분 값"
                className="w-40 md:w-48 p-3 text-center text-xl focus:ring-2 focus:ring-green-500 transition-all"
                aria-label="부분 값 입력"
              />
              <span className="text-gray-600 font-medium">은(는)</span>
              <Input
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="전체 값"
                className="w-40 md:w-48 p-3 text-center text-xl focus:ring-2 focus:ring-green-500 transition-all"
                aria-label="전체 값 입력"
              />
              <span className="text-gray-600 font-medium">의 몇 %?</span>
            </div>

            {result !== null && (
              <div className="text-center mb-8 animate-slide-up">
                <p className="text-gray-600 mb-3 text-lg">계산 결과</p>
                <div className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white text-3xl md:text-5xl font-bold px-8 py-4 rounded-xl shadow-lg">
                  {result.toFixed(2)}%
                </div>
              </div>
            )}

            <div className="flex justify-center mb-10">
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors font-medium"
                aria-label="계산기 초기화"
              >
                초기화
              </button>
            </div>

            {/* 상세 설명 섹션 */}
            <div className="space-y-8 mt-12 border-t pt-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-green-600 mr-2">🎯</span> 비율 계산의 중요성
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  비율을 퍼센트로 표현하는 것은 데이터를 비교하고 이해하기 쉽게 만듭니다. 
                  달성률, 점유율, 성공률 등 다양한 지표를 표현할 때 필수적으로 사용되며, 
                  비즈니스 분석부터 일상생활까지 광범위하게 활용됩니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-green-600 mr-2">🔢</span> 계산 공식
                </h2>
                <div className="bg-gray-100 p-6 rounded-lg">
                  <p className="text-xl font-mono text-center mb-3">
                    퍼센트 = (부분 값 ÷ 전체 값) × 100
                  </p>
                  <p className="text-gray-600 text-center">
                    예: 50은 200의 몇%? = (50 ÷ 200) × 100 = 25%
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-green-600 mr-2">💡</span> 실생활 활용 예시
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h3 className="font-semibold text-lg mb-2">📊 판매 달성률</h3>
                    <p className="text-gray-600">
                      목표 500개 중 375개 판매<br/>
                      = 375 ÷ 500 × 100 = 75% 달성
                    </p>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-semibold text-lg mb-2">🏃 운동 진도율</h3>
                    <p className="text-gray-600">
                      10km 목표 중 7.5km 완주<br/>
                      = 7.5 ÷ 10 × 100 = 75% 완주
                    </p>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-semibold text-lg mb-2">📱 배터리 잔량</h3>
                    <p className="text-gray-600">
                      전체 용량 4000mAh 중 2800mAh 남음<br/>
                      = 2800 ÷ 4000 × 100 = 70% 잔량
                    </p>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-semibold text-lg mb-2">💼 출석률</h3>
                    <p className="text-gray-600">
                      전체 20일 중 18일 출석<br/>
                      = 18 ÷ 20 × 100 = 90% 출석률
                    </p>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-green-600 mr-2">⚡</span> 빠른 계산 팁
                </h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    부분이 전체의 절반이면 50%입니다
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    부분이 전체의 1/4이면 25%입니다
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    부분이 전체의 3/4이면 75%입니다
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    부분이 전체와 같으면 100%입니다
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-green-600 mr-2">❓</span> 자주 묻는 질문 (FAQ)
                </h2>
                <div className="space-y-4">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Q: 부분이 전체보다 클 수도 있나요?</h3>
                    <p className="text-gray-600">
                      A: 네, 가능합니다. 예를 들어 초과 달성의 경우 120%처럼 100%를 넘을 수 있습니다.
                    </p>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Q: 소수점은 몇 자리까지 표시하나요?</h3>
                    <p className="text-gray-600">
                      A: 일반적으로 소수점 둘째 자리까지 표시하며, 필요에 따라 조정할 수 있습니다.
                    </p>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Q: 0%와 100%의 의미는?</h3>
                    <p className="text-gray-600">
                      A: 0%는 부분이 없음을, 100%는 부분이 전체와 같음을 의미합니다.
                    </p>
                  </Card>
                </div>
              </section>
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
            "name": "비율 퍼센트 계산기",
            "description": "한 값이 다른 값의 몇 퍼센트인지 정확하게 계산하는 온라인 도구",
            "url": "https://jjyu.co.kr/percent-master/what-is",
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