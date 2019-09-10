namespace SnUriBuilder
{
    partial class UriBuilderForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.outerTableLayoutPanel = new System.Windows.Forms.TableLayoutPanel();
            this.fragmentButton = new System.Windows.Forms.Button();
            this.fragmentCheckBox = new System.Windows.Forms.CheckBox();
            this.queryButton = new System.Windows.Forms.Button();
            this.queryCheckBox = new System.Windows.Forms.CheckBox();
            this.uriTableLayoutPanel = new System.Windows.Forms.TableLayoutPanel();
            this.uriTextBox = new System.Windows.Forms.TextBox();
            this.uriLabel = new System.Windows.Forms.Label();
            this.newUrlButton = new System.Windows.Forms.Button();
            this.originGroupBox = new System.Windows.Forms.GroupBox();
            this.originTableLayoutPanel = new System.Windows.Forms.TableLayoutPanel();
            this.authorityCheckBox = new System.Windows.Forms.CheckBox();
            this.schemeLabel = new System.Windows.Forms.Label();
            this.schemeNameComboBox = new System.Windows.Forms.ComboBox();
            this.schemeSeparatorComboBox = new System.Windows.Forms.ComboBox();
            this.customSchemeTextBox = new System.Windows.Forms.TextBox();
            this.authorityGroupBox = new System.Windows.Forms.GroupBox();
            this.authorityTableLayoutPanel = new System.Windows.Forms.TableLayoutPanel();
            this.credentailsGroupBox = new System.Windows.Forms.GroupBox();
            this.credentailsTableLayoutPanel = new System.Windows.Forms.TableLayoutPanel();
            this.usernameCheckBox = new System.Windows.Forms.CheckBox();
            this.passwordCheckBox = new System.Windows.Forms.CheckBox();
            this.usernameTextBox = new System.Windows.Forms.TextBox();
            this.maskedPasswordTextBox = new System.Windows.Forms.MaskedTextBox();
            this.showPasswordCheckBox = new System.Windows.Forms.CheckBox();
            this.passwordTextBox = new System.Windows.Forms.TextBox();
            this.hostGroupBox = new System.Windows.Forms.GroupBox();
            this.hostTableLayoutPanel = new System.Windows.Forms.TableLayoutPanel();
            this.hostNameCheckBox = new System.Windows.Forms.CheckBox();
            this.portCheckBox = new System.Windows.Forms.CheckBox();
            this.hostNameTextBox = new System.Windows.Forms.TextBox();
            this.portNumericUpDown = new System.Windows.Forms.NumericUpDown();
            this.defaultPortCheckBox = new System.Windows.Forms.CheckBox();
            this.invalidHostNameLabel = new System.Windows.Forms.Label();
            this.invalidPortNumberLabel = new System.Windows.Forms.Label();
            this.invalidSchemeNameLabel = new System.Windows.Forms.Label();
            this.originCheckBox = new System.Windows.Forms.CheckBox();
            this.pathGroupBox = new System.Windows.Forms.GroupBox();
            this.pathTableLayoutPanel = new System.Windows.Forms.TableLayoutPanel();
            this.addPathSegmentButton = new System.Windows.Forms.Button();
            this.clearPathSegmentsButton = new System.Windows.Forms.Button();
            this.setRootPathButton = new System.Windows.Forms.Button();
            this.pathTextBox1 = new System.Windows.Forms.TextBox();
            this.pathDataGridView = new System.Windows.Forms.DataGridView();
            this.originButton = new System.Windows.Forms.Button();
            this.pathButton = new System.Windows.Forms.Button();
            this.queryGroupBox = new System.Windows.Forms.GroupBox();
            this.queryTableLayoutPanel = new System.Windows.Forms.TableLayoutPanel();
            this.addQueryParameterButton = new System.Windows.Forms.Button();
            this.queryDataGridView = new System.Windows.Forms.DataGridView();
            this.clearQueryParametersButton = new System.Windows.Forms.Button();
            this.setEmptyQueryParameterButton = new System.Windows.Forms.Button();
            this.fragmentGroupBox = new System.Windows.Forms.GroupBox();
            this.fragmentTableLayoutPanel = new System.Windows.Forms.TableLayoutPanel();
            this.fragmentEncodingLabel = new System.Windows.Forms.Label();
            this.noFragmentEncodingRadioButton = new System.Windows.Forms.RadioButton();
            this.pathFragmentEncodingRadioButton = new System.Windows.Forms.RadioButton();
            this.dataFragmentEncodingRadioButton = new System.Windows.Forms.RadioButton();
            this.fragmentTextBox1 = new System.Windows.Forms.TextBox();
            this.originTextBox = new System.Windows.Forms.TextBox();
            this.pathTextBox2 = new System.Windows.Forms.TextBox();
            this.queryTextBox = new System.Windows.Forms.TextBox();
            this.fragmentTextBox2 = new System.Windows.Forms.TextBox();
            this.originLabel = new System.Windows.Forms.Label();
            this.pathLabel = new System.Windows.Forms.Label();
            this.queryLabel = new System.Windows.Forms.Label();
            this.fragmentLabel = new System.Windows.Forms.Label();
            this.outerTableLayoutPanel.SuspendLayout();
            this.uriTableLayoutPanel.SuspendLayout();
            this.originGroupBox.SuspendLayout();
            this.originTableLayoutPanel.SuspendLayout();
            this.authorityGroupBox.SuspendLayout();
            this.authorityTableLayoutPanel.SuspendLayout();
            this.credentailsGroupBox.SuspendLayout();
            this.credentailsTableLayoutPanel.SuspendLayout();
            this.hostGroupBox.SuspendLayout();
            this.hostTableLayoutPanel.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.portNumericUpDown)).BeginInit();
            this.pathGroupBox.SuspendLayout();
            this.pathTableLayoutPanel.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pathDataGridView)).BeginInit();
            this.queryGroupBox.SuspendLayout();
            this.queryTableLayoutPanel.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.queryDataGridView)).BeginInit();
            this.fragmentGroupBox.SuspendLayout();
            this.fragmentTableLayoutPanel.SuspendLayout();
            this.SuspendLayout();
            // 
            // outerTableLayoutPanel
            // 
            this.outerTableLayoutPanel.ColumnCount = 4;
            this.outerTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.outerTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.outerTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.outerTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.outerTableLayoutPanel.Controls.Add(this.fragmentButton, 1, 7);
            this.outerTableLayoutPanel.Controls.Add(this.fragmentCheckBox, 0, 7);
            this.outerTableLayoutPanel.Controls.Add(this.queryButton, 1, 5);
            this.outerTableLayoutPanel.Controls.Add(this.queryCheckBox, 0, 5);
            this.outerTableLayoutPanel.Controls.Add(this.uriTableLayoutPanel, 0, 0);
            this.outerTableLayoutPanel.Controls.Add(this.originGroupBox, 2, 1);
            this.outerTableLayoutPanel.Controls.Add(this.originCheckBox, 0, 1);
            this.outerTableLayoutPanel.Controls.Add(this.pathGroupBox, 2, 3);
            this.outerTableLayoutPanel.Controls.Add(this.originButton, 1, 1);
            this.outerTableLayoutPanel.Controls.Add(this.pathButton, 0, 3);
            this.outerTableLayoutPanel.Controls.Add(this.queryGroupBox, 2, 5);
            this.outerTableLayoutPanel.Controls.Add(this.fragmentGroupBox, 2, 7);
            this.outerTableLayoutPanel.Controls.Add(this.originTextBox, 3, 2);
            this.outerTableLayoutPanel.Controls.Add(this.pathTextBox2, 3, 4);
            this.outerTableLayoutPanel.Controls.Add(this.queryTextBox, 3, 6);
            this.outerTableLayoutPanel.Controls.Add(this.fragmentTextBox2, 3, 8);
            this.outerTableLayoutPanel.Controls.Add(this.originLabel, 2, 2);
            this.outerTableLayoutPanel.Controls.Add(this.pathLabel, 2, 4);
            this.outerTableLayoutPanel.Controls.Add(this.queryLabel, 2, 6);
            this.outerTableLayoutPanel.Controls.Add(this.fragmentLabel, 2, 8);
            this.outerTableLayoutPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.outerTableLayoutPanel.Location = new System.Drawing.Point(0, 0);
            this.outerTableLayoutPanel.Name = "outerTableLayoutPanel";
            this.outerTableLayoutPanel.RowCount = 9;
            this.outerTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.outerTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.outerTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.outerTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.outerTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.outerTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.outerTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.outerTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.outerTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.outerTableLayoutPanel.Size = new System.Drawing.Size(953, 754);
            this.outerTableLayoutPanel.TabIndex = 0;
            // 
            // fragmentButton
            // 
            this.fragmentButton.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.fragmentButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.fragmentButton.Location = new System.Drawing.Point(24, 657);
            this.fragmentButton.Name = "fragmentButton";
            this.outerTableLayoutPanel.SetRowSpan(this.fragmentButton, 2);
            this.fragmentButton.Size = new System.Drawing.Size(23, 23);
            this.fragmentButton.TabIndex = 12;
            this.fragmentButton.Text = "−";
            this.fragmentButton.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.fragmentButton.UseVisualStyleBackColor = true;
            this.fragmentButton.Click += new System.EventHandler(this.FragmentButton_Click);
            // 
            // fragmentCheckBox
            // 
            this.fragmentCheckBox.AutoSize = true;
            this.fragmentCheckBox.Location = new System.Drawing.Point(3, 657);
            this.fragmentCheckBox.Name = "fragmentCheckBox";
            this.outerTableLayoutPanel.SetRowSpan(this.fragmentCheckBox, 2);
            this.fragmentCheckBox.Size = new System.Drawing.Size(15, 14);
            this.fragmentCheckBox.TabIndex = 11;
            this.fragmentCheckBox.UseVisualStyleBackColor = true;
            this.fragmentCheckBox.CheckedChanged += new System.EventHandler(this.FragmentCheckBox_CheckedChanged);
            // 
            // queryButton
            // 
            this.queryButton.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.queryButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.queryButton.Location = new System.Drawing.Point(24, 471);
            this.queryButton.Name = "queryButton";
            this.outerTableLayoutPanel.SetRowSpan(this.queryButton, 2);
            this.queryButton.Size = new System.Drawing.Size(23, 23);
            this.queryButton.TabIndex = 8;
            this.queryButton.Text = "−";
            this.queryButton.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.queryButton.UseVisualStyleBackColor = true;
            this.queryButton.Click += new System.EventHandler(this.QueryButton_Click);
            // 
            // queryCheckBox
            // 
            this.queryCheckBox.AutoSize = true;
            this.queryCheckBox.Location = new System.Drawing.Point(3, 471);
            this.queryCheckBox.Name = "queryCheckBox";
            this.outerTableLayoutPanel.SetRowSpan(this.queryCheckBox, 2);
            this.queryCheckBox.Size = new System.Drawing.Size(15, 14);
            this.queryCheckBox.TabIndex = 7;
            this.queryCheckBox.UseVisualStyleBackColor = true;
            this.queryCheckBox.CheckedChanged += new System.EventHandler(this.QueryCheckBox_CheckedChanged);
            // 
            // uriTableLayoutPanel
            // 
            this.uriTableLayoutPanel.AutoSize = true;
            this.uriTableLayoutPanel.ColumnCount = 2;
            this.outerTableLayoutPanel.SetColumnSpan(this.uriTableLayoutPanel, 4);
            this.uriTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.uriTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.uriTableLayoutPanel.Controls.Add(this.uriTextBox, 0, 1);
            this.uriTableLayoutPanel.Controls.Add(this.uriLabel, 0, 0);
            this.uriTableLayoutPanel.Controls.Add(this.newUrlButton, 1, 1);
            this.uriTableLayoutPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.uriTableLayoutPanel.Location = new System.Drawing.Point(0, 0);
            this.uriTableLayoutPanel.Margin = new System.Windows.Forms.Padding(0);
            this.uriTableLayoutPanel.Name = "uriTableLayoutPanel";
            this.uriTableLayoutPanel.RowCount = 3;
            this.uriTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.uriTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.uriTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.uriTableLayoutPanel.Size = new System.Drawing.Size(953, 42);
            this.uriTableLayoutPanel.TabIndex = 1;
            // 
            // uriTextBox
            // 
            this.uriTextBox.Dock = System.Windows.Forms.DockStyle.Top;
            this.uriTextBox.Location = new System.Drawing.Point(3, 16);
            this.uriTextBox.Name = "uriTextBox";
            this.uriTextBox.ReadOnly = true;
            this.uriTextBox.Size = new System.Drawing.Size(866, 20);
            this.uriTextBox.TabIndex = 3;
            // 
            // uriLabel
            // 
            this.uriLabel.AutoSize = true;
            this.uriTableLayoutPanel.SetColumnSpan(this.uriLabel, 2);
            this.uriLabel.Dock = System.Windows.Forms.DockStyle.Top;
            this.uriLabel.Location = new System.Drawing.Point(3, 0);
            this.uriLabel.Name = "uriLabel";
            this.uriLabel.Size = new System.Drawing.Size(947, 13);
            this.uriLabel.TabIndex = 0;
            this.uriLabel.Text = "URI";
            // 
            // newUrlButton
            // 
            this.newUrlButton.Location = new System.Drawing.Point(875, 16);
            this.newUrlButton.Name = "newUrlButton";
            this.newUrlButton.Size = new System.Drawing.Size(75, 23);
            this.newUrlButton.TabIndex = 2;
            this.newUrlButton.Text = "...";
            this.newUrlButton.UseVisualStyleBackColor = true;
            this.newUrlButton.Click += new System.EventHandler(this.NewUrlButton_Click);
            // 
            // originGroupBox
            // 
            this.originGroupBox.AutoSize = true;
            this.outerTableLayoutPanel.SetColumnSpan(this.originGroupBox, 2);
            this.originGroupBox.Controls.Add(this.originTableLayoutPanel);
            this.originGroupBox.Dock = System.Windows.Forms.DockStyle.Fill;
            this.originGroupBox.Location = new System.Drawing.Point(53, 45);
            this.originGroupBox.Name = "originGroupBox";
            this.originGroupBox.Size = new System.Drawing.Size(897, 208);
            this.originGroupBox.TabIndex = 2;
            this.originGroupBox.TabStop = false;
            this.originGroupBox.Text = "Origin";
            // 
            // originTableLayoutPanel
            // 
            this.originTableLayoutPanel.AutoSize = true;
            this.originTableLayoutPanel.ColumnCount = 4;
            this.originTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.originTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.originTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.originTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.originTableLayoutPanel.Controls.Add(this.authorityCheckBox, 0, 2);
            this.originTableLayoutPanel.Controls.Add(this.schemeLabel, 0, 0);
            this.originTableLayoutPanel.Controls.Add(this.schemeNameComboBox, 1, 0);
            this.originTableLayoutPanel.Controls.Add(this.schemeSeparatorComboBox, 3, 0);
            this.originTableLayoutPanel.Controls.Add(this.customSchemeTextBox, 2, 0);
            this.originTableLayoutPanel.Controls.Add(this.authorityGroupBox, 1, 2);
            this.originTableLayoutPanel.Controls.Add(this.invalidSchemeNameLabel, 2, 1);
            this.originTableLayoutPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.originTableLayoutPanel.Location = new System.Drawing.Point(3, 16);
            this.originTableLayoutPanel.Margin = new System.Windows.Forms.Padding(0);
            this.originTableLayoutPanel.Name = "originTableLayoutPanel";
            this.originTableLayoutPanel.RowCount = 3;
            this.originTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.originTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.originTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.originTableLayoutPanel.Size = new System.Drawing.Size(891, 189);
            this.originTableLayoutPanel.TabIndex = 0;
            // 
            // authorityCheckBox
            // 
            this.authorityCheckBox.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.authorityCheckBox.AutoSize = true;
            this.authorityCheckBox.Location = new System.Drawing.Point(37, 50);
            this.authorityCheckBox.Margin = new System.Windows.Forms.Padding(3, 3, 0, 3);
            this.authorityCheckBox.Name = "authorityCheckBox";
            this.authorityCheckBox.Size = new System.Drawing.Size(15, 14);
            this.authorityCheckBox.TabIndex = 6;
            this.authorityCheckBox.UseVisualStyleBackColor = true;
            // 
            // schemeLabel
            // 
            this.schemeLabel.AutoSize = true;
            this.schemeLabel.Dock = System.Windows.Forms.DockStyle.Top;
            this.schemeLabel.Location = new System.Drawing.Point(3, 3);
            this.schemeLabel.Margin = new System.Windows.Forms.Padding(3, 3, 0, 0);
            this.schemeLabel.Name = "schemeLabel";
            this.schemeLabel.Size = new System.Drawing.Size(49, 13);
            this.schemeLabel.TabIndex = 0;
            this.schemeLabel.Text = "Scheme:";
            this.schemeLabel.TextAlign = System.Drawing.ContentAlignment.TopRight;
            // 
            // schemeNameComboBox
            // 
            this.schemeNameComboBox.Dock = System.Windows.Forms.DockStyle.Top;
            this.schemeNameComboBox.FormattingEnabled = true;
            this.schemeNameComboBox.Location = new System.Drawing.Point(52, 3);
            this.schemeNameComboBox.Margin = new System.Windows.Forms.Padding(0, 3, 0, 3);
            this.schemeNameComboBox.Name = "schemeNameComboBox";
            this.schemeNameComboBox.Size = new System.Drawing.Size(121, 21);
            this.schemeNameComboBox.TabIndex = 1;
            // 
            // schemeSeparatorComboBox
            // 
            this.schemeSeparatorComboBox.Dock = System.Windows.Forms.DockStyle.Top;
            this.schemeSeparatorComboBox.FormattingEnabled = true;
            this.schemeSeparatorComboBox.Location = new System.Drawing.Point(532, 3);
            this.schemeSeparatorComboBox.Margin = new System.Windows.Forms.Padding(0, 3, 3, 3);
            this.schemeSeparatorComboBox.Name = "schemeSeparatorComboBox";
            this.schemeSeparatorComboBox.Size = new System.Drawing.Size(356, 21);
            this.schemeSeparatorComboBox.TabIndex = 2;
            // 
            // customSchemeTextBox
            // 
            this.customSchemeTextBox.Dock = System.Windows.Forms.DockStyle.Top;
            this.customSchemeTextBox.Location = new System.Drawing.Point(173, 3);
            this.customSchemeTextBox.Margin = new System.Windows.Forms.Padding(0, 3, 0, 3);
            this.customSchemeTextBox.Name = "customSchemeTextBox";
            this.customSchemeTextBox.Size = new System.Drawing.Size(359, 20);
            this.customSchemeTextBox.TabIndex = 4;
            // 
            // authorityGroupBox
            // 
            this.authorityGroupBox.AutoSize = true;
            this.originTableLayoutPanel.SetColumnSpan(this.authorityGroupBox, 3);
            this.authorityGroupBox.Controls.Add(this.authorityTableLayoutPanel);
            this.authorityGroupBox.Dock = System.Windows.Forms.DockStyle.Fill;
            this.authorityGroupBox.Location = new System.Drawing.Point(52, 50);
            this.authorityGroupBox.Margin = new System.Windows.Forms.Padding(0, 3, 3, 3);
            this.authorityGroupBox.Name = "authorityGroupBox";
            this.authorityGroupBox.Size = new System.Drawing.Size(836, 136);
            this.authorityGroupBox.TabIndex = 5;
            this.authorityGroupBox.TabStop = false;
            this.authorityGroupBox.Text = "Authority";
            // 
            // authorityTableLayoutPanel
            // 
            this.authorityTableLayoutPanel.AutoSize = true;
            this.authorityTableLayoutPanel.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.authorityTableLayoutPanel.ColumnCount = 2;
            this.authorityTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.authorityTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.authorityTableLayoutPanel.Controls.Add(this.credentailsGroupBox, 0, 0);
            this.authorityTableLayoutPanel.Controls.Add(this.hostGroupBox, 1, 0);
            this.authorityTableLayoutPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.authorityTableLayoutPanel.Location = new System.Drawing.Point(3, 16);
            this.authorityTableLayoutPanel.Margin = new System.Windows.Forms.Padding(0);
            this.authorityTableLayoutPanel.Name = "authorityTableLayoutPanel";
            this.authorityTableLayoutPanel.RowCount = 1;
            this.authorityTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.authorityTableLayoutPanel.Size = new System.Drawing.Size(830, 117);
            this.authorityTableLayoutPanel.TabIndex = 0;
            // 
            // credentailsGroupBox
            // 
            this.credentailsGroupBox.AutoSize = true;
            this.credentailsGroupBox.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.credentailsGroupBox.Controls.Add(this.credentailsTableLayoutPanel);
            this.credentailsGroupBox.Dock = System.Windows.Forms.DockStyle.Fill;
            this.credentailsGroupBox.Location = new System.Drawing.Point(3, 3);
            this.credentailsGroupBox.Name = "credentailsGroupBox";
            this.credentailsGroupBox.Size = new System.Drawing.Size(409, 111);
            this.credentailsGroupBox.TabIndex = 0;
            this.credentailsGroupBox.TabStop = false;
            this.credentailsGroupBox.Text = "Credentials";
            // 
            // credentailsTableLayoutPanel
            // 
            this.credentailsTableLayoutPanel.AutoSize = true;
            this.credentailsTableLayoutPanel.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.credentailsTableLayoutPanel.ColumnCount = 4;
            this.credentailsTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.credentailsTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.credentailsTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.credentailsTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.credentailsTableLayoutPanel.Controls.Add(this.usernameCheckBox, 0, 0);
            this.credentailsTableLayoutPanel.Controls.Add(this.passwordCheckBox, 0, 1);
            this.credentailsTableLayoutPanel.Controls.Add(this.usernameTextBox, 1, 0);
            this.credentailsTableLayoutPanel.Controls.Add(this.maskedPasswordTextBox, 1, 1);
            this.credentailsTableLayoutPanel.Controls.Add(this.showPasswordCheckBox, 3, 1);
            this.credentailsTableLayoutPanel.Controls.Add(this.passwordTextBox, 2, 1);
            this.credentailsTableLayoutPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.credentailsTableLayoutPanel.Location = new System.Drawing.Point(3, 16);
            this.credentailsTableLayoutPanel.Margin = new System.Windows.Forms.Padding(0);
            this.credentailsTableLayoutPanel.Name = "credentailsTableLayoutPanel";
            this.credentailsTableLayoutPanel.RowCount = 2;
            this.credentailsTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.credentailsTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.credentailsTableLayoutPanel.Size = new System.Drawing.Size(403, 92);
            this.credentailsTableLayoutPanel.TabIndex = 0;
            // 
            // usernameCheckBox
            // 
            this.usernameCheckBox.AutoSize = true;
            this.usernameCheckBox.Dock = System.Windows.Forms.DockStyle.Top;
            this.usernameCheckBox.Location = new System.Drawing.Point(3, 3);
            this.usernameCheckBox.Margin = new System.Windows.Forms.Padding(3, 3, 0, 3);
            this.usernameCheckBox.Name = "usernameCheckBox";
            this.usernameCheckBox.Size = new System.Drawing.Size(77, 17);
            this.usernameCheckBox.TabIndex = 0;
            this.usernameCheckBox.Text = "Username:";
            this.usernameCheckBox.TextAlign = System.Drawing.ContentAlignment.TopRight;
            this.usernameCheckBox.UseVisualStyleBackColor = true;
            // 
            // passwordCheckBox
            // 
            this.passwordCheckBox.AutoSize = true;
            this.passwordCheckBox.Dock = System.Windows.Forms.DockStyle.Top;
            this.passwordCheckBox.Location = new System.Drawing.Point(3, 29);
            this.passwordCheckBox.Margin = new System.Windows.Forms.Padding(3, 3, 0, 3);
            this.passwordCheckBox.Name = "passwordCheckBox";
            this.passwordCheckBox.Size = new System.Drawing.Size(77, 17);
            this.passwordCheckBox.TabIndex = 1;
            this.passwordCheckBox.Text = "Password:";
            this.passwordCheckBox.TextAlign = System.Drawing.ContentAlignment.TopRight;
            this.passwordCheckBox.UseVisualStyleBackColor = true;
            // 
            // usernameTextBox
            // 
            this.credentailsTableLayoutPanel.SetColumnSpan(this.usernameTextBox, 3);
            this.usernameTextBox.Dock = System.Windows.Forms.DockStyle.Top;
            this.usernameTextBox.Location = new System.Drawing.Point(80, 3);
            this.usernameTextBox.Margin = new System.Windows.Forms.Padding(0, 3, 3, 3);
            this.usernameTextBox.Name = "usernameTextBox";
            this.usernameTextBox.Size = new System.Drawing.Size(320, 20);
            this.usernameTextBox.TabIndex = 2;
            // 
            // maskedPasswordTextBox
            // 
            this.maskedPasswordTextBox.Dock = System.Windows.Forms.DockStyle.Top;
            this.maskedPasswordTextBox.Location = new System.Drawing.Point(80, 29);
            this.maskedPasswordTextBox.Margin = new System.Windows.Forms.Padding(0, 3, 3, 3);
            this.maskedPasswordTextBox.Name = "maskedPasswordTextBox";
            this.maskedPasswordTextBox.Size = new System.Drawing.Size(129, 20);
            this.maskedPasswordTextBox.TabIndex = 3;
            // 
            // showPasswordCheckBox
            // 
            this.showPasswordCheckBox.AutoSize = true;
            this.showPasswordCheckBox.Dock = System.Windows.Forms.DockStyle.Top;
            this.showPasswordCheckBox.Location = new System.Drawing.Point(347, 29);
            this.showPasswordCheckBox.Name = "showPasswordCheckBox";
            this.showPasswordCheckBox.Size = new System.Drawing.Size(53, 17);
            this.showPasswordCheckBox.TabIndex = 4;
            this.showPasswordCheckBox.Text = "Show";
            this.showPasswordCheckBox.UseVisualStyleBackColor = true;
            // 
            // passwordTextBox
            // 
            this.passwordTextBox.Dock = System.Windows.Forms.DockStyle.Top;
            this.passwordTextBox.Location = new System.Drawing.Point(212, 29);
            this.passwordTextBox.Margin = new System.Windows.Forms.Padding(0, 3, 3, 3);
            this.passwordTextBox.Name = "passwordTextBox";
            this.passwordTextBox.Size = new System.Drawing.Size(129, 20);
            this.passwordTextBox.TabIndex = 5;
            // 
            // hostGroupBox
            // 
            this.hostGroupBox.AutoSize = true;
            this.hostGroupBox.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.hostGroupBox.Controls.Add(this.hostTableLayoutPanel);
            this.hostGroupBox.Dock = System.Windows.Forms.DockStyle.Fill;
            this.hostGroupBox.Location = new System.Drawing.Point(418, 3);
            this.hostGroupBox.Name = "hostGroupBox";
            this.hostGroupBox.Size = new System.Drawing.Size(409, 111);
            this.hostGroupBox.TabIndex = 1;
            this.hostGroupBox.TabStop = false;
            this.hostGroupBox.Text = "Host";
            // 
            // hostTableLayoutPanel
            // 
            this.hostTableLayoutPanel.AutoSize = true;
            this.hostTableLayoutPanel.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.hostTableLayoutPanel.ColumnCount = 3;
            this.hostTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.hostTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.hostTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.hostTableLayoutPanel.Controls.Add(this.hostNameCheckBox, 0, 0);
            this.hostTableLayoutPanel.Controls.Add(this.portCheckBox, 0, 2);
            this.hostTableLayoutPanel.Controls.Add(this.hostNameTextBox, 1, 0);
            this.hostTableLayoutPanel.Controls.Add(this.portNumericUpDown, 1, 2);
            this.hostTableLayoutPanel.Controls.Add(this.defaultPortCheckBox, 2, 2);
            this.hostTableLayoutPanel.Controls.Add(this.invalidHostNameLabel, 1, 1);
            this.hostTableLayoutPanel.Controls.Add(this.invalidPortNumberLabel, 1, 3);
            this.hostTableLayoutPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.hostTableLayoutPanel.Location = new System.Drawing.Point(3, 16);
            this.hostTableLayoutPanel.Margin = new System.Windows.Forms.Padding(0);
            this.hostTableLayoutPanel.Name = "hostTableLayoutPanel";
            this.hostTableLayoutPanel.RowCount = 4;
            this.hostTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.hostTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.hostTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.hostTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.hostTableLayoutPanel.Size = new System.Drawing.Size(403, 92);
            this.hostTableLayoutPanel.TabIndex = 1;
            // 
            // hostNameCheckBox
            // 
            this.hostNameCheckBox.AutoSize = true;
            this.hostNameCheckBox.Dock = System.Windows.Forms.DockStyle.Top;
            this.hostNameCheckBox.Location = new System.Drawing.Point(3, 3);
            this.hostNameCheckBox.Margin = new System.Windows.Forms.Padding(3, 3, 0, 3);
            this.hostNameCheckBox.Name = "hostNameCheckBox";
            this.hostNameCheckBox.Size = new System.Drawing.Size(57, 17);
            this.hostNameCheckBox.TabIndex = 0;
            this.hostNameCheckBox.Text = "Name:";
            this.hostNameCheckBox.TextAlign = System.Drawing.ContentAlignment.TopRight;
            this.hostNameCheckBox.UseVisualStyleBackColor = true;
            // 
            // portCheckBox
            // 
            this.portCheckBox.AutoSize = true;
            this.portCheckBox.Dock = System.Windows.Forms.DockStyle.Top;
            this.portCheckBox.Location = new System.Drawing.Point(3, 49);
            this.portCheckBox.Margin = new System.Windows.Forms.Padding(3, 3, 0, 3);
            this.portCheckBox.Name = "portCheckBox";
            this.portCheckBox.Size = new System.Drawing.Size(57, 17);
            this.portCheckBox.TabIndex = 1;
            this.portCheckBox.Text = "Port:";
            this.portCheckBox.TextAlign = System.Drawing.ContentAlignment.TopRight;
            this.portCheckBox.UseVisualStyleBackColor = true;
            // 
            // hostNameTextBox
            // 
            this.hostTableLayoutPanel.SetColumnSpan(this.hostNameTextBox, 2);
            this.hostNameTextBox.Dock = System.Windows.Forms.DockStyle.Top;
            this.hostNameTextBox.Location = new System.Drawing.Point(60, 3);
            this.hostNameTextBox.Margin = new System.Windows.Forms.Padding(0, 3, 3, 3);
            this.hostNameTextBox.Name = "hostNameTextBox";
            this.hostNameTextBox.Size = new System.Drawing.Size(340, 20);
            this.hostNameTextBox.TabIndex = 2;
            // 
            // portNumericUpDown
            // 
            this.portNumericUpDown.Dock = System.Windows.Forms.DockStyle.Top;
            this.portNumericUpDown.Location = new System.Drawing.Point(60, 49);
            this.portNumericUpDown.Margin = new System.Windows.Forms.Padding(0, 3, 3, 3);
            this.portNumericUpDown.Name = "portNumericUpDown";
            this.portNumericUpDown.Size = new System.Drawing.Size(274, 20);
            this.portNumericUpDown.TabIndex = 3;
            // 
            // defaultPortCheckBox
            // 
            this.defaultPortCheckBox.AutoSize = true;
            this.defaultPortCheckBox.Location = new System.Drawing.Point(340, 49);
            this.defaultPortCheckBox.Name = "defaultPortCheckBox";
            this.defaultPortCheckBox.Size = new System.Drawing.Size(60, 17);
            this.defaultPortCheckBox.TabIndex = 4;
            this.defaultPortCheckBox.Text = "Default";
            this.defaultPortCheckBox.UseVisualStyleBackColor = true;
            // 
            // invalidHostNameLabel
            // 
            this.invalidHostNameLabel.AutoSize = true;
            this.invalidHostNameLabel.ForeColor = System.Drawing.Color.DarkRed;
            this.invalidHostNameLabel.Location = new System.Drawing.Point(63, 26);
            this.invalidHostNameLabel.Name = "invalidHostNameLabel";
            this.invalidHostNameLabel.Size = new System.Drawing.Size(120, 13);
            this.invalidHostNameLabel.TabIndex = 5;
            this.invalidHostNameLabel.Text = "Host name not provided";
            // 
            // invalidPortNumberLabel
            // 
            this.invalidPortNumberLabel.AutoSize = true;
            this.invalidPortNumberLabel.ForeColor = System.Drawing.Color.DarkRed;
            this.invalidPortNumberLabel.Location = new System.Drawing.Point(63, 72);
            this.invalidPortNumberLabel.Name = "invalidPortNumberLabel";
            this.invalidPortNumberLabel.Size = new System.Drawing.Size(97, 13);
            this.invalidPortNumberLabel.TabIndex = 6;
            this.invalidPortNumberLabel.Text = "Invalid port number";
            // 
            // invalidSchemeNameLabel
            // 
            this.invalidSchemeNameLabel.AutoSize = true;
            this.invalidSchemeNameLabel.ForeColor = System.Drawing.Color.DarkRed;
            this.invalidSchemeNameLabel.Location = new System.Drawing.Point(176, 27);
            this.invalidSchemeNameLabel.Name = "invalidSchemeNameLabel";
            this.invalidSchemeNameLabel.Size = new System.Drawing.Size(107, 13);
            this.invalidSchemeNameLabel.TabIndex = 7;
            this.invalidSchemeNameLabel.Text = "Invalid scheme name";
            // 
            // originCheckBox
            // 
            this.originCheckBox.AutoSize = true;
            this.originCheckBox.Location = new System.Drawing.Point(3, 45);
            this.originCheckBox.Name = "originCheckBox";
            this.outerTableLayoutPanel.SetRowSpan(this.originCheckBox, 2);
            this.originCheckBox.Size = new System.Drawing.Size(15, 14);
            this.originCheckBox.TabIndex = 3;
            this.originCheckBox.UseVisualStyleBackColor = true;
            this.originCheckBox.CheckedChanged += new System.EventHandler(this.OriginCheckBox_CheckedChanged);
            // 
            // pathGroupBox
            // 
            this.pathGroupBox.AutoSize = true;
            this.pathGroupBox.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.outerTableLayoutPanel.SetColumnSpan(this.pathGroupBox, 2);
            this.pathGroupBox.Controls.Add(this.pathTableLayoutPanel);
            this.pathGroupBox.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pathGroupBox.Location = new System.Drawing.Point(50, 285);
            this.pathGroupBox.Margin = new System.Windows.Forms.Padding(0, 3, 3, 3);
            this.pathGroupBox.Name = "pathGroupBox";
            this.pathGroupBox.Size = new System.Drawing.Size(900, 154);
            this.pathGroupBox.TabIndex = 4;
            this.pathGroupBox.TabStop = false;
            this.pathGroupBox.Text = "Path";
            // 
            // pathTableLayoutPanel
            // 
            this.pathTableLayoutPanel.AutoSize = true;
            this.pathTableLayoutPanel.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.pathTableLayoutPanel.ColumnCount = 3;
            this.pathTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.pathTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.pathTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.pathTableLayoutPanel.Controls.Add(this.addPathSegmentButton, 0, 2);
            this.pathTableLayoutPanel.Controls.Add(this.clearPathSegmentsButton, 1, 2);
            this.pathTableLayoutPanel.Controls.Add(this.setRootPathButton, 2, 2);
            this.pathTableLayoutPanel.Controls.Add(this.pathTextBox1, 0, 0);
            this.pathTableLayoutPanel.Controls.Add(this.pathDataGridView, 0, 1);
            this.pathTableLayoutPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pathTableLayoutPanel.Location = new System.Drawing.Point(3, 16);
            this.pathTableLayoutPanel.Name = "pathTableLayoutPanel";
            this.pathTableLayoutPanel.RowCount = 3;
            this.pathTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.pathTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 66.66666F));
            this.pathTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.pathTableLayoutPanel.Size = new System.Drawing.Size(894, 135);
            this.pathTableLayoutPanel.TabIndex = 0;
            // 
            // addPathSegmentButton
            // 
            this.addPathSegmentButton.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.addPathSegmentButton.Location = new System.Drawing.Point(654, 109);
            this.addPathSegmentButton.Name = "addPathSegmentButton";
            this.addPathSegmentButton.Size = new System.Drawing.Size(75, 23);
            this.addPathSegmentButton.TabIndex = 0;
            this.addPathSegmentButton.Text = "Add";
            this.addPathSegmentButton.UseVisualStyleBackColor = true;
            this.addPathSegmentButton.Click += new System.EventHandler(this.AddPathSegmentButton_Click);
            // 
            // clearPathSegmentsButton
            // 
            this.clearPathSegmentsButton.Location = new System.Drawing.Point(735, 109);
            this.clearPathSegmentsButton.Name = "clearPathSegmentsButton";
            this.clearPathSegmentsButton.Size = new System.Drawing.Size(75, 23);
            this.clearPathSegmentsButton.TabIndex = 1;
            this.clearPathSegmentsButton.Text = "Clear";
            this.clearPathSegmentsButton.UseVisualStyleBackColor = true;
            this.clearPathSegmentsButton.Click += new System.EventHandler(this.ClearPathSegmentsButton_Click);
            // 
            // setRootPathButton
            // 
            this.setRootPathButton.Location = new System.Drawing.Point(816, 109);
            this.setRootPathButton.Name = "setRootPathButton";
            this.setRootPathButton.Size = new System.Drawing.Size(75, 23);
            this.setRootPathButton.TabIndex = 2;
            this.setRootPathButton.Text = "Set Root";
            this.setRootPathButton.UseVisualStyleBackColor = true;
            this.setRootPathButton.Click += new System.EventHandler(this.SetRootPathButton_Click);
            // 
            // pathTextBox1
            // 
            this.pathTableLayoutPanel.SetColumnSpan(this.pathTextBox1, 3);
            this.pathTextBox1.Dock = System.Windows.Forms.DockStyle.Top;
            this.pathTextBox1.Location = new System.Drawing.Point(3, 3);
            this.pathTextBox1.Name = "pathTextBox1";
            this.pathTextBox1.Size = new System.Drawing.Size(888, 20);
            this.pathTextBox1.TabIndex = 3;
            // 
            // pathDataGridView
            // 
            this.pathDataGridView.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.pathTableLayoutPanel.SetColumnSpan(this.pathDataGridView, 3);
            this.pathDataGridView.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pathDataGridView.Location = new System.Drawing.Point(3, 29);
            this.pathDataGridView.Name = "pathDataGridView";
            this.pathDataGridView.Size = new System.Drawing.Size(888, 74);
            this.pathDataGridView.TabIndex = 4;
            // 
            // originButton
            // 
            this.originButton.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.originButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.originButton.Location = new System.Drawing.Point(24, 45);
            this.originButton.Name = "originButton";
            this.outerTableLayoutPanel.SetRowSpan(this.originButton, 2);
            this.originButton.Size = new System.Drawing.Size(23, 23);
            this.originButton.TabIndex = 5;
            this.originButton.Text = "−";
            this.originButton.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.originButton.UseVisualStyleBackColor = true;
            this.originButton.Click += new System.EventHandler(this.OriginButton_Click);
            // 
            // pathButton
            // 
            this.pathButton.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.outerTableLayoutPanel.SetColumnSpan(this.pathButton, 2);
            this.pathButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.pathButton.Location = new System.Drawing.Point(24, 285);
            this.pathButton.Name = "pathButton";
            this.outerTableLayoutPanel.SetRowSpan(this.pathButton, 2);
            this.pathButton.Size = new System.Drawing.Size(23, 23);
            this.pathButton.TabIndex = 6;
            this.pathButton.Text = "−";
            this.pathButton.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            this.pathButton.UseVisualStyleBackColor = true;
            this.pathButton.Click += new System.EventHandler(this.PathButton_Click);
            // 
            // queryGroupBox
            // 
            this.queryGroupBox.AutoSize = true;
            this.queryGroupBox.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.outerTableLayoutPanel.SetColumnSpan(this.queryGroupBox, 2);
            this.queryGroupBox.Controls.Add(this.queryTableLayoutPanel);
            this.queryGroupBox.Dock = System.Windows.Forms.DockStyle.Fill;
            this.queryGroupBox.Location = new System.Drawing.Point(53, 471);
            this.queryGroupBox.Name = "queryGroupBox";
            this.queryGroupBox.Size = new System.Drawing.Size(897, 154);
            this.queryGroupBox.TabIndex = 9;
            this.queryGroupBox.TabStop = false;
            this.queryGroupBox.Text = "Query Parameters";
            // 
            // queryTableLayoutPanel
            // 
            this.queryTableLayoutPanel.AutoSize = true;
            this.queryTableLayoutPanel.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.queryTableLayoutPanel.ColumnCount = 3;
            this.queryTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.queryTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.queryTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.queryTableLayoutPanel.Controls.Add(this.addQueryParameterButton, 0, 1);
            this.queryTableLayoutPanel.Controls.Add(this.queryDataGridView, 0, 0);
            this.queryTableLayoutPanel.Controls.Add(this.clearQueryParametersButton, 1, 1);
            this.queryTableLayoutPanel.Controls.Add(this.setEmptyQueryParameterButton, 2, 1);
            this.queryTableLayoutPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.queryTableLayoutPanel.Location = new System.Drawing.Point(3, 16);
            this.queryTableLayoutPanel.Margin = new System.Windows.Forms.Padding(0);
            this.queryTableLayoutPanel.Name = "queryTableLayoutPanel";
            this.queryTableLayoutPanel.RowCount = 2;
            this.queryTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.queryTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.queryTableLayoutPanel.Size = new System.Drawing.Size(891, 135);
            this.queryTableLayoutPanel.TabIndex = 0;
            // 
            // addQueryParameterButton
            // 
            this.addQueryParameterButton.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.addQueryParameterButton.Location = new System.Drawing.Point(651, 109);
            this.addQueryParameterButton.Name = "addQueryParameterButton";
            this.addQueryParameterButton.Size = new System.Drawing.Size(75, 23);
            this.addQueryParameterButton.TabIndex = 0;
            this.addQueryParameterButton.Text = "Add";
            this.addQueryParameterButton.UseVisualStyleBackColor = true;
            this.addQueryParameterButton.Click += new System.EventHandler(this.AddQueryParameterButton_Click);
            // 
            // queryDataGridView
            // 
            this.queryDataGridView.AutoSizeRowsMode = System.Windows.Forms.DataGridViewAutoSizeRowsMode.DisplayedCells;
            this.queryDataGridView.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.queryTableLayoutPanel.SetColumnSpan(this.queryDataGridView, 3);
            this.queryDataGridView.Dock = System.Windows.Forms.DockStyle.Fill;
            this.queryDataGridView.Location = new System.Drawing.Point(3, 3);
            this.queryDataGridView.Name = "queryDataGridView";
            this.queryDataGridView.Size = new System.Drawing.Size(885, 100);
            this.queryDataGridView.TabIndex = 2;
            // 
            // clearQueryParametersButton
            // 
            this.clearQueryParametersButton.Location = new System.Drawing.Point(732, 109);
            this.clearQueryParametersButton.Name = "clearQueryParametersButton";
            this.clearQueryParametersButton.Size = new System.Drawing.Size(75, 23);
            this.clearQueryParametersButton.TabIndex = 1;
            this.clearQueryParametersButton.Text = "Clear";
            this.clearQueryParametersButton.UseVisualStyleBackColor = true;
            this.clearQueryParametersButton.Click += new System.EventHandler(this.ClearQueryParametersButton_Click);
            // 
            // setEmptyQueryParameterButton
            // 
            this.setEmptyQueryParameterButton.Location = new System.Drawing.Point(813, 109);
            this.setEmptyQueryParameterButton.Name = "setEmptyQueryParameterButton";
            this.setEmptyQueryParameterButton.Size = new System.Drawing.Size(75, 23);
            this.setEmptyQueryParameterButton.TabIndex = 3;
            this.setEmptyQueryParameterButton.Text = "Set Empty";
            this.setEmptyQueryParameterButton.UseVisualStyleBackColor = true;
            this.setEmptyQueryParameterButton.Click += new System.EventHandler(this.SetEmptyQueryParameterButton_Click);
            // 
            // fragmentGroupBox
            // 
            this.fragmentGroupBox.AutoSize = true;
            this.fragmentGroupBox.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.outerTableLayoutPanel.SetColumnSpan(this.fragmentGroupBox, 2);
            this.fragmentGroupBox.Controls.Add(this.fragmentTableLayoutPanel);
            this.fragmentGroupBox.Dock = System.Windows.Forms.DockStyle.Top;
            this.fragmentGroupBox.Location = new System.Drawing.Point(53, 657);
            this.fragmentGroupBox.Name = "fragmentGroupBox";
            this.fragmentGroupBox.Size = new System.Drawing.Size(897, 68);
            this.fragmentGroupBox.TabIndex = 10;
            this.fragmentGroupBox.TabStop = false;
            this.fragmentGroupBox.Text = "Fragment";
            // 
            // fragmentTableLayoutPanel
            // 
            this.fragmentTableLayoutPanel.AutoSize = true;
            this.fragmentTableLayoutPanel.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.fragmentTableLayoutPanel.ColumnCount = 4;
            this.fragmentTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.fragmentTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.fragmentTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle());
            this.fragmentTableLayoutPanel.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.fragmentTableLayoutPanel.Controls.Add(this.fragmentEncodingLabel, 0, 0);
            this.fragmentTableLayoutPanel.Controls.Add(this.noFragmentEncodingRadioButton, 1, 0);
            this.fragmentTableLayoutPanel.Controls.Add(this.pathFragmentEncodingRadioButton, 2, 0);
            this.fragmentTableLayoutPanel.Controls.Add(this.dataFragmentEncodingRadioButton, 3, 0);
            this.fragmentTableLayoutPanel.Controls.Add(this.fragmentTextBox1, 0, 1);
            this.fragmentTableLayoutPanel.Dock = System.Windows.Forms.DockStyle.Top;
            this.fragmentTableLayoutPanel.Location = new System.Drawing.Point(3, 16);
            this.fragmentTableLayoutPanel.Margin = new System.Windows.Forms.Padding(0);
            this.fragmentTableLayoutPanel.Name = "fragmentTableLayoutPanel";
            this.fragmentTableLayoutPanel.RowCount = 2;
            this.fragmentTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.fragmentTableLayoutPanel.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.fragmentTableLayoutPanel.Size = new System.Drawing.Size(891, 49);
            this.fragmentTableLayoutPanel.TabIndex = 0;
            // 
            // fragmentEncodingLabel
            // 
            this.fragmentEncodingLabel.AutoSize = true;
            this.fragmentEncodingLabel.Dock = System.Windows.Forms.DockStyle.Top;
            this.fragmentEncodingLabel.Location = new System.Drawing.Point(3, 3);
            this.fragmentEncodingLabel.Margin = new System.Windows.Forms.Padding(3, 3, 0, 0);
            this.fragmentEncodingLabel.Name = "fragmentEncodingLabel";
            this.fragmentEncodingLabel.Size = new System.Drawing.Size(55, 13);
            this.fragmentEncodingLabel.TabIndex = 0;
            this.fragmentEncodingLabel.Text = "Encoding:";
            // 
            // noFragmentEncodingRadioButton
            // 
            this.noFragmentEncodingRadioButton.AutoSize = true;
            this.noFragmentEncodingRadioButton.Dock = System.Windows.Forms.DockStyle.Top;
            this.noFragmentEncodingRadioButton.Location = new System.Drawing.Point(61, 3);
            this.noFragmentEncodingRadioButton.Name = "noFragmentEncodingRadioButton";
            this.noFragmentEncodingRadioButton.Size = new System.Drawing.Size(51, 17);
            this.noFragmentEncodingRadioButton.TabIndex = 1;
            this.noFragmentEncodingRadioButton.TabStop = true;
            this.noFragmentEncodingRadioButton.Text = "None";
            this.noFragmentEncodingRadioButton.UseVisualStyleBackColor = true;
            // 
            // pathFragmentEncodingRadioButton
            // 
            this.pathFragmentEncodingRadioButton.AutoSize = true;
            this.pathFragmentEncodingRadioButton.Dock = System.Windows.Forms.DockStyle.Top;
            this.pathFragmentEncodingRadioButton.Location = new System.Drawing.Point(118, 3);
            this.pathFragmentEncodingRadioButton.Name = "pathFragmentEncodingRadioButton";
            this.pathFragmentEncodingRadioButton.Size = new System.Drawing.Size(47, 17);
            this.pathFragmentEncodingRadioButton.TabIndex = 2;
            this.pathFragmentEncodingRadioButton.TabStop = true;
            this.pathFragmentEncodingRadioButton.Text = "Path";
            this.pathFragmentEncodingRadioButton.UseVisualStyleBackColor = true;
            // 
            // dataFragmentEncodingRadioButton
            // 
            this.dataFragmentEncodingRadioButton.AutoSize = true;
            this.dataFragmentEncodingRadioButton.Dock = System.Windows.Forms.DockStyle.Fill;
            this.dataFragmentEncodingRadioButton.Location = new System.Drawing.Point(171, 3);
            this.dataFragmentEncodingRadioButton.Name = "dataFragmentEncodingRadioButton";
            this.dataFragmentEncodingRadioButton.Size = new System.Drawing.Size(717, 17);
            this.dataFragmentEncodingRadioButton.TabIndex = 3;
            this.dataFragmentEncodingRadioButton.TabStop = true;
            this.dataFragmentEncodingRadioButton.Text = "Data";
            this.dataFragmentEncodingRadioButton.UseVisualStyleBackColor = true;
            // 
            // fragmentTextBox1
            // 
            this.fragmentTableLayoutPanel.SetColumnSpan(this.fragmentTextBox1, 4);
            this.fragmentTextBox1.Dock = System.Windows.Forms.DockStyle.Top;
            this.fragmentTextBox1.Location = new System.Drawing.Point(3, 26);
            this.fragmentTextBox1.Name = "fragmentTextBox1";
            this.fragmentTextBox1.Size = new System.Drawing.Size(885, 20);
            this.fragmentTextBox1.TabIndex = 4;
            // 
            // originTextBox
            // 
            this.originTextBox.Dock = System.Windows.Forms.DockStyle.Top;
            this.originTextBox.Location = new System.Drawing.Point(144, 259);
            this.originTextBox.Margin = new System.Windows.Forms.Padding(0, 3, 3, 3);
            this.originTextBox.Name = "originTextBox";
            this.originTextBox.ReadOnly = true;
            this.originTextBox.Size = new System.Drawing.Size(806, 20);
            this.originTextBox.TabIndex = 13;
            // 
            // pathTextBox2
            // 
            this.pathTextBox2.Dock = System.Windows.Forms.DockStyle.Top;
            this.pathTextBox2.Location = new System.Drawing.Point(144, 445);
            this.pathTextBox2.Margin = new System.Windows.Forms.Padding(0, 3, 3, 3);
            this.pathTextBox2.Name = "pathTextBox2";
            this.pathTextBox2.Size = new System.Drawing.Size(806, 20);
            this.pathTextBox2.TabIndex = 14;
            // 
            // queryTextBox
            // 
            this.queryTextBox.Dock = System.Windows.Forms.DockStyle.Top;
            this.queryTextBox.Location = new System.Drawing.Point(144, 631);
            this.queryTextBox.Margin = new System.Windows.Forms.Padding(0, 3, 3, 3);
            this.queryTextBox.Name = "queryTextBox";
            this.queryTextBox.Size = new System.Drawing.Size(806, 20);
            this.queryTextBox.TabIndex = 15;
            // 
            // fragmentTextBox2
            // 
            this.fragmentTextBox2.Dock = System.Windows.Forms.DockStyle.Top;
            this.fragmentTextBox2.Location = new System.Drawing.Point(144, 731);
            this.fragmentTextBox2.Margin = new System.Windows.Forms.Padding(0, 3, 3, 3);
            this.fragmentTextBox2.Name = "fragmentTextBox2";
            this.fragmentTextBox2.Size = new System.Drawing.Size(806, 20);
            this.fragmentTextBox2.TabIndex = 16;
            // 
            // originLabel
            // 
            this.originLabel.AutoSize = true;
            this.originLabel.Dock = System.Windows.Forms.DockStyle.Top;
            this.originLabel.Location = new System.Drawing.Point(53, 259);
            this.originLabel.Margin = new System.Windows.Forms.Padding(3, 3, 0, 0);
            this.originLabel.Name = "originLabel";
            this.originLabel.Size = new System.Drawing.Size(91, 13);
            this.originLabel.TabIndex = 17;
            this.originLabel.Text = "Origin:";
            this.originLabel.TextAlign = System.Drawing.ContentAlignment.TopRight;
            // 
            // pathLabel
            // 
            this.pathLabel.AutoSize = true;
            this.pathLabel.Dock = System.Windows.Forms.DockStyle.Top;
            this.pathLabel.Location = new System.Drawing.Point(50, 445);
            this.pathLabel.Margin = new System.Windows.Forms.Padding(0, 3, 0, 0);
            this.pathLabel.Name = "pathLabel";
            this.pathLabel.Size = new System.Drawing.Size(94, 13);
            this.pathLabel.TabIndex = 18;
            this.pathLabel.Text = "Path";
            this.pathLabel.TextAlign = System.Drawing.ContentAlignment.TopRight;
            // 
            // queryLabel
            // 
            this.queryLabel.AutoSize = true;
            this.queryLabel.Dock = System.Windows.Forms.DockStyle.Top;
            this.queryLabel.Location = new System.Drawing.Point(50, 631);
            this.queryLabel.Margin = new System.Windows.Forms.Padding(0, 3, 0, 0);
            this.queryLabel.Name = "queryLabel";
            this.queryLabel.Size = new System.Drawing.Size(94, 13);
            this.queryLabel.TabIndex = 19;
            this.queryLabel.Text = "Query Parameters:";
            this.queryLabel.TextAlign = System.Drawing.ContentAlignment.TopRight;
            // 
            // fragmentLabel
            // 
            this.fragmentLabel.AutoSize = true;
            this.fragmentLabel.Dock = System.Windows.Forms.DockStyle.Top;
            this.fragmentLabel.Location = new System.Drawing.Point(50, 731);
            this.fragmentLabel.Margin = new System.Windows.Forms.Padding(0, 3, 0, 0);
            this.fragmentLabel.Name = "fragmentLabel";
            this.fragmentLabel.Size = new System.Drawing.Size(94, 13);
            this.fragmentLabel.TabIndex = 20;
            this.fragmentLabel.Text = "Fragment:";
            this.fragmentLabel.TextAlign = System.Drawing.ContentAlignment.TopRight;
            // 
            // UriBuilderForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(953, 754);
            this.Controls.Add(this.outerTableLayoutPanel);
            this.Name = "UriBuilderForm";
            this.Text = "URI Builder";
            this.outerTableLayoutPanel.ResumeLayout(false);
            this.outerTableLayoutPanel.PerformLayout();
            this.uriTableLayoutPanel.ResumeLayout(false);
            this.uriTableLayoutPanel.PerformLayout();
            this.originGroupBox.ResumeLayout(false);
            this.originGroupBox.PerformLayout();
            this.originTableLayoutPanel.ResumeLayout(false);
            this.originTableLayoutPanel.PerformLayout();
            this.authorityGroupBox.ResumeLayout(false);
            this.authorityGroupBox.PerformLayout();
            this.authorityTableLayoutPanel.ResumeLayout(false);
            this.authorityTableLayoutPanel.PerformLayout();
            this.credentailsGroupBox.ResumeLayout(false);
            this.credentailsGroupBox.PerformLayout();
            this.credentailsTableLayoutPanel.ResumeLayout(false);
            this.credentailsTableLayoutPanel.PerformLayout();
            this.hostGroupBox.ResumeLayout(false);
            this.hostGroupBox.PerformLayout();
            this.hostTableLayoutPanel.ResumeLayout(false);
            this.hostTableLayoutPanel.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.portNumericUpDown)).EndInit();
            this.pathGroupBox.ResumeLayout(false);
            this.pathGroupBox.PerformLayout();
            this.pathTableLayoutPanel.ResumeLayout(false);
            this.pathTableLayoutPanel.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pathDataGridView)).EndInit();
            this.queryGroupBox.ResumeLayout(false);
            this.queryGroupBox.PerformLayout();
            this.queryTableLayoutPanel.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.queryDataGridView)).EndInit();
            this.fragmentGroupBox.ResumeLayout(false);
            this.fragmentGroupBox.PerformLayout();
            this.fragmentTableLayoutPanel.ResumeLayout(false);
            this.fragmentTableLayoutPanel.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TableLayoutPanel outerTableLayoutPanel;
        private System.Windows.Forms.TableLayoutPanel uriTableLayoutPanel;
        private System.Windows.Forms.TextBox uriTextBox;
        private System.Windows.Forms.Label uriLabel;
        private System.Windows.Forms.Button newUrlButton;
        private System.Windows.Forms.GroupBox originGroupBox;
        private System.Windows.Forms.CheckBox originCheckBox;
        private System.Windows.Forms.GroupBox pathGroupBox;
        private System.Windows.Forms.Button originButton;
        private System.Windows.Forms.Button fragmentButton;
        private System.Windows.Forms.CheckBox fragmentCheckBox;
        private System.Windows.Forms.Button queryButton;
        private System.Windows.Forms.CheckBox queryCheckBox;
        private System.Windows.Forms.Button pathButton;
        private System.Windows.Forms.GroupBox queryGroupBox;
        private System.Windows.Forms.GroupBox fragmentGroupBox;
        private System.Windows.Forms.TableLayoutPanel originTableLayoutPanel;
        private System.Windows.Forms.Label schemeLabel;
        private System.Windows.Forms.ComboBox schemeNameComboBox;
        private System.Windows.Forms.ComboBox schemeSeparatorComboBox;
        private System.Windows.Forms.TextBox customSchemeTextBox;
        private System.Windows.Forms.CheckBox authorityCheckBox;
        private System.Windows.Forms.GroupBox authorityGroupBox;
        private System.Windows.Forms.TextBox originTextBox;
        private System.Windows.Forms.TextBox pathTextBox2;
        private System.Windows.Forms.TextBox queryTextBox;
        private System.Windows.Forms.TextBox fragmentTextBox2;
        private System.Windows.Forms.Label originLabel;
        private System.Windows.Forms.Label pathLabel;
        private System.Windows.Forms.Label queryLabel;
        private System.Windows.Forms.Label fragmentLabel;
        private System.Windows.Forms.TableLayoutPanel authorityTableLayoutPanel;
        private System.Windows.Forms.GroupBox credentailsGroupBox;
        private System.Windows.Forms.TableLayoutPanel pathTableLayoutPanel;
        private System.Windows.Forms.Button addPathSegmentButton;
        private System.Windows.Forms.Button clearPathSegmentsButton;
        private System.Windows.Forms.Button setRootPathButton;
        private System.Windows.Forms.TextBox pathTextBox1;
        private System.Windows.Forms.DataGridView pathDataGridView;
        private System.Windows.Forms.TableLayoutPanel queryTableLayoutPanel;
        private System.Windows.Forms.Button addQueryParameterButton;
        private System.Windows.Forms.DataGridView queryDataGridView;
        private System.Windows.Forms.Button clearQueryParametersButton;
        private System.Windows.Forms.Button setEmptyQueryParameterButton;
        private System.Windows.Forms.TableLayoutPanel fragmentTableLayoutPanel;
        private System.Windows.Forms.Label fragmentEncodingLabel;
        private System.Windows.Forms.RadioButton noFragmentEncodingRadioButton;
        private System.Windows.Forms.RadioButton pathFragmentEncodingRadioButton;
        private System.Windows.Forms.RadioButton dataFragmentEncodingRadioButton;
        private System.Windows.Forms.TextBox fragmentTextBox1;
        private System.Windows.Forms.TableLayoutPanel credentailsTableLayoutPanel;
        private System.Windows.Forms.CheckBox usernameCheckBox;
        private System.Windows.Forms.CheckBox passwordCheckBox;
        private System.Windows.Forms.TextBox usernameTextBox;
        private System.Windows.Forms.MaskedTextBox maskedPasswordTextBox;
        private System.Windows.Forms.CheckBox showPasswordCheckBox;
        private System.Windows.Forms.TextBox passwordTextBox;
        private System.Windows.Forms.GroupBox hostGroupBox;
        private System.Windows.Forms.TableLayoutPanel hostTableLayoutPanel;
        private System.Windows.Forms.CheckBox hostNameCheckBox;
        private System.Windows.Forms.CheckBox portCheckBox;
        private System.Windows.Forms.TextBox hostNameTextBox;
        private System.Windows.Forms.NumericUpDown portNumericUpDown;
        private System.Windows.Forms.CheckBox defaultPortCheckBox;
        private System.Windows.Forms.Label invalidHostNameLabel;
        private System.Windows.Forms.Label invalidSchemeNameLabel;
        private System.Windows.Forms.Label invalidPortNumberLabel;
    }
}

