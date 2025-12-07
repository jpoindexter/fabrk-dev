"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { SignInForm } from "@/components/ui/sign-in-form";

export default function SignInFormPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.104]"
      category="Specialized"
      title="Sign In Form"
      description="A complete sign-in form with email/password, social auth providers, remember me, and forgot password link. Terminal-styled and ready to use."
      importCode={`import { SignInForm } from "@/components/ui/sign-in-form"`}
      mainPreview={{
        preview: (
          <div className="border-border mx-auto max-w-md border p-4">
            <SignInForm
              onSubmit={() => {}}
              forgotPasswordHref="/forgot-password"
              signUpHref="/sign-up"
            />
          </div>
        ),
        code: `<SignInForm
  onSubmit={(data) => handleSignIn(data)}
  forgotPasswordHref="/forgot-password"
  signUpHref="/sign-up"
/>`,
      }}
      variants={[
        {
          title: "Without Social Auth",
          description: "Sign in form with only email/password.",
          preview: (
            <div className="border-border mx-auto max-w-md border p-4">
              <SignInForm socialProviders={[]} showRememberMe={true} />
            </div>
          ),
          code: `<SignInForm socialProviders={[]} />`,
        },
        {
          title: "With Error",
          description: "Form displaying an error message.",
          preview: (
            <div className="border-border mx-auto max-w-md border p-4">
              <SignInForm
                error="Invalid email or password. Please try again."
                socialProviders={[]}
              />
            </div>
          ),
          code: `<SignInForm error="Invalid email or password. Please try again." />`,
        },
        {
          title: "Loading State",
          description: "Form in loading/submitting state.",
          preview: (
            <div className="border-border mx-auto max-w-md border p-4">
              <SignInForm isLoading={true} socialProviders={[]} />
            </div>
          ),
          code: `<SignInForm isLoading={true} />`,
        },
      ]}
      props={[
        {
          name: "onSubmit",
          type: "(data: SignInFormData) => void | Promise<void>",
          description: "Form submission handler.",
        },
        {
          name: "socialProviders",
          type: "SocialProvider[]",
          description: "Social auth provider buttons.",
        },
        {
          name: "forgotPasswordHref",
          type: "string",
          default: '"/forgot-password"',
          description: "Forgot password link URL.",
        },
        {
          name: "signUpHref",
          type: "string",
          default: '"/sign-up"',
          description: "Sign up link URL.",
        },
        {
          name: "showRememberMe",
          type: "boolean",
          default: "true",
          description: "Show remember me checkbox.",
        },
        { name: "defaultEmail", type: "string", description: "Initial email value." },
        {
          name: "isLoading",
          type: "boolean",
          default: "false",
          description: "Loading/submitting state.",
        },
        { name: "error", type: "string", description: "Error message to display." },
      ]}
      usageExamples={[
        {
          title: "Custom Social Providers",
          description: "Configure which OAuth providers to show.",
          code: `const providers = [
  {
    id: "github",
    name: "GitHub",
    icon: <Github className="h-4 w-4" />,
    onClick: () => signIn("github"),
  },
];

<SignInForm socialProviders={providers} />`,
          language: "tsx",
        },
      ]}
      accessibility={[
        "Proper form labels and associations",
        "Error messages linked to inputs",
        "Keyboard navigable",
        "Focus management on errors",
      ]}
      previous={{ title: "Role Selector", href: "/docs/components/role-selector" }}
      next={{ title: "Sign Up Form", href: "/docs/components/sign-up-form" }}
    />
  );
}
