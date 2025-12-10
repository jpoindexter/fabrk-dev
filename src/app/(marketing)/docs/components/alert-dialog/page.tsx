'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function AlertDialogPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.21]"
      category="Components"
      title="Alert Dialog"
      description="A modal dialog that interrupts the user with important content and expects a response."
      importCode={`import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"`}
      mainPreview={{
        preview: (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">&gt; SHOW ALERT</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove
                  your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
                <AlertDialogAction>&gt; CONTINUE</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ),
        code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">&gt; SHOW ALERT</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
      <AlertDialogAction>&gt; CONTINUE</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
      }}
      variants={[
        {
          title: 'Delete Confirmation',
          description: 'Alert dialog for confirming destructive delete actions.',
          preview: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">&gt; DELETE ITEM</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this item?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this item. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    &gt; DELETE
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
          code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">&gt; DELETE ITEM</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete this item?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete this item.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive">
        &gt; DELETE
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
        },
        {
          title: 'Confirmation Only',
          description: 'Alert dialog with only a confirmation action.',
          preview: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="secondary">&gt; SHOW NOTICE</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Notice</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your changes have been saved successfully. You can continue working on your
                    project.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>&gt; OK</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
          code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="secondary">&gt; SHOW NOTICE</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Notice</AlertDialogTitle>
      <AlertDialogDescription>
        Your changes have been saved successfully.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogAction>&gt; OK</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
        },
        {
          title: 'Warning',
          description: 'Alert dialog warning about potential issues.',
          preview: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">&gt; PROCEED WITH CAUTION</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Warning</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action may affect other users. Are you sure you want to continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>&gt; GO BACK</AlertDialogCancel>
                  <AlertDialogAction>&gt; I UNDERSTAND</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
          code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">&gt; PROCEED WITH CAUTION</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Warning</AlertDialogTitle>
      <AlertDialogDescription>
        This action may affect other users.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>&gt; GO BACK</AlertDialogCancel>
      <AlertDialogAction>&gt; I UNDERSTAND</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
        },
        {
          title: 'Controlled State',
          description: 'Alert dialog with controlled open state.',
          preview: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>&gt; CONTROLLED ALERT</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Controlled State</AlertDialogTitle>
                  <AlertDialogDescription>
                    This alert dialog can be controlled with open and onOpenChange props.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
                  <AlertDialogAction>&gt; CONTINUE</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
          code: `const [open, setOpen] = useState(false);

<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
    <Button>&gt; CONTROLLED ALERT</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Controlled State</AlertDialogTitle>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
      <AlertDialogAction>&gt; CONTINUE</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
        },
        {
          title: 'Custom Actions',
          description: 'Alert dialog with custom styled action buttons.',
          preview: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost">&gt; CUSTOM ACTIONS</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Subscribe to newsletter?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Get the latest updates and news delivered to your inbox.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>&gt; NOT NOW</AlertDialogCancel>
                  <AlertDialogAction className="bg-primary">&gt; SUBSCRIBE</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
          code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="ghost">&gt; CUSTOM ACTIONS</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Subscribe to newsletter?</AlertDialogTitle>
      <AlertDialogDescription>
        Get the latest updates delivered to your inbox.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>&gt; NOT NOW</AlertDialogCancel>
      <AlertDialogAction>&gt; SUBSCRIBE</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
        },
      ]}
      props={[
        {
          name: 'open',
          type: 'boolean',
          default: 'undefined',
          description: 'Control the open state of the alert dialog.',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          default: 'undefined',
          description: 'Event handler called when the open state changes.',
        },
        {
          name: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'The initial open state in uncontrolled mode.',
        },
      ]}
      accessibility={[
        "Implements ARIA alertdialog pattern with role='alertdialog'",
        'AlertDialogTitle provides accessible name via aria-labelledby',
        'AlertDialogDescription provides description via aria-describedby',
        'Focus is trapped within the dialog when open',
        'Escape key closes the dialog',
        'Focus returns to trigger element when closed',
        'AlertDialogAction and AlertDialogCancel have clear semantic meaning',
        'Keyboard navigation between action buttons with Tab/Shift+Tab',
      ]}
      previous={{ title: 'Dialog', href: '/docs/components/dialog' }}
      next={{ title: 'Sheet', href: '/docs/components/sheet' }}
    />
  );
}
