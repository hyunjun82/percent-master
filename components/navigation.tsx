import Link from 'next/link'

function Navigation() {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity">
            Percent Master
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link 
              href="/value-of" 
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              값의 퍼센트
            </Link>
            <Link 
              href="/what-is" 
              className="text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              비율 계산
            </Link>
            <Link 
              href="/change-rate" 
              className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
            >
              변화율
            </Link>
            <Link 
              href="/after-change" 
              className="text-gray-600 hover:text-orange-600 transition-colors font-medium"
            >
              변화 후 값
            </Link>
          </div>
          {/* 모바일 메뉴 버튼 */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="메뉴 열기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
