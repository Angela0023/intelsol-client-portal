# Mobile Design Guide - Intelsol Client Portal

> **Critical Rules for Mobile-First Design**
> This guide documents all mobile design patterns, responsive breakpoints, and hard-won lessons from building the Intelsol Client Portal.

---

## 🎯 Core Principles

### 1. NO Horizontal Scrolling
**Rule:** Everything must fit on screen without left/right scrolling.

**How to Achieve:**
- Use responsive padding: `px-3 lg:px-6` (not fixed `px-6`)
- Use responsive text sizes: `text-xs lg:text-sm`
- Replace tables with cards on mobile
- Test on 375px width (iPhone SE minimum)

### 2. Breakpoints
We use Tailwind's `lg` breakpoint (1024px) as the primary mobile/desktop split:

```
Mobile:   < 1024px (no prefix)
Desktop:  >= 1024px (lg: prefix)
```

**Why lg instead of md?**
- iPads in portrait (768px) should see mobile layout
- Ensures comfortable touch targets
- Prevents cramped layouts on tablets

### 3. Content-First Layout
Mobile shows most important info first:
- Summary cards stack vertically
- Tables become cards
- Long text truncates or wraps
- Less padding, more content

---

## 📐 Component Patterns

### Headers (Page Title Section)

```tsx
// ❌ WRONG - Fixed sizes cause overflow
<div className="flex items-center space-x-3">
  <div className="w-12 h-12">...</div>
  <h1 className="text-3xl">TS Lab</h1>
  <p className="text-base">Food Supplement Capsule Manufacturing (Slovenia)</p>
</div>

// ✅ CORRECT - Responsive sizes with proper wrapping
<div className="flex items-center space-x-2 lg:space-x-3">
  <div className="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0">...</div>
  <div className="flex-1 min-w-0">
    <h1 className="text-xl lg:text-3xl">TS Lab</h1>
    <p className="text-sm lg:text-base break-words">Food Supplement Capsule Manufacturing (Slovenia)</p>
  </div>
</div>
```

**Key Classes:**
- `flex-shrink-0` - Prevents logo from shrinking
- `flex-1 min-w-0` - Allows text container to shrink properly
- `break-words` - Wraps long text instead of overflow

### Tabs Navigation

```tsx
// Mobile: Icon-only tabs to save space
<div className="border-b border-slate-200 mb-6 -mx-4 px-4 lg:mx-0 lg:px-0">
  <div className="flex space-x-1 overflow-x-auto scrollbar-hide pb-px">
    {tabs.map((tab) => (
      <button className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-2 lg:py-3 flex-shrink-0">
        <tab.icon className="w-4 h-4" />
        <span className="hidden sm:inline">{tab.label}</span>
      </button>
    ))}
  </div>
</div>
```

**Key Patterns:**
- `-mx-4 px-4` - Extends tabs to screen edges on mobile
- `overflow-x-auto` - Allows horizontal scroll for many tabs
- `hidden sm:inline` - Hides text on small screens (< 640px)
- `flex-shrink-0` - Prevents tabs from getting squished

### Summary Cards

```tsx
// Mobile-optimized stat cards
<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-3 lg:p-6">
    <p className="text-xs lg:text-sm font-medium mb-1">Total Leads</p>
    <p className="text-xl lg:text-4xl font-bold">3,021</p>
  </div>
</div>
```

**Guidelines:**
- Mobile: Single column (`grid-cols-1`)
- Smaller padding: `p-3` vs `p-6`
- Smaller text: `text-xl` vs `text-4xl`
- Short labels: "Total Leads" not "Total Leads Added"

### Tables → Cards Pattern

**❌ NEVER use tables on mobile** - They always overflow

**✅ Use card layout instead:**

