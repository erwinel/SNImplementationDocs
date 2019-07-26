
namespace UriHelper
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Threading;

    public class UriQueryParameter : IEquatable<UriQueryParameter>
    {
        private object _syncRoot = new object();
        private string _key;
        private string _value;
        private UriQueryParameter _previousElement = null;
        private UriQueryParameter _nextElement = null;
        private UriQueryParameter _previousValue = null;
        private UriQueryParameter _nextValue = null;
        private Collection.KeyGroup _group = null;

        public string Key
        {
            get { return Collection.KeyGroup.GetKey(this); }
            set { Collection.KeyGroup.SetKey(this, value); }
        }

        public string Value
        {
            get { return _value; }
            set { Collection.KeyGroup.SetValue(this, value); }
        }

        public UriQueryParameter(string key, string value)
        {
            if (key == null)
                throw new ArgumentNullException("key");
            _key = key;
            _value = value;
        }

        public UriQueryParameter() : this("", null) { }

        public bool Equals(UriQueryParameter other)
        {
            if (other == null)
                return false;
            if (ReferenceEquals(this, other))
                return true;
            Monitor.Enter(_syncRoot);
            try { return Key == other.Key && (other._value == null) ? _value == null : _value != null && _value == other._value; }
            finally { Monitor.Exit(_syncRoot); }
        }

        public override bool Equals(object obj) { return obj != null && obj is UriQueryParameter && Equals((UriQueryParameter)obj); }

        public override int GetHashCode() { return ToString().GetHashCode(); }

        public override string ToString()
        {
            Monitor.Enter(_syncRoot);
            try { return (_value == null) ? Uri.EscapeDataString(Key) : Uri.EscapeDataString(Key) + "&" + Uri.EscapeDataString(_value); }
            finally { Monitor.Exit(_syncRoot); }
        }

        private void InvokeSync(Action action, Action<Exception> onFinally = null, Action onSuccess = null)
        {
            bool isUnlocked = false;
            Monitor.Enter(_syncRoot);
            try
            {
                action();
                Monitor.Exit(_syncRoot);
                isUnlocked = true;
                if (onFinally != null)
                {
                    Action<Exception> f = onFinally;
                    onFinally = null;
                    if (onSuccess != null)
                        try { onSuccess(); }
                        finally { f(null); }
                    else
                        f(null);
                }
                else if (onSuccess != null)
                    onSuccess();
            }
            catch (Exception exc)
            {
                if (!isUnlocked)
                {
                    Monitor.Exit(_syncRoot);
                    if (onFinally != null)
                        onFinally(exc);
                }
                throw;
            }
        }

        private T GetSync<T>(Func<T> func, Action<Exception> onFinally = null, Action<T> onSuccess = null)
        {
            bool isUnlocked = false;
            Monitor.Enter(_syncRoot);
            try
            {
                T result = func();
                Monitor.Exit(_syncRoot);
                isUnlocked = true;
                if (onFinally != null)
                {
                    Action<Exception> f = onFinally;
                    onFinally = null;
                    if (onSuccess != null)
                        try { onSuccess(result); }
                        finally { f(null); }
                    else
                        f(null);
                }
                else if (onSuccess != null)
                    onSuccess(result);
                return result;
            }
            catch (Exception exc)
            {
                if (!isUnlocked)
                {
                    Monitor.Exit(_syncRoot);
                    if (onFinally != null)
                        onFinally(exc);
                }
                throw;
            }
        }

        public class Collection
        {
            private object _syncRoot = new object();
            private int _valueCount = 0;
            private int _keyCount = 0;
            private StringComparer _keyComparer;
            private UriQueryParameter _firstElement = null;
            private UriQueryParameter _lastElement = null;
            private KeyGroup _firstKey = null;
            private KeyGroup _lastKey = null;

            public string this[string key]
            {
                get
                {
                    if (key == null)
                        throw new ArgumentNullException("key");
                    return GetSync(() =>
                    {
                        KeyGroup group = KeyGroup.FindGroup(key, this);
                        if (group == null)
                            throw new KeyNotFoundException();
                        return group.Value;
                    });
                }
                set
                {
                    if (key == null)
                        throw new ArgumentNullException("key");
                    InvokeSync(() =>
                    {
                        KeyGroup group = KeyGroup.FindGroup(key, this);
                        if (group == null)
                            KeyGroup.Add(new UriQueryParameter(key, value), this);
                        else
                            group.Value = value;
                    });
                }
            }

            public UriQueryParameter this[int index]
            {
                get
                {
                    if (index < 0)
                        throw new IndexOutOfRangeException();
                    return GetSync(() =>
                    {
                        if (index == _valueCount - 1)
                            return _lastElement;
                        if (index <= (_valueCount >> 1))
                            return GetFwd(_firstElement, index);
                        if (index < _valueCount)
                            return GetRev(_lastElement._previousElement, index + 2);
                        throw new IndexOutOfRangeException();
                    });
                }
                set
                {
                    if (index < 0)
                        throw new IndexOutOfRangeException();
                    InvokeSync(() =>
                    {
                        UriQueryParameter item;
                        if (index == _valueCount - 1)
                            item = _lastElement;
                        else if (index <= (_valueCount >> 1))
                            item = GetFwd(_firstElement, index);
                        else
                            item = GetRev(_lastElement._previousElement, index + 2);
                        if (item == null)
                            throw new IndexOutOfRangeException();
                        if (value == null)
                            KeyGroup.Remove(item);
                        else
                            KeyGroup.Replace(item, value);
                    });
                }
            }

            public void RemoveAt(int index)
            {
                if (index < 0)
                    throw new ArgumentOutOfRangeException("index");
                InvokeSync(() =>
                {
                    UriQueryParameter item;
                    if (index == _valueCount - 1)
                        item = _lastElement;
                    else if (index <= (_valueCount >> 1))
                        item = GetFwd(_firstElement, index);
                    else
                        item = GetRev(_lastElement._previousElement, index + 2);
                    if (item == null)
                        throw new ArgumentOutOfRangeException("index");
                    KeyGroup.Remove(item);
                });
            }

            public int IndexOf(UriQueryParameter item)
            {
                if (item == null)
                    return -1;
                return item.GetSync(() =>
                {
                    if (item._group == null || !ReferenceEquals(item._group.Parent, this))
                        return -1;
                    if (item._previousElement == null)
                        return 0;
                    if (item._nextElement == null)
                        return _valueCount - 1;
                    int index = 1;
                    for (item = item._previousElement._previousElement; item != null; item = item._previousElement)
                        index++;
                    return index;
                });
            }

            public bool Remove(UriQueryParameter item)
            {
                return item != null && item.GetSync(() => item._group != null && ReferenceEquals(item._group.Parent, this) && KeyGroup.Remove(item));
            }

            private static UriQueryParameter GetFwd(UriQueryParameter p, int index)
            {
                if (index == 0 || p == null)
                    return p;
                return p.GetSync(() => GetFwd(p._nextElement, index - 1));
            }

            private UriQueryParameter GetRev(UriQueryParameter p, int index)
            {
                if (index == _valueCount || p == null)
                    return p;
                return p.GetSync(() => GetRev(p._nextElement, index + 1));
            }

            public int Count { get { return _valueCount; } }

            public int KeyCount { get { return _keyCount; } }

            private void InvokeSync(Action action, Action<Exception> onFinally = null, Action onSuccess = null)
            {
                bool isUnlocked = false;
                Monitor.Enter(_syncRoot);
                try
                {
                    action();
                    Monitor.Exit(_syncRoot);
                    isUnlocked = true;
                    if (onFinally != null)
                    {
                        Action<Exception> f = onFinally;
                        onFinally = null;
                        if (onSuccess != null)
                            try { onSuccess(); }
                            finally { f(null); }
                        else
                            f(null);
                    }
                    else if (onSuccess != null)
                        onSuccess();
                }
                catch (Exception exc)
                {
                    if (!isUnlocked)
                    {
                        Monitor.Exit(_syncRoot);
                        if (onFinally != null)
                            onFinally(exc);
                    }
                    throw;
                }
            }

            private T GetSync<T>(Func<T> func, Action<Exception> onFinally = null, Action<T> onSuccess = null)
            {
                bool isUnlocked = false;
                Monitor.Enter(_syncRoot);
                try
                {
                    T result = func();
                    Monitor.Exit(_syncRoot);
                    isUnlocked = true;
                    if (onFinally != null)
                    {
                        Action<Exception> f = onFinally;
                        onFinally = null;
                        if (onSuccess != null)
                            try { onSuccess(result); }
                            finally { f(null); }
                        else
                            f(null);
                    }
                    else if (onSuccess != null)
                        onSuccess(result);
                    return result;
                }
                catch (Exception exc)
                {
                    if (!isUnlocked)
                    {
                        Monitor.Exit(_syncRoot);
                        if (onFinally != null)
                            onFinally(exc);
                    }
                    throw;
                }
            }

            private void RaiseQueryComponentChanged(UriQueryParameter target)
            {
                throw new NotImplementedException();
            }

            private void RaiseQueryComponentRemoved(UriQueryParameter target)
            {
                throw new NotImplementedException();
            }

            private void RaiseQueryComponentAdded(UriQueryParameter target)
            {
                throw new NotImplementedException();
            }

            public class KeyGroup
            {
                private object _syncRoot = new object();
                private string _key;
                private int _count = 1;
                private Collection _parent;
                private UriQueryParameter _firstElement;
                private UriQueryParameter _lastElement;
                private KeyGroup _previousKey;
                private KeyGroup _nextKey = null;

                public UriQueryParameter First { get { return _firstElement; } }
                public UriQueryParameter Last { get { return _lastElement; } }
                public Collection Parent { get { return _parent; } }

                public string Key { get { return _key; } }

                public string Value
                {
                    get { return GetValue(_firstElement); }
                    set
                    {
                        _firstElement.InvokeSync(() =>
                        {
                            SetValue(_firstElement, value);
                            while (_firstElement._nextElement != null)
                                Remove(_firstElement._nextElement);
                        });
                    }
                }

                private string GetValue(UriQueryParameter p)
                {
                    if (p == null)
                        return null;
                    return p.GetSync(() =>
                    {
                        if (p.Value != null)
                            return p.Value;
                        return GetValue(p._nextValue);
                    });
                }
                private KeyGroup(UriQueryParameter p, Collection parent)
                {
                    _key = (_firstElement = _lastElement = p)._key;
                    p._key = null;
                    if ((_previousKey = (_parent = parent)._lastKey) == null)
                    {
                        parent._firstKey = parent._lastKey = this;
                        parent._keyCount = 1;
                    }
                    else
                    {
                        parent._lastKey = _previousKey._nextKey = this;
                        parent._keyCount++;
                    }
                }

                private void InvokeSync(Action action, Action<Exception> onFinally = null, Action onSuccess = null)
                {
                    bool isUnlocked = false;
                    Monitor.Enter(_syncRoot);
                    try
                    {
                        action();
                        Monitor.Exit(_syncRoot);
                        isUnlocked = true;
                        if (onFinally != null)
                        {
                            Action<Exception> f = onFinally;
                            onFinally = null;
                            if (onSuccess != null)
                                try { onSuccess(); }
                                finally { f(null); }
                            else
                                f(null);
                        } else if (onSuccess != null)
                            onSuccess();
                    }
                    catch (Exception exc)
                    {
                        if (!isUnlocked)
                        {
                            Monitor.Exit(_syncRoot);
                            if (onFinally != null)
                                onFinally(exc);
                        }
                        throw;
                    }
                }

                private T GetSync<T>(Func<T> func, Action<Exception> onFinally = null, Action<T> onSuccess = null)
                {
                    bool isUnlocked = false;
                    Monitor.Enter(_syncRoot);
                    try
                    {
                        T result = func();
                        Monitor.Exit(_syncRoot);
                        isUnlocked = true;
                        if (onFinally != null)
                        {
                            Action<Exception> f = onFinally;
                            onFinally = null;
                            if (onSuccess != null)
                                try { onSuccess(result); }
                                finally { f(null); }
                            else
                                f(null);
                        }
                        else if (onSuccess != null)
                            onSuccess(result);
                        return result;
                    }
                    catch (Exception exc)
                    {
                        if (!isUnlocked)
                        {
                            Monitor.Exit(_syncRoot);
                            if (onFinally != null)
                                onFinally(exc);
                        }
                        throw;
                    }
                }

                private KeyGroup __FindGroup(string key)
                {
                    return GetSync(() => (key == _key) ? this : ((_nextKey == null) ? null : _nextKey.__FindGroup(key)));
                }

                internal static KeyGroup FindGroup(string key, Collection parent)
                {
                    if (key == null || parent == null)
                        return null;
                    return parent.GetSync(() => (parent._firstKey == null) ? null : parent._firstKey.__FindGroup(key));
                }

                internal static bool Remove(UriQueryParameter target, Action afterRemoved = null)
                {
                    return target != null && target.GetSync(() =>
                    {
                        KeyGroup oldGroup = target._group;
                        if (oldGroup == null)
                            return null;

                        return oldGroup.GetSync(() =>
                        {
                            Collection oldParent = oldGroup._parent;
                            oldParent.InvokeSync(() =>
                            {
                                if (target._previousElement != null)
                                    target._previousElement.InvokeSync(() =>
                                    {
                                        if (target._nextElement != null)
                                            target._nextElement.InvokeSync(() =>
                                            {
                                                (target._previousElement._nextElement = target._nextElement)._previousElement = target._previousElement;
                                                target._nextElement = null;
                                            });
                                        else
                                            (oldParent._lastElement = target._previousElement)._nextElement = target._previousElement = null;
                                    });
                                else if (target._nextElement != null)
                                    target._nextElement.InvokeSync(() => (oldParent._firstElement = target._nextElement)._previousElement = target._nextElement = null);
                                else
                                {
                                    oldParent._firstElement = oldParent._lastElement = target._group._firstElement = target._group._lastElement = null;
                                    oldParent._keyCount = oldParent._valueCount = target._group._count = 0;
                                    oldParent._firstKey = oldParent._lastKey = null;
                                    target._group._parent = null;
                                }
                            });
                            target._group = null;
                            return oldParent;
                        });
                    }, null, (Collection parent) =>
                    {
                        if (parent == null)
                            return;
                        if (afterRemoved != null)
                            try { afterRemoved(); }
                            finally { parent.RaiseQueryComponentRemoved(target); }
                        else
                            parent.RaiseQueryComponentRemoved(target);
                    }) != null;
                }

                internal static void Add(UriQueryParameter target, Collection parent, Action afterAdded = null)
                {
                    if (target == null)
                        throw new ArgumentNullException("target");
                    if (parent == null)
                        throw new ArgumentNullException("parent");

                    target.InvokeSync(() =>
                    {
                        if (target._group != null)
                            throw new ArgumentOutOfRangeException((ReferenceEquals(target._group._parent, parent)) ? "Item already exists in the target collection" : "Item exists in another collection.");
                        parent.InvokeSync(() => Add(target, parent, parent._lastElement, afterAdded));
                    });
                }

                private static void Add(UriQueryParameter target, Collection parent, UriQueryParameter previous, Action afterAdded = null)
                {
                    if (target == null)
                        throw new ArgumentNullException("target");
                    if (parent == null)
                        throw new ArgumentNullException("parent");

                    if (parent._firstElement == null)
                        (parent._firstElement = parent._lastElement = target)._group = new KeyGroup(target, parent);
                    else
                    {
                        if ((target._group = FindGroup(target.Key, parent)) != null)
                        {
                            if (target._key == target._group._key)
                                target._key = null;
                            target._group._lastElement = (target._previousValue = target._group._lastElement)._nextValue = target;
                            target._group._count++;
                        }
                        else
                            target._group = new KeyGroup(target, parent);
                        if ((target._previousElement = previous) == null)
                        {
                            if ((target._nextElement = parent._firstElement) != null)
                            {
                                parent._firstElement.InvokeSync(() => parent._firstElement = parent._firstElement._previousElement = target);
                                parent._valueCount++;
                            }
                            else
                            {
                                parent._firstElement = parent._lastElement = target;
                                parent._valueCount = 1;
                            }
                        }
                        else
                        {
                            previous.InvokeSync(() => previous._nextElement = ((target._nextElement = previous._nextElement) == null) ? parent._lastElement = target : target);
                            parent._valueCount++;
                        }
                    }

                    if (afterAdded != null)
                        try { afterAdded(); }
                        finally { parent.RaiseQueryComponentAdded(target); }
                    else
                        parent.RaiseQueryComponentAdded(target);
                }

                internal static void SetParent(UriQueryParameter target, Collection parent)
                {
                    if (target == null)
                        throw new ArgumentNullException("target");
                    if (parent == null)
                        Remove(target);
                    else
                        SetParent(target, parent, null);
                }

                internal static void SetParent(UriQueryParameter target, UriQueryParameter previous)
                {
                    if (target == null)
                        throw new ArgumentNullException("target");
                    if (previous == null)
                        Remove(target);
                    else
                    {
                        if (previous._group == null)
                            throw new InvalidOperationException("Previous item does not belong to a query parameter collection");
                        SetParent(target, previous._group._parent, previous);
                    }
                }

                private static void SetParent(UriQueryParameter target, Collection parent, UriQueryParameter previous)
                {
                    target.InvokeSync(() =>
                    {
                        if (target._group == null)
                            Add(target, parent);
                        else
                            Remove(target, () => Add(target, parent));
                    });
                }

                internal static void Set(UriQueryParameter target, string key, string value)
                {
                    if (target == null)
                        throw new ArgumentNullException("target");
                    if (key == null)
                        throw new ArgumentNullException("key");
                    Collection parent = target.GetSync(() =>
                    {
                        if ((key == target.Key && ((target._value == null) ? value == null : value != null && value == target._value)) || target._group == null)
                        {
                            target._key = key;
                            target._value = value;
                            return null;
                        }
                        target._value = value;
                        KeyGroup oldGroup = target._group;
                        oldGroup.InvokeSync(() =>
                        {
                            if (target._previousValue == null)
                            {
                                if (target._nextValue == null)
                                {
                                    oldGroup._key = key;
                                    target._key = null;
                                    return;
                                }
                                if (oldGroup._parent._keyComparer.Equals(key, target.Key))
                                {
                                    target._key = (key == oldGroup._key) ? null : key;
                                    return;
                                }
                                (oldGroup._firstElement = target._nextValue)._previousValue = null;
                            }
                            else
                            {
                                if (oldGroup._parent._keyComparer.Equals(key, target.Key))
                                {
                                    target._key = (key == oldGroup._key) ? null : key;
                                    return;
                                }
                                if ((target._previousValue._nextValue = target._nextValue) == null)
                                    oldGroup._lastElement = target._previousValue;
                                else
                                    target._nextValue._previousValue = target._previousValue;
                            }
                            oldGroup._count--;
                            if ((target._group = FindGroup(target.Key, oldGroup._parent)) == null)
                                target._group = new KeyGroup(target, oldGroup._parent);
                        });
                        return oldGroup._parent;
                    });
                    if (parent != null)
                        parent.RaiseQueryComponentChanged(target);
                }

                internal static string GetKey(UriQueryParameter target)
                {
                    if (target == null)
                        throw new ArgumentNullException("target");
                    return (target._key == null) ? target._group._key : target._key;
                }

                internal static void SetKey(UriQueryParameter target, string key)
                {
                    if (target == null)
                        throw new ArgumentNullException("target");
                    if (key == null)
                        throw new ArgumentNullException("key");
                    Collection parent = target.GetSync(() =>
                    {
                        if (key == target.Key || target._group == null)
                        {
                            target._key = key;
                            return null;
                        }
                        KeyGroup oldGroup = target._group;
                        oldGroup.InvokeSync(() =>
                        {
                            if (target._previousValue == null)
                            {
                                if (target._nextValue == null)
                                {
                                    oldGroup._key = key;
                                    target._key = null;
                                    return;
                                }
                                if (oldGroup._parent._keyComparer.Equals(key, target.Key))
                                {
                                    target._key = (key == oldGroup._key) ? null : key;
                                    return;
                                }
                                (oldGroup._firstElement = target._nextValue)._previousValue = null;
                            }
                            else
                            {
                                if (oldGroup._parent._keyComparer.Equals(key, target.Key))
                                {
                                    target._key = (key == oldGroup._key) ? null : key;
                                    return;
                                }
                                if ((target._previousValue._nextValue = target._nextValue) == null)
                                    oldGroup._lastElement = target._previousValue;
                                else
                                    target._nextValue._previousValue = target._previousValue;
                            }
                            oldGroup._count--;
                            if ((target._group = FindGroup(target.Key, oldGroup._parent)) == null)
                                target._group = new KeyGroup(target, oldGroup._parent);
                        });
                        return oldGroup._parent;
                    });
                    if (parent != null)
                        parent.RaiseQueryComponentChanged(target);
                }

                internal static void SetValue(UriQueryParameter target, string value)
                {
                    if (target == null)
                        throw new ArgumentNullException("target");
                    Collection parent = target.GetSync(() =>
                    {
                        if ((target._value == null) ? value != null : value == null || value != target._value)
                        {
                            target._value = value;
                            if (target._group != null)
                                return target._group._parent;
                        }
                        return null;
                    });
                    if (parent != null)
                        parent.RaiseQueryComponentChanged(target);
                }

                internal static void Replace(UriQueryParameter item, UriQueryParameter value)
                {
                    throw new NotImplementedException();
                }
            }
        }
    }
}
