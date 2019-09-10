using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SnUriBuilder
{
    [DataObject(true)]
    public class UriBuilderModelBindingList
    {
        private Model _current;
        private UriPathList _path;
        private UriQueryList _query;
        private int? _selectedSchemeIndex = null;
        private int? _selectedSeparatorIndex = null;
        private KnownSchemeOptionItem _selectedSchemeItem = null;
        private SchemeSeparatorOptionItem _selectedSeparatorItem = null;
        private KnownSchemeOptionList _schemeOptions = new KnownSchemeOptionList();
        private SchemeSeparatorOptionList _separatorOptions = new SchemeSeparatorOptionList();
        private BindingList<UriPathList.Item> _pathBindingList = new BindingList<UriPathList.Item>();
        private Collection<UriPathList.Item> _pathItemList = new Collection<UriPathList.Item>();
        private BindingList<UriQueryList.Item> _queryBindingList = new BindingList<UriQueryList.Item>();
        private Collection<UriQueryList.Item> _queryItemList = new Collection<UriQueryList.Item>();
        public Model Current { get { return _current; } }
        private BindingList<Model> _items;
        private string _uriString = "";
        private bool _hasOrigin = false;
        private bool _originIsExpanded = true;
        private bool _isCustomScheme = false;
        private string _customSchemeText = "";
        private string _customSchemeErrorMessage = "";
        private bool _hasAuthority = false;
        private bool _hasUsername = false;
        private string _usernameText = "";
        private bool _hasPassword = false;
        private string _passwordText = "";
        private bool _hasHostName = false;
        private string _hostNameText = "";
        private string _hostNameErrorMessage = "";
        private bool _hasPort = false;
        private int _portNumber = 0;
        private string _portErrorMessage = "";
        private bool _isDefaultPort = true;
        private string _originText = "";
        private string _pathString = "";
        private bool _pathIsExpanded = true;
        private bool _pathIsRooted = false;
        private bool _pathIsDirectory = false;
        private bool _hasUriQuery = false;
        private bool _uriQueryIsExpanded = true;
        private string _uriQueryString = "";
        private bool _hasFragment = false;
        private bool _fragmentIsExpanded = true;
        private bool? _fragmentEncoding = null;
        private string _fragmentValue = "";
        private string _fragmentString = "";

        [DataObjectMethod(DataObjectMethodType.Select, true)]
        public BindingList<Model> GetItems() { return _items; }
        public UriBuilderModelBindingList()
        {
            _items = new BindingList<Model>();
            _current = new Model(this);
            _path = new UriPathList(this);
            _query = new UriQueryList(this);
            _items.Add(_current);
            _items.ListChanged += Items_ListChanged;
            _pathBindingList.ListChanged += Path_ListChanged;
            _isCustomScheme = _current.SelectedSchemeItem.Name.Length == 0;
            if (!_isCustomScheme && _current.SelectedSchemeItem.DefaultPort.HasValue)
                _portNumber = _current.SelectedSchemeItem.DefaultPort.Value;
        }

        private void Items_ListChanged(object sender, ListChangedEventArgs e) { Model.ListChanged(this, e); }

        private void Path_ListChanged(object sender, ListChangedEventArgs e) { UriPathList.Item.ListChanged(this, e); }

        public class Model : INotifyPropertyChanged
        {
            public event PropertyChangedEventHandler PropertyChanged;
            const string PropertyName_UriString = "UriString";
            const string PropertyName_HasOrigin = "HasOrigin";
            const string PropertyName_OriginIsExpanded = "OriginIsExpanded";
            const string PropertyName_OriginNotExpanded = "OriginNotExpanded";
            const string PropertyName_ShowOriginGroupBox = "ShowOriginGroupBox";
            const string PropertyName_ShowOriginTextBox = "PropertyName_ShowOriginTextBox";
            const string PropertyName_SelectedSchemeIndex = "SelectedSchemeIndex";
            const string PropertyName_SelectedSchemeItem = "SelectedSchemeItem";
            const string PropertyName_SelectedSchemeText = "SelectedSchemeText";
            const string PropertyName_IsCustomScheme = "IsCustomScheme";
            const string PropertyName_CustomSchemeText = "CustomSchemeText";
            const string PropertyName_CustomSchemeErrorMessage = "CustomSchemeErrorMessage";
            const string PropertyName_SelectedSeparatorIndex = "SelectedSeparatorIndex";
            const string PropertyName_SelectedSeparatorItem = "SelectedSeparatorItem";
            const string PropertyName_SelectedSeparatorText = "SelectedSeparatorText";
            const string PropertyName_HasAuthority = "HasAuthority";
            const string PropertyName_HasUsername = "HasUsername";
            const string PropertyName_UsernameText = "UsernameText";
            const string PropertyName_HasPassword = "HasPassword";
            const string PropertyName_PasswordText = "PasswordText";
            const string PropertyName_HasHostName = "HasHostName";
            const string PropertyName_HostNameText = "HostNameText";
            const string PropertyName_HostNameErrorMessage = "HostNameErrorMessage";
            const string PropertyName_HasPort = "HasPort";
            const string PropertyName_PortNumber = "PortNumber";
            const string PropertyName_PortErrorMessage = "PortErrorMessage";
            const string PropertyName_IsDefaultPort = "IsDefaultPort";
            const string PropertyName_OriginText = "OriginText";
            const string PropertyName_PathIsRooted = "PathIsRooted";
            const string PropertyName_PathString = "PathString";
            const string PropertyName_PathIsDirectory = "PathIsDirectory";
            const string PropertyName_PathIsExpanded = "PathIsExpanded";
            const string PropertyName_PathNotExpanded = "PathNotExpanded";
            const string PropertyName_HasUriQuery = "HasUriQuery";
            const string PropertyName_UriQueryIsExpanded = "UriQueryIsExpanded";
            const string PropertyName_UriQueryString = "UriQueryString";
            const string PropertyName_HasFragment = "HasFragment";
            const string PropertyName_FragmentIsExpanded = "FragmentIsExpanded";
            const string PropertyName_FragmentEncoding = "FragmentEncoding";
            const string PropertyName_FragmentValue = "FragmentValue";
            const string PropertyName_FragmentString = "FragmentString";

            private UriBuilderModelBindingList _dataSource = null;

            [DataObjectField(true, false, false)]
            public string UriString
            {
                get { return _dataSource._uriString; }
                set
                {
                    string text = (value == null) ? "" : value;
                    if (text == _dataSource._uriString)
                        return;
                    int index = text.IndexOf('#');
                    if (index < 0)
                    {
                        HasFragment = false;
                        FragmentString = "";
                    }
                    else
                    {
                        HasFragment = true;
                        FragmentString = text.Substring(index);
                        text = text.Substring(0, index);
                    }
                    index = text.IndexOf('?');
                    if (index < 0)
                    {
                        HasUriQuery = false;
                        UriQueryString = "";
                    }
                    else
                    {
                        HasUriQuery = true;
                        UriQueryString = text.Substring(index);
                        text = text.Substring(0, index);
                    }

                    Match m = ParseSchemeRegex.Match(text);
                    if (m.Success)
                    {
                        HasOrigin = true;
                        SelectedSchemeIndex = _dataSource._schemeOptions.IndexOf((m.Groups["n"].Success) ? m.Groups["n"].Value : "");
                        KnownSchemeOptionItem scheme = _dataSource._schemeOptions.Get(SelectedSchemeIndex);
                        if (scheme.Name.Length == 0)
                        {
                            SelectedSeparatorIndex = _dataSource._separatorOptions.IndexOf(m.Groups["s"].Value);
                            CustomSchemeText = (m.Groups["n"].Success) ? m.Groups["n"].Value : "";
                            text = (m.Groups["uhp"].Success) ? m.Groups["uhp"].Value : "";
                        }
                        else
                        {
                            string s = SchemeSeparatorOptionItem.AsString(scheme.Separator);
                            if (m.Groups["s"].Value.StartsWith(s))
                            {
                                text = text.Substring((m.Groups["n"].Success) ? s.Length + m.Groups["n"].Length : s.Length);
                                SelectedSeparatorIndex = _dataSource._separatorOptions.IndexOf(scheme.Separator);
                            }
                            else
                            {
                                text = (m.Groups["uhp"].Success) ? m.Groups["uhp"].Value : "";
                                SelectedSeparatorIndex = _dataSource._separatorOptions.IndexOf(m.Groups["s"].Value);
                            }
                        }
                        m = ParseCredentialsRegex.Match(text);
                        if (m.Success)
                        {
                            HasUsername = true;
                            UsernameText = (m.Groups["u"].Success) ? DecodeUriString(m.Groups["u"].Value) : "";
                            if (m.Groups["p"].Success)
                            {
                                HasPassword = true;
                                PasswordText = DecodeUriString(m.Groups["p"].Value.Substring(1));
                            }
                            else
                            {
                                HasPassword = false;
                                PasswordText = "";
                            }
                            text = (m.Groups["uhp"].Success) ? m.Groups["hp"].Value : "";
                        }
                        else
                        {
                            HasUsername = HasPassword = false;
                            UsernameText = PasswordText = "";
                        }
                        m = ParseHostPortRegex.Match(text);
                        if (m.Success)
                        {
                            int p;
                            if (m.Groups["p"].Success && int.TryParse(m.Groups["p"].Value, out p))
                            {
                                HasHostName = true;
                                HostNameText = (m.Groups["h"].Success) ? DecodeUriString(m.Groups["h"].Value) : "";
                                HasPort = true;
                                PortNumber = p;
                                text = text.Substring(m.Length);
                            }
                            else if (m.Groups["h"].Success)
                            {
                                HasHostName = true;
                                HostNameText = DecodeUriString(m.Groups["h"].Value);
                                HasPort = false;
                                text = text.Substring(m.Groups["h"].Length);
                            }
                            else
                            {
                                HasHostName = HasUsername;
                                HasPort = false;
                                HostNameText = "";
                            }
                        }
                        else
                        {
                            HasHostName = HasUsername;
                            HasPort = false;
                            HostNameText = "";
                        }
                    }
                    else
                    {
                        HasOrigin = HasUsername = HasPassword = HasHostName = HasPort = false;
                        CustomSchemeText = HostNameText = UsernameText = PasswordText = "";
                    }
                    PathString = text;
                    if (_dataSource._uriString != value)
                    {
                        _dataSource._uriString = value;
                        RaisePropertyChanged(PropertyName_UriString);
                    }
                }
            }

            private static string DecodeUriString(string value)
            {
                throw new NotImplementedException();
            }

            static readonly Regex ParseSchemeRegex = new Regex(@"^(?<n>[^:/\\@]+)?(?<s>:(//?)?)(?<uhp>.+)?$");
            static readonly Regex ParseCredentialsRegex = new Regex(@"^(?<u>[^:/\\@]+)?(?<p>:([^/\\@]+)?)?@(?<hp>.+)?$");
            static readonly Regex ParseHostPortRegex = new Regex(@"^(?<h>[^:/\\@]+)?(?<p>:(\d+)?)?(?=[\\/:]|$)");

            [DataObjectField(false, false, false)]
            public bool HasOrigin
            {
                get { return _dataSource._hasOrigin; }
                set
                {
                    if (value == _dataSource._hasOrigin)
                        return;
                    bool showOriginGroupBox = ShowOriginGroupBox;
                    bool showOriginTextBox = ShowOriginTextBox;
                    _dataSource._hasOrigin = value;
                    try { RaisePropertyChanged(PropertyName_OriginIsExpanded); }
                    finally
                    {
                        try { RaisePropertyChanged(PropertyName_OriginNotExpanded); }
                        finally
                        {
                            try
                            {
                                if (showOriginGroupBox != ShowOriginGroupBox)
                                    RaisePropertyChanged(PropertyName_ShowOriginGroupBox);
                            }
                            finally
                            {
                                if (showOriginTextBox != ShowOriginTextBox)
                                    RaisePropertyChanged(PropertyName_ShowOriginTextBox);
                            }
                        }
                    }
                }
            }

            [DataObjectField(false, false, false)]
            public bool ShowOriginGroupBox { get { return HasOrigin && OriginIsExpanded; } }

            [DataObjectField(false, false, false)]
            public bool ShowOriginTextBox { get { return HasOrigin && !OriginIsExpanded; } }

            [DataObjectField(false, false, false)]
            public bool OriginIsExpanded
            {
                get { return _dataSource._originIsExpanded; }
                set
                {
                    if (value == _dataSource._originIsExpanded)
                        return;
                    bool showOriginGroupBox = ShowOriginGroupBox;
                    bool showOriginTextBox = ShowOriginTextBox;
                    _dataSource._originIsExpanded = value;
                    try { RaisePropertyChanged(PropertyName_OriginIsExpanded); }
                    finally
                    {
                        try { RaisePropertyChanged(PropertyName_OriginNotExpanded); }
                        finally
                        {
                            try
                            {
                                if (showOriginGroupBox != ShowOriginGroupBox)
                                RaisePropertyChanged(PropertyName_ShowOriginGroupBox);
                            }
                            finally
                            {
                                if (showOriginTextBox != ShowOriginTextBox)
                                    RaisePropertyChanged(PropertyName_ShowOriginTextBox);
                            }
                        }
                    }
                }
            }
            
            [DataObjectField(false, false, false)]
            public bool OriginNotExpanded { get { return !OriginIsExpanded; } set { OriginIsExpanded = !value; } }

            [DataObjectField(false, false, false)]
            public int SelectedSchemeIndex
            {
                get
                {
                    if (!_dataSource._selectedSchemeIndex.HasValue)
                        _dataSource._selectedSchemeIndex = 0;
                    return _dataSource._selectedSchemeIndex.Value;
                }
                set
                {
                    if (value < 0 || value >= _dataSource._schemeOptions.Count || SelectedSchemeIndex == value)
                        return;
                    KnownSchemeOptionItem item = SelectedSchemeItem;
                    _dataSource._selectedSchemeIndex = value;
                    if (ReferenceEquals(SelectedSchemeItem, item))
                        _dataSource._current.RaisePropertyChanged(PropertyName_SelectedSchemeIndex);
                    else
                        try { _dataSource._current.RaisePropertyChanged(PropertyName_SelectedSchemeIndex); }
                        finally {
                            try { _dataSource._current.RaisePropertyChanged(PropertyName_SelectedSchemeText); }
                            finally { _dataSource._current.RaisePropertyChanged(PropertyName_SelectedSchemeItem); }
                        }
                }
            }
            [DataObjectField(false, false, false)]
            public KnownSchemeOptionItem SelectedSchemeItem
            {
                get
                {
                    if (_dataSource._selectedSchemeItem == null)
                        _dataSource._selectedSchemeItem = _dataSource._schemeOptions.Get(SelectedSchemeIndex);
                    return _dataSource._selectedSchemeItem;
                }
                set
                {
                    int index = _dataSource._schemeOptions.IndexOf(value);
                    if (index > -1)
                        SelectedSchemeIndex = index;
                }
            }
            [DataObjectField(false, false, false)]
            public string SelectedSchemeText { get { return SelectedSchemeItem.DisplayText; } }

            [DataObjectField(false, false, false)]
            public bool IsCustomScheme
            {
                get { return _dataSource._isCustomScheme; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public bool NotCustomScheme { get { return !IsCustomScheme; } set { IsCustomScheme = !value; } }

            [DataObjectField(false, false, false)]
            public string CustomSchemeText
            {
                get { return _dataSource._customSchemeText; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public string CustomSchemeErrorMessage { get { return _dataSource._customSchemeErrorMessage; } }

            [DataObjectField(false, false, false)]
            public bool CustomSchemeHasError { get { return !string.IsNullOrEmpty(_dataSource._customSchemeErrorMessage); } }

            [DataObjectField(false, false, false)]
            public int SelectedSeparatorIndex
            {
                get
                {
                    if (!_dataSource._selectedSeparatorIndex.HasValue)
                        _dataSource._selectedSeparatorIndex = 0;
                    return _dataSource._selectedSeparatorIndex.Value;
                }
                set
                {
                    if (value < 0 || value >= _dataSource._separatorOptions.Count || SelectedSeparatorIndex == value)
                        return;
                    SchemeSeparatorOptionItem item = SelectedSeparatorItem;
                    _dataSource._selectedSeparatorIndex = value;
                    if (ReferenceEquals(SelectedSchemeItem, item))
                        _dataSource._current.RaisePropertyChanged(PropertyName_SelectedSeparatorIndex);
                    else
                        try { _dataSource._current.RaisePropertyChanged(PropertyName_SelectedSeparatorIndex); }
                        finally
                        {
                            try { _dataSource._current.RaisePropertyChanged(PropertyName_SelectedSeparatorText); }
                            finally { _dataSource._current.RaisePropertyChanged(PropertyName_SelectedSeparatorItem); }
                        }
                }
            }
            [DataObjectField(false, false, false)]
            public SchemeSeparatorOptionItem SelectedSeparatorItem
            {
                get
                {
                    if (_dataSource._selectedSeparatorItem == null)
                        _dataSource._selectedSeparatorItem = _dataSource._separatorOptions.Get(SelectedSchemeIndex);
                    return _dataSource._selectedSeparatorItem;
                }
                set
                {
                    int index = _dataSource._separatorOptions.IndexOf(value);
                    if (index > -1)
                        SelectedSeparatorIndex = index;
                }
            }
            [DataObjectField(false, false, false)]
            public string SelectedSeparatorText { get { return SelectedSeparatorItem.DisplayText; } }

            [DataObjectField(false, false, false)]
            public bool HasAuthority
            {
                get { return _dataSource._hasAuthority; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public bool HasUsername
            {
                get { return _dataSource._hasUsername; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public string UsernameText
            {
                get { return _dataSource._usernameText; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public bool HasPassword
            {
                get { return _dataSource._hasPassword; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public string PasswordText
            {
                get { return _dataSource._passwordText; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public bool HasHostName
            {
                get { return _dataSource._hasHostName; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public string HostNameText
            {
                get { return _dataSource._hostNameText; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public string HostNameErrorMessage { get { return _dataSource._hostNameErrorMessage; } }

            [DataObjectField(false, false, false)]
            public bool HostNameHasError { get { return !string.IsNullOrEmpty(_dataSource._hostNameErrorMessage); } }

            [DataObjectField(false, false, false)]
            public bool HasPort
            {
                get { return _dataSource._hasPort; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public int PortNumber
            {
                get { return _dataSource._portNumber; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public string PortErrorMessage { get { return _dataSource._portErrorMessage; } }

            [DataObjectField(false, false, false)]
            public bool PortHasError { get { return !string.IsNullOrEmpty(_dataSource._portErrorMessage); } }

            [DataObjectField(false, false, false)]
            public bool IsDefaultPort
            {
                get { return _dataSource._isDefaultPort; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public bool NotDefaultPort { get { return !IsDefaultPort; } set { IsDefaultPort = !value; } }

            [DataObjectField(false, false, false)]
            public string OriginText { get { return _dataSource._originText; } }

            [DataObjectField(false, false, false)]
            public string PathString
            {
                get { return _dataSource._pathString; }
                set
                {
                    string text = (value == null) ? "" : value;
                    if (text == _dataSource._pathString)
                        return;
                    if (text.Length == 0)
                    {
                        _dataSource._pathBindingList.Clear();
                        PathIsRooted = PathIsDirectory = false;
                    }
                    else
                    {
                        string[] segments = (text.Length == 0) ? new string[0] : text.Split(new char[] { '/' });
                        if (segments[0].Length == 0)
                        {
                            PathIsRooted = true;
                            if (segments.Length == 1)
                            {
                                segments = new string[0];
                                PathIsDirectory = true;
                            }
                            else if (segments[segments.Length - 1].Length == 0)
                            {
                                segments = segments.Skip(1).Take(segments.Length - 2).ToArray();
                                PathIsDirectory = true;
                            }
                            else
                            {
                                PathIsDirectory = false;
                                segments = segments.Skip(1).ToArray();
                            }
                        }
                        else
                        {
                            PathIsRooted = HasOrigin;
                            if (segments.Length > 1 && segments[segments.Length - 1].Length == 0)
                            {
                                segments = segments.Take(segments.Length - 1).ToArray();
                                PathIsDirectory = true;
                            }
                            else
                                PathIsDirectory = false;
                        }
                        if (segments.Length == 0)
                            _dataSource._pathBindingList.Clear();
                        else
                        {
                            int e = (segments.Length < _dataSource._pathBindingList.Count) ? segments.Length : _dataSource._pathBindingList.Count;
                            for (int i = 0; i < e; i++)
                                _dataSource._pathBindingList[i].Value = DecodeUriString(segments[i]);
                            while (e > _dataSource._pathBindingList.Count)
                                _dataSource._pathBindingList.Add(new UriPathList.Item(DecodeUriString(segments[_dataSource._pathBindingList.Count])));
                            while (_dataSource._pathBindingList.Count > e)
                                _dataSource._pathBindingList.RemoveAt(e);
                        }
                    }
                    if (_dataSource._pathString != value)
                    {
                        _dataSource._pathString = value;
                        RaisePropertyChanged(PropertyName_PathString);
                    }
                }
            }
             
            [DataObjectField(false, false, false)]
            public bool PathIsExpanded
            {
                get { return _dataSource._pathIsExpanded; }
                set
                {
                    if (value == _dataSource._pathIsExpanded)
                        return;
                    _dataSource._pathIsExpanded = value;
                    try { RaisePropertyChanged(PropertyName_PathIsExpanded); }
                    finally { RaisePropertyChanged(PropertyName_PathNotExpanded); }
                }
            }

            [DataObjectField(false, false, false)]
            public bool PathNotExpanded { get { return !PathIsExpanded; } set { PathIsExpanded = !value; } }

            [DataObjectField(false, false, false)]
            public bool PathIsRooted
            {
                get { return _dataSource._pathIsRooted; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public bool PathIsDirectory
            {
                get { return _dataSource._pathIsDirectory; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public bool HasUriQuery
            {
                get { return _dataSource._hasUriQuery; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public bool UriQueryIsExpanded
            {
                get { return _dataSource._uriQueryIsExpanded; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public bool UriQueryNotExpanded { get { return !UriQueryIsExpanded; } set { UriQueryIsExpanded = !value; } }

            [DataObjectField(false, false, false)]
            public string UriQueryString
            {
                get { return _dataSource._uriQueryString; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public bool HasFragment
            {
                get { return _dataSource._hasFragment; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public bool FragmentIsExpanded
            {
                get { return _dataSource._fragmentIsExpanded; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public bool FragmentNotExpanded { get { return !FragmentIsExpanded; } set { FragmentIsExpanded = !value; } }

            [DataObjectField(false, false, false)]
            public bool NoFragmentEncoding
            {
                get { return !_dataSource._fragmentEncoding.HasValue; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public bool PathFragmentEncoding
            {
                get { return _dataSource._fragmentEncoding.HasValue && !_dataSource._fragmentEncoding.Value; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public bool DataFragmentEncoding
            {
                get { return _dataSource._fragmentEncoding.HasValue && _dataSource._fragmentEncoding.Value; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public string FragmentValue
            {
                get { return _dataSource._fragmentValue; }
                set { throw new NotImplementedException(); }
            }

            [DataObjectField(false, false, false)]
            public string FragmentString
            {
                get { return _dataSource._fragmentString; }
                set { throw new NotImplementedException(); }
            }

            public Model() { }

            public Model(UriBuilderModelBindingList dataSource) { _dataSource = dataSource; }

            private void RaisePropertyChanged(string propertyName)
            {
                PropertyChangedEventHandler propertyChanged = PropertyChanged;
                if (propertyChanged != null)
                    propertyChanged.Invoke(this, new PropertyChangedEventArgs(propertyName));
            }

            internal static void ListChanged(UriBuilderModelBindingList dataSource, ListChangedEventArgs e)
            {
                if (dataSource._items.Count == 0)
                {
                    if (dataSource._current != null)
                        dataSource._current._dataSource = null;
                    (dataSource._current = new Model())._dataSource = dataSource;
                    dataSource._items.Add(dataSource._current);
                }
                else
                {
                    if (ReferenceEquals(dataSource._current, dataSource._items[0]))
                        return;
                    if (dataSource._current != null)
                        dataSource._current._dataSource = null;
                    (dataSource._current = dataSource._items[0])._dataSource = dataSource;
                }
            }
        }

        [DataObject(true)]
        public class UriPathList
        {
            private UriBuilderModelBindingList _dataSource;

            [DataObjectMethod(DataObjectMethodType.Select, true)]
            public BindingList<Item> GetItems() { return _dataSource._pathBindingList; }

            public UriPathList(UriBuilderModelBindingList dataSource) { _dataSource = dataSource; }

            public class Item
            {
                private UriPathList _list = null;

                public Item(string v)
                {
                }

                public string Value { get; internal set; }

                internal static void ListChanged(UriBuilderModelBindingList dataSource, ListChangedEventArgs e)
                {
                    for (int i = 0; i < dataSource._pathItemList.Count; i++)
                    {
                        Item item = dataSource._pathItemList[i];
                        if (!dataSource._pathBindingList.Contains(item))
                        {
                            item._list = null;
                            dataSource._pathItemList.RemoveAt(i--);
                        }
                    }
                    foreach (Item item in dataSource._pathBindingList)
                    {
                        if (!dataSource._pathItemList.Contains(item))
                        {
                            item._list = dataSource._path;
                            dataSource._pathItemList.Add(item);
                        }
                    }
                }
            }
        }

        [DataObject(true)]
        public class UriQueryList
        {
            private UriBuilderModelBindingList _dataSource;

            [DataObjectMethod(DataObjectMethodType.Select, true)]
            public BindingList<Item> GetItems() { return _dataSource._queryBindingList; }

            public UriQueryList(UriBuilderModelBindingList dataSource) { _dataSource = dataSource; }

            public class Item
            {
                private UriQueryList _list = null;

                internal static void ListChanged(UriBuilderModelBindingList dataSource, ListChangedEventArgs e)
                {
                    for (int i = 0; i < dataSource._queryItemList.Count; i++)
                    {
                        Item item = dataSource._queryItemList[i];
                        if (!dataSource._queryBindingList.Contains(item))
                        {
                            item._list = null;
                            dataSource._queryItemList.RemoveAt(i--);
                        }
                    }
                    foreach (Item item in dataSource._queryBindingList)
                    {
                        if (!dataSource._queryItemList.Contains(item))
                        {
                            item._list = dataSource._query;
                            dataSource._queryItemList.Add(item);
                        }
                    }
                }
            }
        }
    }
}
