import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '몇 퍼센트인지 계산기',
  description: '한 값이 다른 값의 몇 퍼센트인지 정확하게 계산합니다. 예: 50은 200의 몇%?',
  keywords: '퍼센트 구하기, 백분율 구하기, 비율 구하기, 달성률 계산, 점유율 계산',
  openGraph: {
    title: '몇 퍼센트인지 계산기 | Percent Master',
    description: '한 값이 다른 값의 몇 퍼센트인지 쉽고 빠르게 계산하세요',
    url: 'https://jjyu.co.kr/percent-master/what-is',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}