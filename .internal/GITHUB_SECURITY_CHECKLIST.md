# GitHub Security Setup Checklist

## ✅ Completed

- [x] CodeQL workflow configured
- [x] CI/CD pipeline configured
- [x] Dependabot configured
- [x] CODEOWNERS file created
- [x] Security policy created
- [x] Proper .gitignore created

## ⚠️ REQUIRED: Manual GitHub Settings

You MUST complete these steps in GitHub's web interface before the repo is secure:

### 1. Enable Security Features

Go to: https://github.com/Theft-SUDO/fabrk-official/settings/security_analysis

**Enable ALL of these:**
- [x] Dependency graph
- [x] Dependabot alerts
- [x] Dependabot security updates
- [x] Grouped security updates
- [x] Secret scanning
- [x] Push protection
- [x] Validity checks
- [x] Non-provider patterns
- [x] Code scanning (CodeQL)

### 2. Configure Branch Protection

Go to: https://github.com/Theft-SUDO/fabrk-official/settings/branches

Click "Add branch protection rule"

**Branch name pattern:** `main`

**Check these boxes:**

#### Pull Request Requirements
- [x] Require a pull request before merging
  - Require approvals: **1**
  - [x] Dismiss stale pull request approvals when new commits are pushed
  - [x] Require review from Code Owners
  - [x] Require approval of the most recent reviewable push

#### Status Checks
- [x] Require status checks to pass before merging
  - [x] Require branches to be up to date before merging
  - Search and add: `CodeQL`
  - Search and add: `build` (after first code push triggers CI)

#### Additional Restrictions
- [x] Require conversation resolution before merging
- [x] Require signed commits
- [x] Require linear history
- [x] Do not allow bypassing the above settings
- [x] Restrict who can push to matching branches
  - Add: @Theft-SUDO (only you can push)

#### Protection Against Force Push
- [x] Do not allow force pushes
- [x] Do not allow deletions

### 3. Verify Settings

After configuration, test:

1. Try to push directly to main → Should be blocked
2. Create a PR → Should require CodeQL to pass
3. Try to merge without approval → Should be blocked
4. Try to commit a secret (fake AWS key) → Should be blocked by push protection

## What This Protects Against

| Threat | Protection |
|--------|-----------|
| Malicious code injection | Required PR reviews + CodeQL scanning |
| Credential leaks | Secret scanning + push protection |
| Vulnerable dependencies | Dependabot alerts + auto-updates |
| Force push attacks | Branch protection |
| Unauthorized changes | CODEOWNERS + required approvals |
| Build-breaking code | CI checks must pass |

## Emergency Access

If you need to bypass protection (USE SPARINGLY):
1. Go to branch protection settings
2. Temporarily uncheck "Do not allow bypassing"
3. Make your change
4. **IMMEDIATELY re-enable bypass protection**

## Next Steps

After completing the checklist above:

1. ✅ Run the sync script to push code: `./scripts/sync-to-official.sh`
2. ✅ Verify CodeQL scan passes on the first push
3. ✅ Verify CI workflow runs successfully
4. ✅ Test branch protection by creating a PR
5. ✅ Invite team members and configure their access levels

## Support

If you get stuck, see `.github/BRANCH_PROTECTION_SETUP.md` in the official repo for detailed instructions.
