import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '변화율 계산기',
  description: '값의 증가율 또는 감소율을 정확하게 계산합니다. 예: 100에서 150으로 변화시 몇% 증가?',
  keywords: '변화율 계산, 증가율 계산, 감소율 계산, 성장률 계산, 수익률 계산',
  openGraph: {
    title: '변화율 계산기 | Percent Master',
    description: '값의 증가율이나 감소율을 쉽고 빠르게 계산하세요',
    url: 'https://jjyu.co.kr/percent-master/change-rate',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}