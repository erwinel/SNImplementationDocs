using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SnUriBuilder
{
    [DataObject(true)]
    public class KnownSchemeOptionList
    {
        private static readonly BindingList<KnownSchemeOptionItem> _items = new BindingList<KnownSchemeOptionItem>(KnownSchemeOptionItem.KnownOptions);
        public int Count { get { return _items.Count; } }
        [DataObjectMethod(DataObjectMethodType.Select, true)]
        public BindingList<KnownSchemeOptionItem> GetItems() { return _items; }
        public KnownSchemeOptionItem Get(int index) { return (index > -1 && index < _items.Count) ? _items[index] : null; }
        public int IndexOf(KnownSchemeOptionItem item) { return (item == null) ? -1 : _items.IndexOf(item); }

        internal KnownSchemeOptionItem Find(string v)
        {
            throw new NotImplementedException();
        }

        internal int IndexOf(string v)
        {
            throw new NotImplementedException();
        }
    }
}
