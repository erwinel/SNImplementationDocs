using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SnUriBuilder
{
    [DataObject(true)]
    public class SchemeSeparatorOptionList
    {
        private static readonly BindingList<SchemeSeparatorOptionItem> _items = new BindingList<SchemeSeparatorOptionItem>(SchemeSeparatorOptionItem.AllOptions);
        public int Count { get { return _items.Count; } }
        [DataObjectMethod(DataObjectMethodType.Select, true)]
        public BindingList<SchemeSeparatorOptionItem> GetItems() { return _items; }
        public SchemeSeparatorOptionItem Get(int index) { return (index > -1 && index < _items.Count) ? _items[index] : null; }
        public int IndexOf(SchemeSeparatorOptionItem item) { return (item == null) ? -1 : _items.IndexOf(item); }

        internal SchemeSeparatorOptionItem Find(string value)
        {
            throw new NotImplementedException();
        }

        internal SchemeSeparatorOptionItem Find(SchemeSeparator separator)
        {
            throw new NotImplementedException();
        }

        internal int IndexOf(string value)
        {
            throw new NotImplementedException();
        }

        internal int IndexOf(SchemeSeparator separator)
        {
            throw new NotImplementedException();
        }
    }
}
