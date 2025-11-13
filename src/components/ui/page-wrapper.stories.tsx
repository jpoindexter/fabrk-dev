import type { Meta, StoryObj } from '@storybook/react'
import { PageWrapper } from './page-wrapper'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Button } from './button'

const meta = {
  title: 'UI/PageWrapper',
  component: PageWrapper,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <PageWrapper>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>Page Title</h1>
      <p style={{ fontSize: '16px', color: 'var(--muted-foreground)', marginBottom: '24px' }}>
        This is a page wrapper component that provides consistent padding and max-width for page
        content.
      </p>
      <div
        style={{
          padding: '40px',
          border: '2px solid var(--border)',
          borderRadius: '8px',
          boxShadow: '4px 4px 0px 0px var(--border)',
        }}
      >
        Main page content goes here
      </div>
    </PageWrapper>
  ),
}

export const WithCards: Story = {
  render: () => (
    <PageWrapper>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Dashboard</h1>
      <p style={{ fontSize: '16px', color: 'var(--muted-foreground)', marginBottom: '32px' }}>
        Welcome to your dashboard
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Active users this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>2,543</div>
            <p style={{ fontSize: '14px', color: 'var(--muted-foreground)', marginTop: '8px' }}>
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Total revenue this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>$45,231</div>
            <p style={{ fontSize: '14px', color: 'var(--muted-foreground)', marginTop: '8px' }}>
              +20% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Active projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>12</div>
            <p style={{ fontSize: '14px', color: 'var(--muted-foreground)', marginTop: '8px' }}>
              3 completed this week
            </p>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  ),
}

export const ArticleLayout: Story = {
  render: () => (
    <PageWrapper>
      <article style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>
          Getting Started with Fabrk
        </h1>
        <div
          style={{
            fontSize: '14px',
            color: 'var(--muted-foreground)',
            marginBottom: '32px',
            display: 'flex',
            gap: '16px',
          }}
        >
          <span>By John Doe</span>
          <span>•</span>
          <span>January 15, 2025</span>
          <span>•</span>
          <span>5 min read</span>
        </div>
        <div
          style={{
            fontSize: '16px',
            lineHeight: '1.8',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '16px' }}>
            Installation
          </h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
          <pre
            style={{
              backgroundColor: 'var(--muted)',
              padding: '16px',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '14px',
            }}
          >
            npm install fabrk-boilerplate
          </pre>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '16px' }}>
            Configuration
          </h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>
      </article>
    </PageWrapper>
  ),
}

export const EmptyState: Story = {
  render: () => (
    <PageWrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            marginBottom: '24px',
          }}
        >
          📦
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
          No projects yet
        </h2>
        <p
          style={{
            fontSize: '16px',
            color: 'var(--muted-foreground)',
            maxWidth: '400px',
            marginBottom: '24px',
          }}
        >
          Get started by creating your first project. It only takes a few minutes to set up.
        </p>
        <Button>Create Project</Button>
      </div>
    </PageWrapper>
  ),
}

export const WithHeaderActions: Story = {
  render: () => (
    <PageWrapper>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          marginBottom: '32px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Projects</h1>
          <p style={{ fontSize: '16px', color: 'var(--muted-foreground)' }}>
            Manage your projects and track progress
          </p>
        </div>
        <Button>Create Project</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent style={{ padding: '24px' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Project {i}</h3>
              <p style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>
                Description for project {i}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageWrapper>
  ),
}
