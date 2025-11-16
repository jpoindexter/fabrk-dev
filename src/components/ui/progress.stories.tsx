import type { Meta, StoryObj } from '@storybook/nextjs'
import { Progress } from './progress'
import { Label } from './label'
import { Button } from './button'

const meta = {
  title: 'UI/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: 'Progress value (0-100)',
    },
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 50,
    style: { width: '300px' },
  },
}

export const Empty: Story = {
  args: {
    value: 0,
    style: { width: '300px' },
  },
}

export const Complete: Story = {
  args: {
    value: 100,
    style: { width: '300px' },
  },
}

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Label>Loading...</Label>
        <span style={{ fontSize: '14px', fontWeight: 600 }}>75%</span>
      </div>
      <Progress value={75} />
    </div>
  ),
}

export const DifferentValues: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <Label>Starting</Label>
          <span style={{ fontSize: '14px', fontWeight: 600 }}>10%</span>
        </div>
        <Progress value={10} />
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <Label>In Progress</Label>
          <span style={{ fontSize: '14px', fontWeight: 600 }}>45%</span>
        </div>
        <Progress value={45} />
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <Label>Almost Done</Label>
          <span style={{ fontSize: '14px', fontWeight: 600 }}>90%</span>
        </div>
        <Progress value={90} />
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <Label>Complete</Label>
          <span style={{ fontSize: '14px', fontWeight: 600 }}>100%</span>
        </div>
        <Progress value={100} />
      </div>
    </div>
  ),
}

export const FileUpload: Story = {
  render: () => {
    const [progress, setProgress] = (0, 0)

    const simulateUpload = () => {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 500)
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
        <div
          style={{
            padding: '20px',
            border: '2px solid var(--border)',
            borderRadius: '8px',
            boxShadow: '4px 4px 0px 0px var(--border)',
          }}
        >
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '4px' }}>project-files.zip</h3>
            <p style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>2.4 MB</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px' }}>
                {progress === 100 ? 'Upload complete' : 'Uploading...'}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        </div>
        <Button onClick={simulateUpload} disabled={progress > 0 && progress < 100}>
          {progress === 100 ? 'Upload Again' : 'Start Upload'}
        </Button>
      </div>
    )
  },
}

export const MultipleProgress: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '450px' }}>
      <div>
        <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Project Setup</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}
            >
              <span style={{ fontSize: '14px' }}>Installing dependencies</span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>100%</span>
            </div>
            <Progress value={100} />
          </div>
          <div>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}
            >
              <span style={{ fontSize: '14px' }}>Configuring database</span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>65%</span>
            </div>
            <Progress value={65} />
          </div>
          <div>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}
            >
              <span style={{ fontSize: '14px' }}>Setting up authentication</span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>30%</span>
            </div>
            <Progress value={30} />
          </div>
          <div>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}
            >
              <span style={{ fontSize: '14px' }}>Deploying application</span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>0%</span>
            </div>
            <Progress value={0} />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const CustomSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '350px' }}>
      <div>
        <Label style={{ marginBottom: '8px', display: 'block' }}>Small</Label>
        <Progress value={60} style={{ height: '12px' }} />
      </div>
      <div>
        <Label style={{ marginBottom: '8px', display: 'block' }}>Default</Label>
        <Progress value={60} />
      </div>
      <div>
        <Label style={{ marginBottom: '8px', display: 'block' }}>Large</Label>
        <Progress value={60} style={{ height: '32px' }} />
      </div>
    </div>
  ),
}
