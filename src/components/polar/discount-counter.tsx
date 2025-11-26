'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface DiscountUsage {
  used: number
  total: number | null
  remaining: number | null
}

export function DiscountCounter() {
  const [usage, setUsage] = useState<DiscountUsage | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUsage() {
      try {
        const response = await fetch('/api/polar/discount-usage')
        if (response.ok) {
          const data = await response.json()
          setUsage(data)
        }
      } catch (error) {
        console.error('Failed to fetch discount usage:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsage()
    // Refresh every 30 seconds
    const interval = setInterval(fetchUsage, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading || !usage || !usage.total) {
    return null
  }

  const percentageUsed = (usage.used / usage.total) * 100
  const isAlmostGone = percentageUsed >= 80

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">
          {isAlmostGone ? '🔥' : '🎉'} Early Access Discount:
        </span>
        <span className={`text-sm font-bold ${isAlmostGone ? 'text-destructive' : 'text-primary'}`}>
          {usage.remaining} / {usage.total} left
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentageUsed}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full ${isAlmostGone ? 'bg-destructive' : 'bg-primary'}`}
        />
      </div>
    </motion.div>
  )
}
