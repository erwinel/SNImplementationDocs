using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace PageManager
{
    public partial class QueryParameterCollection : IDictionary<string, string>, IList<QueryParameterCollection.KeyValuePair>, IDictionary, IList
    {
        private IEqualityComparer<string> _keyComparer;
        private readonly object _syncRoot = new object();
        private readonly Dictionary<string, List<KeyValuePair>> _innerDictionary;
        private readonly IList<KeyValuePair> _innerList = new List<KeyValuePair>();

        public string this[string key]
        {
            get { return KeyValuePair.Get(this, key); }
            set { KeyValuePair.Set(this, key, value); }
        }

        public KeyValuePair this[int index] { get { return _innerList[index]; } set { KeyValuePair.Set(this, index, value); } }

        object IList.this[int index] { get { return _innerList[index]; } set { KeyValuePair.Set(this, index, (KeyValuePair)value); } }

        object IDictionary.this[object key]
        {
            get { return KeyValuePair.Get(this, (string)key); }
            set { KeyValuePair.Set(this, (string)key, (string)value); }
        }

        public IEnumerable<string> AllKeys { get { return _innerList.Select(v => v.Key); } }

        public int Count { get { return _innerList.Count; } }

        bool IDictionary.IsFixedSize { get { return false; } }

        bool IList.IsFixedSize { get { return false; } }

        bool ICollection<KeyValuePair<string, string>>.IsReadOnly { get { return false; } }

        bool ICollection<KeyValuePair>.IsReadOnly { get { return false; } }

        bool IDictionary.IsReadOnly { get { return false; } }

        bool IList.IsReadOnly { get { return false; } }

        bool ICollection.IsSynchronized { get { return true; } }

        public ICollection<string> Keys => throw new NotImplementedException();

        ICollection IDictionary.Keys => throw new NotImplementedException();

        public object SyncRoot => throw new NotImplementedException();

        public ICollection<string> Values => throw new NotImplementedException();

        ICollection IDictionary.Values => throw new NotImplementedException();

        public QueryParameterCollection(string queryString, IEqualityComparer<string> keyComparer)
        {
            _keyComparer = keyComparer ?? StringComparer.InvariantCulture;
            _innerDictionary = new Dictionary<string, List<KeyValuePair>>(_keyComparer);
            if (string.IsNullOrEmpty(queryString))
                return;
            foreach (string kvp in queryString.Split('='))
                KeyValuePair.Add(this, new KeyValuePair(kvp, true));
        }

        public QueryParameterCollection(IEqualityComparer<string> keyComparer) : this(null, keyComparer) { }

        public QueryParameterCollection(string queryString) : this(queryString, null) { }

        public QueryParameterCollection() : this(null, null) { }

        public void Add(string key, string value)
        {
            throw new NotImplementedException();
        }

        public void Add(KeyValuePair item)
        {
            throw new NotImplementedException();
        }

        void ICollection<KeyValuePair<string, string>>.Add(KeyValuePair<string, string> item)
        {
            throw new NotImplementedException();
        }

        void IDictionary.Add(object key, object value)
        {
            throw new NotImplementedException();
        }

        int IList.Add(object value)
        {
            throw new NotImplementedException();
        }

        public void Clear()
        {
            throw new NotImplementedException();
        }

        public bool Contains(KeyValuePair item)
        {
            throw new NotImplementedException();
        }

        public bool ContainsKey(string key)
        {
            throw new NotImplementedException();
        }

        bool IDictionary.Contains(object key)
        {
            throw new NotImplementedException();
        }

        bool ICollection<KeyValuePair<string, string>>.Contains(KeyValuePair<string, string> item)
        {
            throw new NotImplementedException();
        }

        bool IList.Contains(object value)
        {
            throw new NotImplementedException();
        }

        public void CopyTo(KeyValuePair[] array, int arrayIndex)
        {
            throw new NotImplementedException();
        }

        void ICollection<KeyValuePair<string, string>>.CopyTo(KeyValuePair<string, string>[] array, int arrayIndex)
        {
            throw new NotImplementedException();
        }

        void ICollection.CopyTo(Array array, int index)
        {
            throw new NotImplementedException();
        }

        public IEnumerator<KeyValuePair> GetEnumerator()
        {
            throw new NotImplementedException();
        }

        IEnumerator<KeyValuePair<string, string>> IEnumerable<KeyValuePair<string, string>>.GetEnumerator()
        {
            throw new NotImplementedException();
        }

        IDictionaryEnumerator IDictionary.GetEnumerator()
        {
            throw new NotImplementedException();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            throw new NotImplementedException();
        }

        public int IndexOf(KeyValuePair item)
        {
            throw new NotImplementedException();
        }

        int IList.IndexOf(object value)
        {
            throw new NotImplementedException();
        }

        public void Insert(int index, KeyValuePair item)
        {
            throw new NotImplementedException();
        }

        void IList.Insert(int index, object value)
        {
            throw new NotImplementedException();
        }

        public bool Remove(string key)
        {
            throw new NotImplementedException();
        }

        void IDictionary.Remove(object key)
        {
            throw new NotImplementedException();
        }

        bool ICollection<KeyValuePair<string, string>>.Remove(KeyValuePair<string, string> item)
        {
            throw new NotImplementedException();
        }

        public bool Remove(KeyValuePair item)
        {
            throw new NotImplementedException();
        }

        void IList.Remove(object value)
        {
            throw new NotImplementedException();
        }

        public void RemoveAt(int index)
        {
            throw new NotImplementedException();
        }

        public bool TryGetValue(string key, out string value)
        {
            throw new NotImplementedException();
        }

        class KeyCollection : ICollection<string>, ICollection
        {
            private QueryParameterCollection _innerCollection;

            public int Count { get { return _innerCollection._innerDictionary.Count; } }

            bool ICollection<string>.IsReadOnly { get { return true; } }

            object ICollection.SyncRoot { get { return _innerCollection._syncRoot; } }

            bool ICollection.IsSynchronized { get { return true; } }

            void ICollection<string>.Add(string item) { throw new NotSupportedException(); }

            void ICollection<string>.Clear() { throw new NotSupportedException(); }

            public bool Contains(string item) { return item != null && _innerCollection._innerDictionary.ContainsKey(item); }

            void ICollection<string>.CopyTo(string[] array, int arrayIndex) { _innerCollection._innerDictionary.Keys.CopyTo(array, arrayIndex); }

            void ICollection.CopyTo(Array array, int index) { _innerCollection._innerDictionary.Keys.ToArray().CopyTo(array, index); }

            public IEnumerator<string> GetEnumerator() { return _innerCollection.Keys.GetEnumerator(); }

            IEnumerator IEnumerable.GetEnumerator() { return GetEnumerator(); }

            bool ICollection<string>.Remove(string item) { throw new NotSupportedException(); }
        }

        class ValueCollection : ICollection<string>, ICollection
        {
            private QueryParameterCollection _innerCollection;

            public int Count { get { return _innerCollection._innerList.Count; } }

            bool ICollection<string>.IsReadOnly { get { return true; } }

            object ICollection.SyncRoot { get { return _innerCollection._syncRoot; } }

            bool ICollection.IsSynchronized { get { return true; } }

            void ICollection<string>.Add(string item) { throw new NotSupportedException(); }

            void ICollection<string>.Clear() { throw new NotSupportedException(); }

            public bool Contains(string item)
            {
                return (item == null) ? _innerCollection._innerList.Any(i => i.Value == null) : _innerCollection._innerList.Any(i => i.Value != null && i.Value == item);
            }

            void ICollection<string>.CopyTo(string[] array, int arrayIndex) { _innerCollection._innerList.Select(i => i.Value).ToList().CopyTo(array, arrayIndex); }

            void ICollection.CopyTo(Array array, int index) { _innerCollection._innerList.Select(i => i.Value).ToArray().CopyTo(array, index); }

            public IEnumerator<string> GetEnumerator() { return _innerCollection._innerList.Select(i => i.Value).GetEnumerator(); }

            IEnumerator IEnumerable.GetEnumerator() { return GetEnumerator(); }

            bool ICollection<string>.Remove(string item) { throw new NotSupportedException(); }
        }

        class DictionaryEnumerator : IEnumerator<KeyValuePair>, IEnumerator<KeyValuePair<string, string>>, IDictionaryEnumerator
        {
            private object _syncRoot = new object();
            private KeyValuePair<string, string>? _current = null;
            private DictionaryEntry? _entry = null;

            private readonly IEnumerator<KeyValuePair> _innerEnumerator;

            public KeyValuePair Current { get { return _innerEnumerator.Current; } }

            public string Key
            {
                get
                {
                    KeyValuePair kvp = Current;
                    return (kvp == null) ? null : kvp.Key;
                }
            }

            object IDictionaryEnumerator.Key { get { return Key; } }

            public string Value
            {
                get
                {
                    KeyValuePair kvp = Current;
                    return (kvp == null) ? null : kvp.Value;
                }
            }

            object IDictionaryEnumerator.Value { get { return Value; } }

            public DictionaryEntry Entry
            {
                get
                {
                    DictionaryEntry? entry;
                    Monitor.Enter(_syncRoot);
                    try
                    {
                        entry = _entry;
                        if (!entry.HasValue)
                            entry = new DictionaryEntry(Current.Key, Current.Value);
                    }
                    finally { Monitor.Exit(_syncRoot); }
                    return entry.Value;
                }
            }

            object IEnumerator.Current => _innerEnumerator.Current;

            KeyValuePair<string, string> IEnumerator<KeyValuePair<string, string>>.Current
            {
                get
                {
                    KeyValuePair<string, string>? current;
                    Monitor.Enter(_syncRoot);
                    try
                    {
                        current = _current;
                        if (!current.HasValue)
                            current = new KeyValuePair<string, string>(Current.Key, Current.Value);
                    }
                    finally { Monitor.Exit(_syncRoot); }
                    return current.Value;
                }
            }

            public DictionaryEnumerator(IEnumerator<KeyValuePair> enumerator) { _innerEnumerator = enumerator ?? (new List<KeyValuePair>()).GetEnumerator(); }

            public DictionaryEnumerator(IEnumerable<KeyValuePair> collection)
            {
                if (collection == null)
                    _innerEnumerator = (new List<KeyValuePair>()).GetEnumerator();
                else
                    _innerEnumerator = ((collection is QueryParameterCollection) ? ((QueryParameterCollection)collection)._innerList : collection).GetEnumerator();
            }

            public void Dispose()
            {
                Monitor.Enter(_syncRoot);
                try
                {
                    _innerEnumerator.Dispose();
                    _current = null;
                    _entry = null;
                }
                finally { Monitor.Exit(_syncRoot); }
            }

            public bool MoveNext()
            {
                Monitor.Enter(_syncRoot);
                try
                {
                    if (!_innerEnumerator.MoveNext())
                        return false;
                    _current = null;
                    _entry = null;
                }
                finally { Monitor.Exit(_syncRoot); }
                return true;
            }

            public void Reset()
            {
                Monitor.Enter(_syncRoot);
                try
                {
                    _innerEnumerator.Reset();
                    _current = null;
                    _entry = null;
                }
                finally { Monitor.Exit(_syncRoot); }
            }
        }
    }
}
