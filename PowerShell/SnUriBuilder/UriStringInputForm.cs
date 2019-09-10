using System;
using System.Windows.Forms;

namespace SnUriBuilder
{
    public partial class UriStringInputForm : Form
    {
        public UriStringInputForm()
        {
            InitializeComponent();
        }

        public static bool TryGetUriString(IWin32Window owner, out string uri)
        {
            using (UriStringInputForm form = new UriStringInputForm())
            {
                if (form.ShowDialog(owner) == DialogResult.OK)
                {
                    uri = form.uriStringTextBox.Text;
                    return true;
                }
            }

            uri = "";
            return false;
        }
    }
}
