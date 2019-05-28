using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace PageManager
{
    partial class QueryParameterCollection
    {
        public class KeyValuePair : IEquatable<KeyValuePair>, IEquatable<string>
        {
            internal static int IndexOf(QueryParameterCollection target, KeyValuePair item, bool anyValue = false)
            {
                if (item == null)
                    return -1;
                Monitor.Enter(target._syncRoot);
                try
                {
                    Monitor.Enter(item._syncRoot);
                    try
                    {
                        if (item._owner != null)
                        {
                            if (ReferenceEquals(item._owner, target))
                            {
                                for (int i = 0; i < target._innerList.Count; i++)
                                {
                                    if (ReferenceEquals(target._innerList[i], item))
                                        return i;
                                }
                            }
                        }
                        int index = target._innerList.IndexOf(item);
                        if (index < 0 && anyValue)
                        {
                            string key = item.Key;
                            for (int i = 0; i < target._innerList.Count; i++)
                            {
                                if (target._innerList[i].Key == key)
                                    return i;
                            }
                        }
                        return index;
                    }
                    finally { Monitor.Exit(item._syncRoot); }
                }
                finally { Monitor.Exit(target._syncRoot); }
            }

            internal static int Add(QueryParameterCollection target, string key, string value)
            {
                if (key == null)
                    throw new ArgumentNullException("key");
                int index;
                Monitor.Enter(target._syncRoot);
                try
                {
                    KeyValuePair item;
                    if (target._innerDictionary.ContainsKey(key))
                    {
                        List<KeyValuePair> list = target._innerDictionary[key];
                        item = list.FirstOrDefault(i => i.Key == key);
                        if (item != null)
                        {
                            item.Value = value;
                            return IndexOf(target, item);
                        }
                        item = new KeyValuePair(key, value);
                        list.Add(item);
                    }
                    else
                    {
                        item = new KeyValuePair(key, value);
                        target._innerDictionary.Add(key, new List<KeyValuePair> { item });
                    }
                    index = target._innerList.Count;
                    target._innerList.Add(item);
                    item._owner = target;
                }
                finally { Monitor.Exit(target._syncRoot); }

                return index;
            }

            internal static int Add(QueryParameterCollection target, KeyValuePair item)
            {
                if (item == null)
                    throw new ArgumentNullException("item");
                int index;
                Monitor.Enter(item._syncRoot);
                try
                {
                    if (item._owner != null)
                    {
                        if (ReferenceEquals(item._owner, target))
                            return IndexOf(target, item);
                        return Add(target, item.Key, item.Value);
                    }
                    Monitor.Enter(target._syncRoot);
                    try
                    {
                        index = IndexOf(target, item, true);
                        if (index < 0)
                        {
                            if (target._innerDictionary.ContainsKey(item.Key))
                                target._innerDictionary[item.Key].Add(item);
                            else
                                target._innerDictionary.Add(item.Key, new List<KeyValuePair> { item });
                            index = target._innerList.Count;
                            target._innerList.Add(item);
                        }
                        else
                        {
                            KeyValuePair oldItem = target._innerList[index];
                            Monitor.Enter(oldItem._syncRoot);
                            try
                            {
                                List<KeyValuePair> list = target._innerDictionary[oldItem.Key];
                                if (list.Count == 1)
                                    list[0] = item;
                                else
                                {
                                    for (int i = 0; i < list.Count; i++)
                                    {
                                        if (ReferenceEquals(list[i], oldItem))
                                        {
                                            list[i] = item;
                                            break;
                                        }
                                    }
                                }
                                target._innerList[index] = item;
                                oldItem._owner = null;
                            }
                            finally { Monitor.Exit(oldItem._syncRoot); }
                        }
                        item._owner = target;
                    }
                    finally { Monitor.Exit(target._syncRoot); }
                }
                finally { Monitor.Exit(item._syncRoot); }
                return index;
            }

            internal static int Set(QueryParameterCollection target, string key, string value)
            {
                if (key == null)
                    throw new ArgumentNullException("key");
                int index;
                Monitor.Enter(target._syncRoot);
                try
                {
                    KeyValuePair item;
                    if (target._innerDictionary.ContainsKey(key))
                    {
                        List<KeyValuePair> list = target._innerDictionary[key];
                        item = list.FirstOrDefault(i => i.Key == key);
                        if (item == null)
                        {
                            if (value == null)
                                item = list.FirstOrDefault(i => i.Value == null);
                            else
                                item = list.FirstOrDefault(i => i.Value != null && i.Value == value);
                            if (item == null)
                            {
                                item = new KeyValuePair(key, value);
                                list.Add(item);
                                item._owner = target;
                                target._innerList.Add(item);
                            }
                            else
                            {
                                if (key.Length == 0)
                                    item._decodedKey = item._encodedKey = "";
                                else
                                {
                                    item._decodedKey = key;
                                    item._encodedKey = null;
                                }
                                if (string.IsNullOrEmpty(value))
                                    item._decodedValue = item._encodedValue = value;
                                else
                                {
                                    item._decodedValue = value;
                                    item._encodedValue = null;
                                }
                            }
                        } else if (string.IsNullOrEmpty(value))
                            item._decodedValue = item._encodedValue = value;
                        else
                        {
                            item._decodedValue = value;
                            item._encodedValue = null;
                        }
                        if (list.Count > 1)
                        {
                            while (!ReferenceEquals(list[0], item))
                                Remove(target, list[0]);
                            while (list.Count > 1)
                                Remove(target, list[1]);
                        }
                        return IndexOf(target, item);
                    }

                    item = new KeyValuePair(key, value);
                    target._innerDictionary.Add(key, new List<KeyValuePair> { item });
                    index = target._innerList.Count;
                    target._innerList.Add(item);
                    item._owner = target;
                }
                finally { Monitor.Exit(target._syncRoot); }

                return index;
            }

            internal static void Set(QueryParameterCollection target, int index, KeyValuePair item)
            {
                throw new NotImplementedException();
            }

            internal static bool Remove(QueryParameterCollection target, KeyValuePair item)
            {
                throw new NotImplementedException();
            }

            internal static string Get(QueryParameterCollection target, string key)
            {
                throw new NotImplementedException();
            }

            private object _syncRoot = new object();
            private string _decodedKey;
            private string _decodedValue;
            private string _encodedKey = null;
            private string _encodedValue = null;
            private QueryParameterCollection _owner = null;

            public string Key
            {
                get { return _decodedKey; }
                set
                {
                    Monitor.Enter(_syncRoot);
                    try
                    {
                        if (_owner == null)
                        {
                            if (string.IsNullOrEmpty(value))
                                _encodedKey = _decodedKey = "";
                            else
                            {
                                if (_decodedKey != null && _decodedKey == value)
                                    return;
                                _decodedKey = value;
                                _encodedKey = null;
                            }
                        }
                        else
                        {
                            string key = value ?? "";
                            if (key == _decodedKey)
                                return;
                            Monitor.Enter(_owner._syncRoot);
                            try
                            {
                                if (_owner._innerDictionary.ContainsKey(key))
                                    throw new ArgumentOutOfRangeException("Another item in the parent collection already uses that key");
                                List<KeyValuePair> list = _owner._innerDictionary[_decodedKey];
                                if (list.Count == 1)
                                    _owner._innerDictionary.Remove(_decodedKey);
                                else
                                {
                                    for (int i = 0; i < list.Count; i++)
                                    {
                                        if (ReferenceEquals(list[i], this))
                                        {
                                            list.RemoveAt(i);
                                            break;
                                        }
                                    }
                                }
                                _decodedKey = key;
                                _encodedKey = null;
                                _owner._innerDictionary.Add(key, new List<KeyValuePair> { this });
                            }
                            finally { Monitor.Exit(_owner._syncRoot); }
                        }
                    }
                    finally { Monitor.Exit(_syncRoot); }

                }
            }

            public string EncodedKey
            {
                get
                {
                    string key;
                    Monitor.Enter(_syncRoot);
                    try
                    {
                        if ((key = _encodedKey) == null)
                            _encodedKey = key = Uri.EscapeDataString(_decodedKey);
                    }
                    finally { Monitor.Exit(_syncRoot); }
                    return key;
                }
                set
                {
                    Monitor.Enter(_syncRoot);
                    try
                    {
                        if (_owner == null)
                        {
                            if (string.IsNullOrEmpty(value))
                                _encodedKey = _decodedKey = "";
                            else if (_encodedKey == null || _encodedKey != value)
                            {
                                string s = Uri.UnescapeDataString(value);
                                if (s != _decodedKey)
                                {
                                    _decodedKey = s;
                                    _encodedKey = null;
                                }
                            }
                        }
                        else
                        {
                            string key = value ?? "";
                            if (key == EncodedKey || ((key = Uri.UnescapeDataString(key)) == _decodedKey))
                                return;
                            Monitor.Enter(_owner._syncRoot);
                            try
                            {
                                if (_owner._innerDictionary.ContainsKey(key))
                                    throw new ArgumentOutOfRangeException("Another item in the parent collection already uses that key");
                                List<KeyValuePair> list = _owner._innerDictionary[_decodedKey];
                                if (list.Count == 1)
                                    _owner._innerDictionary.Remove(_decodedKey);
                                else
                                {
                                    for (int i = 0; i < list.Count; i++)
                                    {
                                        if (ReferenceEquals(list[i], this))
                                        {
                                            list.RemoveAt(i);
                                            break;
                                        }
                                    }
                                }
                                _decodedKey = key;
                                _encodedKey = null;
                                _owner._innerDictionary.Add(key, new List<KeyValuePair> { this });
                            }
                            finally { Monitor.Exit(_owner._syncRoot); }
                        }
                    }
                    finally { Monitor.Exit(_syncRoot); }
                }
            }

            public string Value
            {
                get { return _decodedValue; }
                set
                {
                    Monitor.Enter(_syncRoot);
                    try
                    {
                        if (string.IsNullOrEmpty(value))
                            _decodedValue = _encodedValue = value;
                        else
                        {
                            _decodedValue = value;
                            _encodedValue = null;
                        }
                    }
                    finally { Monitor.Exit(_syncRoot); }

                }
            }

            public string EncodedValue
            {
                get
                {
                    string value;
                    Monitor.Enter(_syncRoot);
                    try
                    {
                        if ((value = _encodedValue) == null && _decodedValue != null)
                            _encodedValue = value = Uri.EscapeDataString(_decodedValue);
                    }
                    finally { Monitor.Exit(_syncRoot); }
                    return value;
                }
                set
                {
                    Monitor.Enter(_syncRoot);
                    try
                    {
                        if (string.IsNullOrEmpty(value))
                            _encodedValue = _decodedValue = value;
                        else if (_encodedValue == null || _encodedValue != value)
                        {
                            string s = Uri.UnescapeDataString(value);
                            if (s != _decodedValue)
                            {
                                _decodedValue = s;
                                _encodedValue = null;
                            }
                        }
                    }
                    finally { Monitor.Exit(_syncRoot); }
                }
            }

            public KeyValuePair(string key, string value, bool isEncoded)
            {
                if (string.IsNullOrEmpty(key))
                    _encodedKey = _decodedKey = "";
                else
                    _decodedKey = (isEncoded) ? Uri.UnescapeDataString(key) : key;
                if (string.IsNullOrEmpty(value))
                    _encodedValue = _decodedValue = value;
                else
                    _decodedValue = (isEncoded) ? Uri.UnescapeDataString(value) : value;
            }

            public KeyValuePair(string decodedKey, string decodedValue)
            {
                if (string.IsNullOrEmpty(decodedKey))
                    _encodedKey = _decodedKey = "";
                else
                {
                    _decodedKey = decodedKey;
                    _encodedKey = null;
                }
                if (string.IsNullOrEmpty(decodedValue))
                    _encodedValue = _decodedValue = decodedValue;
                else
                {
                    _decodedValue = decodedValue;
                    _encodedValue = null;
                }
            }

            public KeyValuePair(string keyValuePair)
            {
                if (string.IsNullOrEmpty(keyValuePair))
                {
                    _encodedKey = _decodedKey = "";
                    _encodedValue = _decodedValue = null;
                    return;
                }
                int index = keyValuePair.IndexOf("=");
                if (index == 0)
                    _encodedKey = _decodedKey = "";
                else
                {
                    if (index < 0)
                    {
                        _encodedValue = _decodedValue = null;
                        _encodedKey = keyValuePair;
                        _decodedKey = null;
                        return;
                    }
                    _encodedKey = keyValuePair.Substring(0, index);
                    _decodedKey = null;
                }

                if (index < keyValuePair.Length - 1)
                {
                    _encodedValue = keyValuePair.Substring(index + 1);
                    _decodedValue = null;
                }
                else
                    _encodedValue = _decodedValue = "";
            }

            public KeyValuePair()
            {
                _encodedKey = _decodedKey = "";
                _encodedValue = _decodedValue = null;
            }

            public bool Equals(KeyValuePair other)
            {
                if (other == null)
                    return false;
                Monitor.Enter(_syncRoot);
                try
                {
                    if (ReferenceEquals(this, other))
                        return true;
                    Monitor.Enter(other._syncRoot);
                    try
                    {
                        return ((_decodedKey != null) ? ((other._decodedKey != null) ? _decodedKey == other._decodedKey : EncodedKey == other._encodedKey) : _encodedKey == other.EncodedKey) &&
                            (_decodedValue != null) ? ((other._decodedValue != null) ? _decodedValue == other._decodedValue : other._encodedValue != null && EncodedValue == other._encodedValue) :
                            ((_encodedValue == null) ? other._encodedValue == null && other._decodedValue == null : other.EncodedValue != null && _encodedValue == other.EncodedValue);
                    }
                    finally { Monitor.Exit(other._syncRoot); }
                }
                finally { Monitor.Exit(_syncRoot); }
            }

            public bool Equals(string other)
            {
                if (other == null)
                    return false;
                if (other.Length == 0)
                    return _decodedKey != null && _decodedKey.Length == 0 && _encodedValue == null && _decodedValue == null;

                int index = other.IndexOf('=');
                if (index < 0)
                    return _encodedValue == null && _decodedValue == null && EncodedKey == other;
                if (_encodedValue == null)
                    return _decodedValue != null && index < other.Length - 1 && ((_encodedKey == null) ? index > 0 && EncodedKey == other.Substring(0, index) :
                        _encodedKey == other.Substring(0, index)) && EncodedValue == other.Substring(index + 1);

                return ((_encodedKey == null) ? (index > 0 && EncodedKey == other.Substring(0, index)) : (_encodedKey == other.Substring(0, index))) &&
                    _encodedValue == other.Substring(index + 1);
            }

            public override int GetHashCode() { return ToString().GetHashCode(); }

            public override string ToString()
            {
                if (_encodedValue != null)
                    return EncodedKey + "=" + _encodedValue;
                return (_decodedValue == null) ? EncodedKey : EncodedKey + "=" + EncodedValue;
            }
        }
    }
}
