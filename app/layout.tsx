import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import Navigation from '@/components/navigation'

export const metadata: Metadata = {
  title: {
    default: 'Percent Master: 가장 빠르고 정확한 온라인 퍼센트 계산기',
    template: '%s | Percent Master',
  },
  description: '각종 할인율, 이자, 비율, 증감률 등 모든 종류의 퍼센트 계산을 가장 쉽게 해결하세요. 실생활 예제와 상세한 설명까지 제공합니다.',
  keywords: ['퍼센트 계산기', '할인율 계산', '이자 계산', '비율 계산', '수익률 계산', '퍼센트계산', '할인계산기', '증가율계산기', '변화율계산기', 'percent calculator'],
  creator: 'Percent Master',
  publisher: 'JJYU',
  robots: 'index, follow',
  openGraph: {
    title: 'Percent Master: 가장 빠르고 정확한 온라인 퍼센트 계산기',
    description: '무료 온라인 퍼센트 계산기. 할인율, 증가율, 비율 계산을 쉽고 빠르게!',
    url: 'https://percent-master.vercel.app',
    siteName: 'Percent Master',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Percent Master: 가장 빠르고 정확한 온라인 퍼센트 계산기',
    description: '무료 온라인 퍼센트 계산기. 할인율, 증가율, 비율 계산을 쉽고 빠르게!',
  },
}

export default function RootLayout({
  children,
}: { 
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2442517902625121" crossOrigin="anonymous"></script>
        <meta name="naver-site-verification" content="네이버에서받은코드" />
        <meta name="google-site-verification" content="구글에서받은코드" />
      </head>
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <main className="flex-grow">{children}</main>
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Percent Master</h3>
                <p className="text-gray-300 text-sm">
                  정확하고 빠른 퍼센트 계산을 위한<br/>
                  최고의 온라인 도구
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">계산기</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/value-of" className="text-gray-300 hover:text-white transition-colors">값의 퍼센트 계산</Link></li>
                  <li><Link href="/what-is" className="text-gray-300 hover:text-white transition-colors">비율 퍼센트 계산</Link></li>
                  <li><Link href="/change-rate" className="text-gray-300 hover:text-white transition-colors">변화율 계산</Link></li>
                  <li><Link href="/after-change" className="text-gray-300 hover:text-white transition-colors">변화 후 값 계산</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">정보</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">개인정보처리방침</Link></li>
                  <li><Link href="/terms" className="text-gray-300 hover:text-white transition-colors">이용약관</Link></li>
                  <li><a href="mailto:contact@jjyu.co.kr" className="text-gray-300 hover:text-white transition-colors">문의하기</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Percent Master. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}