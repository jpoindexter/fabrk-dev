# Launch Day Timeline & Checklist

Complete timeline and checklist for launching Fabrk on Product Hunt, Hacker News, Reddit, and other platforms.

---

## Table of Contents

1. [Pre-Launch (2 Weeks Before)](#pre-launch-2-weeks-before)
2. [Pre-Launch (1 Week Before)](#pre-launch-1-week-before)
3. [Pre-Launch (3 Days Before)](#pre-launch-3-days-before)
4. [Launch Day - 1](#launch-day---1)
5. [Launch Day Timeline](#launch-day-timeline)
6. [Launch Day + 1-7](#launch-day--1-7)
7. [Launch Day + 30](#launch-day--30)
8. [Emergency Playbook](#emergency-playbook)

---

## Pre-Launch (2 Weeks Before)

### Product Readiness

#### Code & Infrastructure
- [ ] All features complete and tested
- [ ] Run full TypeScript check: `npm run type-check`
- [ ] Run production build: `npm run build`
- [ ] Fix all ESLint warnings: `npm run lint`
- [ ] Database migrations applied to production
- [ ] Environment variables set in Vercel/hosting
- [ ] Stripe webhooks configured and tested
- [ ] Email sending tested (Resend)
- [ ] SSL certificate active
- [ ] Custom domain configured (fabrk.dev)

#### Content & Copy
- [ ] Landing page copy finalized
- [ ] Pricing copy reviewed ($79 launch price confirmed)
- [ ] Terms of Service reviewed by legal
- [ ] Privacy Policy GDPR-compliant
- [ ] Refund Policy clear (30-day guarantee)
- [ ] FAQ section answers all objections
- [ ] Documentation complete and accessible
- [ ] README.md polished for GitHub

#### Assets
- [ ] Logo (SVG + PNG, light/dark versions)
- [ ] Favicon (16x16, 32x32, 64x64)
- [ ] Open Graph image (1200x630px, <1MB)
- [ ] Twitter Card image (1200x600px)
- [ ] Product screenshots (5-10 high-quality)
- [ ] Demo video (optional, 30-60 seconds)
- [ ] Product Hunt thumbnail (240x240px)

#### Accounts & Tools
- [ ] Product Hunt account created (hunter with followers)
- [ ] Twitter account active (posting regularly)
- [ ] LinkedIn profile updated
- [ ] Reddit account (>100 karma, active for 30+ days)
- [ ] Hacker News account (>50 karma)
- [ ] Discord server created
- [ ] Email service configured (Resend)
- [ ] Analytics installed (Plausible or GA4)
- [ ] Stripe Connect completed
- [ ] Support email configured (support@fabrk.dev)

---

## Pre-Launch (1 Week Before)

### Marketing Preparation

#### Product Hunt
- [ ] Product Hunt page drafted in Upcoming Products
- [ ] Product description written (see PRODUCT-HUNT.md)
- [ ] First comment prepared (feature breakdown)
- [ ] 5-10 hunters contacted to request upvote
- [ ] Thumbnail uploaded (240x240px)
- [ ] Gallery images uploaded (4-6 screenshots)
- [ ] Links configured (website, Twitter, GitHub)
- [ ] Maker profile complete with bio and photo

#### Social Media
- [ ] Twitter launch thread written (see SOCIAL-MEDIA-TEMPLATES.md)
- [ ] LinkedIn post drafted
- [ ] 5 supporting tweets scheduled (features, benefits, behind-the-scenes)
- [ ] Reddit posts drafted for 3-4 subreddits
- [ ] Hacker News "Show HN" post written
- [ ] Instagram carousel prepared (optional)
- [ ] Engage with 10-20 potential customers on Twitter

#### Content Marketing
- [ ] Blog post written: "Building Fabrk: Lessons Learned"
- [ ] Blog post written: "Why We Built an Anti-Bloat Boilerplate"
- [ ] Dev.to article prepared
- [ ] Medium article prepared (cross-post)
- [ ] Newsletter draft for email list (if applicable)

#### Outreach
- [ ] Email 10-20 indie hacker friends for support
- [ ] Notify existing followers on Twitter
- [ ] Post teaser in relevant Discord/Slack communities
- [ ] Reach out to 3-5 micro-influencers in dev space
- [ ] Contact newsletter curators (TLDR, IndieHackers Weekly)

---

## Pre-Launch (3 Days Before)

### Final Testing

#### Technical Testing
- [ ] Complete checkout flow (Stripe test mode)
- [ ] Test email delivery (welcome, verification, reset)
- [ ] Test OAuth (Google login)
- [ ] Test all page loads (<3s initial load)
- [ ] Mobile responsive check (iPhone, Android)
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Lighthouse score >90 (performance, accessibility, SEO)
- [ ] Stripe webhook events trigger correctly
- [ ] Database queries optimized (no N+1 queries)
- [ ] Error pages work (404, 500)

#### User Experience Testing
- [ ] New user flow: Landing → Sign Up → Purchase → Dashboard
- [ ] Documentation is clear and complete
- [ ] Support email auto-responds
- [ ] Discord invite link works
- [ ] All CTAs clickable and functional
- [ ] No placeholder text remaining
- [ ] No Lorem Ipsum anywhere
- [ ] All links work (no 404s)

#### Analytics & Monitoring
- [ ] GA4 or Plausible tracking events
- [ ] Conversion tracking configured
- [ ] UTM parameters set up for all campaigns
- [ ] Error tracking configured (Sentry optional)
- [ ] Uptime monitoring (UptimeRobot, Better Uptime)
- [ ] Stripe dashboard notifications enabled

#### Launch Materials
- [ ] Product Hunt submission ready (draft saved)
- [ ] Twitter thread ready (copy-pasted, ready to tweet)
- [ ] Reddit posts ready in notepad
- [ ] Hacker News post ready
- [ ] LinkedIn post ready
- [ ] Email to mailing list ready to send
- [ ] First 10 responses to comments prepared

---

## Launch Day - 1

### Final Prep (Night Before Launch)

- [ ] Get 8 hours of sleep (seriously)
- [ ] Schedule launch for 12:01 AM PST (Product Hunt new day)
- [ ] Double-check Stripe is in LIVE mode (not test)
- [ ] Verify webhook secret is for LIVE mode
- [ ] Clear browser cache and test full flow
- [ ] Backup database
- [ ] Confirm support email monitored
- [ ] Set phone/laptop notifications for support emails
- [ ] Have caffeine ready for launch day

---

## Launch Day Timeline

### 12:00 AM PST (Midnight)

**Product Hunt Launch**

- [ ] Submit product on Product Hunt (goes live immediately)
- [ ] Post first comment with feature breakdown
- [ ] Share PH link on Twitter immediately
- [ ] Pin tweet to Twitter profile
- [ ] Text/DM 5-10 close friends to upvote and comment
- [ ] Monitor PH page for first comments (respond within 5 minutes)

**Expected:** 0-10 upvotes in first hour

---

### 6:00 AM PST (Morning)

**Social Media Blitz**

- [ ] Post Twitter launch thread (see SOCIAL-MEDIA-TEMPLATES.md)
- [ ] Post on LinkedIn
- [ ] Post on Reddit (r/SideProject)
- [ ] Post on Hacker News (Show HN)
- [ ] Post in 3-5 relevant Discord servers (indie hackers, webdev)
- [ ] Post in Slack communities (Tech Twitter, Indie Worldwide)
- [ ] Email launch announcement to mailing list

**Expected:** 50-100 Product Hunt upvotes by now

---

### 9:00 AM PST (Mid-Morning)

**Engagement & Momentum**

- [ ] Respond to ALL Product Hunt comments (within 1 hour)
- [ ] Respond to Twitter replies and mentions
- [ ] Respond to Reddit comments (be helpful, not salesy)
- [ ] Respond to Hacker News comments (technical depth)
- [ ] Thank everyone who shares or upvotes
- [ ] Monitor support email (respond within 30 minutes)
- [ ] Post update tweet with current upvote count

**Expected:** 100-200 Product Hunt upvotes, trending

---

### 12:00 PM PST (Noon)

**Peak Engagement**

- [ ] Post teaser screenshot on Twitter
- [ ] Share top Product Hunt comment as a tweet
- [ ] Post "We're trending!" update
- [ ] Post additional Reddit communities (r/webdev, r/SaaS)
- [ ] Monitor analytics (traffic sources, conversion rates)
- [ ] Respond to all comments and questions
- [ ] Share positive feedback as social proof

**Expected:** 200-400 Product Hunt upvotes, top 5 of the day

---

### 3:00 PM PST (Afternoon)

**Sustain Momentum**

- [ ] Post behind-the-scenes story on Twitter
- [ ] Share customer testimonial (if any purchases yet)
- [ ] Post comparison graphic (Fabrk vs ShipFast vs Supastarter)
- [ ] Engage with other Product Hunt makers (support them too)
- [ ] Monitor Discord for questions
- [ ] Check Stripe dashboard for sales
- [ ] Respond to all support emails

**Expected:** 400-600 Product Hunt upvotes, top 3 of the day

---

### 6:00 PM PST (Evening)

**Final Push**

- [ ] Post final Twitter thread of the day
- [ ] Thank everyone for support
- [ ] Share milestone (if applicable): "We hit #1!" or "50 sales!"
- [ ] Post in Product Hunt discussions (not self-promotion, genuine help)
- [ ] Schedule recap tweet for tomorrow morning
- [ ] Respond to all remaining comments
- [ ] Monitor uptime and performance (traffic spike)

**Expected:** 600-1000 Product Hunt upvotes, hopefully top 3

---

### 11:59 PM PST (End of Day)

**Wrap-Up**

- [ ] Final check of Product Hunt comments (respond to any missed)
- [ ] Final check of support emails
- [ ] Post "Thank you" message on Product Hunt
- [ ] Tweet final results: "We hit #X on Product Hunt!"
- [ ] Analyze traffic (GA4/Plausible): sources, conversion rates
- [ ] Check Stripe dashboard: revenue, conversion rate
- [ ] Back up database
- [ ] Celebrate (you did it!)

**Expected:** 800-1500 Product Hunt upvotes, top 5 of the day

---

## Launch Day + 1-7

### Post-Launch Week

#### Day 1 (Day After Launch)
- [ ] Post recap tweet with results
- [ ] Share Product Hunt badge: "Product of the Day"
- [ ] Post long-form Twitter thread: "Lessons from launching"
- [ ] Respond to any missed comments/emails
- [ ] Write blog post: "We launched on Product Hunt"
- [ ] Update landing page with "Featured on Product Hunt" badge
- [ ] Thank all supporters publicly

#### Day 2-3
- [ ] Post on Reddit (r/startups, r/Entrepreneur)
- [ ] Post on Dev.to
- [ ] Post on Medium
- [ ] Share customer success stories
- [ ] Continue engaging with comments
- [ ] Monitor conversion rates (optimize if low)

#### Day 4-7
- [ ] Analyze week 1 metrics (traffic, conversions, revenue)
- [ ] Post weekly recap on Twitter
- [ ] Reach out to press/blogs (TechCrunch, Indie Hackers blog)
- [ ] Post "Week 1 results" on Twitter
- [ ] Start gathering customer feedback
- [ ] Begin building in public (share progress, learnings)

---

## Launch Day + 30

### 30-Day Retrospective

- [ ] Analyze 30-day metrics
  - Total revenue
  - Conversion rate
  - Traffic sources (which worked best)
  - Customer acquisition cost (CAC)
  - Customer lifetime value (LTV)

- [ ] Write 30-day retrospective blog post
- [ ] Share key learnings on Twitter
- [ ] Update marketing strategy based on data
- [ ] Iterate on product based on feedback
- [ ] Plan next marketing push (Twitter threads, guest posts)

---

## Emergency Playbook

### If Things Go Wrong

#### Site Goes Down
1. Check Vercel/hosting status page
2. Check error logs in Vercel dashboard
3. Roll back to previous deployment if needed
4. Post status update on Twitter
5. Email customers with ETA if affecting purchases

#### Stripe Issues
1. Check Stripe dashboard for errors
2. Verify webhook secret is correct (LIVE mode)
3. Check Stripe logs for failed requests
4. Email affected customers with manual payment link
5. Contact Stripe support (fast response)

#### No Traction on Product Hunt
1. Don't panic (many successful products start slow)
2. Engage more actively (reply to every comment)
3. Post on Twitter with PH link again
4. DM more friends/supporters
5. Focus on Reddit and HN instead

#### Negative Comments
1. Stay calm and professional
2. Acknowledge the feedback
3. Explain your reasoning (if valid concern)
4. Offer to improve based on feedback
5. Thank them for the input (genuine)
6. Don't argue or get defensive

#### Low Conversion Rate (<1%)
1. Check analytics: where are users dropping off?
2. Test checkout flow (might be broken)
3. A/B test pricing page (try different hero variation)
4. Add more social proof (testimonials, trust badges)
5. Simplify messaging (one clear CTA)

#### Support Overwhelm
1. Set up auto-responder with FAQ link
2. Create Discord channel for community support
3. Document common questions in FAQ
4. Prioritize paying customers first
5. Hire VA for support if needed (consider after $5k MRR)

---

## Launch Day Dos and Don'ts

### DO:
- ✅ Respond to every comment (within 1 hour)
- ✅ Be authentic and humble
- ✅ Thank everyone for support
- ✅ Share behind-the-scenes stories
- ✅ Engage with other makers on Product Hunt
- ✅ Monitor analytics and adapt in real-time
- ✅ Celebrate small wins
- ✅ Have fun (this is a big milestone!)

### DON'T:
- ❌ Ask for upvotes directly (against PH rules)
- ❌ Be salesy in comments (be helpful)
- ❌ Argue with negative feedback
- ❌ Ignore comments for hours
- ❌ Spam Reddit/HN (one post per community)
- ❌ Neglect support emails
- ❌ Forget to eat/sleep (take care of yourself)
- ❌ Compare yourself to others (focus on your own launch)

---

## Launch Day Checklist (Quick Reference)

**Morning of Launch:**
- [ ] Coffee/tea ready
- [ ] Phone charged and notifications on
- [ ] Laptop charged
- [ ] Product Hunt page live
- [ ] Twitter thread ready to post
- [ ] Support email open and monitored
- [ ] Stripe dashboard open
- [ ] Analytics dashboard open
- [ ] Discord server open
- [ ] All launch posts ready in notepad
- [ ] Mindset: excited, positive, ready to engage

**During Launch:**
- [ ] Respond to comments within 1 hour
- [ ] Post on social media every 3-4 hours
- [ ] Check analytics every 2 hours
- [ ] Monitor support email continuously
- [ ] Engage with community (reply, like, RT)
- [ ] Thank supporters publicly
- [ ] Share milestones ("We hit 100 upvotes!")

**End of Day:**
- [ ] Final comment responses
- [ ] Final support email check
- [ ] Thank you post on Product Hunt
- [ ] Recap tweet with results
- [ ] Analyze metrics
- [ ] Backup database
- [ ] Celebrate!

---

## Launch Week Content Calendar

### Monday (Launch Day)
- Product Hunt launch (12:01 AM PST)
- Twitter thread (6 AM PST)
- Reddit r/SideProject (6 AM PST)
- Hacker News (6 AM PST)
- LinkedIn post (9 AM PST)
- Discord/Slack shares (throughout day)

### Tuesday (Day +1)
- Recap tweet with results
- Blog post: "We launched on Product Hunt"
- Dev.to cross-post

### Wednesday (Day +2)
- Twitter thread: "Lessons learned from launch"
- Reddit r/webdev post
- Medium article

### Thursday (Day +3)
- Customer success story tweet
- Behind-the-scenes Twitter thread

### Friday (Day +4)
- Weekly recap tweet
- Instagram/LinkedIn carousel (optional)

### Weekend (Day +5-6)
- Rest and recharge
- Monitor support emails
- Engage with community

### Sunday (Day +7)
- Week 1 retrospective tweet
- Plan week 2 marketing

---

## Key Metrics to Track

**Launch Day:**
- Product Hunt upvotes (goal: 500+)
- Product Hunt ranking (goal: Top 5)
- Website traffic (goal: 5,000+ visitors)
- Email sign-ups (if applicable)
- Stripe sales (goal: 10-20 sales on day 1)
- Conversion rate (goal: 1-3%)

**Launch Week:**
- Total revenue (goal: $1,000-$5,000)
- Total traffic (goal: 20,000+ visitors)
- Conversion rate (goal: 1-3%)
- Email subscribers (goal: 500+)
- Twitter followers gained (goal: 100-500)
- Discord members (goal: 50-200)

**Launch Month:**
- MRR (if subscriptions)
- Total revenue (goal: $5,000-$20,000)
- Customer acquisition cost (CAC)
- Customer lifetime value (LTV)
- Churn rate (if subscriptions)
- Support ticket volume and resolution time

---

## Tools for Launch Day

**Must-Have:**
- Product Hunt account
- Twitter account
- Stripe dashboard (live mode)
- Vercel/hosting dashboard
- Analytics dashboard (Plausible/GA4)
- Support email

**Nice-to-Have:**
- Discord server
- Typefully (schedule tweets)
- Buffer/Hootsuite (schedule posts)
- Notion/Airtable (track comments)
- UptimeRobot (uptime monitoring)
- Better Uptime (status page)

---

## Final Thoughts

**Launch day is just the beginning.** The real work starts after launch:

1. **Week 1:** Respond to feedback, fix bugs, engage with early users
2. **Month 1:** Iterate on product based on feedback
3. **Month 2-3:** Build distribution channels (SEO, content marketing, partnerships)
4. **Month 4+:** Scale marketing, optimize conversion, grow MRR

**Success is not about going viral on Product Hunt.** Success is building a sustainable business with happy customers who love your product.

**You've got this. Ship it. 🚀**

---

**Questions? Join the Fabrk Discord or email support@fabrk.dev.**
