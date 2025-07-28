import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '변화 후 값 계산기',
  description: '퍼센트 증감 후의 값을 정확하게 계산합니다. 예: 1000원에서 20% 할인시 얼마?',
  keywords: '할인 계산기, 인상 계산기, 퍼센트 할인, 퍼센트 인상, 가격 계산',
  openGraph: {
    title: '변화 후 값 계산기 | Percent Master',
    description: '퍼센트 증감 후의 값을 쉽고 빠르게 계산하세요',
    url: 'https://jjyu.co.kr/percent-master/after-change',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}