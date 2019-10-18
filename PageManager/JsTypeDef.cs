namespace JsTypeDef
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Management.Automation;
    using System.Linq;
    using System.Threading;
    using System.Collections.ObjectModel;

    [AttributeUsage(AttributeTargets.Property, Inherited = true, AllowMultiple = true)]
    sealed class JsDocAttribute : Attribute
    {
        private readonly string _name;
        public JsDocAttribute(string name) { _name = (name == null) ? "" : name.Trim(); }
        public string Name { get { return _name; } }
    }

    public abstract class JsTypeDefinitionBase<TDictionary> : IDictionary<string, object>, IDictionary
        where TDictionary : class, IDictionary<string, object>, IDictionary, new()
    {
        public const string ReadOnlyElementName_namespace = "namespace";
        public const string ReadOnlyElementName_members = "members";
        public const string ReadOnlyElementName_ = "";
        private readonly object _syncRoot;
        protected readonly TDictionary InnerDictionary;

        public ICollection<string> Keys => ((IDictionary<string, object>)InnerDictionary).Keys;

        public ICollection<object> Values => ((IDictionary<string, object>)InnerDictionary).Values;

        public int Count => ((ICollection<KeyValuePair<string, object>>)InnerDictionary).Count;

        public virtual object this[string key]
        {
            get { return InnerDictionary[key]; }
            set
            {
                if (key.Length > 0 && key[0] != '@')
                    throw new ArgumentOutOfRangeException("Cannot overwrite read-only property");
                InnerDictionary[key] = value;
            }
        }

        protected JsTypeDefinitionBase() : this(null) { }

        protected JsTypeDefinitionBase(TDictionary innerDictionary)
        {
            InnerDictionary = (innerDictionary == null) ? new TDictionary() : innerDictionary;
            try
            {
                if (((IDictionary)InnerDictionary).IsSynchronized && !(((IDictionary)InnerDictionary).SyncRoot == null || ReferenceEquals(((IDictionary)InnerDictionary).SyncRoot, InnerDictionary)))
                {
                    _syncRoot = ((IDictionary)InnerDictionary).SyncRoot;
                    return;
                }
            }
            catch { }
            _syncRoot = new object();
        }

        public virtual void Add(string key, object value)
        {
            if (key.Length > 0 && key[0] != '@')
                throw new ArgumentOutOfRangeException("Cannot add read-only property");
            InnerDictionary.Add(key, value);
        }

        public IEnumerable<string> GetWritableKeys()
        {
            foreach (string key in Keys)
                if (key.Length == 0 || key[0] == '@')
                    yield return key;
        }

        public virtual void Clear()
        {
            Monitor.Enter(_syncRoot);
            try
            {
                foreach (string key in GetWritableKeys().ToArray())
                    InnerDictionary.Remove(key);
            }
            finally { Monitor.Exit(_syncRoot); }
        }

        public bool ContainsKey(string key)
        {
            return InnerDictionary.ContainsKey(key);
        }

        public IEnumerator<KeyValuePair<string, object>> GetEnumerator()
        {
            return ((ICollection<KeyValuePair<string, object>>)InnerDictionary).GetEnumerator();
        }

        public virtual bool Remove(string key)
        {
            return key != null && (key.Length == 0 || key[0] == '@') && InnerDictionary.Remove(key);
        }

        public bool TryGetValue(string key, out object value)
        {
            return InnerDictionary.TryGetValue(key, out value);
        }

        private static bool TryConvertToKey(object value, out string key)
        {
            if (value != null && (value is string || (value is PSObject && (value = ((PSObject)value).BaseObject) is string)))
            {
                key = (string)value;
                return true;
            }
            key = null;
            return false;
        }

        private static string AsKey(object value)
        {
            if (!(value == null || value is string)) {
                if (value is PSObject)
                    value = ((PSObject)value).BaseObject;
            }
            return (string)value;
        }

        object IDictionary.this[object key] { get => ((IDictionary)InnerDictionary)[key]; set => ((IDictionary)InnerDictionary)[key] = value; }

        ICollection IDictionary.Keys => ((IDictionary)InnerDictionary).Keys;

        ICollection IDictionary.Values => ((IDictionary)InnerDictionary).Values;

        bool ICollection<KeyValuePair<string, object>>.IsReadOnly => ((IDictionary<string, object>)InnerDictionary).IsReadOnly;

        bool IDictionary.IsReadOnly => ((IDictionary)InnerDictionary).IsReadOnly;

        bool IDictionary.IsFixedSize => ((IDictionary)InnerDictionary).IsFixedSize;

        protected object SyncRoot { get { return this._syncRoot; } }

        object ICollection.SyncRoot { get { return this._syncRoot; } }

        bool ICollection.IsSynchronized { get { return true; } }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return ((ICollection<KeyValuePair<string, object>>)InnerDictionary).GetEnumerator();
        }

        IDictionaryEnumerator IDictionary.GetEnumerator()
        {
            return ((IDictionary)InnerDictionary).GetEnumerator();
        }

        void ICollection<KeyValuePair<string, object>>.Add(KeyValuePair<string, object> item) { Add(item.Key, item.Value); }

        bool ICollection<KeyValuePair<string, object>>.Contains(KeyValuePair<string, object> item)
        {
            if (item.Key != null && item.Value != null)
            {
                Monitor.Enter(_syncRoot);
                try
                {
                    if (InnerDictionary.ContainsKey(item.Key) && ((item.Value.GetType().IsClass) ? Object.ReferenceEquals(item.Value, InnerDictionary[item.Key]) : item.Value.Equals(InnerDictionary[item.Key])))
                        return true;
                }
                finally { Monitor.Exit(_syncRoot); }
            }
            return false;
        }

        bool IDictionary.Contains(object key)
        {
            string k;
            return TryConvertToKey(key, out k) && InnerDictionary.ContainsKey(k);
        }

        void IDictionary.Add(object key, object value) { Add(AsKey(key), value); }

        void IDictionary.Remove(object key)
        {
            string k;
            if (TryConvertToKey(key, out k))
                Remove(k);
        }

        void ICollection.CopyTo(Array array, int index)
        {
            ((IDictionary)InnerDictionary).CopyTo(array, index);
        }

        public void CopyTo(KeyValuePair<string, object>[] array, int arrayIndex)
        {
            ((IDictionary<string, object>)InnerDictionary).CopyTo(array, arrayIndex);
        }

        bool ICollection<KeyValuePair<string, object>>.Remove(KeyValuePair<string, object> item)
        {
            if (item.Key != null && item.Value != null)
            {
                Monitor.Enter(_syncRoot);
                try
                {
                    if (InnerDictionary.ContainsKey(item.Key) && ((item.Value.GetType().IsClass) ? Object.ReferenceEquals(item.Value, InnerDictionary[item.Key]) : item.Value.Equals(InnerDictionary[item.Key])))
                        return Remove(item.Key);
                }
                finally { Monitor.Exit(_syncRoot); }
            }
            return false;
        }
    }



    public abstract class JsTypeDefinitionBase<TDictionary, TMember> : JsTypeDefinitionBase<TDictionary>
        where TDictionary : class, IDictionary<string, object>, IDictionary, new()
    {
        protected readonly MemberCollection InnerMembers;
        protected JsTypeDefinitionBase() : base() { }

        protected JsTypeDefinitionBase(TDictionary innerDictionary) : base(innerDictionary)
        {
            InnerMembers = new MemberCollection(this);
        }

        public class MemberCollection : IList<TMember>, IList
        {
            private readonly JsTypeDefinitionBase<TDictionary, TMember> _source;
            
            internal MemberCollection(JsTypeDefinitionBase<TDictionary, TMember> source)
            {
                if (source == null)
                    throw new ArgumentNullException("source");
                if (source.InnerMembers != null)
                    throw new InvalidOperationException();
                _source = source;
            }

            public TMember this[int index] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

            public int Count {
                get
                {
                    Monitor.Enter(_source.SyncRoot);
                    try
                    {
                        IEnumerable<TMember> items = GetEnumerable();
                        if (items == null)
                            return 0;
                        if (items is TMember[])
                            return ((TMember[])items).Length;
                        return ((List<TMember>)items).Count;
                    }
                    finally { Monitor.Exit(_source.SyncRoot); }
                }
            }

            public void Add(TMember item)
            {
                Monitor.Enter(_source.SyncRoot);
                try
                {
                    IEnumerable<TMember> list = GetEnumerable();
                    if (list == null)
                    {
                        _source.OnInsertMember(0, item);
                        _source.InnerDictionary.Add(ReadOnlyElementName_members, new TMember[] { item });
                    }
                    else
                    {
                        List<TMember> members;
                        if (list is TMember[])
                        {
                            _source.OnInsertMember(((TMember[])list).Length, item);
                            members = new List<TMember>();
                            members.AddRange(list);
                        }
                        else
                        {
                            members = (List<TMember>)list;
                            _source.OnInsertMember(members.Count, item);
                        }
                        members.Add(item);
                        _source.InnerDictionary[ReadOnlyElementName_members] = members;
                    }
                }
                finally { Monitor.Exit(_source.SyncRoot); }
            }

            public void Clear()
            {
                Monitor.Enter(_source.SyncRoot);
                try
                {
                    if (!(_source.InnerDictionary.ContainsKey(ReadOnlyElementName_members)))
                        throw new IndexOutOfRangeException();
                    IList<TMember> list = _source.InnerDictionary[ReadOnlyElementName_members];
                    List<TMember> list = new List<TMember>();
                    list.AddRange((TMember[])_source.InnerDictionary[ReadOnlyElementName_members]);
                    
                    for (int index = list.Count - 1; index > -1; index--)
                    {
                        if (_source.OnRemoveMember(index, list[index]))
                            list.RemoveAt(index);
                    }
                    if (list.Count == 0)
                        _source.InnerDictionary.Remove(ReadOnlyElementName_members);
                    else
                        _source.InnerDictionary[ReadOnlyElementName_members] = list.ToArray();
                }
                finally { Monitor.Exit(_source.SyncRoot); }
            }

            public bool Contains(TMember item)
            {
                throw new NotImplementedException();
            }

            public void CopyTo(TMember[] array, int arrayIndex)
            {
                throw new NotImplementedException();
            }

            public IEnumerator<TMember> GetEnumerator()
            {
                throw new NotImplementedException();
            }

            public int IndexOf(TMember item)
            {
                throw new NotImplementedException();
            }

            public void Insert(int index, TMember item)
            {
                Monitor.Enter(_source.SyncRoot);
                try
                {
                    if (!(_source.InnerDictionary.ContainsKey(ReadOnlyElementName_members) && index < ((TMember[])_source.InnerDictionary[ReadOnlyElementName_members]).Length))
                        throw new IndexOutOfRangeException();
                    _source.OnInsertMember(index, item);
                    List<TMember> list = new List<TMember>();
                    list.AddRange((TMember[])_source.InnerDictionary[ReadOnlyElementName_members]);
                    list.Insert(index, item);
                    _source.InnerDictionary[ReadOnlyElementName_members] = list.ToArray();
                }
                finally { Monitor.Exit(_source.SyncRoot); }
            }

            public bool Remove(TMember item)
            {
                if (item != null)
                {
                    Monitor.Enter(_source.SyncRoot);
                    try
                    {
                        if (_source.InnerDictionary.ContainsKey(ReadOnlyElementName_members))
                        {
                            List<TMember> list = new List<TMember>();
                            list.AddRange((TMember[])_source.InnerDictionary[ReadOnlyElementName_members]);
                            int index = list.IndexOf(item);
                            if (index > -1 && _source.OnRemoveMember(index, item) && list.Remove(item))
                            {
                                if (list.Count == 0)
                                    _source.InnerDictionary.Remove(ReadOnlyElementName_members);
                                else
                                    _source.InnerDictionary[ReadOnlyElementName_members] = list.ToArray();
                                return true;
                            }
                        }
                    }
                    finally { Monitor.Exit(_source.SyncRoot); }
                }
                return false;
            }

            public void RemoveAt(int index)
            {
                Monitor.Enter(_source.SyncRoot);
                try
                {
                    if (_source.InnerDictionary.ContainsKey(ReadOnlyElementName_members))
                    {
                        List<TMember> list = new List<TMember>();
                        list.AddRange((TMember[])_source.InnerDictionary[ReadOnlyElementName_members]);
                        if (_source.OnRemoveMember(index, list[index]))
                        {
                            if (list.Count == 0)
                                _source.InnerDictionary.Remove(ReadOnlyElementName_members);
                            else
                                _source.InnerDictionary[ReadOnlyElementName_members] = list.ToArray();
                            return;
                        }
                    }
                }
                finally { Monitor.Exit(_source.SyncRoot); }
                throw new ArgumentOutOfRangeException("index");
            }

            object IList.this[int index] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

            bool ICollection<TMember>.IsReadOnly => throw new NotImplementedException();

            bool IList.IsReadOnly => throw new NotImplementedException();

            bool IList.IsFixedSize => throw new NotImplementedException();

            object ICollection.SyncRoot => throw new NotImplementedException();

            bool ICollection.IsSynchronized => throw new NotImplementedException();

            int IList.Add(object value)
            {
                throw new NotImplementedException();
            }

            bool IList.Contains(object value)
            {
                throw new NotImplementedException();
            }

            IEnumerator IEnumerable.GetEnumerator()
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

            void ICollection.CopyTo(Array array, int index)
            {
                throw new NotImplementedException();
            }
        }

        private bool OnRemoveMember(int index, TMember item)
        {
            throw new NotImplementedException();
        }

        private void OnInsertMember(int index, TMember item)
        {
            throw new NotImplementedException();
        }
    }

    public class NamespaceDefinition : JsTypeDefinitionBase<Dictionary<string, object>>
    {

        public NamespaceDefinition(string name)
        {
            if (name == null)
                throw new ArgumentNullException("name");
            int i = name.IndexOf(".");
            if (i == 0)
                throw new ArgumentOutOfRangeException("Name cannot be empty");
            if (i < 0)
                InnerDictionary.Add(ReadOnlyElementName_namespace, name);
            else
            {
                InnerDictionary.Add(ReadOnlyElementName_namespace, name.Substring(0, i));

            }

            public ReadOnlyCollection<object> members()
            {
                object[] members;
                Monitor.Enter(SyncRoot);
                try
                {
                    if (InnerDictionary.ContainsKey(ReadOnlyElementName_members))
                }
                finally { Monitor.Exit(SyncRoot); }

            }
        }
    }
    public class JsDocProperty
    {

    }
    public class JsNamespace : JsDocElement
    {
    }
}
