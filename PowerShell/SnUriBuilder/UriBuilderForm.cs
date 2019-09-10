using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SnUriBuilder
{
    public partial class UriBuilderForm : Form
    {
        const string TOGGLE_TEXT_EXPANDED = "­−";
        const string TOGGLE_TEXT_COLLAPSED = "+";

        private bool OriginExpanded
        {
            get { return originButton.Text == TOGGLE_TEXT_EXPANDED; }
            set
            {
                if (value != (originButton.Text == TOGGLE_TEXT_EXPANDED))
                    OriginButton_Click(originButton, EventArgs.Empty);
            }
        }

        private bool pathExpanded
        {
            get { return pathButton.Text == TOGGLE_TEXT_EXPANDED; }
            set
            {
                if (value != (pathButton.Text == TOGGLE_TEXT_EXPANDED))
                    PathButton_Click(pathButton, EventArgs.Empty);
            }
        }

        private bool queryExpanded
        {
            get { return queryButton.Text == TOGGLE_TEXT_EXPANDED; }
            set
            {
                if (value != (queryButton.Text == TOGGLE_TEXT_EXPANDED))
                    QueryButton_Click(queryButton, EventArgs.Empty);
            }
        }

        private bool fragmentExpanded
        {
            get { return fragmentButton.Text == TOGGLE_TEXT_EXPANDED; }
            set
            {
                if (value != (fragmentButton.Text == TOGGLE_TEXT_EXPANDED))
                    FragmentButton_Click(fragmentButton, EventArgs.Empty);
            }
        }

        public UriBuilderForm()
        {
            InitializeComponent();
        }

        private void NewUrlButton_Click(object sender, EventArgs e)
        {
            string text;
            if (!UriStringInputForm.TryGetUriString(this, out text))
                return;
            int index = text.IndexOf('#');
            if (index < 0)
                fragmentTextBox2.Text = "";
            else
            {
                fragmentTextBox2.Text = text.Substring(index);
                text = text.Substring(0, index);
            }
            index = text.IndexOf('?');
            if (index < 0)
                queryTextBox.Text = "";
            else
            {
                queryTextBox.Text = text.Substring(index);
                text = text.Substring(0, index);
            }
            Uri uri;
            if (Uri.TryCreate(text, UriKind.RelativeOrAbsolute, out uri))
            {
                if (uri.IsAbsoluteUri)
                {
                    UriBuilder ub = new UriBuilder(uri);

                }
            }
        }

        private void OriginCheckBox_CheckedChanged(object sender, EventArgs e)
        {

        }

        private void OriginButton_Click(object sender, EventArgs e)
        {

        }

        private void PathButton_Click(object sender, EventArgs e)
        {

        }

        private void AddPathSegmentButton_Click(object sender, EventArgs e)
        {

        }

        private void ClearPathSegmentsButton_Click(object sender, EventArgs e)
        {

        }

        private void SetRootPathButton_Click(object sender, EventArgs e)
        {

        }

        private void QueryCheckBox_CheckedChanged(object sender, EventArgs e)
        {

        }

        private void QueryButton_Click(object sender, EventArgs e)
        {

        }

        private void AddQueryParameterButton_Click(object sender, EventArgs e)
        {

        }

        private void ClearQueryParametersButton_Click(object sender, EventArgs e)
        {

        }

        private void SetEmptyQueryParameterButton_Click(object sender, EventArgs e)
        {

        }

        private void FragmentCheckBox_CheckedChanged(object sender, EventArgs e)
        {

        }

        private void FragmentButton_Click(object sender, EventArgs e)
        {

        }
    }
}
