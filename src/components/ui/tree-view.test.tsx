import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TreeView } from './tree-view';
import type { TreeNode } from './tree-view';
import { Folder, File } from 'lucide-react';

describe('TreeView Component', () => {
  const mockData: TreeNode[] = [
    {
      id: '1',
      label: 'Documents',
      icon: Folder,
      children: [
        { id: '1-1', label: 'Resume.pdf', icon: File },
        { id: '1-2', label: 'Cover Letter.pdf', icon: File },
        {
          id: '1-3',
          label: 'Projects',
          icon: Folder,
          children: [
            { id: '1-3-1', label: 'Project A.doc', icon: File },
            { id: '1-3-2', label: 'Project B.doc', icon: File },
          ],
        },
      ],
    },
    {
      id: '2',
      label: 'Photos',
      icon: Folder,
      children: [
        { id: '2-1', label: 'Vacation.jpg', icon: File },
        { id: '2-2', label: 'Family.jpg', icon: File },
      ],
    },
    { id: '3', label: 'Notes.txt', icon: File },
  ];

  describe('Rendering', () => {
    it('renders all root nodes', () => {
      render(<TreeView data={mockData} />);

      expect(screen.getByText('Documents')).toBeInTheDocument();
      expect(screen.getByText('Photos')).toBeInTheDocument();
      expect(screen.getByText('Notes.txt')).toBeInTheDocument();
    });

    it('does not render children by default', () => {
      render(<TreeView data={mockData} />);

      expect(screen.queryByText('Resume.pdf')).not.toBeInTheDocument();
      expect(screen.queryByText('Vacation.jpg')).not.toBeInTheDocument();
    });

    it('shows expand/collapse icons for parent nodes', () => {
      const { container } = render(<TreeView data={mockData} />);

      // Documents and Photos have children, so should have chevrons
      const chevrons = container.querySelectorAll('svg[class*="lucide-chevron"]');
      expect(chevrons.length).toBeGreaterThan(0);
    });

    it('renders icons when showIcons is true', () => {
      const { container } = render(<TreeView data={mockData} showIcons={true} />);

      // Icons should be rendered
      const icons = container.querySelectorAll('svg[class*="h-4 w-4 text-primary"]');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('hides icons when showIcons is false', () => {
      const { container } = render(<TreeView data={mockData} showIcons={false} />);

      // Only chevrons should be rendered, not node icons
      const icons = container.querySelectorAll('svg[class*="h-4 w-4 text-primary"]');
      expect(icons.length).toBe(0);
    });
  });

  describe('Expand/Collapse', () => {
    it('expands node when clicked', () => {
      render(<TreeView data={mockData} />);

      const documentsNode = screen.getByText('Documents');
      fireEvent.click(documentsNode);

      expect(screen.getByText('Resume.pdf')).toBeInTheDocument();
      expect(screen.getByText('Cover Letter.pdf')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
    });

    it('collapses expanded node when clicked again', () => {
      render(<TreeView data={mockData} />);

      const documentsNode = screen.getByText('Documents');

      // Expand
      fireEvent.click(documentsNode);
      expect(screen.getByText('Resume.pdf')).toBeInTheDocument();

      // Collapse
      fireEvent.click(documentsNode);
      expect(screen.queryByText('Resume.pdf')).not.toBeInTheDocument();
    });

    it('expands nested children', () => {
      render(<TreeView data={mockData} />);

      // Expand Documents
      fireEvent.click(screen.getByText('Documents'));

      // Expand Projects subfolder
      fireEvent.click(screen.getByText('Projects'));

      expect(screen.getByText('Project A.doc')).toBeInTheDocument();
      expect(screen.getByText('Project B.doc')).toBeInTheDocument();
    });

    it('calls onExpand when node is expanded', () => {
      const mockExpand = vi.fn();
      render(<TreeView data={mockData} onExpand={mockExpand} />);

      fireEvent.click(screen.getByText('Documents'));

      expect(mockExpand).toHaveBeenCalledWith(['1']);
    });

    it('expands all nodes when defaultExpandAll is true', () => {
      render(<TreeView data={mockData} defaultExpandAll={true} />);

      // All children should be visible
      expect(screen.getByText('Resume.pdf')).toBeInTheDocument();
      expect(screen.getByText('Project A.doc')).toBeInTheDocument();
      expect(screen.getByText('Vacation.jpg')).toBeInTheDocument();
    });
  });

  describe('Selection', () => {
    it('selects node when clicked in single-select mode', () => {
      render(<TreeView data={mockData} multiSelect={false} />);

      const notesNode = screen.getByText('Notes.txt');
      fireEvent.click(notesNode);

      // Node should have selected styling
      expect(notesNode.closest('[role="treeitem"]')).toHaveAttribute(
        'aria-selected',
        'true'
      );
    });

    it('calls onSelect with selected node ID', () => {
      const mockSelect = vi.fn();
      render(<TreeView data={mockData} onSelect={mockSelect} />);

      fireEvent.click(screen.getByText('Notes.txt'));

      expect(mockSelect).toHaveBeenCalledWith(['3']);
    });

    it('allows multiple selection when multiSelect is true', () => {
      const mockSelect = vi.fn();
      render(<TreeView data={mockData} multiSelect={true} onSelect={mockSelect} />);

      fireEvent.click(screen.getByText('Notes.txt'));
      expect(mockSelect).toHaveBeenCalledWith(['3']);

      fireEvent.click(screen.getByText('Photos'));
      expect(mockSelect).toHaveBeenCalledWith(['3', '2']);
    });

    it('deselects node in single-select mode', () => {
      render(<TreeView data={mockData} multiSelect={false} />);

      const notesNode = screen.getByText('Notes.txt');

      // Select
      fireEvent.click(notesNode);
      expect(notesNode.closest('[role="treeitem"]')).toHaveAttribute(
        'aria-selected',
        'true'
      );

      // Deselect
      fireEvent.click(notesNode);
      expect(notesNode.closest('[role="treeitem"]')).toHaveAttribute(
        'aria-selected',
        'false'
      );
    });

    it('calls onNodeClick when provided', () => {
      const mockNodeClick = vi.fn();
      render(<TreeView data={mockData} onNodeClick={mockNodeClick} />);

      fireEvent.click(screen.getByText('Notes.txt'));

      expect(mockNodeClick).toHaveBeenCalledWith(
        expect.objectContaining({ id: '3', label: 'Notes.txt' })
      );
    });
  });

  describe('Checkbox Mode', () => {
    it('shows checkboxes when showCheckboxes is true', () => {
      const { container } = render(
        <TreeView data={mockData} showCheckboxes={true} />
      );

      const checkboxes = container.querySelectorAll('button[role="checkbox"]');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('selects node and descendants when checkbox is clicked', () => {
      const mockSelect = vi.fn();
      render(
        <TreeView data={mockData} showCheckboxes={true} onSelect={mockSelect} />
      );

      // Expand Documents to see children
      fireEvent.click(screen.getByText('Documents'));

      // Find and click checkbox for Documents
      const documentsNode = screen.getByText('Documents').closest('[role="treeitem"]');
      const checkbox = documentsNode?.querySelector('button[role="checkbox"]');

      if (checkbox) {
        fireEvent.click(checkbox);

        // Should select Documents and all descendants
        expect(mockSelect).toHaveBeenCalledWith(
          expect.arrayContaining(['1', '1-1', '1-2', '1-3', '1-3-1', '1-3-2'])
        );
      }
    });

    it('shows indeterminate state when some children are selected', () => {
      const { container } = render(
        <TreeView
          data={mockData}
          showCheckboxes={true}
          selectedIds={['1-1']}
        />
      );

      // Expand Documents
      fireEvent.click(screen.getByText('Documents'));

      // Documents node should have indeterminate checkbox
      const documentsNode = screen.getByText('Documents').closest('[role="treeitem"]');
      const checkbox = documentsNode?.querySelector('button[role="checkbox"]');
      expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
    });
  });

  describe('Search', () => {
    it('filters nodes by search term', () => {
      render(<TreeView data={mockData} searchTerm="pdf" />);

      // Matching nodes should be visible
      expect(screen.getByText('Resume.pdf')).toBeInTheDocument();
      expect(screen.getByText('Cover Letter.pdf')).toBeInTheDocument();

      // Non-matching nodes should not be visible
      expect(screen.queryByText('Notes.txt')).not.toBeInTheDocument();
    });

    it('shows parent nodes when child matches search', () => {
      render(<TreeView data={mockData} searchTerm="Project A" />);

      // Parent nodes should be visible
      expect(screen.getByText('Documents')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();

      // Matching child should be visible
      expect(screen.getByText('Project A.doc')).toBeInTheDocument();
    });

    it('auto-expands nodes when searching', () => {
      render(<TreeView data={mockData} searchTerm="Resume" />);

      // Documents should be expanded to show Resume.pdf
      expect(screen.getByText('Resume.pdf')).toBeInTheDocument();
    });

    it('shows "No matching nodes" message when no results', () => {
      render(<TreeView data={mockData} searchTerm="nonexistent" />);

      expect(screen.getByText('No matching nodes found')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('allows Enter key to select node', () => {
      const mockSelect = vi.fn();
      render(<TreeView data={mockData} onSelect={mockSelect} />);

      const notesNode = screen.getByText('Notes.txt').closest('[role="treeitem"]');

      if (notesNode) {
        fireEvent.keyDown(notesNode, { key: 'Enter' });
        expect(mockSelect).toHaveBeenCalledWith(['3']);
      }
    });

    it('allows Space key to select node', () => {
      const mockSelect = vi.fn();
      render(<TreeView data={mockData} onSelect={mockSelect} />);

      const notesNode = screen.getByText('Notes.txt').closest('[role="treeitem"]');

      if (notesNode) {
        fireEvent.keyDown(notesNode, { key: ' ' });
        expect(mockSelect).toHaveBeenCalledWith(['3']);
      }
    });

    it('allows ArrowRight to expand collapsed node', () => {
      render(<TreeView data={mockData} />);

      const documentsNode = screen.getByText('Documents').closest('[role="treeitem"]');

      if (documentsNode) {
        fireEvent.keyDown(documentsNode, { key: 'ArrowRight' });
        expect(screen.getByText('Resume.pdf')).toBeInTheDocument();
      }
    });

    it('allows ArrowLeft to collapse expanded node', () => {
      render(<TreeView data={mockData} />);

      const documentsNode = screen.getByText('Documents').closest('[role="treeitem"]');

      if (documentsNode) {
        // Expand
        fireEvent.keyDown(documentsNode, { key: 'ArrowRight' });
        expect(screen.getByText('Resume.pdf')).toBeInTheDocument();

        // Collapse
        fireEvent.keyDown(documentsNode, { key: 'ArrowLeft' });
        expect(screen.queryByText('Resume.pdf')).not.toBeInTheDocument();
      }
    });
  });

  describe('Disabled Nodes', () => {
    const dataWithDisabled: TreeNode[] = [
      { id: '1', label: 'Enabled', icon: File },
      { id: '2', label: 'Disabled', icon: File, disabled: true },
    ];

    it('renders disabled nodes with opacity', () => {
      const { container } = render(<TreeView data={dataWithDisabled} />);

      const disabledNode = screen.getByText('Disabled').closest('[role="treeitem"]');
      expect(disabledNode).toHaveClass('opacity-50');
    });

    it('does not select disabled nodes', () => {
      const mockSelect = vi.fn();
      render(<TreeView data={dataWithDisabled} onSelect={mockSelect} />);

      fireEvent.click(screen.getByText('Disabled'));

      expect(mockSelect).not.toHaveBeenCalled();
    });

    it('marks disabled nodes as aria-disabled', () => {
      render(<TreeView data={dataWithDisabled} />);

      const disabledNode = screen.getByText('Disabled').closest('[role="treeitem"]');
      expect(disabledNode).toHaveAttribute('aria-disabled', 'true');
      expect(disabledNode).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Empty State', () => {
    it('shows "No data available" when data is empty', () => {
      render(<TreeView data={[]} />);

      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('shows "No matching nodes" when search yields no results', () => {
      render(<TreeView data={mockData} searchTerm="zzz" />);

      expect(screen.getByText('No matching nodes found')).toBeInTheDocument();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works in uncontrolled mode', () => {
      render(<TreeView data={mockData} />);

      fireEvent.click(screen.getByText('Notes.txt'));

      const node = screen.getByText('Notes.txt').closest('[role="treeitem"]');
      expect(node).toHaveAttribute('aria-selected', 'true');
    });

    it('works in controlled mode with selectedIds', () => {
      render(<TreeView data={mockData} selectedIds={['3']} />);

      const node = screen.getByText('Notes.txt').closest('[role="treeitem"]');
      expect(node).toHaveAttribute('aria-selected', 'true');
    });

    it('works in controlled mode with expandedIds', () => {
      render(<TreeView data={mockData} expandedIds={['1']} />);

      // Documents should be expanded
      expect(screen.getByText('Resume.pdf')).toBeInTheDocument();
    });
  });
});

describe('TreeView Accessibility', () => {
  const mockData: TreeNode[] = [
    {
      id: '1',
      label: 'Root',
      children: [{ id: '1-1', label: 'Child' }],
    },
  ];

  it('has tree role', () => {
    const { container } = render(<TreeView data={mockData} />);

    expect(container.querySelector('[role="tree"]')).toBeInTheDocument();
  });

  it('has treeitem role for nodes', () => {
    render(<TreeView data={mockData} />);

    const rootNode = screen.getByText('Root').closest('[role="treeitem"]');
    expect(rootNode).toBeInTheDocument();
  });

  it('sets aria-expanded for parent nodes', () => {
    render(<TreeView data={mockData} />);

    const rootNode = screen.getByText('Root').closest('[role="treeitem"]');
    expect(rootNode).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(screen.getByText('Root'));
    expect(rootNode).toHaveAttribute('aria-expanded', 'true');
  });

  it('sets aria-selected for selected nodes', () => {
    render(<TreeView data={mockData} selectedIds={['1']} />);

    const rootNode = screen.getByText('Root').closest('[role="treeitem"]');
    expect(rootNode).toHaveAttribute('aria-selected', 'true');
  });

  it('is keyboard navigable', () => {
    render(<TreeView data={mockData} />);

    const rootNode = screen.getByText('Root').closest('[role="treeitem"]');
    expect(rootNode).toHaveAttribute('tabIndex', '0');
  });
});

describe('TreeView Edge Cases', () => {
  it('handles very deep nesting', () => {
    const deepData: TreeNode[] = [
      {
        id: '1',
        label: 'Level 1',
        children: [
          {
            id: '2',
            label: 'Level 2',
            children: [
              {
                id: '3',
                label: 'Level 3',
                children: [
                  {
                    id: '4',
                    label: 'Level 4',
                    children: [{ id: '5', label: 'Level 5' }],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    render(<TreeView data={deepData} defaultExpandAll={true} />);

    expect(screen.getByText('Level 5')).toBeInTheDocument();
  });

  it('handles nodes with long labels', () => {
    const longLabelData: TreeNode[] = [
      {
        id: '1',
        label: 'This is a very long label that should be truncated or wrapped properly without breaking the layout or causing overflow issues',
      },
    ];

    render(<TreeView data={longLabelData} />);

    expect(
      screen.getByText(/This is a very long label/)
    ).toBeInTheDocument();
  });

  it('handles large number of nodes', () => {
    const largeData: TreeNode[] = Array.from({ length: 100 }, (_, i) => ({
      id: `${i}`,
      label: `Node ${i}`,
    }));

    const { container } = render(<TreeView data={largeData} />);

    expect(container.querySelectorAll('[role="treeitem"]').length).toBe(100);
  });

  it('handles nodes without children property', () => {
    const noChildrenData: TreeNode[] = [
      { id: '1', label: 'Node 1' },
      { id: '2', label: 'Node 2' },
    ];

    render(<TreeView data={noChildrenData} />);

    expect(screen.getByText('Node 1')).toBeInTheDocument();
    expect(screen.getByText('Node 2')).toBeInTheDocument();
  });
});