```tsx
{/* Mobile: Card Layout */}
<div className="lg:hidden space-y-3">
  {items.map((item) => (
    <div key={item.id} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
      {/* Show all info vertically in card */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0 mr-2">
          <p className="text-xs text-slate-500 mb-0.5">Label</p>
          <p className="text-sm font-medium break-words">{item.name}</p>
        </div>
        <span className="flex-shrink-0">{item.badge}</span>
      </div>
      <div className="text-xs text-slate-600">
        {item.additionalInfo}
      </div>
    </div>
  ))}
</div>

{/* Desktop: Table Layout */}
<div className="hidden lg:block">
  <table className="min-w-full">
    {/* Traditional table */}
  </table>
</div>
```

**Why Cards Work:**
- No horizontal scroll
- All info visible
- Touch-friendly
- Natural vertical flow

### ContentSection Wrapper

```tsx
// Mobile-optimized section wrapper
export function ContentSection({ title, children, icon }: Props) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 px-3 py-4 lg:p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-3 lg:mb-4">
        {icon && <div className="text-[#1a2647]">{icon}</div>}
        <h3 className="text-base lg:text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="text-slate-700">{children}</div>
    </div>
  );
}
```

**Mobile Padding:**
- Horizontal: `px-3` (12px) - Minimal side padding
- Vertical: `py-4` (16px) - Comfortable top/bottom
- Desktop: `p-6` (24px) - Spacious all around

---

## 🎨 Spacing Scale

### Padding Guidelines

| Element | Mobile | Desktop | Reason |
|---------|--------|---------|--------|
| Page container | `p-4` | `p-8` | Main content area |
| ContentSection | `px-3 py-4` | `p-6` | Section cards |
| Cards (stat/info) | `p-3` | `p-6` | Summary cards |
| Table cells | `px-2 py-2` | `px-4 py-3` | Dense info display |

### Text Size Guidelines

| Element | Mobile | Desktop | Notes |
|---------|--------|---------|-------|
| Page title | `text-xl` | `text-3xl` | Main heading |
| Section title | `text-base` | `text-lg` | ContentSection |
| Large numbers | `text-xl` | `text-4xl` | Stat displays |
| Body text | `text-sm` | `text-base` | Descriptions |
| Labels | `text-xs` | `text-sm` | Field labels |
| Table text | `text-xs` | `text-sm` | Dense data |

---

## 🔧 Common Mobile Issues & Solutions

### Issue 1: Content Cut Off on Sides

**Symptom:** Empty white space on sides, content doesn't fit

**Cause:** Fixed padding + wide content

**Solution:**
```tsx
// Reduce mobile padding
className="px-3 lg:px-6"  // Not px-6
className="p-4 lg:p-8"    // Not p-8
```

### Issue 2: Table Requires Horizontal Scroll

**Symptom:** User must scroll left/right to see table columns

**Cause:** Tables don't collapse on mobile

**Solution:** Use separate mobile card layout
```tsx
<div className="lg:hidden">{/* Cards */}</div>
<div className="hidden lg:block">{/* Table */}</div>
```

### Issue 3: Text Overflow

**Symptom:** Long text gets cut off with "..."

**Cause:** Missing text wrapping classes

**Solution:**
```tsx
// Add these classes
className="break-words"     // Wrap long words
className="whitespace-normal" // Allow wrapping
className="min-w-0"         // Allow flex items to shrink
```

### Issue 4: Elements Squished Together

**Symptom:** Content looks cramped, overlapping

**Cause:** Fixed widths or missing flex-shrink control

**Solution:**
```tsx
className="flex-shrink-0"  // For icons/badges that shouldn't shrink
className="flex-1 min-w-0" // For text that should shrink
className="mr-2"           // Add small margin between elements
```

### Issue 5: Empty Space / Wide Content

**Symptom:** Content wider than screen, requires horizontal scroll

**Cause:** Hardcoded spacing or padding

**Solution:**
```tsx
// Use responsive spacing
className="space-x-2 lg:space-x-3"  // Not space-x-3
className="gap-3 lg:gap-4"          // Not gap-4
```

---

## 📱 Sidebar / Navigation

### Mobile Menu Pattern

