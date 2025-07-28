import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '값의 퍼센트 계산기',
  description: '전체 값에서 특정 비율(%)이 차지하는 값을 정확하게 계산합니다. 예: 200의 25%는 얼마?',
  keywords: '퍼센트 계산, 백분율 계산, 비율 계산, 할인 계산, 보너스 계산',
  openGraph: {
    title: '값의 퍼센트 계산기 | Percent Master',
    description: '전체 값에서 특정 비율이 차지하는 값을 쉽고 빠르게 계산하세요',
    url: 'https://jjyu.co.kr/percent-master/value-of',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}