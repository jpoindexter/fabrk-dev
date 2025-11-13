import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs'

describe('Tabs', () => {
  const TabsExample = () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
    </Tabs>
  )

  it('renders tabs structure', () => {
    render(<TabsExample />)
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument()
  })

  it('shows default tab content', () => {
    render(<TabsExample />)
    expect(screen.getByText('Content 1')).toBeVisible()
  })

  it('switches tabs on click', async () => {
    render(<TabsExample />)

    await userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }))
    expect(screen.getByText('Content 2')).toBeVisible()
  })

  it('applies selected state to active tab', async () => {
    render(<TabsExample />)
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' })

    expect(tab1).toHaveAttribute('data-state', 'active')
  })
})