```tsx
// State
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// Backdrop (closes menu when clicked)
{mobileMenuOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
    onClick={() => setMobileMenuOpen(false)}
  />
)}

// Sidebar (slides in from left)
<div className={`
  fixed lg:relative inset-y-0 left-0 z-50 lg:z-0
  transform transition-transform duration-300 ease-in-out lg:transform-none
  ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
`}>
  <Sidebar clientAccess={clientAccess} />
</div>

// Hamburger button (mobile only)
<button
  onClick={() => setMobileMenuOpen(true)}
  className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
>
  <Menu className="w-5 h-5" />
</button>
```

**Key Points:**
- Sidebar hidden by default on mobile
- Hamburger menu (☰) in top-left on mobile
- Sidebar overlays content when open
- Dark backdrop closes sidebar
- Desktop: sidebar always visible

---

## 🔗 URL Routing (Static Export)

### Pattern for Client-Side Routing

```tsx
// Read URL on mount and handle browser back/forward
useEffect(() => {
  const path = window.location.pathname;
  const tabFromPath = path.split('/').pop();
  const validTab = tabs.find(t => t.id === tabFromPath);
  if (validTab) setActiveTab(validTab.id);

  const handlePopState = () => {
    const path = window.location.pathname;
    const tabFromPath = path.split('/').pop();
    const validTab = tabs.find(t => t.id === tabFromPath);
    if (validTab) setActiveTab(validTab.id);
    else setActiveTab('overview');
  };

  window.addEventListener('popstate', handlePopState);
  return () => window.removeEventListener('popstate', handlePopState);
}, []);

// Update URL when tab changes
const handleTabChange = (tabId: string) => {
  setActiveTab(tabId);
  const newPath = tabId === 'overview' ? '/tslab' : `/tslab/${tabId}`;
  window.history.pushState({}, '', newPath);
};
```

### Cloudflare Pages Redirects

**File:** `public/_redirects`

```
# SPA routing for static site
/tslab/* /tslab 200
/intelsol/* /intelsol 200
/xpose/* /xpose 200
/beeit/* /beeit 200
/wulf/* /wulf 200
/peoplefocus/* /peoplefocus 200
```

**Why Needed:**
- Static sites can't handle `/tslab/campaigns` directly
- Cloudflare serves `/tslab` HTML but keeps URL as `/tslab/campaigns`
- React reads pathname and shows correct tab

### Preserve Deep Links After Login

```tsx
// In ClientLayout - Store URL before redirect
if (!access) {
  sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
  router.push('/');
  return;
}

// In login page - Redirect back after successful login
const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
if (redirectUrl && redirectUrl !== '/') {
  sessionStorage.removeItem('redirectAfterLogin');
  router.push(redirectUrl);
} else {
  // Default redirect logic
}
```

---

## ✅ Mobile Testing Checklist

Before pushing any changes, test on mobile:

### Visual Test
- [ ] No horizontal scrolling needed
- [ ] All text readable (not too small)
- [ ] No text cut off or overflow
- [ ] No empty white space on sides
- [ ] Cards/sections have appropriate padding
- [ ] Touch targets are large enough (min 44px)

### Functional Test
- [ ] Hamburger menu opens sidebar
- [ ] Tap backdrop to close sidebar
- [ ] All tabs clickable and work
- [ ] All links clickable (min 44x44px)
- [ ] Forms/inputs work on touch
- [ ] Deep links work (share `/tslab/campaigns`)
- [ ] Login redirect preserves deep link

### Browser Test
- [ ] Safari iOS
- [ ] Chrome Android
- [ ] Test on 375px width (iPhone SE minimum)
- [ ] Test in browser dev tools mobile view

### Performance Test
- [ ] Page loads under 3 seconds on 3G
- [ ] No layout shift on load
- [ ] Smooth scrolling
- [ ] Smooth transitions (sidebar slide-in)

---

## 🚫 Common Mistakes to Avoid

### 1. Fixed Padding/Spacing
```tsx
// ❌ DON'T
<div className="p-6">
<div className="space-x-3">
<div className="gap-4">

// ✅ DO
<div className="p-4 lg:p-6">
<div className="space-x-2 lg:space-x-3">
<div className="gap-3 lg:gap-4">
```

