import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export const metadata = {
  title: "Cloud Storage - Fabrk Docs",
  description: "Store files with Cloudflare R2, AWS S3, or local storage. Automatic provider detection and signed URL generation.",
};

export default function CloudStoragePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x50] FEATURES ] CLOUD_STORAGE</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">CLOUD_STORAGE</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">&gt; Upload and store files securely with automatic provider detection.</p>
      </div>

      {/* What is Cloud Storage - Plain English */}
      <Card className="rounded-none">
        <CardContent className="p-6 space-y-4">
          <h2 className="font-mono text-lg font-bold text-foreground">WHAT_IS_CLOUD_STORAGE</h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Cloud storage lets you save files (images, documents, videos) on remote servers
            instead of your own. This is essential when users need to upload profile pictures,
            documents, or any other files.
          </p>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Think of it like Google Drive or Dropbox for your app - files are stored securely
            in the cloud and can be accessed from anywhere.
          </p>
        </CardContent>
      </Card>

      {/* Why You Need This */}
      <Card className="rounded-none">
        <CardContent className="p-6 space-y-4">
          <h2 className="font-mono text-lg font-bold text-foreground">WHY_NOT_STORE_FILES_LOCALLY</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-mono font-medium text-destructive">LOCAL_STORAGE_PROBLEMS</h3>
              <ul className="font-mono text-sm text-muted-foreground space-y-1">
                <li>Files lost when server restarts</li>
                <li>Limited disk space</li>
                <li>Slow serving to global users</li>
                <li>No backup or redundancy</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-mono font-medium text-primary">CLOUD_STORAGE_BENEFITS</h3>
              <ul className="font-mono text-sm text-muted-foreground space-y-1">
                <li>Files persist permanently</li>
                <li>Virtually unlimited storage</li>
                <li>Global CDN for fast delivery</li>
                <li>Automatic backups and redundancy</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How Fabrk Storage Works */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold">HOW_FABRK_STORAGE_WORKS</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Fabrk automatically detects which storage provider you have configured and uses it.
          This means you can start with local storage during development and switch to cloud
          in production without changing your code.
        </p>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <h3 className="font-mono font-semibold mb-3">PROVIDER_PRIORITY</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 border">
                <span className="flex h-6 w-6 items-center justify-center font-mono bg-primary text-xs font-bold text-primary-foreground">1</span>
                <div>
                  <p className="font-medium">Cloudflare R2</p>
                  <p className="font-mono text-xs text-muted-foreground">Used if R2 environment variables are set</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border">
                <span className="flex h-6 w-6 items-center justify-center font-mono bg-primary/70 text-xs font-bold text-primary-foreground">2</span>
                <div>
                  <p className="font-medium">AWS S3</p>
                  <p className="font-mono text-xs text-muted-foreground">Used if only S3 environment variables are set</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border">
                <span className="flex h-6 w-6 items-center justify-center font-mono bg-muted text-xs font-bold">3</span>
                <div>
                  <p className="font-medium">Local Storage</p>
                  <p className="font-mono text-xs text-muted-foreground">Fallback when no cloud provider is configured</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Choosing a Provider */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold">CHOOSING_A_PROVIDER</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono font-semibold">CLOUDFLARE_R2</h3>
              <p className="font-mono text-xs text-muted-foreground mb-2">Recommended</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>No egress fees (huge savings)</li>
                <li>S3-compatible API</li>
                <li>Global edge network</li>
                <li>Generous free tier</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono font-semibold">AWS_S3</h3>
              <p className="font-mono text-xs text-muted-foreground mb-2">Industry Standard</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Most mature platform</li>
                <li>Extensive documentation</li>
                <li>Pay-per-use pricing</li>
                <li>Egress fees apply</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono font-semibold">LOCAL_STORAGE</h3>
              <p className="font-mono text-xs text-muted-foreground mb-2">Development Only</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>No setup required</li>
                <li>Good for testing</li>
                <li>Files in /uploads folder</li>
                <li>Not for production</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Setup - R2 */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold">SETUP_CLOUDFLARE_R2</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          R2 is the recommended provider due to zero egress fees. Here&apos;s how to set it up:
        </p>

        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center font-mono bg-primary text-xs font-bold text-primary-foreground">
            1
          </span>
          <h3 className="font-mono font-semibold">CREATE_R2_BUCKET</h3>
        </div>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          In Cloudflare Dashboard, go to &quot;R2 Object Storage&quot; → &quot;Create bucket&quot;.
          Name it something like <code className="font-mono bg-muted px-1">my-saas-uploads</code>.
        </p>

        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center font-mono bg-primary text-xs font-bold text-primary-foreground">
            2
          </span>
          <h3 className="font-mono font-semibold">GENERATE_API_TOKEN</h3>
        </div>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Go to &quot;R2 Object Storage&quot; → &quot;Manage R2 API Tokens&quot; → &quot;Create API Token&quot;.
          Select &quot;Object Read &amp; Write&quot; permission and your bucket.
        </p>

        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center font-mono bg-primary text-xs font-bold text-primary-foreground">
            3
          </span>
          <h3 className="font-mono font-semibold">ADD_ENVIRONMENT_VARIABLES</h3>
        </div>
        <CodeBlock language="bash" code={`# .env.local

# Cloudflare R2 Configuration
CLOUDFLARE_R2_ACCESS_KEY_ID="your-access-key-id"
CLOUDFLARE_R2_SECRET_ACCESS_KEY="your-secret-access-key"
CLOUDFLARE_R2_BUCKET="my-saas-uploads"
CLOUDFLARE_R2_ENDPOINT="https://your-account-id.r2.cloudflarestorage.com"

# Optional: Public URL for the bucket
CLOUDFLARE_R2_PUBLIC_URL="https://uploads.yourdomain.com"`} />
      </div>

      {/* Setup - S3 */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold">SETUP_AWS_S3</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          If you prefer S3 or already use AWS:
        </p>
        <CodeBlock language="bash" code={`# .env.local

# AWS S3 Configuration
AWS_S3_ACCESS_KEY_ID="your-access-key-id"
AWS_S3_SECRET_ACCESS_KEY="your-secret-access-key"
AWS_S3_BUCKET="my-saas-uploads"
AWS_S3_REGION="us-east-1"`} />
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Note: Make sure your IAM user has <code className="font-mono bg-muted px-1">s3:PutObject</code>,
          <code className="font-mono bg-muted px-1 ml-1">s3:GetObject</code>, and
          <code className="font-mono bg-muted px-1 ml-1">s3:DeleteObject</code> permissions.
        </p>
      </div>

      {/* Code Examples */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold">CODE_REFERENCE</h2>

        <h3 className="font-mono font-semibold">UPLOAD_A_FILE</h3>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Use the upload utility to store files:
        </p>
        <CodeBlock language="typescript" code={`import { uploadFile, getStorageProvider } from "@/lib/storage/uploads";

// Check which provider is being used
const provider = getStorageProvider();
console.log("Using storage:", provider); // "r2", "s3", or "local"

// Upload a file
const result = await uploadFile(file, {
  folder: "avatars",           // Optional: organize by folder
  organizationId: org.id,      // Optional: for access control
  allowedTypes: ["image/jpeg", "image/png"], // Optional: restrict types
  maxSize: 5 * 1024 * 1024,    // Optional: 5MB limit
});

if (result.success) {
  console.log("File URL:", result.url);
  console.log("File key:", result.key);
} else {
  console.log("Error:", result.error);
}`} />

        <h3 className="font-mono font-semibold mt-6">FILE_VALIDATION</h3>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Validate files before uploading:
        </p>
        <CodeBlock language="typescript" code={`import { validateFile } from "@/lib/storage/uploads";

// Validate file size and type
const validation = validateFile(file, {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ],
});

if (!validation.valid) {
  // Handle validation errors
  console.error(validation.error);
  // "File too large. Maximum size is 10MB"
  // "File type not allowed. Allowed: image/jpeg, image/png..."
}`} />

        <h3 className="font-mono font-semibold mt-6">API_ROUTE_EXAMPLE</h3>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Handle file uploads in your API:
        </p>
        <CodeBlock language="typescript" code={`// src/app/api/upload/route.ts

import { auth } from "@/lib/auth";
import { uploadFile } from "@/lib/storage/uploads";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get file from form data
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Upload to storage
  const result = await uploadFile(file, {
    folder: \`users/\${session.user.id}\`,
    allowedTypes: ["image/jpeg", "image/png"],
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  // Save URL to database if needed
  await prisma.user.update({
    where: { id: session.user.id },
    data: { avatarUrl: result.url },
  });

  return NextResponse.json({
    url: result.url,
    message: "File uploaded successfully",
  });
}`} />

        <h3 className="font-mono font-semibold mt-6">CLIENT_SIDE_UPLOAD_COMPONENT</h3>
        <CodeBlock language="tsx" code={`"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function FileUploader() {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }

      alert("Uploaded! URL: " + data.url);
    } catch (error) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleUpload}
        disabled={uploading}
        accept="image/jpeg,image/png"
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}`} />
      </div>

      {/* Security */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold">SECURITY_CONSIDERATIONS</h2>
        <Card className="bg-muted">
          <CardContent className="p-6">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center font-mono bg-primary text-xs font-bold text-primary-foreground">1</span>
                <span><strong>Validate file types:</strong> Never trust the file extension. Check MIME type server-side to prevent malicious uploads.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center font-mono bg-primary text-xs font-bold text-primary-foreground">2</span>
                <span><strong>Limit file sizes:</strong> Set reasonable limits to prevent storage abuse and server crashes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center font-mono bg-primary text-xs font-bold text-primary-foreground">3</span>
                <span><strong>Use signed URLs:</strong> For private files, generate time-limited signed URLs instead of public links.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center font-mono bg-primary text-xs font-bold text-primary-foreground">4</span>
                <span><strong>Organize by user/org:</strong> Store files in user or organization folders to enable access control.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center font-mono bg-primary text-xs font-bold text-primary-foreground">5</span>
                <span><strong>Scan for malware:</strong> Consider adding virus scanning for user-uploaded files in production.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Common Questions */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold">COMMON_QUESTIONS</h2>
        <div className="space-y-3">
          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-medium">
              How much does cloud storage cost?
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                <strong>Cloudflare R2:</strong> $0.015/GB/month for storage, zero egress fees.
                First 10GB free.
              </p>
              <p className="mt-2">
                <strong>AWS S3:</strong> ~$0.023/GB/month storage + $0.09/GB egress. Egress fees
                can add up quickly.
              </p>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-medium">
              What&apos;s the maximum file size?
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                By default, Fabrk validates files up to 10MB. You can change this in your upload
                options. For larger files (videos, etc.), consider using direct-to-storage uploads
                with presigned URLs.
              </p>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-medium">
              Can I use both R2 and S3?
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                Fabrk uses one provider at a time based on which env vars are set. R2 takes
                priority if both are configured. If you need multi-provider support, you&apos;d
                need to customize the storage module.
              </p>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-medium">
              How do I delete files?
            </summary>
            <div className="border-t p-4 text-sm text-muted-foreground">
              <p>
                Use the <code className="font-mono bg-muted px-1">deleteFile(key)</code> function
                from the storage module. The key is returned when you upload a file. Make sure
                to also remove the file reference from your database.
              </p>
            </div>
          </details>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/tutorials/authentication">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono font-semibold">AUTHENTICATION</h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Secure file uploads with user authentication.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/features/organizations">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono font-semibold">ORGANIZATIONS</h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Organize files by team with multi-tenancy.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Back to docs link */}
      <div className="pt-4">
        <Link href="/docs" className="text-primary hover:underline">
          ← Back to Documentation
        </Link>
      </div>
    </div>
  );
}
