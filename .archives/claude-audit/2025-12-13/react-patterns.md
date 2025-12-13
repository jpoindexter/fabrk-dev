# React Patterns Audit

Best practices and anti-patterns for React 19 applications.

---

## Quick Reference

| Check | Severity | Pattern |
|-------|----------|---------|
| useEffect without cleanup | HIGH | Event listeners, subscriptions not cleaned |
| Missing dependency array | CRITICAL | Infinite loops, stale closures |
| Inline handlers in loops | MEDIUM | Re-renders, performance issues |
| Missing key prop | HIGH | Rendering bugs, state issues |
| Props drilling (3+ levels) | MEDIUM | Should use Context or state management |

---

## useEffect Patterns

### Always Clean Up Side Effects

```typescript
// ✅ CORRECT - With cleanup
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

// ✅ CORRECT - AbortController for fetch
useEffect(() => {
  const controller = new AbortController();

  fetch("/api/data", { signal: controller.signal })
    .then((res) => res.json())
    .then(setData)
    .catch((err) => {
      if (err.name !== "AbortError") {
        setError(err);
      }
    });

  return () => controller.abort();
}, []);

// ❌ WRONG - No cleanup
useEffect(() => {
  window.addEventListener("resize", handleResize);
}, []);

// ❌ WRONG - No abort on unmount
useEffect(() => {
  fetch("/api/data").then(setData);
}, []);
```

### Dependency Arrays

```typescript
// ✅ CORRECT - All dependencies listed
useEffect(() => {
  fetchUser(userId);
}, [userId]);

// ❌ WRONG - Missing dependency (stale closure)
useEffect(() => {
  fetchUser(userId); // userId not in deps
}, []);

// ❌ WRONG - Empty deps with external references
const [count, setCount] = useState(0);
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1); // count is stale!
  }, 1000);
  return () => clearInterval(id);
}, []); // Should use setCount(c => c + 1)
```

---

## useCallback & useMemo

### When to Use useCallback

```typescript
// ✅ CORRECT - Handler passed to memoized child
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

<MemoizedButton onClick={handleClick} />

// ✅ CORRECT - Handler in dependency array
const fetchData = useCallback(async () => {
  const data = await api.get(endpoint);
  setData(data);
}, [endpoint]);

useEffect(() => {
  fetchData();
}, [fetchData]);

// ❌ WRONG - Inline handler to memoized component
<MemoizedButton onClick={() => doSomething(id)} /> // Breaks memo

// ⚠️ UNNECESSARY - Simple handler, no memo child
const handleClick = useCallback(() => {
  setOpen(true);
}, []); // Overkill for simple state toggle
```

### When to Use useMemo

```typescript
// ✅ CORRECT - Expensive computation
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

// ✅ CORRECT - Object passed to memoized child
const style = useMemo(() => ({
  backgroundColor: theme.primary,
  color: theme.text,
}), [theme]);

// ❌ WRONG - Simple value
const doubled = useMemo(() => count * 2, [count]); // Overkill

// ❌ WRONG - Non-deterministic
const id = useMemo(() => Math.random(), []); // Use useId() or useRef
```

---

## List Rendering

### Keys Must Be Stable and Unique

```typescript
// ✅ CORRECT - Unique, stable ID
{items.map((item) => (
  <ListItem key={item.id} data={item} />
))}

// ✅ CORRECT - Compound key when no ID
{items.map((item, index) => (
  <ListItem key={`${item.category}-${item.name}`} data={item} />
))}

// ❌ WRONG - Index as key (breaks on reorder)
{items.map((item, index) => (
  <ListItem key={index} data={item} />
))}

// ❌ WRONG - Random key (remounts every render)
{items.map((item) => (
  <ListItem key={Math.random()} data={item} />
))}

// ❌ WRONG - Missing key
{items.map((item) => (
  <ListItem data={item} />
))}
```

---

## State Management

### Avoid Props Drilling

```typescript
// ❌ WRONG - Props drilling 3+ levels
function App() {
  const [user, setUser] = useState(null);
  return <Layout user={user} setUser={setUser} />;
}

function Layout({ user, setUser }) {
  return <Sidebar user={user} setUser={setUser} />;
}

function Sidebar({ user, setUser }) {
  return <UserMenu user={user} setUser={setUser} />; // 3 levels!
}

// ✅ CORRECT - Use Context
const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout />
    </UserContext.Provider>
  );
}

function UserMenu() {
  const { user, setUser } = useContext(UserContext);
  // Direct access, no drilling
}
```

### Derived State

```typescript
// ❌ WRONG - Redundant state
const [items, setItems] = useState([]);
const [filteredItems, setFilteredItems] = useState([]);

useEffect(() => {
  setFilteredItems(items.filter(i => i.active));
}, [items]);

// ✅ CORRECT - Derive on render
const [items, setItems] = useState([]);
const filteredItems = items.filter(i => i.active);

// ✅ CORRECT - Memoize if expensive
const filteredItems = useMemo(
  () => items.filter(i => i.active),
  [items]
);
```

---

## Event Handlers

### Avoid Creating Functions in Loops

```typescript
// ❌ WRONG - New function every render, every item
{items.map((item) => (
  <button onClick={() => handleDelete(item.id)}>
    Delete
  </button>
))}

// ✅ CORRECT - Use data attribute
const handleDelete = (e) => {
  const id = e.currentTarget.dataset.id;
  deleteItem(id);
};

{items.map((item) => (
  <button data-id={item.id} onClick={handleDelete}>
    Delete
  </button>
))}

// ✅ CORRECT - Extract to component
function DeleteButton({ id, onDelete }) {
  const handleClick = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  return <button onClick={handleClick}>Delete</button>;
}
```

---

## Detection Patterns

```bash
# useEffect without cleanup (potential memory leak)
grep -rE "useEffect\(\(\)\s*=>\s*\{" src --include="*.tsx" | grep -v "return"

# Missing dependency array (potential infinite loop)
grep -rE "useEffect\(\(\)\s*=>\s*\{[^}]+\}\s*\)" src --include="*.tsx"

# Inline handlers (potential performance issue)
grep -rE "onClick=\{\(\)\s*=>" src --include="*.tsx"

# Index as key (potential rendering bug)
grep -rE "key=\{(index|i|idx)\}" src --include="*.tsx"

# Missing key prop
grep -rE "\.map\([^)]+\)\s*=>\s*<" src --include="*.tsx" | grep -v "key="
```

---

## Checklist

### Every Component Should:

- [ ] Have cleanup in useEffect for event listeners
- [ ] Have cleanup in useEffect for subscriptions
- [ ] Have cleanup in useEffect for timers
- [ ] Have abort controller for fetch in useEffect
- [ ] List all dependencies in useEffect
- [ ] Use useCallback for handlers passed to memoized children
- [ ] Use useMemo for expensive computations
- [ ] Have stable, unique keys in lists
- [ ] Avoid props drilling (max 2 levels)
- [ ] Derive state when possible instead of syncing

---

## Common Issues

| Issue | Impact | Fix |
|-------|--------|-----|
| No cleanup | Memory leak | Add return function |
| Missing deps | Stale data, bugs | Add all dependencies |
| Index as key | State bugs on reorder | Use stable ID |
| Inline handlers | Re-renders | useCallback or data-id |
| Props drilling | Hard to maintain | Use Context |
| Derived state sync | Bugs, complexity | Compute on render |
