using System.Collections.ObjectModel;
using System.ComponentModel;

namespace SnUriBuilder
{
    public class SchemeSeparatorOptionItem
    {
        private static ReadOnlyCollection<SchemeSeparatorOptionItem> _allOptions = null;
        private string _displayText;
        private SchemeSeparator _value;
        [DataObjectField(false, false, false)]
        public string DisplayText { get { return _displayText; } }
        [DataObjectField(true, false, false)]
        public SchemeSeparator Value { get { return _value; } }
        public static ReadOnlyCollection<SchemeSeparatorOptionItem> AllOptions
        {
            get
            {
                if (_allOptions != null)
                    return _allOptions;
                Collection<SchemeSeparatorOptionItem> allOptions = new Collection<SchemeSeparatorOptionItem>();
                _allOptions = new ReadOnlyCollection<SchemeSeparatorOptionItem>(allOptions);
                allOptions.Add(new SchemeSeparatorOptionItem(SchemeSeparator.DoubleSlash));
                allOptions.Add(new SchemeSeparatorOptionItem(SchemeSeparator.SingleSlash));
                allOptions.Add(new SchemeSeparatorOptionItem(SchemeSeparator.ColonOnly));
                return _allOptions;
            }
        }
        private SchemeSeparatorOptionItem(SchemeSeparator value)
        {
            _value = value;
            _displayText = AsString(value);
        }
        public static string AsString(SchemeSeparator value)
        {
            switch (value)
            {
                case SchemeSeparator.ColonOnly:
                    return ":";
                case SchemeSeparator.SingleSlash:
                    return ":/";
            }
            return "://";
        }
    }
}