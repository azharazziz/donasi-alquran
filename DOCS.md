# 📚 Documentation Index

Welcome to the **Donasi Al-Qur'an** transparency platform! This guide will help you navigate all the documentation.

## 🚀 Start Here

### 1. **[QUICKSTART.md](QUICKSTART.md)** ⭐ (5-10 minutes)
   - **Best for**: Getting up and running immediately
   - **What you'll learn**:
     - Create your Google Sheet
     - Configure the project
     - Run locally
     - Deploy to production
   - **Start if**: You want to see the app working today

### 2. **[README.md](README.md)** (10-15 minutes)
   - **Best for**: Understanding the project
   - **What you'll learn**:
     - Core features overview
     - Tech stack explanation
     - Installation steps
     - Data structure requirements
     - Feature configuration
   - **Start if**: You want a comprehensive overview

---

## 📖 Detailed Guides

### 3. **[CONFIG.md](CONFIG.md)** (5 minutes)
   - **Best for**: Configuration and customization
   - **What you'll learn**:
     - How to set environment variables
     - Column detection system
     - Feature flags
     - Advanced configuration options
   - **Read if**: You want to customize the app

### 4. **[DEPLOYMENT.md](DEPLOYMENT.md)** (10 minutes)
   - **Best for**: Deploying to production
   - **What you'll learn**:
     - Multiple deployment options (Vercel, Netlify, etc.)
     - Step-by-step deployment instructions
     - Post-deployment configuration
     - Troubleshooting
     - Cost analysis
   - **Read if**: You're ready to go live

### 5. **[ARCHITECTURE.md](ARCHITECTURE.md)** (15 minutes)
   - **Best for**: Understanding the internals
   - **What you'll learn**:
     - System architecture diagrams
     - Data flow
     - Component lifecycle
     - Performance optimization
     - Scaling considerations
   - **Read if**: You want to modify the code

---

## 💡 Examples & Reference

### 6. **[EXAMPLE_SHEET.md](EXAMPLE_SHEET.md)** (5 minutes)
   - **Best for**: Understanding data structure
   - **What you'll learn**:
     - Example Google Sheet formats
     - Column naming conventions
     - Semantic detection examples
     - Features enabled by different schemas
   - **Read if**: You're unsure how to structure your data

### 7. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** (10 minutes)
   - **Best for**: Project overview and checklist
   - **What you'll learn**:
     - What was built and why
     - Project structure overview
     - Key features implemented
     - Performance metrics
     - Monitoring and maintenance
   - **Read if**: You want the big picture

---

## 📁 In-Code Documentation

### Utility Functions (`lib/`)

- **[lib/types.ts](lib/types.ts)**
  - TypeScript interface definitions
  - Understanding the data structures

- **[lib/config.ts](lib/config.ts)**
  - Configuration object
  - Feature flags
  - Column overrides

- **[lib/sheetFetcher.ts](lib/sheetFetcher.ts)**
  - How to fetch from Google Sheets
  - CSV fallback option

- **[lib/columnDetection.ts](lib/columnDetection.ts)**
  - Semantic column detection algorithm
  - Keyword scoring system

- **[lib/summaryCalculator.ts](lib/summaryCalculator.ts)**
  - Summary calculation logic
  - Auto-sum implementation

- **[lib/formatter.ts](lib/formatter.ts)**
  - Value formatting functions
  - Currency, date, number formatting

### Components (`components/`)

- **[components/ErrorBoundary.tsx](components/ErrorBoundary.tsx)**
  - Error handling component
  - Crash prevention

- **[components/SummaryCard.tsx](components/SummaryCard.tsx)**
  - Summary card component
  - Props and variants

- **[components/DataTable.tsx](components/DataTable.tsx)**
  - Dynamic table component
  - Auto-formatting

- **[components/DynamicChart.tsx](components/DynamicChart.tsx)**
  - Auto-generated chart component
  - Chart type detection

### Pages (`app/`)

- **[app/page.tsx](app/page.tsx)**
  - Landing page
  - Islamic design implementation

- **[app/dashboard/page.tsx](app/dashboard/page.tsx)**
  - Dashboard server component
  - Data fetching

- **[app/dashboard/DashboardClient.tsx](app/dashboard/DashboardClient.tsx)**
  - Dashboard client component
  - Interactivity and filtering

---

## 🎯 Quick Navigation by Use Case

### I want to...

#### Deploy immediately
→ Start with [QUICKSTART.md](QUICKSTART.md)

#### Understand how it works
→ Read [README.md](README.md) then [ARCHITECTURE.md](ARCHITECTURE.md)

#### Customize colors/branding
→ Check [CONFIG.md](CONFIG.md)

#### Prepare my data
→ Review [EXAMPLE_SHEET.md](EXAMPLE_SHEET.md)

#### Deploy to production
→ Follow [DEPLOYMENT.md](DEPLOYMENT.md)

#### Modify the code
→ Study [ARCHITECTURE.md](ARCHITECTURE.md) first, then code

#### Troubleshoot an issue
→ Check section in [README.md](README.md) or [CONFIG.md](CONFIG.md)

#### Understand performance
→ Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) → Performance Metrics

#### Add new features
→ Study [ARCHITECTURE.md](ARCHITECTURE.md) → Code structure

---

## 📊 File Organization

