using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace PageManager
{
    public class LinkedDictionary<TKey, TValue> : IDictionary<TKey, TValue>, IList<TValue>, IDictionary, IList
    {
        private readonly object _syncRoot = new object();
        private readonly IEqualityComparer<TKey> _keyComparer;
        private readonly IEqualityComparer<TValue> _valueComparer;
        private readonly Dictionary<TKey, KeyGroup> _innerDictionary;
        private Node _firstNode = null;
        private Node _lastNode = null;
        private int _count = 0;
        private DictionaryEnumerator _firstEnumerator = null;
        private DictionaryEnumerator _lastEnumerator = null;

        #region Properties

        public TValue this[TKey key] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        object IDictionary.this[object key] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public TValue this[int index] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        object IList.this[int index] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public int Count => throw new NotImplementedException();

        bool IDictionary.IsFixedSize => throw new NotImplementedException();

        bool IList.IsFixedSize => throw new NotImplementedException();

        bool ICollection<KeyValuePair<TKey, TValue>>.IsReadOnly => throw new NotImplementedException();

        bool ICollection<TValue>.IsReadOnly => throw new NotImplementedException();

        bool IDictionary.IsReadOnly => throw new NotImplementedException();

        bool IList.IsReadOnly => throw new NotImplementedException();

        bool ICollection.IsSynchronized => throw new NotImplementedException();

        public ICollection<TKey> Keys => throw new NotImplementedException();

        ICollection IDictionary.Keys => throw new NotImplementedException();

        public object SyncRoot => throw new NotImplementedException();

        public ICollection<TValue> Values => throw new NotImplementedException();

        ICollection IDictionary.Values => throw new NotImplementedException();

        #endregion

        #region Constructors

        public LinkedDictionary(IEqualityComparer<TKey> keyComparer, IEqualityComparer<TValue> valueComparer)
        {
            _keyComparer = keyComparer ?? EqualityComparer<TKey>.Default;
            _valueComparer = valueComparer ?? EqualityComparer<TValue>.Default;
            _innerDictionary = new Dictionary<TKey, KeyGroup>(_keyComparer);
        }

        #endregion

        #region Methods

        public void Add(TKey key, TValue value)
        {
            throw new NotImplementedException();
        }

        public void Add(TValue item)
        {
            throw new NotImplementedException();
        }

        public void Clear()
        {
            throw new NotImplementedException();
        }

        public bool Contains(TValue item)
        {
            throw new NotImplementedException();
        }

        public bool ContainsKey(TKey key)
        {
            throw new NotImplementedException();
        }

        public void CopyTo(TValue[] array, int arrayIndex)
        {
            throw new NotImplementedException();
        }

        public IEnumerator<TValue> GetEnumerator()
        {
            throw new NotImplementedException();
        }

        public int IndexOf(TValue item)
        {
            throw new NotImplementedException();
        }

        public void Insert(int index, TValue item)
        {
            throw new NotImplementedException();
        }

        public bool Remove(TKey key)
        {
            throw new NotImplementedException();
        }

        public bool Remove(TValue item)
        {
            throw new NotImplementedException();
        }

        public void RemoveAt(int index)
        {
            throw new NotImplementedException();
        }

        public bool TryGetValue(TKey key, out TValue value)
        {
            throw new NotImplementedException();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            throw new NotImplementedException();
        }

        IDictionaryEnumerator IDictionary.GetEnumerator()
        {
            throw new NotImplementedException();
        }

        void ICollection<KeyValuePair<TKey, TValue>>.Add(KeyValuePair<TKey, TValue> item)
        {
            throw new NotImplementedException();
        }

        bool ICollection<KeyValuePair<TKey, TValue>>.Contains(KeyValuePair<TKey, TValue> item)
        {
            throw new NotImplementedException();
        }

        void ICollection<KeyValuePair<TKey, TValue>>.CopyTo(KeyValuePair<TKey, TValue>[] array, int arrayIndex)
        {
            throw new NotImplementedException();
        }

        bool ICollection<KeyValuePair<TKey, TValue>>.Remove(KeyValuePair<TKey, TValue> item)
        {
            throw new NotImplementedException();
        }

        IEnumerator<KeyValuePair<TKey, TValue>> IEnumerable<KeyValuePair<TKey, TValue>>.GetEnumerator()
        {
            throw new NotImplementedException();
        }

        bool IDictionary.Contains(object key)
        {
            throw new NotImplementedException();
        }

        void IDictionary.Add(object key, object value)
        {
            throw new NotImplementedException();
        }

        void IDictionary.Remove(object key)
        {
            throw new NotImplementedException();
        }

        void ICollection.CopyTo(Array array, int index)
        {
            throw new NotImplementedException();
        }

        int IList.Add(object value)
        {
            throw new NotImplementedException();
        }

        bool IList.Contains(object value)
        {
            throw new NotImplementedException();
        }

        int IList.IndexOf(object value)
        {
            throw new NotImplementedException();
        }

        void IList.Insert(int index, object value)
        {
            throw new NotImplementedException();
        }

        void IList.Remove(object value)
        {
            throw new NotImplementedException();
        }

        #endregion

        public class Node
        {
            private const int JumpCount = 256;
            private object _syncRoot;
            private TKey _key;
            private TValue _value;
            private Node _precedingJump = null;
            private Node _precedingNode = null;
            private Node _followingNode = null;
            private Node _followingJump = null;
            private Node _precedingKeyItem = null;
            private Node _followingKeyItem = null;
            private LinkedDictionary<TKey, TValue> _ownerDictionary;

            public TKey Key
            {
                get { return _key; }
                set
                {
                    throw new NotImplementedException();
                }
            }

            public TValue Value
            {
                get { return _value; }
                set
                {
                    throw new NotImplementedException();
                }
            }

            public LinkedDictionary<TKey, TValue> OwnerDictionary { get { return _ownerDictionary; } }

            public Node PrecedingNode { get { return _precedingNode; } }

            public Node FollowingNode { get { return _followingNode;  } }

            public Node PrecedingKeyItem { get { return _precedingKeyItem; } }

            public Node FollowingKeyItem { get { return _followingKeyItem; } }

            public Node GetFollowing(int position)
            {
                if (position < 0)
                    return GetPreceding(0 - position);

                Node result = this;
                while (position > JumpCount)
                {
                    if ((result = result._followingJump) == null)
                        return null;
                    position -= JumpCount;
                }
                while ((result = result._followingNode) != null)
                {
                    if (position == 0)
                        return result;
                    position--;
                }
                return null;
            }

            public Node GetPreceding(int position)
            {
                if (position < 0)
                    return GetFollowing(0 - position);

                Node result = this;
                while (position > JumpCount)
                {
                    if ((result = result._precedingJump) == null)
                        return null;
                    position -= JumpCount;
                }
                while ((result = result._precedingNode) != null)
                {
                    if (position == 0)
                        return result;
                    position--;
                }
                return null;
            }

            private static Node __GetNodeAt(LinkedDictionary<TKey, TValue> dictionary, int index)
            {
                if (index < 0 || index >= dictionary._count)
                    return null;
                if (index == 0)
                    return dictionary._firstNode;
                if (index == dictionary._count - 1)
                    return dictionary._lastNode;
                if (index > dictionary._count >> 1)
                    return dictionary._lastNode.GetPreceding(dictionary._count - index - 1);
                return dictionary._firstNode.GetFollowing(index - 1);
            }

            public static Node GetNodeAt(LinkedDictionary<TKey, TValue> dictionary, int index) { return GetSync(dictionary._syncRoot, __GetNodeAt, dictionary, index); }

            private static Node __GetNode(LinkedDictionary<TKey, TValue> dictionary, TKey key)
            {
                if (dictionary._innerDictionary.ContainsKey(key))
                    return dictionary._innerDictionary[key].FirstNode;
                return null;
            }

            public static Node GetNode(LinkedDictionary<TKey, TValue> dictionary, TKey key) { return GetSync(dictionary._syncRoot, __GetNode, dictionary, key); }

            public static TResult GetSync<TArg0, TArg1, TArg2, TArg3, TResult>(object syncRoot, Func<TArg0, TArg1, TArg2, TArg3, TResult> func, TArg0 arg0, TArg1 arg1, TArg2 arg2, TArg3 arg3)
            {
                Monitor.Enter(syncRoot);
                try { return func(arg0, arg1, arg2, arg3); }
                finally { Monitor.Exit(syncRoot); }
            }

            public static TResult GetSync<TArg0, TArg1, TArg2, TResult>(object syncRoot, Func<TArg0, TArg1, TArg2, TResult> func, TArg0 arg0, TArg1 arg1, TArg2 arg2)
            {
                Monitor.Enter(syncRoot);
                try { return func(arg0, arg1, arg2); }
                finally { Monitor.Exit(syncRoot); }
            }

            public static TResult GetSync<TArg0, TArg1, TResult>(object syncRoot, Func<TArg0, TArg1, TResult> func, TArg0 arg0, TArg1 arg1)
            {
                Monitor.Enter(syncRoot);
                try { return func(arg0, arg1); }
                finally { Monitor.Exit(syncRoot); }
            }

            public static TResult GetSync<TArg, TResult>(object syncRoot, Func<TArg, TResult> func, TArg arg)
            {
                Monitor.Enter(syncRoot);
                try { return func(arg); }
                finally { Monitor.Exit(syncRoot); }
            }

            public static TResult GetSync<TResult>(object syncRoot, Func<TResult> func)
            {
                Monitor.Enter(syncRoot);
                try { return func(); }
                finally { Monitor.Exit(syncRoot); }
            }

            public static void RunSync<TArg0, TArg1, TArg2, TArg3>(object syncRoot, Action<TArg0, TArg1, TArg2, TArg3> action, TArg0 arg0, TArg1 arg1, TArg2 arg2, TArg3 arg3)
            {
                Monitor.Enter(syncRoot);
                try { action(arg0, arg1, arg2, arg3); }
                finally { Monitor.Exit(syncRoot); }
            }

            public static void RunSync<TArg0, TArg1, TArg2>(object syncRoot, Action<TArg0, TArg1, TArg2> action, TArg0 arg0, TArg1 arg1, TArg2 arg2)
            {
                Monitor.Enter(syncRoot);
                try { action(arg0, arg1, arg2); }
                finally { Monitor.Exit(syncRoot); }
            }

            public static void RunSync<TArg0, TArg1>(object syncRoot, Action<TArg0, TArg1> action, TArg0 arg0, TArg1 arg1)
            {
                Monitor.Enter(syncRoot);
                try { action(arg0, arg1); }
                finally { Monitor.Exit(syncRoot); }
            }

            public static void RunSync<TArg>(object syncRoot, Action<TArg> action, TArg arg)
            {
                Monitor.Enter(syncRoot);
                try { action(arg); }
                finally { Monitor.Exit(syncRoot); }
            }

            public static void RunSync(object syncRoot, Action action)
            {
                Monitor.Enter(syncRoot);
                try { action(); }
                finally { Monitor.Exit(syncRoot); }
            }

            public static bool TryGetSync<TArg0, TArg1, TArg2, TArg3, TResult>(object syncRoot, Func<TArg0, TArg1, TArg2, TArg3, TResult> func, int millisecondsTimeout, TArg0 arg0, TArg1 arg1, TArg2 arg2, TArg3 arg3, out TResult result)
            {
                if (!Monitor.TryEnter(syncRoot, millisecondsTimeout))
                {
                    result = default(TResult);
                    return false;
                }
                try { result = func(arg0, arg1, arg2, arg3); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryGetSync<TArg0, TArg1, TArg2, TArg3, TResult>(object syncRoot, Func<TArg0, TArg1, TArg2, TArg3, TResult> func, TimeSpan timeout, TArg0 arg0, TArg1 arg1, TArg2 arg2, TArg3 arg3, out TResult result)
            {
                if (!Monitor.TryEnter(syncRoot, timeout))
                {
                    result = default(TResult);
                    return false;
                }
                try { result = func(arg0, arg1, arg2, arg3); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryGetSync<TArg0, TArg1, TArg2, TArg3, TResult>(object syncRoot, Func<TArg0, TArg1, TArg2, TArg3, TResult> func, TArg0 arg0, TArg1 arg1, TArg2 arg2, TArg3 arg3, out TResult result)
            {
                if (!Monitor.TryEnter(syncRoot))
                {
                    result = default(TResult);
                    return false;
                }
                try { result = func(arg0, arg1, arg2, arg3); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryGetSync<TArg0, TArg1, TArg2, TResult>(object syncRoot, Func<TArg0, TArg1, TArg2, TResult> func, int millisecondsTimeout, TArg0 arg0, TArg1 arg1, TArg2 arg2, out TResult result)
            {
                if (!Monitor.TryEnter(syncRoot, millisecondsTimeout))
                {
                    result = default(TResult);
                    return false;
                }
                try { result = func(arg0, arg1, arg2); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryGetSync<TArg0, TArg1, TArg2, TResult>(object syncRoot, Func<TArg0, TArg1, TArg2, TResult> func, TimeSpan timeout, TArg0 arg0, TArg1 arg1, TArg2 arg2, out TResult result)
            {
                if (!Monitor.TryEnter(syncRoot, timeout))
                {
                    result = default(TResult);
                    return false;
                }
                try { result = func(arg0, arg1, arg2); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryGetSync<TArg0, TArg1, TArg2, TResult>(object syncRoot, Func<TArg0, TArg1, TArg2, TResult> func, TArg0 arg0, TArg1 arg1, TArg2 arg2, out TResult result)
            {
                if (!Monitor.TryEnter(syncRoot))
                {
                    result = default(TResult);
                    return false;
                }
                try { result = func(arg0, arg1, arg2); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryGetSync<TArg0, TArg1, TResult>(object syncRoot, Func<TArg0, TArg1, TResult> func, int millisecondsTimeout, TArg0 arg0, TArg1 arg1, out TResult result)
            {
                if (!Monitor.TryEnter(syncRoot, millisecondsTimeout))
                {
                    result = default(TResult);
                    return false;
                }
                try { result = func(arg0, arg1); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryGetSync<TArg0, TArg1, TResult>(object syncRoot, Func<TArg0, TArg1, TResult> func, TimeSpan timeout, TArg0 arg0, TArg1 arg1, out TResult result)
            {
                if (!Monitor.TryEnter(syncRoot, timeout))
                {
                    result = default(TResult);
                    return false;
                }
                try { result = func(arg0, arg1); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryGetSync<TArg0, TArg1, TResult>(object syncRoot, Func<TArg0, TArg1, TResult> func, TArg0 arg0, TArg1 arg1, out TResult result)
            {
                if (!Monitor.TryEnter(syncRoot))
                {
                    result = default(TResult);
                    return false;
                }
                try { result = func(arg0, arg1); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryGetSync<TArg, TResult>(object syncRoot, Func<TArg, TResult> func, int millisecondsTimeout, TArg arg, out TResult result)
            {
                if (!Monitor.TryEnter(syncRoot, millisecondsTimeout))
                {
                    result = default(TResult);
                    return false;
                }
                try { result = func(arg); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryGetSync<TArg, TResult>(object syncRoot, Func<TArg, TResult> func, TimeSpan timeout, TArg arg, out TResult result)
            {
                if (!Monitor.TryEnter(syncRoot, timeout))
                {
                    result = default(TResult);
                    return false;
                }
                try { result = func(arg); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryGetSync<TArg, TResult>(object syncRoot, Func<TArg, TResult> func, TArg arg, out TResult result)
            {
                if (!Monitor.TryEnter(syncRoot))
                {
                    result = default(TResult);
                    return false;
                }
                try { result = func(arg); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryGetSync<TResult>(object syncRoot, Func<TResult> func, int millisecondsTimeout, out TResult result)
            {
                if (!Monitor.TryEnter(syncRoot, millisecondsTimeout))
                {
                    result = default(TResult);
                    return false;
                }
                try { result = func(); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryGetSync<TResult>(object syncRoot, Func<TResult> func, TimeSpan timeout, out TResult result)
            {
                if (!Monitor.TryEnter(syncRoot, timeout))
                {
                    result = default(TResult);
                    return false;
                }
                try { result = func(); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryGetSync<TResult>(object syncRoot, Func<TResult> func, out TResult result)
            {
                if (!Monitor.TryEnter(syncRoot))
                {
                    result = default(TResult);
                    return false;
                }
                try { result = func(); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryRunSync<TArg0, TArg1, TArg2, TArg3>(object syncRoot, Action<TArg0, TArg1, TArg2, TArg3> action, int millisecondsTimeout, TArg0 arg0, TArg1 arg1, TArg2 arg2, TArg3 arg3)
            {
                if (!Monitor.TryEnter(syncRoot, millisecondsTimeout))
                    return false;
                try { action(arg0, arg1, arg2, arg3); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryRunSync<TArg0, TArg1, TArg2, TArg3>(object syncRoot, Action<TArg0, TArg1, TArg2, TArg3> action, TimeSpan timeout, TArg0 arg0, TArg1 arg1, TArg2 arg2, TArg3 arg3)
            {
                if (!Monitor.TryEnter(syncRoot, timeout))
                    return false;
                try { action(arg0, arg1, arg2, arg3); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryRunSync<TArg0, TArg1, TArg2, TArg3>(object syncRoot, Action<TArg0, TArg1, TArg2, TArg3> action, TArg0 arg0, TArg1 arg1, TArg2 arg2, TArg3 arg3)
            {
                if (!Monitor.TryEnter(syncRoot))
                    return false;
                try { action(arg0, arg1, arg2, arg3); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryRunSync<TArg0, TArg1, TArg2>(object syncRoot, Action<TArg0, TArg1, TArg2> action, int millisecondsTimeout, TArg0 arg0, TArg1 arg1, TArg2 arg2)
            {
                if (!Monitor.TryEnter(syncRoot, millisecondsTimeout))
                    return false;
                try { action(arg0, arg1, arg2); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryRunSync<TArg0, TArg1, TArg2>(object syncRoot, Action<TArg0, TArg1, TArg2> action, TimeSpan timeout, TArg0 arg0, TArg1 arg1, TArg2 arg2)
            {
                if (!Monitor.TryEnter(syncRoot, timeout))
                    return false;
                try { action(arg0, arg1, arg2); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryRunSync<TArg0, TArg1, TArg2>(object syncRoot, Action<TArg0, TArg1, TArg2> action, TArg0 arg0, TArg1 arg1, TArg2 arg2)
            {
                if (!Monitor.TryEnter(syncRoot))
                    return false;
                try { action(arg0, arg1, arg2); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryRunSync<TArg0, TArg1>(object syncRoot, Action<TArg0, TArg1> action, int millisecondsTimeout, TArg0 arg0, TArg1 arg1)
            {
                if (!Monitor.TryEnter(syncRoot, millisecondsTimeout))
                    return false;
                try { action(arg0, arg1); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryRunSync<TArg0, TArg1>(object syncRoot, Action<TArg0, TArg1> action, TimeSpan timeout, TArg0 arg0, TArg1 arg1)
            {
                if (!Monitor.TryEnter(syncRoot, timeout))
                    return false;
                try { action(arg0, arg1); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryRunSync<TArg0, TArg1>(object syncRoot, Action<TArg0, TArg1> action, TArg0 arg0, TArg1 arg1)
            {
                if (!Monitor.TryEnter(syncRoot))
                    return false;
                try { action(arg0, arg1); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryRunSync<TArg>(object syncRoot, Action<TArg> action, int millisecondsTimeout, TArg arg)
            {
                if (!Monitor.TryEnter(syncRoot, millisecondsTimeout))
                    return false;
                try { action(arg); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryRunSync<TArg>(object syncRoot, Action<TArg> action, TimeSpan timeout, TArg arg)
            {
                if (!Monitor.TryEnter(syncRoot, timeout))
                    return false;
                try { action(arg); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryRunSync<TArg>(object syncRoot, Action<TArg> action, TArg arg)
            {
                if (!Monitor.TryEnter(syncRoot))
                    return false;
                try { action(arg); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryRunSync(object syncRoot, Action action, int millisecondsTimeout)
            {
                if (!Monitor.TryEnter(syncRoot, millisecondsTimeout))
                    return false;
                try { action(); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryRunSync(object syncRoot, Action action, TimeSpan timeout)
            {
                if (!Monitor.TryEnter(syncRoot, timeout))
                    return false;
                try { action(); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            public static bool TryRunSync(object syncRoot, Action action)
            {
                if (!Monitor.TryEnter(syncRoot))
                    return false;
                try { action(); }
                finally { Monitor.Exit(syncRoot); }
                return true;
            }

            class KeyGroup
            {
                private Node _firstNode = null;
                private Node _lastNode = null;

                public Node FirstNode { get { return _firstNode; } }

                public Node LastNode { get { return _lastNode; } }

                internal static int Add(LinkedDictionary<TKey, TValue> dictionary, TKey key, TValue value)
                {
                    throw new NotImplementedException();
                }

                internal static void Insert(LinkedDictionary<TKey, TValue> dictionary, int index, TKey key, TValue value)
                {
                    throw new NotImplementedException();
                }

                internal static int Set(LinkedDictionary<TKey, TValue> dictionary, TKey key, TValue value, int index)
                {
                    throw new NotImplementedException();
                }

                internal static int Set(LinkedDictionary<TKey, TValue> dictionary, TKey key, TValue value)
                {
                    throw new NotImplementedException();
                }

                internal static void RemoveAt(LinkedDictionary<TKey, TValue> dictionary, int index)
                {
                    throw new NotImplementedException();
                }

                internal static bool Remove(LinkedDictionary<TKey, TValue> dictionary, TKey key)
                {
                    throw new NotImplementedException();
                }
            }
        }

        public sealed class KeyCollection : ICollection<TKey>, ICollection
        {
            public int Count => throw new NotImplementedException();

            public bool IsReadOnly => throw new NotImplementedException();

            public object SyncRoot => throw new NotImplementedException();

            public bool IsSynchronized => throw new NotImplementedException();

            public void Add(TKey item)
            {
                throw new NotImplementedException();
            }

            public void Clear()
            {
                throw new NotImplementedException();
            }

            public bool Contains(TKey item)
            {
                throw new NotImplementedException();
            }

            public void CopyTo(TKey[] array, int arrayIndex)
            {
                throw new NotImplementedException();
            }

            public void CopyTo(Array array, int index)
            {
                throw new NotImplementedException();
            }

            public IEnumerator<TKey> GetEnumerator()
            {
                throw new NotImplementedException();
            }

            public bool Remove(TKey item)
            {
                throw new NotImplementedException();
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                throw new NotImplementedException();
            }
        }

        public sealed class ValueEnumerator : IEnumerator<TValue>
        {
            public TValue Current => throw new NotImplementedException();

            object IEnumerator.Current => throw new NotImplementedException();

            public void Dispose()
            {
                throw new NotImplementedException();
            }

            public bool MoveNext()
            {
                throw new NotImplementedException();
            }

            public void Reset()
            {
                throw new NotImplementedException();
            }
        }

        public sealed class KeyEnumerator : IEnumerator<TKey>
        {
            public TKey Current => throw new NotImplementedException();

            object IEnumerator.Current => throw new NotImplementedException();

            public void Dispose()
            {
                throw new NotImplementedException();
            }

            public bool MoveNext()
            {
                throw new NotImplementedException();
            }

            public void Reset()
            {
                throw new NotImplementedException();
            }
        }

        public sealed class DictionaryEnumerator : IEnumerator<Node>, IEnumerator<KeyValuePair<TKey, TValue>>, IDictionaryEnumerator
        {
            public Node Current => throw new NotImplementedException();

            object IEnumerator.Current => throw new NotImplementedException();

            KeyValuePair<TKey, TValue> IEnumerator<KeyValuePair<TKey, TValue>>.Current => throw new NotImplementedException();

            public DictionaryEntry Entry => throw new NotImplementedException();

            public TKey Key => throw new NotImplementedException();

            object IDictionaryEnumerator.Key => throw new NotImplementedException();

            public TValue Value => throw new NotImplementedException();

            object IDictionaryEnumerator.Value => throw new NotImplementedException();

            public void Dispose()
            {
                throw new NotImplementedException();
            }

            public bool MoveNext()
            {
                throw new NotImplementedException();
            }

            public void Reset()
            {
                throw new NotImplementedException();
            }
        }
    }
}
