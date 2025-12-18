import { FeatureGuideTemplate } from '@/components/docs';
import { Upload, Shield, Zap, Code, Server, DollarSign } from 'lucide-react';

export const metadata = {
  title: 'UploadThing - Fabrk Docs',
  description:
    'Integrate UploadThing for file uploads. The easiest file upload solution for Next.js.',
};

export default function UploadThingPage() {
  return (
    <FeatureGuideTemplate
      code="[0xT3]"
      category="Storage Providers"
      title="UploadThing"
      description="Next.js native - Easiest file uploads."
      overview="UploadThing is built specifically for Next.js applications. It handles all the complexity of file uploads: validation, progress tracking, and storage. Features include type-safe uploads, built-in file validation, progress callbacks, React hooks, and automatic CDN delivery."
      features={[
        {
          icon: Code,
          title: 'Type-Safe',
          description:
            'Full TypeScript support. Define file routes with type inference.',
        },
        {
          icon: Shield,
          title: 'Built-in Validation',
          description:
            'Validate file types, sizes, and counts at the route level.',
        },
        {
          icon: Upload,
          title: 'Progress Tracking',
          description:
            'Real-time upload progress. Built-in loading states and callbacks.',
        },
        {
          icon: Zap,
          title: 'Fast CDN',
          description:
            'Files served from global edge network. Fast downloads worldwide.',
        },
        {
          icon: Server,
          title: 'Server Callbacks',
          description:
            'Run server code on upload complete. Save to database, send emails.',
        },
        {
          icon: DollarSign,
          title: 'Generous Free Tier',
          description:
            '2GB storage, unlimited bandwidth on free plan. Scales with usage.',
        },
      ]}
      setup={[
        {
          title: 'Create UploadThing Account',
          description:
            'Sign up at uploadthing.com and create a new app.',
        },
        {
          title: 'Install Package',
          description:
            'Install the UploadThing package for Next.js.',
          code: `npm install uploadthing @uploadthing/react`,
          language: 'bash',
        },
        {
          title: 'Add Environment Variables',
          description: 'Copy your API keys from the UploadThing dashboard.',
          code: `# UploadThing Configuration
UPLOADTHING_TOKEN="sk_live_..."

# Set UploadThing as your storage provider
STORAGE_PROVIDER="uploadthing"`,
          language: 'bash',
        },
        {
          title: 'Create File Router',
          description:
            'Define your upload endpoints with validation rules.',
          code: `// src/lib/uploadthing/core.ts
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { auth } from '@/lib/auth';

const f = createUploadthing();

export const ourFileRouter = {
  // Avatar upload - max 4MB, images only
  avatarUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error('Unauthorized');
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for:', metadata.userId);
      console.log('File URL:', file.url);
      // Save to database here
      return { url: file.url };
    }),

  // Document upload - max 16MB, PDFs only
  documentUploader: f({ pdf: { maxFileSize: '16MB', maxFileCount: 5 } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error('Unauthorized');
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url, name: file.name };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;`,
          language: 'typescript',
        },
      ]}
      usage={[
        {
          title: 'Create API Route',
          description: 'Set up the API route handler.',
          code: `// src/app/api/uploadthing/route.ts
import { createRouteHandler } from 'uploadthing/next';
import { ourFileRouter } from '@/lib/uploadthing/core';

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});`,
          language: 'typescript',
        },
        {
          title: 'Upload Button Component',
          description: 'Use the pre-built upload button.',
          code: `'use client';
import { UploadButton } from '@uploadthing/react';
import type { OurFileRouter } from '@/lib/uploadthing/core';

export function AvatarUpload() {
  return (
    <UploadButton<OurFileRouter>
      endpoint="avatarUploader"
      onClientUploadComplete={(res) => {
        console.log('Files:', res);
        alert('Upload complete!');
      }}
      onUploadError={(error) => {
        alert(\`Error: \${error.message}\`);
      }}
      onUploadProgress={(progress) => {
        console.log(\`Progress: \${progress}%\`);
      }}
    />
  );
}`,
          language: 'typescript',
        },
        {
          title: 'Custom Upload UI',
          description: 'Build your own upload interface with hooks.',
          code: `'use client';
import { useUploadThing } from '@uploadthing/react';
import type { OurFileRouter } from '@/lib/uploadthing/core';

export function CustomUpload() {
  const { startUpload, isUploading, permittedFileInfo } =
    useUploadThing<OurFileRouter>('avatarUploader');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const res = await startUpload(Array.from(files));
    if (res) {
      console.log('Uploaded:', res[0].url);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={isUploading}
        accept={permittedFileInfo?.config?.image?.accept}
      />
      {isUploading && <p>Uploading...</p>}
    </div>
  );
}`,
          language: 'typescript',
        },
      ]}
    />
  );
}
