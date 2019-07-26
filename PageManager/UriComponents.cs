using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Management.Automation;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace UriHelper2
{
    public interface ISynchronizable
    {
        object SyncRoot { get; }
    }
    public static class Helpers
    {
        public static void InvokeSync(this ISynchronizable target, Action action)
        {
            Monitor.Enter(target.SyncRoot);
            try { action(); }
            finally { Monitor.Exit(target.SyncRoot); }
        }

        public static bool TryInvokeSync(this ISynchronizable target, Action action)
        {
            if (!Monitor.TryEnter(target.SyncRoot))
                return false;
            try { action(); }
            finally { Monitor.Exit(target.SyncRoot); }
            return true;
        }

        public static T GetSync<T>(this ISynchronizable target, Func<T> func)
        {
            Monitor.Enter(target.SyncRoot);
            try { return func(); }
            finally { Monitor.Exit(target.SyncRoot); }
        }

        public static bool TryGetSync<T>(this ISynchronizable target, Func<T> func, out T result)
        {
            if (!Monitor.TryEnter(target.SyncRoot))
            {
                result = default(T);
                return false;
            }
            try { result = func(); }
            finally { Monitor.Exit(target.SyncRoot); }
            return true;
        }
        public static T ConvertClass<T>(object value) where T : class { return ConvertClass<T>(false); }
        public static T ConvertClass<T>(object value, bool allowNull)
            where T : class
        {
            if (value == null)
            {
                if (!allowNull)
                    throw new ArgumentNullException("value");
            }
            else 
            {
                if (value is T)
                    return (T)value;
                T result;
                if (value is PSObject)
                {
                    object baseObj = ((PSObject)value).BaseObject;
                    if (baseObj is T)
                        return (T)baseObj;

                    if (LanguagePrimitives.TryConvertTo<T>(value, out result))
                        return result;
                    value = baseObj;
                } else if (LanguagePrimitives.TryConvertTo<T>(value, out result))
                    return result;
            }
            return (T)Convert.ChangeType(value, typeof(T));
        }
        public static T ConvertStruct<T>(object value)
            where T : struct
        {
            if (value == null)
                throw new ArgumentNullException("value");

            if (value is T)
                return (T)value;
            T result;
            if (value is PSObject)
            {
                object baseObj = ((PSObject)value).BaseObject;
                if (baseObj is T)
                    return (T)baseObj;

                if (LanguagePrimitives.TryConvertTo<T>(value, out result))
                    return result;
                value = baseObj;
            }
            else if (LanguagePrimitives.TryConvertTo<T>(value, out result))
                return result;
            return (T)Convert.ChangeType(value, typeof(T));
        }
        public static T? ConvertNullable<T>(object value)
            where T : struct
        {
            if (value == null)
                return null;

            if (value is T)
                return (T)value;
            T result;
            if (value is PSObject)
            {
                object baseObj = ((PSObject)value).BaseObject;
                if (baseObj is T)
                    return (T)baseObj;

                if (LanguagePrimitives.TryConvertTo<T>(value, out result))
                    return result;
                value = baseObj;
            }
            else if (LanguagePrimitives.TryConvertTo<T>(value, out result))
                return result;
            return (T)Convert.ChangeType(value, typeof(T));
        }
        public static bool TryConvertClass<T>(object value, out T result) where T : class { return TryConvertClass<T>(value, false, out result); }
        public static bool TryConvertClass<T>(object value, bool allowNull, out T result)
            where T : class
        {
            if (value == null)
            {
                result = null;
                return allowNull;
            }

            if (value is T)
            {
                result = (T)value;
                return true;
            }
            if (value is PSObject)
            {
                object baseObj = ((PSObject)value).BaseObject;
                if (baseObj is T)
                {
                    result = (T)baseObj;
                    return true;
                }

                if (LanguagePrimitives.TryConvertTo<T>(value, out result))
                    return true;
                value = baseObj;
            }
            else if (LanguagePrimitives.TryConvertTo<T>(value, out result))
                return true;
            try { result = (T)Convert.ChangeType(value, typeof(T)); }
            catch
            {
                result = null;
                return false;
            }
            return true;
        }
        public static bool TryConvertStruct<T>(object value, out T result)
            where T : struct
        {
            if (value != null)
            {
                if (value is T)
                {
                    result = (T)value;
                    return true;
                }
                if (value is PSObject)
                {
                    object baseObj = ((PSObject)value).BaseObject;
                    if (baseObj is T)
                    {
                        result = (T)baseObj;
                        return true;
                    }

                    if (LanguagePrimitives.TryConvertTo<T>(value, out result))
                        return true;
                    value = baseObj;
                }
                else if (LanguagePrimitives.TryConvertTo<T>(value, out result))
                    return true;
                try
                {
                    result = (T)Convert.ChangeType(value, typeof(T));
                    return true;
                }
                catch { }
            }
            result = default(T);
            return false;
        }
        public static bool TryConvertNullable<T>(object value, out T? result)
            where T : struct
        {
            if (value == null)
            {
                result = null;
                return true;
            }

            if (value is T)
            {
                result = (T)value;
                return true;
            }
            T t;
            if (value is PSObject)
            {
                object baseObj = ((PSObject)value).BaseObject;
                if (baseObj is T)
                {
                    result = (T)baseObj;
                    return true;
                }

                if (LanguagePrimitives.TryConvertTo<T>(value, out t))
                {
                    result = t;
                    return true;
                }
                value = baseObj;
            }
            else if (LanguagePrimitives.TryConvertTo<T>(value, out t))
            {
                result = t;
                return true;
            }
            try
            {
                result = (T)Convert.ChangeType(value, typeof(T));
                return true;
            }
            catch { }
            result = default(T);
            return false;
        }
        public static readonly Regex UserNameEncodeRegex = new Regex(@"((?:[@:/\\?#]+|%(?![\dA-Fa-f]{2}))+)|((?:%(?:[a-f][\dA-Fa-f]|[\dA-Fa-f][a-f]))+)", RegexOptions.Compiled);
        public static readonly Regex PasswordEncodeRegex = new Regex(@"((?:[@/\\?#]+|%(?![\dA-Fa-f]{2}))+)|((?:%(?:[a-f][\dA-Fa-f]|[\dA-Fa-f][a-f]))+)", RegexOptions.Compiled);
        public static readonly Regex DataEncodeRegex = new Regex(@"((?:[^%]+|%(?![\dA-Fa-f]{2}))+)|((?:%(?:[a-f][\dA-Fa-f]|[\dA-Fa-f][a-f]))+)", RegexOptions.Compiled);
        public static readonly Regex PathEncodeRegex = new Regex(@"((?:[^%/:]+|%(?![\dA-Fa-f]{2}))+)|((?:%(?:[a-f][\dA-Fa-f]|[\dA-Fa-f][a-f]))+)|(\\)", RegexOptions.Compiled);
        private static string _EncodeEvaluator(Match m)
        {
            if (m.Groups[1].Success)
                return Uri.EscapeDataString(m.Groups[1].Value);
            return m.Groups[2].Value.ToUpper();
        }
        public static string EncodeUserName(string value)
        {
            if (string.IsNullOrEmpty(value))
                return value;
            return UserNameEncodeRegex.Replace(value, _EncodeEvaluator);
        }
        public static string EncodePassword(string value)
        {
            if (string.IsNullOrEmpty(value))
                return value;
            return PasswordEncodeRegex.Replace(value, _EncodeEvaluator);
        }
        public static string EncodeData(string value)
        {
            if (string.IsNullOrEmpty(value))
                return value;
            return DataEncodeRegex.Replace(value, _EncodeEvaluator);
        }
        public static string EncodePath(string value)
        {
            if (string.IsNullOrEmpty(value))
                return value;
            return DataEncodeRegex.Replace(value, (Match m) =>
            {
                if (m.Groups[1].Success)
                    return Uri.EscapeDataString(m.Groups[1].Value);
                if (m.Groups[2].Success)
                    return m.Groups[2].Value.ToUpper();
                return "/";
            });
        }
    }

    public abstract class Synchronizable : ISynchronizable
    {
        private readonly object _syncRoot = new object();
        object ISynchronizable.SyncRoot { get { return _syncRoot; } }
        protected void InvokeSync(Action action)
        {
            Monitor.Enter(_syncRoot);
            try { action(); }
            finally { Monitor.Exit(_syncRoot); }
        }
        protected bool TryInvokeSync(Action action)
        {
            if (!Monitor.TryEnter(_syncRoot))
                return false;
            try { action(); }
            finally { Monitor.Exit(_syncRoot); }
            return true;
        }
        protected T GetSync<T>(Func<T> func)
        {
            Monitor.Enter(_syncRoot);
            try { return func(); }
            finally { Monitor.Exit(_syncRoot); }
        }
        protected bool TryGetSync<T>(Func<T> func, out T result)
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
    }

    public class PropertyValueChangedEventArgs<T> : PropertyChangedEventArgs
    {
        private T _newValue;
        private T _oldValue;
        public T NewValue { get { return _newValue; } }
        public T OldValue { get { return _oldValue; } }
        public PropertyValueChangedEventArgs(string propertyName, T newValue, T oldValue)
            : base(propertyName)
        {
            _newValue = newValue;
            _oldValue = oldValue;
        }
    }

    public abstract class SyncHandlesPropertyChanged : Synchronizable, INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;
        protected void RaisePropertyChanged<T>(string propertyName, T newValue, T oldValue, EventHandler<PropertyValueChangedEventArgs<T>> propertyValueChanged)
        {
            PropertyValueChangedEventArgs<T> args = new PropertyValueChangedEventArgs<T>(propertyName, newValue, oldValue);
            try { OnPropertyChanged(args); }
            finally
            {
                try
                {
                    PropertyChangedEventHandler propertyChanged = PropertyChanged;
                    if (propertyChanged != null)
                        propertyChanged.Invoke(this, args);
                }
                finally
                {
                    if (propertyValueChanged != null)
                        propertyValueChanged.Invoke(this, args);
                }
            }
        }
        protected void RaisePropertyChanged(string propertyName)
        {
            PropertyChangedEventArgs args = new PropertyChangedEventArgs(propertyName);
            try { OnPropertyChanged(args); }
            finally
            {
                PropertyChangedEventHandler propertyChanged = PropertyChanged;
                if (propertyChanged != null)
                    propertyChanged.Invoke(this, args);
            }
        }
        protected void OnPropertyChanged(PropertyChangedEventArgs args) { }
        protected virtual PropertyChangedEventArgs CreateEventArgs(string propertyName) { return null; }
    }

    public class UriComponents : UriBuilder, ISynchronizable
    {
        private readonly object _syncRoot = new object();
        private readonly bool _isCaseSensitive;
        private string _decodedUserName;
        private string _decodedPassword;
        private readonly UriQueryDictionary _queryParameters;
        public bool isCaseSensitive { get { return this._isCaseSensitive; } }
        public new string UserName
        {
            get { return base.UserName; }
            set
            {
                this.InvokeSync(() =>
                {
                    base.UserName = Helpers.EncodeUserName(value);
                    if (Uri != null && Uri.UserInfo.Length > 0)
                    {
                        string[] up = Uri.UserInfo.Split(':');
                        if (up[0] != base.UserName)
                            base.UserName = up[0];
                    }
                    if (base.UserName.Length > 0 || (Uri != null && (Uri.UserInfo.Length > 0 || Uri.GetLeftPart(UriPartial.Authority).Contains("@"))))
                        _decodedUserName = Uri.UnescapeDataString(base.UserName);
                    else
                        _decodedUserName = null;
                });
            }
        }
        public string DecodedUserName
        {
            get { return _decodedUserName; }
            set { UserName = value; }
        }
        public new string Password
        {
            get { return base.Password; }
            set
            {
                this.InvokeSync(() =>
                {
                    if (Uri != null)
                    {
                        base.Password = Helpers.EncodePassword(value);
                        if (Uri != null && Uri.UserInfo.Length > 0)
                        {
                            int index = Uri.UserInfo.IndexOf(':');
                            if (index > -1)
                            {
                                string pw = Uri.UserInfo.Substring(index + 1);
                                if (pw != base.Password)
                                    base.Password = pw;
                            }
                        }
                    }
                    else
                    {
                        base.Password = Helpers.EncodePassword(value);
                        if (Uri != null && Uri.UserInfo.Length > 0)
                        {
                            int index = Uri.UserInfo.IndexOf(':');
                            if (index > -1)
                            {
                                string userInfo = Uri.UserInfo;
                                string s = userInfo.Substring(index + 1);
                                if (s != base.Password)
                                    base.Password = s;
                                s = userInfo.Substring(0, index);
                                if (s != base.UserName)
                                    UserName = s;
                            }
                        }
                    }
                    if (base.Password.Length > 0 || (Uri != null && Uri.UserInfo.Contains("@")))
                        _decodedPassword = Uri.UnescapeDataString(base.Password);
                    else
                        _decodedPassword = null;
                });
            }
        }
        public string DecodedUserPassword
        {
            get { return _decodedPassword; }
            set { Password = value; }
        }
        public new string Query
        {
            get { return base.Query; }
            set
            {
                this.InvokeSync(() =>
                {
                    string oldValue = base.Query;
                    base.Query = value;
                    if (oldValue != base.Query)
                        this._queryParameters.Reparse(oldValue);
                });
            }
        }
        public int? CustomPort
        {
            get
            {
                Uri uri = Uri;
                return (uri == null || uri.IsDefaultPort && uri.Port > -1) ? null : (int?)uri.Port;
            }
        }
        public new string Path
        {
            get { return base.Path; }
            set
            {
                this.InvokeSync(() =>
                {
                    base.Path = value;
                });
            }
        }
        object ISynchronizable.SyncRoot { get { return _syncRoot; } }
        public UriComponents() : this(false) { }
        public UriComponents(bool caseSensitive) : base()
        {
            _queryParameters = new UriQueryDictionary(_isCaseSensitive = caseSensitive, this);
            this._queryParameters.PropertyChanged += QueryParameters_PropertyChanged;
        }

        public UriComponents(string uri) : this(uri, false) { }
        public UriComponents(Uri uri) : this(uri, false) { }
        public UriComponents(string uri, bool caseSensitive) : base(uri)
        {
            _queryParameters = new UriQueryDictionary(_isCaseSensitive = caseSensitive, this);
            _queryParameters.PropertyChanged += QueryParameters_PropertyChanged;
        }
        public UriComponents(Uri uri, bool caseSensitive) : base(uri)
        {
            _queryParameters = new UriQueryDictionary(_isCaseSensitive = caseSensitive, this);
            _queryParameters.PropertyChanged += QueryParameters_PropertyChanged;
        }
        public UriComponents(string schemeName, string hostName) : this(schemeName, hostName, false) { }
        public UriComponents(string schemeName, string hostName, bool caseSensitive) : base(schemeName, hostName)
        {
            _queryParameters = new UriQueryDictionary(_isCaseSensitive = caseSensitive, this);
            _queryParameters.PropertyChanged += QueryParameters_PropertyChanged;
        }
        public UriComponents(string scheme, string host, int portNumber) : this(scheme, host, false) { }
        public UriComponents(string scheme, string host, int portNumber, bool caseSensitive) : base(scheme, host)
        {
            _queryParameters = new UriQueryDictionary(_isCaseSensitive = caseSensitive, this);
            _queryParameters.PropertyChanged += QueryParameters_PropertyChanged;
        }
        public UriComponents(string scheme, string host, int port, string pathValue) : this(scheme, host, port, false) { }
        public UriComponents(string scheme, string host, int port, string pathValue, bool caseSensitive) : base(scheme, host, port)
        {
            _queryParameters = new UriQueryDictionary(_isCaseSensitive = caseSensitive, this);
            _queryParameters.PropertyChanged += QueryParameters_PropertyChanged;
        }
        public UriComponents(string scheme, string host, int port, string path, string extraValue) : this(scheme, host, port, path, extraValue, false) { }
        public UriComponents(string scheme, string host, int port, string path, string extraValue, bool caseSensitive) : base(scheme, host, port, path, extraValue)
        {
            _queryParameters = new UriQueryDictionary(_isCaseSensitive = caseSensitive, this);
            _queryParameters.PropertyChanged += QueryParameters_PropertyChanged;
        }

        private void QueryParameters_PropertyChanged(object sender, PropertyChangedEventArgs e)
        {
            throw new NotImplementedException();
        }
    }

    public sealed class UriQueryParameter : SyncHandlesPropertyChanged, IEquatable<UriQueryParameter>
    {
        public event EventHandler<PropertyValueChangedEventArgs<string>> KeyChanged;
        public event EventHandler<PropertyValueChangedEventArgs<string>> ValueChanged;

        private string _key;
        private string _value;
        private string _stringValue = null;

        #region Properties

        public string Key
        {
            get { return _key; }
            set
            {
                Tuple<bool, string, string> result = GetSync(() =>
                {
                    string oldValue = _key;
                    string key = (value == null) ? "" : value;
                    if (key == _key)
                        return new Tuple<bool, string, string>(false, key, oldValue);
                    _key = key;
                    return new Tuple<bool, string, string>(true, key, oldValue);
                });
                if (result.Item1)
                    RaisePropertyChanged<string>("Key", result.Item2, result.Item3, KeyChanged);
            }
        }

        public string Value
        {
            get { return _value; }
            set
            {
                Tuple<bool, string, string> result = GetSync(() =>
                {
                    string oldValue = _value;
                    if ((value == null) ? _value == null : value != null && _value == value)
                        return new Tuple<bool, string, string>(false, value, oldValue);
                    _value = value;
                    return new Tuple<bool, string, string>(true, value, oldValue);
                });
                if (result.Item1)
                    RaisePropertyChanged<string>("Value", result.Item2, result.Item3, ValueChanged);
            }
        }

        #endregion

        public UriQueryParameter(string key, string value)
        {
            _key = key;
            _value = value;
        }
        public bool Equals(UriQueryParameter other)
        {
            return other != null && (ReferenceEquals(other, this) || (_key == other._key && ((_value == null) ? other._value == null : other._value != null && _value == other._value)));
        }

        public override bool Equals(object obj)
        {
            UriQueryParameter p;
            if (Helpers.TryConvertClass<UriQueryParameter>(obj, out p))
                return Equals(p);
            string value;
            return Helpers.TryConvertClass<string>(obj, out value) && value == ToString();
        }

        public override int GetHashCode() { return ToString().GetHashCode(); }

        public override string ToString()
        {
            return GetSync(() =>
            {
                if (_stringValue == null)
                    _stringValue = (_value == null) ? Uri.EscapeDataString(_key) : Uri.EscapeDataString(_key) + "=" + Uri.EscapeDataString(_value);
                return _stringValue;
            });
        }

        internal bool Set(string key, string value)
        {
            Tuple<string, string, string, EventHandler<PropertyValueChangedEventArgs<string>>>[] result = GetSync(() =>
            {
                string oldKey = _key;
                string oldValue = _value;
                if (key == null)
                    key = "";
                
                if ((value == null) ? _value == null : value != null && _value == value)
                {
                    if (key == _key)
                        return new Tuple<string, string, string, EventHandler<PropertyValueChangedEventArgs<string>>>[0];
                    _value = value;
                    return new Tuple<string, string, string, EventHandler<PropertyValueChangedEventArgs<string>>>[] { new Tuple<string, string, string, EventHandler<PropertyValueChangedEventArgs<string>>>("Key", key, oldKey, KeyChanged) };
                }
                if (key == _key)
                    return new Tuple<string, string, string, EventHandler<PropertyValueChangedEventArgs<string>>>[] { new Tuple<string, string, string, EventHandler<PropertyValueChangedEventArgs<string>>>("Value", value, oldValue, ValueChanged) };
                return new Tuple<string, string, string, EventHandler<PropertyValueChangedEventArgs<string>>>[] { new Tuple<string, string, string, EventHandler<PropertyValueChangedEventArgs<string>>>("Key", key, oldKey, KeyChanged), new Tuple<string, string, string, EventHandler<PropertyValueChangedEventArgs<string>>>("Value", value, oldValue, ValueChanged) };
            });
            if (result.Length == 0)
                return false;
            if (result.Length == 1)
                RaisePropertyChanged<string>(result[0].Item1, result[0].Item2, result[0].Item3, result[0].Item4);
            else
            {
                try { RaisePropertyChanged<string>(result[0].Item1, result[0].Item2, result[0].Item3, result[0].Item4); }
                finally { RaisePropertyChanged<string>(result[1].Item1, result[1].Item2, result[1].Item3, result[1].Item4); }
            }
            return true;
        }
    }

    public sealed class UriQueryDictionary : SyncHandlesPropertyChanged, IList<UriQueryParameter>, IDictionary<string, string>, IDictionary<string, IEnumerable<UriQueryParameter>>, IDictionary, IList
    {
        private readonly StringComparer _keyComparer;
        private List<UriQueryParameter> _innerList = new List<UriQueryParameter>();
        private Dictionary<string, KeyedValueEnumerator> _innerDictionary;
        private KeyCollection _keys;
        private ValueCollection _values;
        private string _queryString = null;
        private static readonly char[] _splitChars = new char[] { '=' };
        public string QueryString
        {
            get
            {
                return GetSync(() =>
                {
                    if (_queryString == null && _innerList.Count > 0)
                        _queryString = string.Join("&", _innerList.Select(i => i.ToString()).ToArray());
                    return _queryString;
                });
            }
            set
            {
                if (GetSync(() =>
                {
                    if (_queryString == null && _innerList.Count == 0)
                    {
                        if (value == null)
                            return false;
                    }
                    else if (value == null)
                    {
                        _queryString = null;
                        foreach (UriQueryParameter p in _innerList)
                        {
                            p.KeyChanged += QueryParameter_KeyChanged;
                            p.ValueChanged += QueryParameter_ValueChanged;
                        }
                        _innerList.Clear();
                        _innerDictionary.Clear();
                        return true;
                    }
                    UriQueryParameter[] parameters = value.Split('&').Select((string s) =>
                    {
                        string[] kvp = s.Split(_splitChars, 2);
                        return new UriQueryParameter(Uri.UnescapeDataString(kvp[0]), (kvp.Length < 2) ? null : Uri.UnescapeDataString(kvp[1]));
                    }).ToArray();
                    int index = parameters.Length - _innerList.Count;
                    if (index == 0)
                    {
                        bool notChanged = true;
                        for (int i = 0; i < _innerList.Count; i++)
                        {
                            if (!_innerList[i].Equals(parameters[i]))
                            {
                                _innerList[i].KeyChanged -= QueryParameter_KeyChanged;
                                _innerList[i].ValueChanged -= QueryParameter_ValueChanged;
                                parameters[i].KeyChanged += QueryParameter_KeyChanged;
                                parameters[i].ValueChanged += QueryParameter_ValueChanged;
                                _innerList[i] = parameters[i];
                                notChanged = false;
                            }
                        }
                        if (notChanged)
                            return false;
                    }
                    else
                    {
                        if (index < 0)
                            index = 0 - index;
                        for (int i = 0; i < index; i++)
                        {
                            if (!_innerList[i].Equals(parameters[i]))
                            {
                                _innerList[i].KeyChanged -= QueryParameter_KeyChanged;
                                _innerList[i].ValueChanged -= QueryParameter_ValueChanged;
                                parameters[i].KeyChanged += QueryParameter_KeyChanged;
                                parameters[i].ValueChanged += QueryParameter_ValueChanged;
                                _innerList[i] = parameters[i];
                            }
                        }
                        index = parameters.Length;
                        while (index > _innerList.Count)
                        {
                            UriQueryParameter p = parameters[_innerList.Count];
                            _innerList.Add(p);
                            p.KeyChanged += QueryParameter_KeyChanged;
                            p.ValueChanged += QueryParameter_ValueChanged;
                        }
                        while (_innerList.Count > index)
                        {
                            _innerList[index].KeyChanged -= QueryParameter_KeyChanged;
                            _innerList[index].ValueChanged -= QueryParameter_ValueChanged;
                            _innerList.RemoveAt(index);
                        }
                    }
                    RefreshDictionary();
                    _queryString = string.Join("&", _innerList.Select(i => i.ToString()).ToArray());
                    return true;
                }))
                    RaisePropertyChanged("QueryString");
            }
        }

        private void RefreshDictionary()
        {
            IEnumerable<string> keys = _innerList.Select(i => i.Key).Distinct(_keyComparer).ToArray();
            foreach (string k in _innerDictionary.Keys.ToArray())
            {
                if (!keys.Contains(k, _keyComparer))
                    _innerDictionary.Remove(k);
            }
            foreach (string k in keys)
            {
                if (!_innerDictionary.ContainsKey(k))
                    _innerDictionary.Add(k, new KeyedValueEnumerator(this, k));
            }
        }

        public UriQueryDictionary(bool caseSensitive, UriComponents target)
        {
            _keyComparer = (caseSensitive) ? StringComparer.InvariantCulture : StringComparer.InvariantCultureIgnoreCase;
            _keys = new KeyCollection(this);
            _values = new ValueCollection(this);
            _innerDictionary = new Dictionary<string, KeyedValueEnumerator>(_keyComparer);
        }
        public UriQueryDictionary(bool caseSensitive) : this(caseSensitive, null) { }

        public UriQueryParameter this[int index]
        {
            get { return _innerList[index]; }
            set
            {
                if (value == null)
                    throw new ArgumentNullException("value");
                if (GetSync(() =>
                {
                    if (Contains(value))
                    {
                        if (ReferenceEquals(value, _innerList[index]))
                            return false;
                        throw new PSArgumentOutOfRangeException("Item already exists in this list.");
                    }
                    _innerList[index].KeyChanged -= QueryParameter_KeyChanged;
                    _innerList[index].ValueChanged -= QueryParameter_ValueChanged;
                    value.KeyChanged += QueryParameter_KeyChanged;
                    value.ValueChanged += QueryParameter_ValueChanged;
                    if (_innerList[index].Equals(value))
                    {
                        _innerList[index] = value;
                        return false;
                    }
                    _innerList[index] = value;
                    RefreshDictionary();
                    return true;
                }))
                    RaisePropertyChanged("QueryString");
            }
        }

        public string this[string key]
        {
            get
            {
                if (key == null)
                    return null;
                return GetSync(() =>
                {
                    if (_innerDictionary.ContainsKey(key))
                        return _innerDictionary[key].GetValues().FirstOrDefault();
                    return null;
                });
            }
            set
            {
                if (key == null)
                    throw new ArgumentNullException("key");
                object result = GetSync(() =>
                {
                    if (_innerDictionary.ContainsKey(key))
                    {
                        UriQueryParameter[] pl = _innerDictionary[key].GetQueryParameters().ToArray();
                        if (pl.Length > 0)
                        {
                            UriQueryParameter p = pl.Where(i => i.Key == key).DefaultIfEmpty(pl[0]).First();
                            
                            foreach (UriQueryParameter q in pl.Where(i => !ReferenceEquals(i, p)))
                                _innerList.Remove(q);
                            if (((p.Value == null) ? value == null : value != null && value == p.Value) && p.Key == key)
                                return pl.Length > 1;
                            return p;
                        }
                    }
                    else
                        _innerDictionary.Add(key, new KeyedValueEnumerator(this, key));

                    UriQueryParameter item = new UriQueryParameter(key, value);
                    _innerList.Add(item);
                    return (object)true;
                });
                if (result is bool)
                {
                    if ((bool)result)
                        RaisePropertyChanged("QueryString");
                }
                else if (!((UriQueryParameter)result).Set(key, value))
                        RaisePropertyChanged("QueryString");
            }
        }

        public object this[object key]
        {
            get
            {
                string k;
                if (Helpers.TryConvertClass<string>(key, out k))
                    return this[k];
                return null;
            }
            set { this[Helpers.ConvertClass<string>(key, true)] = Helpers.ConvertClass<string>(value, true); }
        }

        private int GetInstanceIndex(UriQueryParameter item)
        {
            if (item == null)
                return -1;
            for (int i = 0; i < _innerList.Count; i++)
            {
                if (ReferenceEquals(_innerList[i], item))
                    return i;
            }
            return -1;
        }

        IEnumerable<UriQueryParameter> IDictionary<string, IEnumerable<UriQueryParameter>>.this[string key]
        {
            get
            {
                return GetSync(() =>
                {
                    if (key != null && _innerDictionary.ContainsKey(key))
                        return _innerDictionary[key];
                    return null;
                });
            }
            set
            {
                if (key == null)
                    throw new ArgumentNullException("key");
                UriQueryParameter[] pl;
                if (value == null || (pl = value.ToArray()).Length == 0)
                {
                    Remove(key);
                    return;
                }
                if (pl.Any(i => i == null))
                    throw new ArgumentException("Null values not allowed");
                if (GetSync(() =>
                {
                    if (pl.Any(i => _innerList.Any(v => ReferenceEquals(v, i))))
                        throw new ArgumentException("Value already exists in list");
                    if (pl.Any(i => _innerList.Any(v => !_keyComparer.Equals(v.Key, key))))
                        throw new InvalidOperationException("Key does not match all items");
                    UriQueryParameter[] rl = (_innerDictionary.ContainsKey(key)) ? _innerDictionary[key].GetQueryParameters().ToArray() : new UriQueryParameter[0];
                    if (rl.Length > 0)
                    {
                        UriQueryParameter[] al = pl.Where(i => !rl.Any(v => ReferenceEquals(i, v))).ToArray();
                        foreach (UriQueryParameter p in rl.Where(i => !pl.Any(v => ReferenceEquals(i, v))))
                        {

                        }
                        pl = al;
                    }
                    _innerList.Add(pl[0]);
                    for (int i = 1; i < pl.Length; i++)
                    {

                    }
                }))
                    RaisePropertyChanged("QueryString");
            }
        }

        object IList.this[int index] { get => _innerList[index]; set => _innerList[index] = value; }

        public int Count { get { return _innerList.Count; } }

        int ICollection<KeyValuePair<string, string>>.Count { get { return _innerDictionary.Count; } }

        int ICollection<KeyValuePair<string, IEnumerable<UriQueryParameter>>>.Count { get { return _innerDictionary.Count; } }

        public bool IsReadOnly { get { return false; } }

        public ICollection<string> Keys => throw new NotImplementedException();

        public ICollection<string> Values => throw new NotImplementedException();

        public bool IsFixedSize => throw new NotImplementedException();

        public bool IsSynchronized => throw new NotImplementedException();

        ICollection<IEnumerable<UriQueryParameter>> IDictionary<string, IEnumerable<UriQueryParameter>>.Values => throw new NotImplementedException();

        ICollection IDictionary.Values => throw new NotImplementedException();

        ICollection IDictionary.Keys => throw new NotImplementedException();

        object ICollection.SyncRoot => throw new NotImplementedException();

        private void QueryParameter_KeyChanged(object sender, PropertyValueChangedEventArgs<string> e)
        {
            throw new NotImplementedException();
        }

        private void QueryParameter_ValueChanged(object sender, PropertyValueChangedEventArgs<string> e)
        {
            throw new NotImplementedException();
        }

        public void Add(UriQueryParameter item)
        {
            _innerList.Add(item);
        }

        public void Add(string key, string value)
        {
            throw new NotImplementedException();
        }

        public void Add(KeyValuePair<string, string> item)
        {
            throw new NotImplementedException();
        }

        public void Add(string key, IEnumerable<UriQueryParameter> value)
        {
            throw new NotImplementedException();
        }

        public void Add(KeyValuePair<string, IEnumerable<UriQueryParameter>> item)
        {
            throw new NotImplementedException();
        }

        public void Add(object key, object value)
        {
            throw new NotImplementedException();
        }

        public int Add(object value)
        {
            return _innerList.Add(value);
        }

        public void Clear()
        {
            _innerList.Clear();
        }

        public bool Contains(UriQueryParameter item)
        {
            return item != null && GetSync(() => { return _innerList.Any(i => ReferenceEquals(i, item)); });
        }

        protected bool Contains(KeyValuePair<string, string> item)
        {
            throw new NotImplementedException();
        }

        protected bool Contains(KeyValuePair<string, IEnumerable<UriQueryParameter>> item)
        {
            throw new NotImplementedException();
        }

        protected bool Contains(object key)
        {
            throw new NotImplementedException();
        }

        public bool ContainsKey(string key)
        {
            throw new NotImplementedException();
        }

        public void CopyTo(UriQueryParameter[] array, int arrayIndex)
        {
            _innerList.CopyTo(array, arrayIndex);
        }

        protected void CopyTo(KeyValuePair<string, string>[] array, int arrayIndex)
        {
            throw new NotImplementedException();
        }

        protected void CopyTo(KeyValuePair<string, IEnumerable<UriQueryParameter>>[] array, int arrayIndex)
        {
            throw new NotImplementedException();
        }

        protected void CopyTo(Array array, int index)
        {
            throw new NotImplementedException();
        }

        public IEnumerator<UriQueryParameter> GetEnumerator()
        {
            return _innerList.GetEnumerator();
        }

        public int IndexOf(UriQueryParameter item)
        {
            if (item == null)
                return -1;
            return GetSync(() =>
            {
                for (int i = 0; i < _innerList.Count; i++)
                {
                    if (ReferenceEquals(_innerList[i], item))
                        return i;
                }
                return -1;
            });
        }

        protected int IndexOf(object value)
        {
            return _innerList.IndexOf(value);
        }

        public void Insert(int index, UriQueryParameter item)
        {
            _innerList.Insert(index, item);
        }

        protected void Insert(int index, object value)
        {
            _innerList.Insert(index, value);
        }

        public bool Remove(UriQueryParameter item)
        {
            if (item == null)
                return false;
            return GetSync(() =>
            {
                for (int i = 0; i < _innerList.Count; i++)
                {
                    if (ReferenceEquals(_innerList[i], item))
                    {
                        _innerList[i].KeyChanged -= QueryParameter_KeyChanged;
                        _innerList[i].ValueChanged -= QueryParameter_ValueChanged;
                        _innerList.RemoveAt(i);
                        RefreshDictionary();
                        return true;
                    }
                }
                return false;
            });
        }

        public bool Remove(string key)
        {
            throw new NotImplementedException();
        }

        public bool Remove(KeyValuePair<string, string> item)
        {
            throw new NotImplementedException();
        }

        public bool Remove(KeyValuePair<string, IEnumerable<UriQueryParameter>> item)
        {
            throw new NotImplementedException();
        }

        public void Remove(object key)
        {
            throw new NotImplementedException();
        }

        public void RemoveAt(int index)
        {
            _innerList.RemoveAt(index);
        }

        public bool TryGetValue(string key, out string value)
        {
            throw new NotImplementedException();
        }

        public bool TryGetValue(string key, out IEnumerable<UriQueryParameter> value)
        {
            throw new NotImplementedException();
        }

        internal void Reparse(string oldValue)
        {
            throw new NotImplementedException();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return _innerList.GetEnumerator();
        }

        IEnumerator<KeyValuePair<string, string>> IEnumerable<KeyValuePair<string, string>>.GetEnumerator()
        {
            throw new NotImplementedException();
        }

        IEnumerator<KeyValuePair<string, IEnumerable<UriQueryParameter>>> IEnumerable<KeyValuePair<string, IEnumerable<UriQueryParameter>>>.GetEnumerator()
        {
            throw new NotImplementedException();
        }

        IDictionaryEnumerator IDictionary.GetEnumerator()
        {
            throw new NotImplementedException();
        }

        public sealed class KeyedValueEnumerator : IEnumerable<string>, IEnumerable<UriQueryParameter>, ISynchronizable
        {
            private readonly UriQueryDictionary _source;
            private readonly string _key;

            object ISynchronizable.SyncRoot { get { return ((ISynchronizable)_source).SyncRoot; } }

            public KeyedValueEnumerator(UriQueryDictionary source, string key)
            {
                if (source == null)
                    throw new ArgumentNullException("source");
                if (key == null)
                    throw new ArgumentNullException("key");
                _source = source;
                _key = key;
            }

            public IEnumerable<UriQueryParameter> GetQueryParameters() { return _source._innerList.Where(i => _source._keyComparer.Equals(i.Key, _key)); }

            public IEnumerable<string> GetValues() { return GetQueryParameters().Select(p => p.Value); }

            public IEnumerator<string> GetEnumerator() { return GetValues().GetEnumerator(); }

            IEnumerator<UriQueryParameter> IEnumerable<UriQueryParameter>.GetEnumerator() { return GetQueryParameters().GetEnumerator(); }

            IEnumerator IEnumerable.GetEnumerator() { return GetEnumerator(); }
        }

        public sealed class DictionaryEnumerator : IEnumerator<UriQueryParameter>, IEnumerator<string>, IEnumerator<IEnumerable<UriQueryParameter>>, IEnumerator<KeyValuePair<string, string>>,
            IEnumerator<KeyValuePair<string, IEnumerable<UriQueryParameter>>>, IDictionaryEnumerator
        {
            private readonly UriQueryDictionary _dictionary;
            private UriQueryParameter _current;

            #region Properties

            public UriQueryParameter Current { get { return _current; } }

            string IEnumerator<string>.Current { get { return (_current == null) ? null : _current.Key; } }

            IEnumerable<UriQueryParameter> IEnumerator<IEnumerable<UriQueryParameter>>.Current => throw new NotImplementedException();

            KeyValuePair<string, string> IEnumerator<KeyValuePair<string, string>>.Current => throw new NotImplementedException();

            KeyValuePair<string, IEnumerable<UriQueryParameter>> IEnumerator<KeyValuePair<string, IEnumerable<UriQueryParameter>>>.Current => throw new NotImplementedException();

            object IEnumerator.Current => throw new NotImplementedException();

            public DictionaryEntry Entry => throw new NotImplementedException();

            public string Key => throw new NotImplementedException();

            object IDictionaryEnumerator.Key => throw new NotImplementedException();

            public IEnumerable<UriQueryParameter> Value => throw new NotImplementedException();

            object IDictionaryEnumerator.Value => throw new NotImplementedException();

            #endregion

            public DictionaryEnumerator(UriQueryDictionary dictionary)
            {
                _dictionary = dictionary;
            }

            #region Methods

            public void Dispose()
            {
                throw new NotImplementedException();
            }

            public bool MoveNext()
            {
                Monitor.Enter(_dictionary.SyncRoot);
                try
                {
                    throw new NotImplementedException();
                }
                finally { Monitor.Exit(_dictionary.SyncRoot); }
            }

            public void Reset()
            {
                throw new NotImplementedException();
            }

            #endregion
        }

        public sealed class KeyCollection : ICollection<string>, ICollection, ISynchronizable
        {
            private readonly UriQueryDictionary _dictionary;

            #region Properties

            public int Count => throw new NotImplementedException();

            bool ICollection<string>.IsReadOnly => throw new NotImplementedException();

            bool ICollection.IsSynchronized => throw new NotImplementedException();

            object ICollection.SyncRoot { get { return _dictionary.SyncRoot; } }

            object ISynchronizable.SyncRoot { get { return _dictionary.SyncRoot; } }

            #endregion

            public KeyCollection(UriQueryDictionary dictionary)
            {
                _dictionary = dictionary;
            }

            #region Methods

            void ICollection<string>.Add(string item)
            {
                throw new NotImplementedException();
            }

            void ICollection<string>.Clear()
            {
                throw new NotImplementedException();
            }

            public bool Contains(string item)
            {
                throw new NotImplementedException();
            }

            public void CopyTo(string[] array, int arrayIndex)
            {
                throw new NotImplementedException();
            }

            void ICollection.CopyTo(Array array, int index)
            {
                throw new NotImplementedException();
            }

            public IEnumerator<string> GetEnumerator()
            {
                throw new NotImplementedException();
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                throw new NotImplementedException();
            }

            bool ICollection<string>.Remove(string item)
            {
                throw new NotImplementedException();
            }

            #endregion
        }

        public sealed class ValueCollection : ICollection<string>, ICollection<IEnumerable<UriQueryParameter>>, ICollection, ISynchronizable
        {
            private UriQueryDictionary _dictionary;

            #region Properties

            public int Count => throw new NotImplementedException();

            bool ICollection<string>.IsReadOnly => throw new NotImplementedException();

            bool ICollection<IEnumerable<UriQueryParameter>>.IsReadOnly => throw new NotImplementedException();

            bool ICollection.IsSynchronized => throw new NotImplementedException();

            object ICollection.SyncRoot { get { return _dictionary.SyncRoot; } }

            object ISynchronizable.SyncRoot { get { return _dictionary.SyncRoot; } }

            #endregion

            public ValueCollection(UriQueryDictionary dictionary)
            {
                _dictionary = dictionary;
            }

            #region Methods

            void ICollection<string>.Add(string item)
            {
                throw new NotImplementedException();
            }

            void ICollection<IEnumerable<UriQueryParameter>>.Add(IEnumerable<UriQueryParameter> item)
            {
                throw new NotImplementedException();
            }

            void ICollection<string>.Clear()
            {
                throw new NotImplementedException();
            }

            void ICollection<IEnumerable<UriQueryParameter>>.Clear()
            {
                throw new NotImplementedException();
            }

            public bool Contains(string item)
            {
                throw new NotImplementedException();
            }

            bool ICollection<IEnumerable<UriQueryParameter>>.Contains(IEnumerable<UriQueryParameter> item)
            {
                throw new NotImplementedException();
            }

            public void CopyTo(string[] array, int arrayIndex)
            {
                throw new NotImplementedException();
            }

            void ICollection<IEnumerable<UriQueryParameter>>.CopyTo(IEnumerable<UriQueryParameter>[] array, int arrayIndex)
            {
                throw new NotImplementedException();
            }

            void ICollection.CopyTo(Array array, int index)
            {
                throw new NotImplementedException();
            }

            public IEnumerator<string> GetEnumerator()
            {
                throw new NotImplementedException();
            }

            IEnumerator<IEnumerable<UriQueryParameter>> IEnumerable<IEnumerable<UriQueryParameter>>.GetEnumerator()
            {
                throw new NotImplementedException();
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                throw new NotImplementedException();
            }

            bool ICollection<string>.Remove(string item)
            {
                throw new NotImplementedException();
            }

            bool ICollection<IEnumerable<UriQueryParameter>>.Remove(IEnumerable<UriQueryParameter> item)
            {
                throw new NotImplementedException();
            }

            #endregion
        }
    }

    public sealed class PathSegment : SyncHandlesPropertyChanged
    {
        private PathSegment _previousSegment = null;
        private PathSegment _nextSegment = null;
        private List _list = null;

        public sealed class List : SyncHandlesPropertyChanged, IList<string>, IList<PathSegment>, IList
        {
            #region Properties

            public string this[int index] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

            PathSegment IList<PathSegment>.this[int index] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

            object IList.this[int index] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

            public int Count => throw new NotImplementedException();

            bool IList.IsFixedSize => throw new NotImplementedException();

            bool ICollection<string>.IsReadOnly => throw new NotImplementedException();

            bool ICollection<PathSegment>.IsReadOnly => throw new NotImplementedException();

            bool IList.IsReadOnly => throw new NotImplementedException();

            bool ICollection.IsSynchronized => throw new NotImplementedException();

            object ICollection.SyncRoot { get { return _syncRoot; } }

            #endregion

            #region Methods

            public void Add(string item)
            {
                throw new NotImplementedException();
            }

            void ICollection<PathSegment>.Add(PathSegment item)
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

            public bool Contains(string item)
            {
                throw new NotImplementedException();
            }

            public bool Contains(PathSegment item)
            {
                throw new NotImplementedException();
            }

            bool IList.Contains(object value)
            {
                throw new NotImplementedException();
            }

            public void CopyTo(string[] array, int arrayIndex)
            {
                throw new NotImplementedException();
            }

            void ICollection<PathSegment>.CopyTo(PathSegment[] array, int arrayIndex)
            {
                throw new NotImplementedException();
            }

            void ICollection.CopyTo(Array array, int index)
            {
                throw new NotImplementedException();
            }

            public IEnumerator<string> GetEnumerator()
            {
                throw new NotImplementedException();
            }

            IEnumerator<PathSegment> IEnumerable<PathSegment>.GetEnumerator()
            {
                throw new NotImplementedException();
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                throw new NotImplementedException();
            }

            public int IndexOf(string item)
            {
                throw new NotImplementedException();
            }

            public int IndexOf(PathSegment item)
            {
                throw new NotImplementedException();
            }

            int IList.IndexOf(object value)
            {
                throw new NotImplementedException();
            }

            public void Insert(int index, string item)
            {
                throw new NotImplementedException();
            }

            void IList<PathSegment>.Insert(int index, PathSegment item)
            {
                throw new NotImplementedException();
            }

            void IList.Insert(int index, object value)
            {
                throw new NotImplementedException();
            }

            public bool Remove(string item)
            {
                throw new NotImplementedException();
            }

            public bool Remove(PathSegment item)
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

            #endregion
        }
    }
}