```
Beginner Level:
├── QUICKSTART.md           ← Start here!
├── EXAMPLE_SHEET.md        ← See examples
└── README.md               ← Full overview

Intermediate Level:
├── CONFIG.md               ← Configure
├── DEPLOYMENT.md           ← Deploy
└── PROJECT_SUMMARY.md      ← Understand fully

Advanced Level:
├── ARCHITECTURE.md         ← Deep dive
└── lib/ & components/      ← Study code
```

---

## 🔄 Recommended Reading Order

### For First-Time Setup (15 minutes)
1. QUICKSTART.md
2. EXAMPLE_SHEET.md
3. Back to QUICKSTART.md to configure

### For Complete Understanding (45 minutes)
1. README.md
2. EXAMPLE_SHEET.md
3. CONFIG.md
4. PROJECT_SUMMARY.md
5. DEPLOYMENT.md

### For Deep Technical Understanding (90 minutes)
1. README.md
2. ARCHITECTURE.md (full read with diagrams)
3. Skim through `lib/` files
4. Skim through `components/` files
5. CONFIG.md for options
6. DEPLOYMENT.md for production

---

## ❓ FAQ Section Location

| Question | Answer Location |
|----------|-----------------|
| How do I get started? | QUICKSTART.md |
| What's included? | README.md |
| How do I structure data? | EXAMPLE_SHEET.md |
| How do I change colors? | CONFIG.md |
| How do I deploy? | DEPLOYMENT.md |
| How does it work internally? | ARCHITECTURE.md |
| What's the tech stack? | README.md or PROJECT_SUMMARY.md |
| How do I customize the name? | CONFIG.md |
| What features are available? | README.md |
| How do I troubleshoot? | README.md, CONFIG.md, or DEPLOYMENT.md |

---

## 🎓 Learning Resources

### External Resources
- **Next.js Docs**: https://nextjs.org/docs
- **React Documentation**: https://react.dev
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Recharts API**: https://recharts.org/api

### Google Sheets
- **How to find Sheet ID**: [QUICKSTART.md](QUICKSTART.md) → Step 1
- **How to share publicly**: [QUICKSTART.md](QUICKSTART.md) → Step 1
- **Data format guide**: [EXAMPLE_SHEET.md](EXAMPLE_SHEET.md)

### Deployment Platforms
- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com/
- **GitHub Pages**: https://pages.github.com/

---

## 🚨 Troubleshooting

### Can't find the answer?
1. Check [README.md](README.md) FAQ section
2. Check [CONFIG.md](CONFIG.md) Troubleshooting section
3. Check [DEPLOYMENT.md](DEPLOYMENT.md) Troubleshooting section
4. Check the specific file for your component

### Common Issues
- **"Sheet kosong atau belum dapat diakses"** → [QUICKSTART.md](QUICKSTART.md) → Step 1
- **"Numbers not formatted as currency"** → [CONFIG.md](CONFIG.md) → Column Detection
- **"Charts not showing"** → [EXAMPLE_SHEET.md](EXAMPLE_SHEET.md) → Data Structure
- **"Deployment fails"** → [DEPLOYMENT.md](DEPLOYMENT.md) → Troubleshooting
- **"Build errors"** → [README.md](README.md) → Setup section

---

## ✅ Completion Checklist

### Before Deploying
- [ ] Read QUICKSTART.md
- [ ] Created Google Sheet with test data
- [ ] Configured .env.local
- [ ] Tested locally: `npm run dev`
- [ ] Customized organization info (optional)
- [ ] Reviewed EXAMPLE_SHEET.md

### Before Going Live
- [ ] Followed DEPLOYMENT.md
- [ ] Configured environment variables on deployment platform
- [ ] Tested on live domain
- [ ] Verified data loads correctly
- [ ] Checked mobile responsiveness
- [ ] Shared link with team

### After Going Live
- [ ] Monitor deployment logs
- [ ] Verify charts render correctly
- [ ] Check performance metrics
- [ ] Gather team feedback
- [ ] Plan improvements

---

## 📞 Support

### Getting Help
1. Check this index for relevant docs
2. Search the relevant document
3. Review code comments in `lib/` and `components/`
4. Check GitHub issues (if applicable)
5. Review deployment platform support

### Common Commands
```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Check code quality
npm run type-check       # Check TypeScript

# Maintenance
npm update               # Update dependencies
npm audit                # Check security
npm audit fix            # Fix security issues
npm install              # Install all dependencies
```

---

## 🎉 You're Ready!

Pick your starting point above and begin. Most users should start with **[QUICKSTART.md](QUICKSTART.md)**.

---

## 📋 Document Overview

| Document | Time | Level | Purpose |
|----------|------|-------|---------|
| QUICKSTART.md | 10 min | Beginner | Get running fast |
| README.md | 15 min | Beginner | Full introduction |
| EXAMPLE_SHEET.md | 5 min | Beginner | Data examples |
| CONFIG.md | 5 min | Intermediate | Customization |
| DEPLOYMENT.md | 10 min | Intermediate | Going live |
| PROJECT_SUMMARY.md | 10 min | Intermediate | Overview |
| ARCHITECTURE.md | 15 min | Advanced | Technical deep dive |

---

**Happy building!** 🚀

*Last updated: January 4, 2026*
