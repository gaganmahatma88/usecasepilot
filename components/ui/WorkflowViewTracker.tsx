'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

interface Props {
  role: string
  slug: string
}

export function WorkflowViewTracker({ role, slug }: Props) {
  useEffect(() => {
    trackEvent('workflow_view', { role, slug })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
