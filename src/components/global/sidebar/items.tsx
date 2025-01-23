import { SIDEBAR_MENU } from '@/constants/menu'
import { cn } from '@/lib/utils'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

type Props = {
  page: string
  slug: string
}

const Items = ({ page, slug }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState<string | null>(null)

  // Clear loading state when pathname changes (navigation success)
  useEffect(() => {
    setLoading(null)
  }, [pathname])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    e.preventDefault()
    setLoading(label)
    const path = `/dashboard/${slug}/${label === 'home' ? '' : label}`
    router.push(path)
  }

  return SIDEBAR_MENU.map((item) => (
    <Link
      key={item.id}
      href={`/dashboard/${slug}/${item.label === 'home' ? '' : item.label}`}
      onClick={(e) => handleClick(e, item.label)}
      className={cn(
        'capitalize flex items-center gap-x-2 rounded-full p-3',
        page === item.label && 'bg-[#0f0f0f]',
        page === slug && item.label === 'home'
          ? 'bg-[#0f0f0f]'
          : 'text-[#9B9CA0]'
      )}
    >
      <div className="flex items-center gap-x-2">
        {item.icon}
        {item.label}
      </div>
      {loading === item.label && (
        <div className="ml-auto">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </Link>
  ))
}

export default Items
