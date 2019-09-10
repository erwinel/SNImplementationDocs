using System;
using System.Collections.ObjectModel;
using System.ComponentModel;

namespace SnUriBuilder
{
    public class KnownSchemeOptionItem : IEquatable<KnownSchemeOptionItem>
    {
        private static ReadOnlyCollection<KnownSchemeOptionItem> _knownOptions = null;
        private string _displayText;
        private string _name;
        private int? _defaultPort;
        private SchemeSeparator _separator;
        private string _description;
        private HostRequirement _host;
        private PathRequirement _path;
        private CredentialRequirement _credentialSupport;
        [DataObjectField(false, false, false)]
        public string DisplayText { get { return _displayText; } }
        [DataObjectField(true, false, false)]
        public string Name { get { return _name; } }
        public int? DefaultPort { get { return _defaultPort; } }
        public SchemeSeparator Separator { get { return _separator; } }
        public string Description { get { return _description; } }
        public HostRequirement Host { get { return _host; } }
        public PathRequirement Path { get { return _path; } }
        public CredentialRequirement CredentialSupport { get { return _credentialSupport; } }
        public static ReadOnlyCollection<KnownSchemeOptionItem> KnownOptions
        {
            get
            {
                if (_knownOptions != null)
                    return _knownOptions;
                Collection<KnownSchemeOptionItem> knownOptions = new Collection<KnownSchemeOptionItem>();
                _knownOptions = new ReadOnlyCollection<KnownSchemeOptionItem>(knownOptions);
                knownOptions.Add(new KnownSchemeOptionItem(Uri.UriSchemeHttp, "Hypertext Transfer Protocol", 80, HostRequirement.Required));
                knownOptions.Add(new KnownSchemeOptionItem(Uri.UriSchemeHttps, "Hypertext Transfer Protocol (secure)", 443, HostRequirement.Required));
                knownOptions.Add(new KnownSchemeOptionItem(Uri.UriSchemeFtp, "File Transfer protocol", 21, HostRequirement.Required));
                knownOptions.Add(new KnownSchemeOptionItem("ftps", "File Transfer protocol(secure)", 990, HostRequirement.Required));
                knownOptions.Add(new KnownSchemeOptionItem("sftp", "Secure File Transfer Protocol", 22, HostRequirement.Required));
                knownOptions.Add(new KnownSchemeOptionItem(Uri.UriSchemeGopher, "Gopher protocol", 70, HostRequirement.Required));
                knownOptions.Add(new KnownSchemeOptionItem(Uri.UriSchemeMailto, SchemeSeparator.ColonOnly, "Electronic mail address", HostRequirement.RequiredNoPort, PathRequirement.NotSupported, CredentialRequirement.RequiresUserNameOnly));
                knownOptions.Add(new KnownSchemeOptionItem(Uri.UriSchemeNews, SchemeSeparator.ColonOnly, "USENET news", HostRequirement.NotSupported));
                knownOptions.Add(new KnownSchemeOptionItem(Uri.UriSchemeNntp, "USENET news using NNTP access", 119));
                knownOptions.Add(new KnownSchemeOptionItem("telnet", "USENET news using NNTP access", 23, HostRequirement.Required, PathRequirement.NotSupported));
                knownOptions.Add(new KnownSchemeOptionItem("wais", "Wide Area Information Servers", 443));
                knownOptions.Add(new KnownSchemeOptionItem(Uri.UriSchemeFile, SchemeSeparator.SingleSlash, "Host-specific file names", 443, HostRequirement.OptionalNoPort, PathRequirement.Optional, CredentialRequirement.NotSupported));
                knownOptions.Add(new KnownSchemeOptionItem(Uri.UriSchemeNetPipe, "Net Pipe", HostRequirement.OptionalNoPort));
                knownOptions.Add(new KnownSchemeOptionItem(Uri.UriSchemeNetTcp, "Net-TCP", 808));
                knownOptions.Add(new KnownSchemeOptionItem("ldap", "Lightweight Directory Access Protocol", 389, HostRequirement.Required));
                knownOptions.Add(new KnownSchemeOptionItem("ssh", "Secure Shell", 22, HostRequirement.Required));
                knownOptions.Add(new KnownSchemeOptionItem("git", "Remote GIT Respository", 9418, HostRequirement.Required));
                knownOptions.Add(new KnownSchemeOptionItem("tel", SchemeSeparator.ColonOnly, "Telephone Number", HostRequirement.NotSupported, PathRequirement.Required, CredentialRequirement.NotSupported));
                knownOptions.Add(new KnownSchemeOptionItem("urn", SchemeSeparator.ColonOnly, "Uniform Resource notation", HostRequirement.NotSupported, PathRequirement.Required, CredentialRequirement.NotSupported));
                knownOptions.Add(new KnownSchemeOptionItem("", "(other)"));
                return _knownOptions;
            }
        }

        private KnownSchemeOptionItem(string name, SchemeSeparator separator, string description, int defaultPort, HostRequirement host = HostRequirement.Optional, PathRequirement path = PathRequirement.Optional, CredentialRequirement credentialSupport = CredentialRequirement.Optional)
            : this(name, defaultPort, separator, description, host, path, credentialSupport) { }
        private KnownSchemeOptionItem(string name, string description, int defaultPort, HostRequirement host = HostRequirement.Optional, PathRequirement path = PathRequirement.Optional, CredentialRequirement credentialSupport = CredentialRequirement.Optional)
            : this(name, defaultPort, SchemeSeparator.DoubleSlash, description, host, path, credentialSupport) { }
        private KnownSchemeOptionItem(string name, string description, HostRequirement host = HostRequirement.Optional, PathRequirement path = PathRequirement.Optional, CredentialRequirement credentialSupport = CredentialRequirement.Optional)
            : this(name, null as int?, SchemeSeparator.DoubleSlash, description, host, path, credentialSupport) { }
        private KnownSchemeOptionItem(string name, SchemeSeparator separator, string description, HostRequirement host = HostRequirement.Optional, PathRequirement path = PathRequirement.Optional, CredentialRequirement credentialSupport = CredentialRequirement.Optional)
            : this(name, null as int?, separator, description, host, path, credentialSupport) { }
        private KnownSchemeOptionItem(string name, int? defaultPort, SchemeSeparator separator, string description, HostRequirement host, PathRequirement path, CredentialRequirement credentialSupport)
        {
            _name = name;
            _defaultPort = defaultPort;
            _separator = separator;
            _description = description;
            _host = host;
            _path = path;
            _credentialSupport = credentialSupport;
            _displayText = name + ": " + description;
        }

        public bool Equals(KnownSchemeOptionItem other) { return other != null && other._name == _name; }
    }

    public enum SchemeSeparator
    {
        DoubleSlash,
        SingleSlash,
        ColonOnly
    }
    public enum HostRequirement
    {
        Optional,
        OptionalNoPort,
        Required,
        RequiredNoPort,
        NotSupported
    }
    public enum PathRequirement
    {
        Optional,
        Required,
        NotSupported
    }
    public enum CredentialRequirement
    {
        Optional,
        RequiresUserNameOnly,
        NotSupported
    }
}