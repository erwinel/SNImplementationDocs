
namespace UriHelper
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using System.Management.Automation;
    using System.Management.Automation.Host;
    using System.Text;
    using System.Threading;
    public class ChoiceOption : IEquatable<ChoiceOption>
    {
        private bool _isSelected;
        private bool _isDefaultChoice;
        private ChoiceDescription _description;
        private PSObject _value;
        public bool IsDefaultChoice { get { return _isDefaultChoice; } set { _isDefaultChoice = value; } }
        public bool IsSelected { get { return _isSelected; } set { _isSelected = value; } }
        public string Label { get { return _description.Label; } }
        public PSObject Value { get { return _value; } set { _value = value; } }
        public string HelpMessage { get { return _description.HelpMessage; } set { _description.HelpMessage = value; } }
        public ChoiceOption(PSObject value) : this(false, value) { }
        public ChoiceOption(bool isDefaultChoice, PSObject value)
        {
            if (value == null)
                throw new ArgumentNullException("value");
            if (value.BaseObject is ChoiceDescription)
                _description = (ChoiceDescription)value.BaseObject;
            else if (value.BaseObject is string)
                _description = new ChoiceDescription((string)value.BaseObject);
            else
            {
                string label;
                if (!LanguagePrimitives.TryConvertTo(value, out label))
                    throw new ArgumentException("Unable to convert value to string", "value");
                _description = new ChoiceDescription(label);
            }
            _value = value;
            _isDefaultChoice = isDefaultChoice;
        }
        public ChoiceOption(string label, PSObject value) : this(false, label, value) { }
        public ChoiceOption(bool isDefaultChoice, string label, PSObject value)
        {
            _description = new ChoiceDescription(label);
            _value = value;
            _isDefaultChoice = isDefaultChoice;
        }
        public ChoiceOption(ChoiceDescription choiceDescription, PSObject value) : this(false, choiceDescription, value) { }
        public ChoiceOption(bool isDefaultChoice, ChoiceDescription choiceDescription, PSObject value)
        {
            if (choiceDescription == null)
                throw new ArgumentNullException("choiceDescription");
            if (value.BaseObject is ChoiceDescription)
                _description = choiceDescription;
            _value = value;
            _isDefaultChoice = isDefaultChoice;
        }
        public ChoiceOption(string label, string helpMessage, PSObject value) : this(false, label, helpMessage, value) { }
        public ChoiceOption(bool isDefaultChoice, string label, string helpMessage, PSObject value)
        {
            _description = new ChoiceDescription(label, helpMessage);
            _value = value;
            _isDefaultChoice = isDefaultChoice;
        }
        public static bool TryGetInstanceValue<T>(PSObject psObj, string name, out T value)
        {
            object obj;
            if (TryGetInstanceObject(psObj, name, out obj))
            {
                if (obj != null)
                    return LanguagePrimitives.TryConvertTo<T>(obj, out value);
                value = default(T);
                return ((object)value == null);
            }
            value = default(T);
            return false;
        }
        public static bool TryGetInstancePSObject(PSObject psObj, string name, out PSObject result)
        {
            object obj;
            if (TryGetInstanceObject(psObj, name, out obj))
            {
                result = (obj == null || obj is PSObject) ? (PSObject)obj : PSObject.AsPSObject(obj);
                return true;
            }
            result = null;
            return false;
        }
        public static bool TryGetInstanceObject(PSObject psObj, string name, out object obj)
        {
            PSPropertyInfo property = psObj.Properties.FirstOrDefault(p => p.IsInstance && string.Equals(p.Name, name, StringComparison.CurrentCulture));
            if (property == null)
            {
                property = psObj.Properties.FirstOrDefault(p => p.IsInstance && string.Equals(p.Name, name, StringComparison.InvariantCultureIgnoreCase));
                if (property == null)
                {
                    if (psObj.BaseObject is IDictionary)
                    {
                        IDictionary dict = (IDictionary)psObj.BaseObject;
                        string key = dict.Keys.OfType<string>().FirstOrDefault(k => string.Equals(k, name, StringComparison.CurrentCulture));
                        if (key == null)
                            key = dict.Keys.OfType<string>().FirstOrDefault(k => string.Equals(k, name, StringComparison.InvariantCultureIgnoreCase));
                        if (key != null)
                        {
                            obj = dict[key];
                            return true;
                        }
                    }
                    obj = null;
                    return false;
                }
            }

            obj = property.Value;
            return true;
        }
        public static ChoiceOption AsChoiceOption(object obj)
        {
            if (obj == null || obj is ChoiceOption)
                return (ChoiceOption)obj;
            object baseObject;
            PSObject psObj;
            if (obj is PSObject)
            {
                baseObject = (psObj = (PSObject)obj).BaseObject;
                if (baseObject is ChoiceOption)
                    return (ChoiceOption)baseObject;
            }
            else
                psObj = PSObject.AsPSObject(baseObject = obj);
            PSObject value;
            bool isDefaultChoice;
            if (!(TryGetInstanceValue<bool>(psObj, "IsSelected", out isDefaultChoice) || TryGetInstanceValue<bool>(psObj, "IsDefaultChoice", out isDefaultChoice) || TryGetInstanceValue<bool>(psObj, "DefaultChoice", out isDefaultChoice)))
                isDefaultChoice = false;
            if (!TryGetInstancePSObject(psObj, "Value", out value))
                value = psObj;
            if (baseObject is ChoiceDescription)
                return new ChoiceOption(isDefaultChoice, (ChoiceDescription)baseObject, value);
            if (baseObject is string)
                return new ChoiceOption(isDefaultChoice, (string)baseObject, value);
            string label;
            if (!TryGetInstanceValue<string>(psObj, "Label", out label) || (label = label.Trim()).Length == 0)
            {
                if (!LanguagePrimitives.TryConvertTo<string>(psObj, out label) || (label = label.Trim()).Length == 0)
                    throw new ArgumentException("Label cannot be empty", "obj");
            }
            string helpMessage;
            if ((TryGetInstanceValue<string>(psObj, "HelpMessage", out helpMessage) || TryGetInstanceValue<string>(psObj, "Description", out helpMessage)) && (helpMessage = helpMessage.Trim()).Length > 0)
                return new ChoiceOption(isDefaultChoice, label, helpMessage, value);
            return new ChoiceOption(isDefaultChoice, label, value);
        }
        public static IEnumerable<ChoiceOption> AsChoiceOptions(object choices)
        {
            if (choices != null)
            {
                object obj = (choices is PSObject) ? ((PSObject)choices).BaseObject : choices;
                if (obj is IEnumerable && !(obj is string || obj is IDictionary))
                {
                    foreach (object o in (IEnumerable)obj)
                        yield return AsChoiceOption(o);
                }
                else
                    yield return AsChoiceOption(choices);
            }
        }
        public static Collection<PSObject> GetSelectedValues(IEnumerable<ChoiceOption> choices, bool resetSelection)
        {
            Collection<PSObject> result = new Collection<PSObject>();
            if (choices != null)
            {
                choices = choices.Where(c => c != null).Distinct();
                foreach (ChoiceOption o in choices)
                    if (o.IsSelected)
                        result.Add(o.Value);
                if (resetSelection)
                    foreach (ChoiceOption o in choices)
                        o.IsSelected = o.IsDefaultChoice;
            }
            return result;
        }
        public static bool TryGetFirstSelectedValue(IEnumerable<ChoiceOption> choices, bool resetSelection, out PSObject result)
        {
            if (choices != null)
            {
                choices = choices.Where(c => c != null).Distinct();
                ChoiceOption selectedOption = choices.FirstOrDefault(c => c.IsSelected);
                if (resetSelection)
                    foreach (ChoiceOption o in choices)
                        if (o != null)
                            o.IsSelected = o.IsDefaultChoice;
                if (selectedOption != null)
                {
                    result = selectedOption.Value;
                    return true;
                }
            }
            result = null;
            return false;
        }
        public static bool TryPromptForMultiChoice(PSHostUserInterface ui, string caption, string message, IEnumerable<ChoiceOption> choices)
        {
            if (ui == null)
                throw new ArgumentNullException("ui");
            if (choices != null)
            {
                ChoiceOption[] options = choices.Where(c => c != null).Distinct().ToArray();
                if (options.Length > 0)
                {
                    if (ui is IHostUISupportsMultipleChoiceSelection)
                    {
                        Collection<ChoiceDescription> choiceColl = new Collection<ChoiceDescription>(options.Select(o => o._description).ToList());
                        Collection<int> selected = ((IHostUISupportsMultipleChoiceSelection)ui).PromptForChoice(caption, message, choiceColl, options.Select((c, i) => (c.IsSelected) ? i : -1).Where(i => i > -1));
                        if (selected != null && selected.Count > 0)
                        {
                            for (int i = 0; i < options.Length; i++)
                                options[i].IsSelected = selected.Contains(i);
                            return true;
                        }
                        return false;
                    }
                    ui.WriteErrorLine("Host UI does not support multiple choice selection");
                }
            }
            ui.WriteWarningLine("Nothing to select.");
            return false;
        }
        public static bool TryPromptForChoice(PSHostUserInterface ui, string caption, string message, IEnumerable<ChoiceOption> choices)
        {
            if (ui == null)
                throw new ArgumentNullException("ui");
            if (choices != null)
            {
                ChoiceOption[] options = choices.Where(c => c != null).Distinct().ToArray();
                if (options.Length > 0)
                {
                    Collection<ChoiceDescription> choiceColl = new Collection<ChoiceDescription>(options.Select(o => o._description).ToList());
                    int index = 0;
                    for (int i = 0; i < options.Length; i++)
                    {
                        if (options[i].IsSelected)
                        {
                            index = i;
                            break;
                        }
                    }
                    index = ui.PromptForChoice(caption, message, choiceColl, index);
                    if (index > -1 && index < options.Length)
                    {
                        for (int i = 0; i < options.Length; i++)
                            options[i].IsSelected = i == index;
                        return true;
                    }
                    return false;
                }
            }
            ui.WriteWarningLine("Nothing to select.");
            return false;
        }
        public bool Equals(ChoiceOption other)
        {
            if (other == null)
                return false;
            if (ReferenceEquals(this, other))
                return true;
            return _isDefaultChoice == other._isDefaultChoice && _description.Label == other._description.Label &&
                ((string.IsNullOrEmpty(other._description.HelpMessage)) ? string.IsNullOrEmpty(_description.HelpMessage) : !string.IsNullOrEmpty(_description.HelpMessage) && _description.HelpMessage == other._description.HelpMessage) &&
                ((_value == null) ? other._value != null : other._value == null || !LanguagePrimitives.Equals(_value, other._value));
        }
        public override bool Equals(object obj) { return obj != null && obj is ChoiceOption && Equals((ChoiceOption)obj); }
        public override int GetHashCode() { return ToString().GetHashCode(); }
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append((_isSelected) ? "[X]" : "[ ]").Append(" \"").Append(_description.Label.Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\r", "\\r").Replace("\n", "\\n")).Append("\"=");
            if (_value == null)
            {
                if (string.IsNullOrEmpty(_description.HelpMessage))
                    return sb.Append("null").ToString();
                return sb.AppendLine("null").Append(_description.HelpMessage).ToString();
            }
            if (_value.BaseObject is string)
            {
                sb.Append("\"").Append(_value.ToString().Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\r", "\\r").Replace("\n", "\\n"));
                if (string.IsNullOrEmpty(_description.HelpMessage))
                    return sb.Append("\"").ToString();
                return sb.AppendLine("\"").Append(_description.HelpMessage).ToString();
            }
            
            if (string.IsNullOrEmpty(_description.HelpMessage))
                return sb.Append(_value.ToString().Replace("\\", "\\\\").Replace("\r", "\\r").Replace("\n", "\\n")).ToString();
            return sb.AppendLine(_value.ToString().Replace("\\", "\\\\").Replace("\r", "\\r").Replace("\n", "\\n")).Append(_description.HelpMessage).ToString();
        }
        public static bool TestChoiceOption(object obj, PSHostUserInterface ui)
        {
            if (obj == null)
            {
                if (ui != null)
                    ui.WriteErrorLine("Value cannot be null.");
                return false;
            }

            object baseObject;
            PSObject psObj;
            if (obj is PSObject)
                baseObject = (psObj = (PSObject)obj).BaseObject;
            else
                psObj = PSObject.AsPSObject(baseObject = obj);
            if (baseObject is ChoiceDescription || baseObject is ChoiceOption)
                return true;
            if (baseObject is string)
            {
                if (((string)baseObject).Trim().Length > 0)
                    return true;
                if (ui != null)
                    ui.WriteErrorLine("String value cannot be empty.");
            }
            else
            {
                string label;
                if (TryGetInstanceValue<string>(psObj, "Label", out label))
                {
                    if ((label = label.Trim()).Length > 0 || (LanguagePrimitives.TryConvertTo<string>(psObj, out label) && (label = label.Trim()).Length > 0))
                        return true;
                    if (ui != null)
                        ui.WriteErrorLine("Label cannot be empty");
                }
                else
                {
                    if (LanguagePrimitives.TryConvertTo<string>(psObj, out label) && (label = label.Trim()).Length > 0)
                        return true;
                    if (ui != null)
                        ui.WriteErrorLine("Value cannot be empty");
                }
            }
            return false;
        }
    }
    public abstract class Synchronizable
    {
        private readonly object _syncRoot;
        protected Synchronizable() { _syncRoot = new object(); }
        protected Synchronizable(Synchronizable sync) { _syncRoot = (sync == null) ? new object() : sync._syncRoot; }
        public static object GetSyncRoot(Synchronizable target) { return (target == null) ? null : target._syncRoot; }
        public void InvokeSync(Action action)
        {
            Monitor.Enter(_syncRoot);
            try { action(); }
            finally { Monitor.Exit(_syncRoot); }
        }
        public void InvokeSync<T>(Action<T> action, T arg)
        {
            Monitor.Enter(_syncRoot);
            try { action(arg); }
            finally { Monitor.Exit(_syncRoot); }
        }
        public bool TryInvokeSync(Action action)
        {
            if (!Monitor.TryEnter(_syncRoot))
                return false;
            try { action(); }
            finally { Monitor.Exit(_syncRoot); }
            return true;
        }
        public bool TryInvokeSync<T>(Action<T> action, T arg)
        {
            if (!Monitor.TryEnter(_syncRoot))
                return false;
            try { action(arg); }
            finally { Monitor.Exit(_syncRoot); }
            return true;
        }
        public T GetSync<T>(Func<T> func)
        {
            Monitor.Enter(_syncRoot);
            try { return func(); }
            finally { Monitor.Exit(_syncRoot); }
        }
        public TResult GetSync<TArg, TResult>(Func<TArg, TResult> func, TArg arg)
        {
            Monitor.Enter(_syncRoot);
            try { return func(arg); }
            finally { Monitor.Exit(_syncRoot); }
        }
        public bool TryGetSync<T>(Func<T> func, out T result)
        {
            if (!Monitor.TryEnter(_syncRoot))
            {
                result = default(T);
                return false;
            }
            try { result = func(); }
            finally { Monitor.Exit(_syncRoot); }
            return true;
        }
        public bool TryGetSync<TArg, TResult>(Func<TArg, TResult> func, TArg arg, out TResult result)
        {
            if (!Monitor.TryEnter(_syncRoot))
            {
                result = default(TResult);
                return false;
            }
            try { result = func(arg); }
            finally { Monitor.Exit(_syncRoot); }
            return true;
        }
    }
    public class UriQueryParameter : Synchronizable, IEquatable<UriQueryParameter>
    {
        private readonly object _syncRoot;
        private Collection.KeyGroup _group;
        private string _value;
        private string _key;
        private UriQueryParameter _previousParameter = null;
        private UriQueryParameter _nextParameter = null;
        private UriQueryParameter _previousGrouped = null;
        private UriQueryParameter _nextGrouped = null;
        public string Key
        {
            get { return GetSync(() => (_key == null) ? _group.Key : _key); }
            set
            {
                if (value == null)
                    throw new ArgumentNullException();
                Collection.KeyGroup.SetKey(this, value);
            }
        }
        public string Value
        {
            get { return _value; }
            set { Collection.KeyGroup.SetValue(this, value); }
        }
        private UriQueryParameter(string key, string value, Collection.KeyGroup group)
        {
            if (group == null)
                throw new ArgumentNullException("group");
            _group = group;
            _value = value;
            _key = (key == group.Key) ? null : key;
        }
        public bool Equals(UriQueryParameter other)
        {
            if (other == null)
                return false;
            if (ReferenceEquals(this, other))
                return true;
            return GetSync(() =>
            {
                return other.GetSync(() =>
                {
                    if (_value == null)
                        return other._value == null;
                    if (other._value == null || _value != other._value)
                        return false;
                    if (_group == null)
                        return other._group == null;
                    return other._group != null && _group.GetSync(() =>
                    {
                        return other._group.GetSync(() =>
                        {
                            if (_group.Parent == null)
                            {
                                if (other._group.Parent == null)
                                    return Key == other.Key;
                                return other._group.Parent.KeyComparer.Equals(Key, other.Key);
                            }
                            if (other._group.Parent == null)
                                return _group.Parent.KeyComparer.Equals(Key, other.Key);
                            if (ReferenceEquals(_group.Parent, other._group.Parent))
                                return false;
                            return _group.Parent.KeyComparer.Equals(Key, other.Key) &&
                                (ReferenceEquals(_group.Parent.KeyComparer, other._group.Parent.KeyComparer) || other._group.Parent.KeyComparer.Equals(Key, other.Key));
                        });
                    });
                });
            });
        }
        public override bool Equals(object obj) { return obj != null && obj is UriQueryParameter && Equals((UriQueryParameter)obj); }
        public override int GetHashCode() { return ToString().GetHashCode(); }
        public override string ToString()
        {
            string value = _value;
            string key = _key;
            if (key == null)
            {
                Collection.KeyGroup g = _group;
                key = (g == null) ? GetSync(() => (_group == null) ? ((key == null) ? "" : key) : _group.Key) : g.Key;
            }
            return (value == null) ? Uri.EscapeDataString(key) : Uri.EscapeDataString(key) + "=" + Uri.EscapeDataString(value);
        }
        public class Collection : Synchronizable, IList<UriQueryParameter>, IDictionary<string, string>, IList, IDictionary
        {
            private IEqualityComparer<string> _keyComparer;
            private UriQueryParameter _firstParameter = null;
            private UriQueryParameter _lastParameter = null;
            private int _parameterCount = 0;
            private KeyGroup _firstGroup = null;
            private KeyGroup _lastGroup = null;
            private int _groupCount = 0;
            public UriQueryParameter this[int index] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
            public string this[string key] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
            object IList.this[int index] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
            object IDictionary.this[object key] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
            public int Count { get { return _parameterCount; } }
            bool IList.IsFixedSize => throw new NotImplementedException();
            bool IDictionary.IsFixedSize => throw new NotImplementedException();
            bool ICollection<UriQueryParameter>.IsReadOnly => throw new NotImplementedException();
            bool ICollection<KeyValuePair<string, string>>.IsReadOnly => throw new NotImplementedException();
            bool IList.IsReadOnly => throw new NotImplementedException();
            bool IDictionary.IsReadOnly => throw new NotImplementedException();
            bool ICollection.IsSynchronized => throw new NotImplementedException();
            public IEqualityComparer<string> KeyComparer { get { return _keyComparer; } }
            public int KeyCount { get { return _groupCount; } }
            public KeyGroup.KeyCollection Keys => throw new NotImplementedException();
            ICollection<string> IDictionary<string, string>.Keys => throw new NotImplementedException();
            ICollection IDictionary.Keys => throw new NotImplementedException();
            public KeyGroup.ValueCollection Values => throw new NotImplementedException();
            ICollection<string> IDictionary<string, string>.Values => throw new NotImplementedException();
            ICollection IDictionary.Values => throw new NotImplementedException();
            object ICollection.SyncRoot => throw new NotImplementedException();
            public Collection() : this(null, false) { }
            public Collection(string encodedParameters) : this(encodedParameters, false) { }
            public Collection(bool caseSensitive) : this(null, caseSensitive) { }
            public Collection(EqualityComparer<string> keyComparer) : this(null, keyComparer) { }
            public Collection(string encodedParameters, bool caseSensitive) : this(encodedParameters, (caseSensitive) ? StringComparer.InvariantCulture : StringComparer.InvariantCultureIgnoreCase) { }
            public Collection(string encodedParameters, IEqualityComparer<string> keyComparer)
            {
                _keyComparer = (keyComparer == null) ? StringComparer.InvariantCultureIgnoreCase : keyComparer;
                if (string.IsNullOrEmpty(encodedParameters))
                    return;
                char[] eq = new char[] { '=' };
                foreach (string[] kvp in ((encodedParameters[0] == '?') ? encodedParameters.Substring(1) : encodedParameters).Split('&').Select(s => s.Split(eq, 2)))
                    Add(Uri.UnescapeDataString(kvp[0]), (kvp.Length == 1) ? null : Uri.UnescapeDataString(kvp[1]));
            }
            public void Add(string key, string value)
            {
                throw new NotImplementedException();
            }
            void ICollection<UriQueryParameter>.Add(UriQueryParameter item)
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
            public bool Contains(UriQueryParameter item)
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
            public bool ContainsKey(string key)
            {
                throw new NotImplementedException();
            }
            bool IDictionary.Contains(object key)
            {
                throw new NotImplementedException();
            }
            public void CopyTo(UriQueryParameter[] array, int arrayIndex)
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
            public IEnumerator<UriQueryParameter> GetEnumerator()
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
            public Collection<string> GetValues(string key)
            {
                throw new NotImplementedException();
            }
            public int IndexOf(UriQueryParameter item)
            {
                throw new NotImplementedException();
            }
            int IList.IndexOf(object value)
            {
                throw new NotImplementedException();
            }
            public int IndexOfKey(string key)
            {
                throw new NotImplementedException();
            }
            public void Insert(int index, string key, string value)
            {
                throw new NotImplementedException();
            }
            void IList<UriQueryParameter>.Insert(int index, UriQueryParameter item)
            {
                throw new NotImplementedException();
            }
            void IList.Insert(int index, object value)
            {
                throw new NotImplementedException();
            }
            public bool Remove(UriQueryParameter item)
            {
                throw new NotImplementedException();
            }
            bool ICollection<KeyValuePair<string, string>>.Remove(KeyValuePair<string, string> item)
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
            public class KeyGroup : Synchronizable, IList<string>, IList
            {
                private string _key;
                private int _count;
                private Collection _collection = null;
                private KeyGroup _previousGroup = null;
                private KeyGroup _nextGroup = null;
                private UriQueryParameter _firstGrouped = null;
                private UriQueryParameter _lastGrouped = null;
                public string Key { get { return _key; } }
                public Collection Parent { get { return _collection; } }
                public string this[int index] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
                object IList.this[int index] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
                public int Count { get { return _count; } }
                bool IList.IsFixedSize => throw new NotImplementedException();
                bool ICollection<string>.IsReadOnly => throw new NotImplementedException();
                bool IList.IsReadOnly => throw new NotImplementedException();
                bool ICollection.IsSynchronized => throw new NotImplementedException();
                object ICollection.SyncRoot => throw new NotImplementedException();
                private KeyGroup(string key, string value, Collection collection)
                {
                    if (key == null)
                        throw new ArgumentNullException("key");
                    if (collection == null)
                        throw new ArgumentNullException("collection");
                    _key = key;
                    collection.InvokeSync(() =>
                    {
                        for (KeyGroup g = collection._firstGroup; g != null; g = g._nextGroup)
                        {
                            if (collection._keyComparer.Equals(g._key, key))
                                throw new InvalidOperationException("A group with that key already exists.");
                        }
                        _firstGrouped = _lastGrouped = new UriQueryParameter(key, value, this);
                        if ((_previousGroup = collection._lastGroup) == null)
                        {
                            collection._groupCount = collection._parameterCount = 1;
                            collection._firstGroup = this;
                            collection._firstParameter = collection._lastParameter = _lastGrouped;
                        }
                        else
                        {
                            collection._groupCount++;
                            _previousGroup.InvokeSync(() => _previousGroup._nextGroup = this);
                            if ((_lastGrouped._previousParameter = collection._lastParameter) == null)
                            {
                                collection._parameterCount = 1;
                                collection._firstParameter = _lastGrouped;
                            }
                            else
                            {
                                collection._parameterCount++;
                                _lastGrouped._previousParameter._nextParameter = _lastGrouped;
                            }
                            collection._lastParameter = _lastGrouped;
                        }
                        collection._lastGroup = this;
                        _count = 1;
                    });
                    _collection = collection;
                }
                public int Add(string item)
                {
                    return GetSync(() =>
                    {
                        UriQueryParameter previousGrouped = _lastGrouped;
                        if (previousGrouped == null)
                        {
                            _firstGrouped = _lastGrouped = new UriQueryParameter(_key, item, this);
                            _count = 1;
                            if (_collection != null)
                                _collection.InvokeSync(() =>
                                {
                                    if ((_lastGrouped._previousParameter = _collection._lastParameter) == null)
                                    {
                                        _collection._parameterCount = 1;
                                        _collection._firstParameter = _lastGrouped;
                                    }
                                    else
                                    {
                                        _collection._parameterCount++;
                                        _lastGrouped._previousParameter._nextParameter = _lastGrouped;
                                    }
                                    _collection._lastParameter = _lastGrouped;
                                });
                            return 0;
                        }
                        int result = _count;
                        (previousGrouped._nextGrouped = _lastGrouped = new UriQueryParameter(_key, item, this))._previousGrouped = previousGrouped;
                        _count++;
                        if (_collection != null)
                            _collection.InvokeSync(() =>
                            {
                                _collection._parameterCount++;
                                _collection._lastParameter = (_lastGrouped._previousParameter = _collection._lastParameter)._nextParameter = _lastGrouped;
                            });
                        return result;
                    });
                }
                void ICollection<string>.Add(string item) { Add(item); }
                int IList.Add(object value) { return Add((value == null) ? null : (string)LanguagePrimitives.ConvertTo(value, typeof(string))); }
                public void Clear()
                {
                    InvokeSync(() =>
                    {
                        while (_firstGrouped != null)
                            _firstGrouped.InvokeSync(() => _Remove(_firstGrouped));
                        if (_collection != null)
                            _Remove(this);
                    });
                }
                public bool Contains(string item) {return GetSync(() => _Get(item) != null); }
                bool IList.Contains(object value)
                {
                    if (value == null)
                        return Contains(null);
                    string item;
                    return LanguagePrimitives.TryConvertTo<string>(value, out item) && Contains(item);
                }
                public void CopyTo(string[] array, int arrayIndex) { GetAllValues().ToList().CopyTo(array, arrayIndex); }
                void ICollection.CopyTo(Array array, int index) { GetAllValues().ToArray().CopyTo(array, index); }
                public IEnumerable<string> GetAllValues()
                {
                    using (GroupValueEnumerator enumerator = new GroupValueEnumerator(this))
                    {
                        while (enumerator.MoveNext())
                            yield return enumerator.Current;
                    }
                }
                public IEnumerator<string> GetEnumerator() { return new GroupValueEnumerator(this); }
                IEnumerator IEnumerable.GetEnumerator() { return new GroupValueEnumerator(this); }
                public int IndexOf(string item)
                {
                    return GetSync(() =>
                    {
                        using (GroupValueEnumerator enumerator = new GroupValueEnumerator(this))
                        {
                            if (item == null)
                                while (enumerator.MoveNext())
                                {
                                    if (enumerator.Current == null)
                                        return enumerator.Index;
                                }
                            else if (_collection == null)
                                while (enumerator.MoveNext())
                                {
                                    if (enumerator.Current != null && enumerator.Current.Equals(item))
                                        return enumerator.Index;
                                }
                            else
                                while (enumerator.MoveNext())
                                {
                                    if (enumerator.Current != null && _collection._keyComparer.Equals(item, enumerator.Current))
                                        return enumerator.Index;
                                }
                        }
                        return -1;
                    });
                }
                int IList.IndexOf(object value)
                {
                    if (value == null)
                        return IndexOf(null);
                    string item;
                    return (LanguagePrimitives.TryConvertTo<string>(value, out item)) ? IndexOf(item) : -1;
                }
                public void Insert(int index, string item)
                {
                    InvokeSync(() =>
                    {
                        UriQueryParameter next = _Get(index);
                        if (next == null)
                            throw new ArgumentOutOfRangeException("index");
                        UriQueryParameter p = new UriQueryParameter(_key, item, this);
                        if ((p._previousGrouped = next._previousGrouped) == null)
                            _firstGrouped = p;
                        else
                            p._previousGrouped._nextGrouped = p;
                        (next._previousGrouped = p)._nextGrouped = next;
                        _count++;
                        if (_collection != null)
                            _collection.InvokeSync(() =>
                            {
                                if ((p._previousParameter = next._previousParameter) == null)
                                    _collection._firstParameter = p;
                                else
                                    p._previousParameter._nextParameter = p;
                                (next._previousParameter = p)._nextParameter = next;
                                _collection._parameterCount++;
                            });

                    });
                }
                void IList.Insert(int index, object value)
                {
                    Insert(index, (value == null) ? null : (string)LanguagePrimitives.ConvertTo(value, typeof(string)));
                }
                public void RemoveAt(int index)
                {
                    InvokeSync(() =>
                    {
                        UriQueryParameter item = _Get(index);
                        if (item == null)
                            throw new ArgumentOutOfRangeException("index");
                        _Remove(item);
                    });
                }
                public bool Remove(string item)
                {
                    return GetSync(() =>
                    {
                        UriQueryParameter p = _Get(item);
                        if (p == null)
                            return false;
                        _Remove(p);
                        return true;
                    });
                }
                void IList.Remove(object value)
                {
                    if (value == null)
                        Remove(null);
                    string item;
                    if (LanguagePrimitives.TryConvertTo<string>(value, out item))
                        Remove(item);
                }
                private void _Remove(UriQueryParameter parameter)
                {
                    if (_collection != null)
                        _collection.InvokeSync(() =>
                        {
                            if (parameter._previousParameter == null)
                            {
                                if ((_collection._firstParameter = parameter._nextParameter) == null)
                                {
                                    _collection._lastParameter = null;
                                    _collection._parameterCount = 0;
                                    return;
                                }
                                parameter._nextParameter = parameter._nextParameter._previousParameter = null;
                            }
                            else
                            {
                                if ((parameter._previousParameter._nextParameter = parameter._nextParameter) == null)
                                    _collection._lastParameter = parameter._previousParameter;
                                else
                                {
                                    parameter._nextParameter._previousParameter = parameter._previousParameter;
                                    parameter._nextParameter = null;
                                }
                                parameter._previousParameter = null;
                            }
                            _collection._parameterCount--;
                        });
                    if (parameter._group == null)
                        return;
                    if (parameter._key == null)
                        parameter._key = _key;
                    parameter._group = null;
                    if (parameter._previousGrouped == null)
                    {
                        if ((_firstGrouped = parameter._nextGrouped) == null)
                        {
                            _lastGrouped = null;
                            _count = 0;
                            if (_collection != null)
                                _Remove(this);
                            return;
                        }
                        parameter._nextGrouped = parameter._nextGrouped._previousGrouped = null;
                        if (_firstGrouped._key != null)
                        {
                            for (UriQueryParameter p = _firstGrouped._nextGrouped; p != null; p = p._nextGrouped)
                            {
                                if (p._key == null)
                                    p._key = _key;
                                else if (p._key == _firstGrouped._key)
                                    p._key = null;
                            }
                            _key = _firstGrouped._key;
                            _firstGrouped._key = null;
                        }
                    }
                    else
                    {
                        if ((parameter._previousGrouped._nextGrouped = parameter._nextGrouped) == null)
                            _lastGrouped = parameter._previousGrouped;
                        else
                        {
                            parameter._nextGrouped._previousGrouped = parameter._previousGrouped;
                            parameter._nextGrouped = null;
                        }
                    }
                    _count--;
                }
                private static void _Remove(KeyGroup group)
                {
                    group._collection.InvokeSync((Collection collection) =>
                    {
                        group._collection = null;
                        if (group._previousGroup == null)
                        {
                            if ((collection._firstGroup = group._nextGroup) == null)
                            {
                                collection._firstGroup = collection._lastGroup = null;
                                collection._firstParameter = collection._lastParameter = null;
                                collection._groupCount = collection._parameterCount = 0;
                                using (GroupValueEnumerator enumerator = new GroupValueEnumerator(group))
                                    while (enumerator.MoveNext())
                                        enumerator.Parameter.InvokeSync(() => enumerator.Parameter._previousParameter = enumerator.Parameter._nextParameter = null);
                                return;
                            }
                            group._nextGroup = group._nextGroup._previousGroup = null;
                        }
                        else
                        {
                            if ((group._previousGroup._nextGroup = group._nextGroup) == null)
                                collection._lastGroup = group._previousGroup;
                            else
                            {
                                group._nextGroup._previousGroup = group._previousGroup;
                                group._nextGroup = null;
                            }
                            group._previousGroup = null;
                        }
                        using (GroupValueEnumerator enumerator = new GroupValueEnumerator(group))
                            while (enumerator.MoveNext())
                                enumerator.Parameter.InvokeSync(() =>
                                {
                                    if (enumerator.Parameter._previousParameter == null)
                                    {
                                        if ((collection._firstParameter = enumerator.Parameter._nextParameter) == null)
                                        {
                                            collection._lastParameter = null;
                                            collection._parameterCount = 0;
                                            return;
                                        }
                                        enumerator.Parameter._nextParameter = enumerator.Parameter._nextParameter._previousParameter = null;
                                    }
                                    else
                                    {
                                        if ((enumerator.Parameter._previousParameter._nextParameter = enumerator.Parameter._nextParameter) == null)
                                            collection._lastParameter = enumerator.Parameter._previousParameter;
                                        else
                                        {
                                            enumerator.Parameter._nextParameter._previousParameter = enumerator.Parameter._previousParameter;
                                            enumerator.Parameter._nextParameter = null;
                                        }
                                        enumerator.Parameter._previousParameter = null;
                                    }
                                    collection._parameterCount--;
                                });
                    }, group._collection);
                }

                private UriQueryParameter _Get(int index)
                {
                    if (index > -1 && index < _count)
                        using (GroupValueEnumerator enumerator = new GroupValueEnumerator(this))
                        {
                            while (enumerator.MoveNext())
                            {
                                if (enumerator.Index == index)
                                    return enumerator.Parameter;
                            }
                        }
                    return null;
                }
                private UriQueryParameter _Get(string value)
                {
                    using (GroupValueEnumerator enumerator = new GroupValueEnumerator(this))
                    {
                        if (value == null)
                            while (enumerator.MoveNext())
                            {
                                if (enumerator.Current == null)
                                    return enumerator.Parameter;
                            }
                        else if (_collection == null)
                            while (enumerator.MoveNext())
                            {
                                if (enumerator.Current != null && enumerator.Current.Equals(value))
                                    return enumerator.Parameter;
                            }
                        else
                            while (enumerator.MoveNext())
                            {
                                if (enumerator.Current != null && _collection._keyComparer.Equals(enumerator.Current, value))
                                    return enumerator.Parameter;
                            }
                    }
                    return null;
                }
                private KeyGroup _Get(Collection collection, string key)
                {
                    for (KeyGroup g = collection._firstGroup; g != null; g = g._nextGroup)
                    {
                        if (collection._keyComparer.Equals(g._key, key))
                            return g;
                    }
                    return null;
                }
                internal static void SetKey(UriQueryParameter parameter, string key)
                {
                    if (parameter == null)
                        throw new ArgumentNullException("parameter");
                    if (key == null)
                        throw new ArgumentNullException("key");
                    parameter.InvokeSync(() =>
                    {
                        if (parameter._group == null)
                        {
                            parameter._key = key;
                            return;
                        }
                        Collection collection = parameter._group.GetSync(() =>
                        {
                            if (parameter._group._collection == null)
                            {
                                if (key != parameter._group._key) // Should never happen, but just in case...
                                    throw new InvalidOperationException("Cannot change key of parameter that belongs to a group, but not a collection.");
                                parameter._key = null;
                                return null;
                            }
                            return parameter._group._collection.GetSync(() =>
                            {
                                if (parameter._group._collection.KeyComparer.Equals(parameter._group._key, key))
                                {
                                    if (key == parameter._group._key)
                                    {
                                        if (parameter._key == null)
                                            return null;
                                        parameter._key = null;
                                    }
                                    else if (parameter._previousGrouped == null)
                                    {
                                        for (UriQueryParameter p = parameter._nextGrouped; p != null; p = p._nextGrouped)
                                        {
                                            if (p._key == null)
                                                p._key = key;
                                            else if (p._key == key)
                                                p._key = null;
                                        }
                                        parameter._group._key = key;
                                        parameter._key = null;
                                    }
                                    else if (parameter._key == null || parameter._key != key)
                                        parameter._key = key;
                                    else
                                        return null;
                                    return parameter._group._collection;
                                }
                                KeyGroup g = _AppDomain(parameter._group._collection, key);
                            });
                        });
                        if (collection != null)
                            collection.RaiseParameterChanged(parameter);
                    });
                }

                internal static void SetValue(UriQueryParameter parameter, string value)
                {
                    if (parameter == null)
                        throw new ArgumentNullException("parameter");
                    if (parameter._group == null)
                    {
                        parameter._value = value;
                        return;
                    }
                    Collection collection = parameter._group.GetSync(() =>
                    {
                        if (parameter._group._collection == null)
                        {
                            parameter._value = value;
                            return null;
                        }
                        if ((parameter._value == null) ? value == null : value != null && value == parameter._value)
                            return null;

                        parameter._value = value;
                        return parameter._group._collection;
                    });
                    if (collection != null)
                        collection.RaiseParameterChanged(parameter);
                }

                public class KeyCollection : Synchronizable, ICollection<string>, ICollection
                {
                    public int Count => throw new NotImplementedException();
                    bool ICollection<string>.IsReadOnly { get { return true; } }
                    bool ICollection.IsSynchronized { get { return true; } }
                    object ICollection.SyncRoot { get { return Synchronizable.GetSyncRoot(this); } }
                    public bool Contains(string item)
                    {
                        throw new NotImplementedException();
                    }
                    public void CopyTo(string[] array, int arrayIndex)
                    {
                        throw new NotImplementedException();
                    }
                    public IEnumerator<string> GetEnumerator()
                    {
                        throw new NotImplementedException();
                    }
                    IEnumerator IEnumerable.GetEnumerator() { return GetEnumerator(); }
                    void ICollection<string>.Add(string item) { throw new NotSupportedException(); }
                    void ICollection<string>.Clear() { throw new NotSupportedException(); }
                    bool ICollection<string>.Remove(string item) { throw new NotSupportedException(); }
                    void ICollection.CopyTo(Array array, int index)
                    {
                        throw new NotImplementedException();
                    }
                }
                public class ValueCollection : Synchronizable, ICollection<string>, ICollection
                {
                    public int Count => throw new NotImplementedException();
                    bool ICollection<string>.IsReadOnly { get { return true; } }
                    bool ICollection.IsSynchronized { get { return true; } }
                    object ICollection.SyncRoot { get { return Synchronizable.GetSyncRoot(this); } }
                    public bool Contains(string item)
                    {
                        throw new NotImplementedException();
                    }
                    public void CopyTo(string[] array, int arrayIndex)
                    {
                        throw new NotImplementedException();
                    }
                    public IEnumerator<string> GetEnumerator()
                    {
                        throw new NotImplementedException();
                    }
                    IEnumerator IEnumerable.GetEnumerator() { return GetEnumerator(); }
                    void ICollection<string>.Add(string item) { throw new NotSupportedException(); }
                    void ICollection<string>.Clear() { throw new NotSupportedException(); }
                    bool ICollection<string>.Remove(string item) { throw new NotSupportedException(); }
                    void ICollection.CopyTo(Array array, int index)
                    {
                        throw new NotImplementedException();
                    }
                }
                public class DictionaryEnumerator : Synchronizable, IEnumerator<KeyGroup>, IEnumerator<string>, IEnumerator<KeyValuePair<string, string>>, IDictionaryEnumerator
                {
                    private KeyGroup _current = null;
                    private int _index = -1;
                    private Collection _collection;
                    private KeyValuePair<string, string>? _keyValuePair = null;
                    private DictionaryEntry? _entry = null;
                    public KeyGroup Current { get { return _current; } }
                    KeyValuePair<string, string> IEnumerator<KeyValuePair<string, string>>.Current
                    {
                        get
                        {
                            return GetSync(() =>
                            {
                                if (_collection == null)
                                    throw new ObjectDisposedException(typeof(ParameterEnumerator).FullName);
                                KeyValuePair<string, string>? kvp = _keyValuePair;
                                if (!kvp.HasValue)
                                {
                                    KeyGroup group = _current;
                                    if (group == null)
                                        kvp = new KeyValuePair<string, string>("", null);
                                    else
                                        kvp = group.GetSync(() =>
                                        {
                                            UriQueryParameter item = group._firstGrouped;
                                            return new KeyValuePair<string, string>(group._key, (item == null) ? null : item._value);
                                        });
                                }
                                _keyValuePair = kvp;
                                return kvp.Value;
                            });
                        }
                    }
                    string IEnumerator<string>.Current { get { return Key; } }
                    object IEnumerator.Current { get { return _current; } }
                    public int Index { get { return _index; } }
                    public string Key
                    {
                        get
                        {
                            return GetSync(() =>
                            {
                                if (_collection == null)
                                    throw new ObjectDisposedException(typeof(ParameterEnumerator).FullName);
                                if (_collection == null)
                                    throw new ObjectDisposedException(typeof(DictionaryEnumerator).FullName);
                                KeyGroup group = _current;
                                return (group == null) ? null : group._key;
                            });
                        }
                    }
                    object IDictionaryEnumerator.Key { get { return Key; } }
                    public string Value
                    {
                        get
                        {
                            return GetSync(() =>
                            {
                                if (_collection == null)
                                    throw new ObjectDisposedException(typeof(ParameterEnumerator).FullName);
                                KeyGroup g = _current;
                                if (g == null)
                                    return null;
                                return g.GetSync(() =>
                                {
                                    UriQueryParameter i = g._firstGrouped;
                                    return (i == null) ? null : i._value;
                                });
                            });
                        }
                    }
                    object IDictionaryEnumerator.Value { get { return Value; } }
                    public DictionaryEntry Entry
                    {
                        get
                        {
                            return GetSync(() =>
                            {
                                if (_collection == null)
                                    throw new ObjectDisposedException(typeof(ParameterEnumerator).FullName);
                                DictionaryEntry? e = _entry;
                                if (!e.HasValue)
                                {
                                    KeyGroup g = _current;
                                    if (g == null)
                                        e = new DictionaryEntry("", null);
                                    else
                                        e = g.GetSync(() =>
                                        {
                                            UriQueryParameter i = g._firstGrouped;
                                            return new DictionaryEntry(g._key, (i == null) ? null : i._value);
                                        });
                                }
                                _entry = e;
                                return e.Value;
                            });
                        }
                    }
                    public DictionaryEnumerator(Collection collection)
                        : base(collection)
                    {
                        if (collection == null)
                            throw new ArgumentNullException("collection");
                        _collection = collection;
                    }
                    public void Dispose()
                    {
                        InvokeSync(() =>
                        {
                            _collection = null;
                            _current = null;
                            _entry = null;
                            _keyValuePair = null;
                            _index = -1;
                        });
                    }
                    public bool MoveNext()
                    {
                        return GetSync(() =>
                        {
                            if (_collection == null)
                                throw new ObjectDisposedException(typeof(DictionaryEnumerator).FullName);
                            if (_current == null)
                                return (_current = _collection._firstGroup) != null;
                            return _current.GetSync(() =>
                            {
                                if (_current._collection != null && ReferenceEquals(_current._collection, _collection))
                                {
                                    if (_current._nextGroup == null)
                                        return false;
                                    _index++;
                                    _current = _current._nextGroup;
                                    return true;
                                }
                                throw new InvalidOperationException("Collection has changed.");
                            });
                        });
                    }
                    public void Reset()
                    {
                        InvokeSync(() =>
                        {
                            if (_collection == null)
                                throw new ObjectDisposedException(typeof(DictionaryEnumerator).FullName);
                            _current = null;
                            _entry = null;
                            _keyValuePair = null;
                            _index = -1;
                        });
                    }
                }
                public class ValueEnumerator : Synchronizable, IEnumerator<string>
                {
                    private KeyGroup _current = null;
                    private int _index = -1;
                    private Collection _collection;
                    public string Current
                    {
                        get
                        {
                            return GetSync(() =>
                            {
                                if (_collection == null)
                                    throw new ObjectDisposedException(typeof(ValueEnumerator).FullName);
                                KeyGroup g = _current;
                                if (g == null)
                                    return null;
                                return g.GetSync(() =>
                                {
                                    UriQueryParameter i = g._firstGrouped;
                                    return (i == null) ? null : i._value;
                                });
                            });
                        }
                    }
                    object IEnumerator.Current { get { return Current; } }
                    public int Index { get { return _index; } }
                    public ValueEnumerator(Collection collection)
                        : base(collection)
                    {
                        if (collection == null)
                            throw new ArgumentNullException("collection");
                        _collection = collection;
                    }
                    public void Dispose()
                    {
                        InvokeSync(() =>
                        {
                            _collection = null;
                            _current = null;
                            _index = -1;
                        });
                    }
                    public bool MoveNext()
                    {
                        return GetSync(() =>
                        {
                            if (_collection == null)
                                throw new ObjectDisposedException(typeof(ValueEnumerator).FullName);
                            if (_current == null)
                                return (_current = _collection._firstGroup) != null;
                            return _current.GetSync(() =>
                            {
                                if (_current._collection != null && ReferenceEquals(_current._collection, _collection))
                                {
                                    if (_current._nextGroup == null)
                                        return false;
                                    _index++;
                                    _current = _current._nextGroup;
                                    return true;
                                }
                                throw new InvalidOperationException("Collection has changed.");
                            });
                        });
                    }
                    public void Reset()
                    {
                        InvokeSync(() =>
                        {
                            if (_collection == null)
                                throw new ObjectDisposedException(typeof(ValueEnumerator).FullName);
                            _current = null;
                            _index = -1;
                        });
                    }
                }
                public class GroupValueEnumerator : Synchronizable, IEnumerator<string>
                {
                    private UriQueryParameter _current = null;
                    private int _index = -1;
                    private KeyGroup _group;
                    public string Current
                    {
                        get
                        {
                            return GetSync(() =>
                            {
                                if (_group == null)
                                    throw new ObjectDisposedException(typeof(GroupValueEnumerator).FullName);
                                UriQueryParameter i = _current;
                                return (i == null) ? null : i._value;
                            });
                        }
                    }
                    public UriQueryParameter Parameter { get { return _current; } }
                    object IEnumerator.Current { get { return Current; } }
                    public int Index { get { return _index; } }
                    public GroupValueEnumerator(KeyGroup group)
                        : base(group)
                    {
                        if (group == null)
                            throw new ArgumentNullException("group");
                        _group = group;
                    }
                    public void Dispose()
                    {
                        InvokeSync(() =>
                        {
                            _group = null;
                            _current = null;
                            _index = -1;
                        });
                    }
                    public bool MoveNext()
                    {
                        return GetSync(() =>
                        {
                            if (_group == null)
                                throw new ObjectDisposedException(typeof(GroupValueEnumerator).FullName);
                            if (_current == null)
                                return (_current = _group._firstGrouped) != null;
                            return _current.GetSync(() =>
                            {
                                if (_current._group != null && ReferenceEquals(_current._group, _group))
                                {
                                    if (_current._nextGrouped == null)
                                        return false;
                                    _index++;
                                    _current = _current._nextGrouped;
                                    return true;
                                }
                                throw new InvalidOperationException("Collection has changed.");
                            });
                        });
                    }
                    public void Reset()
                    {
                        InvokeSync(() =>
                        {
                            if (_group == null)
                                throw new ObjectDisposedException(typeof(GroupValueEnumerator).FullName);
                            _current = null;
                            _index = -1;
                        });
                    }
                }
                public class ParameterEnumerator : Synchronizable, IEnumerator<UriQueryParameter>
                {
                    private Collection _collection;
                    private UriQueryParameter _current = null;
                    private int _index = -1;
                    public UriQueryParameter Current { get { return _current; } }
                    object IEnumerator.Current { get { return _current; } }
                    public int Index { get { return _index; } }
                    public ParameterEnumerator(Collection collection)
                        : base(collection)
                    {
                        if (collection == null)
                            throw new ArgumentNullException("collection");
                        _collection = collection;
                    }
                    public void Dispose()
                    {
                        InvokeSync(() =>
                        {
                            _collection = null;
                            _current = null;
                            _index = -1;
                        });
                    }
                    public bool MoveNext()
                    {
                        return GetSync(() =>
                        {
                            if (_collection == null)
                                throw new ObjectDisposedException(typeof(ParameterEnumerator).FullName);
                            if (_current == null)
                                return (_current = _collection._firstParameter) != null;
                            return _current.GetSync(() =>
                            {
                                if (_current._group != null)
                                    return _current._group.GetSync(() =>
                                    {
                                        if (_current._group._collection != null && ReferenceEquals(_current._group._collection, _collection))
                                        {
                                            if (_current._nextParameter == null)
                                                return false;
                                            _index++;
                                            _current = _current._nextParameter;
                                            return true;
                                        }
                                        throw new InvalidOperationException("Collection has changed.");
                                    });
                                throw new InvalidOperationException("Collection has changed.");
                            });
                        });
                    }
                    public void Reset()
                    {
                        InvokeSync(() =>
                        {
                            if (_collection == null)
                                throw new ObjectDisposedException(typeof(ParameterEnumerator).FullName);
                            _current = null;
                            _index = -1;
                        });
                    }
                }
            }

            private void RaiseParameterChanged(UriQueryParameter parameter)
            {
                throw new NotImplementedException();
            }
        }
    }
    
    
}
