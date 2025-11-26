'use client'

import { useEffect } from 'react'
import { posthog } from '@/instrumentation-client'

export default function TestPostHog() {
  useEffect(() => {
    // Check if PostHog is loaded
    console.log('PostHog loaded:', posthog)
    console.log('PostHog config:', {
      apiKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
      apiHost: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    })

    // Send test event
    posthog.capture('test_event', {
      test: true,
      timestamp: new Date().toISOString(),
    })

    console.log('Test event sent!')
  }, [])

  const sendManualEvent = () => {
    posthog.capture('manual_test_click', {
      clicked_at: new Date().toISOString(),
    })
    console.log('Manual event sent!')
    alert('Event sent! Check console and PostHog dashboard')
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">PostHog Test Page</h1>

      <div className="space-y-4">
        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-2">Configuration</h2>
          <pre className="bg-muted p-4 rounded overflow-auto">
            {JSON.stringify({
              apiKey: process.env.NEXT_PUBLIC_POSTHOG_KEY?.substring(0, 10) + '...',
              apiHost: process.env.NEXT_PUBLIC_POSTHOG_HOST,
              posthogLoaded: typeof posthog !== 'undefined',
            }, null, 2)}
          </pre>
        </div>

        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-2">Test Event</h2>
          <button
            onClick={sendManualEvent}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
          >
            Send Test Event
          </button>
          <p className="mt-2 text-sm text-muted-foreground">
            Click to send a test event to PostHog. Check the browser console for logs.
          </p>
        </div>

        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Open browser DevTools (F12 or Cmd+Option+I)</li>
            <li>Go to the Console tab</li>
            <li>Check for PostHog initialization logs</li>
            <li>Go to the Network tab</li>
            <li>Filter by "posthog" or "decide"</li>
            <li>Click the "Send Test Event" button</li>
            <li>Look for requests to PostHog API</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
