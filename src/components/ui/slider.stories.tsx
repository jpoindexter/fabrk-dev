import type { Meta, StoryObj } from '@storybook/nextjs'
import { Slider } from './slider'
import { Label } from './label'

const meta = {
  title: 'UI/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable the slider',
    },
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    step: {
      control: 'number',
      description: 'Step increment',
    },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    style: { width: '300px' },
  },
}

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <Label>Volume</Label>
      <Slider defaultValue={[75]} max={100} step={1} />
    </div>
  ),
}

export const CustomRange: Story = {
  args: {
    defaultValue: [25],
    min: 0,
    max: 50,
    step: 5,
    style: { width: '300px' },
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    disabled: true,
    style: { width: '300px' },
  },
}

export const MultipleValues: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    step: 1,
    style: { width: '300px' },
  },
}

export const WithValueDisplay: Story = {
  render: () => {
    const [value, setValue] = (0, [50])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Label>Brightness</Label>
          <span style={{ fontSize: '14px', fontWeight: 600 }}>{value[0]}%</span>
        </div>
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
      </div>
    )
  },
}

export const PriceRange: Story = {
  render: () => {
    const [range, setRange] = (0, [20, 80])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '400px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Label>Price Range</Label>
          <span style={{ fontSize: '14px', fontWeight: 600 }}>
            ${range[0]} - ${range[1]}
          </span>
        </div>
        <Slider value={range} onValueChange={setRange} max={100} step={1} />
      </div>
    )
  },
}