### 2. Fixed Text Sizes
```tsx
// ❌ DON'T
<h1 className="text-3xl">
<p className="text-sm">

// ✅ DO
<h1 className="text-xl lg:text-3xl">
<p className="text-xs lg:text-sm">
```

### 3. Tables on Mobile
```tsx
// ❌ DON'T - Tables always overflow
<table className="w-full">...</table>

// ✅ DO - Separate layouts
<div className="lg:hidden">{/* Cards */}</div>
<div className="hidden lg:block"><table>...</table></div>
```

### 4. Forgetting Flex Shrink Control
```tsx
// ❌ DON'T - Icons get squished
<div className="flex">
  <Logo />
  <Text />
</div>

// ✅ DO - Control what shrinks
<div className="flex">
  <Logo className="flex-shrink-0" />
  <Text className="flex-1 min-w-0" />
</div>
```

### 5. Long Unbreakable Text
```tsx
// ❌ DON'T
<p>Food Supplement Capsule Manufacturing (Slovenia)</p>

// ✅ DO
<p className="break-words">Food Supplement Capsule Manufacturing (Slovenia)</p>
```

---

## 📝 File Structure Checklist

When adding a new client page:

```tsx
// 1. Import responsive utilities
import { useState, useEffect } from 'react';

// 2. Add URL routing
const handleTabChange = (tabId: string) => {
  setActiveTab(tabId);
  const newPath = tabId === 'overview' ? '/client' : `/client/${tabId}`;
  window.history.pushState({}, '', newPath);
};

// 3. Use responsive padding
<div className="p-4 lg:p-8">

// 4. Make header responsive
<h1 className="text-xl lg:text-3xl">

// 5. Tabs with icon-only mobile
<span className="hidden sm:inline">{tab.label}</span>

// 6. Use ContentSection wrapper
<ContentSection title="..." icon={...}>

// 7. Mobile cards, desktop table
<div className="lg:hidden">{/* Cards */}</div>
<div className="hidden lg:block">{/* Table */}</div>
```

---

## 🎯 Quick Reference

### Most Used Responsive Patterns

```tsx
// Padding
className="p-4 lg:p-8"           // Page
className="px-3 py-4 lg:p-6"     // Sections
className="p-3 lg:p-6"           // Cards

// Text
className="text-xl lg:text-3xl"  // Titles
className="text-sm lg:text-base" // Body
className="text-xs lg:text-sm"   // Labels

// Spacing
className="space-x-2 lg:space-x-3"
className="gap-3 lg:gap-4"
className="mb-3 lg:mb-4"

// Visibility
className="hidden lg:block"      // Desktop only
className="lg:hidden"            // Mobile only
className="hidden sm:inline"     // Hide on small mobile

// Layout
className="grid-cols-1 md:grid-cols-3"
className="flex-col lg:flex-row"

// Flex Control
className="flex-shrink-0"        // Don't shrink (icons)
className="flex-1 min-w-0"       // Shrink properly (text)
className="break-words"          // Wrap long text
```

---

## 📚 Resources

- **Tailwind Breakpoints:** https://tailwindcss.com/docs/responsive-design
- **Mobile Testing:** Chrome DevTools → Toggle Device Toolbar (Cmd+Shift+M)
- **Touch Targets:** Minimum 44x44px (Apple HIG)
- **Viewport Sizes:** 375px (iPhone SE), 768px (iPad), 1024px (Desktop)

---

## 🔄 Maintenance

This guide should be updated when:
- [ ] New mobile patterns are discovered
- [ ] New responsive breakpoints are needed
- [ ] Common mobile bugs are fixed
- [ ] New components are added

**Last Updated:** July 28, 2026

---

**Remember:** Mobile-first design isn't just about shrinking things - it's about rethinking the entire layout for touch, vertical scrolling, and limited screen space. Always test on real devices!
