namespace ImageLoader
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using System.Drawing;
    using System.IO;
    using System.Xml;
    public class ImageInfo
    {
        private string _title = "";
        private string _fileName = "";
        private string _id = null;
        private int _width = 0;
        private int _height = 0;

        public string title { get { return _title; } set { _title = (value == null) ? "" : value; } }
        public string fileName { get { return _fileName; } set { _fileName = (value == null) ? "" : value; } }
        public string id { get { return _id; } set { _id = (string.IsNullOrWhiteSpace(value)) ? null : value; } }
        public int width { get { return _width; } set { _width = value; } }
        public int height { get { return _height; } set { _height = value; } }

        internal static IEnumerable<ImageInfo> Import(XmlDocument document, FileInfo file)
        {
            XmlNamespaceManager nsmgr = new XmlNamespaceManager(document.NameTable);
            nsmgr.AddNamespace("svg", "http://www.w3.org/2000/svg");
            int width = 0, height = 0;
            string s = document.DocumentElement.GetAttribute("width");
            if (s != null && (s = s.Trim()).Length > 0)
                try { width = XmlConvert.ToInt32(s); } catch { /* okay to ignore */ }
            s = document.DocumentElement.GetAttribute("height");
            if (s != null && (s = s.Trim()).Length > 0)
                try { height = XmlConvert.ToInt32(s); } catch { /* okay to ignore */ }
            XmlNodeList symbols = document.DocumentElement.SelectNodes("defs/symbol");
            if (symbols.Count == 0)
            {
                ImageInfo result = new ImageInfo();
                result.title = Path.GetFileNameWithoutExtension(file.Name);
                result.fileName = file.Name;
                result.width = width;
                result.height = height;
                yield return result;
            }
            else
            {
                foreach (XmlElement element in symbols)
                {
                    string id = element.GetAttribute("id");
                    if (!string.IsNullOrWhiteSpace(id))
                    {
                        s = element.GetAttribute("width");
                        int w = width, h = height;
                        if (s != null && (s = s.Trim()).Length > 0)
                            try
                            {
                                if ((w = XmlConvert.ToInt32(s)) < 1)
                                    w = width;
                            }
                            catch { /* okay to ignore */ }
                        s = element.GetAttribute("height");
                        if (s != null && (s = s.Trim()).Length > 0)
                            try
                            {
                                if ((h = XmlConvert.ToInt32(s)) < 1)
                                    h = height;
                            }
                            catch { /* okay to ignore */ }
                        ImageInfo result = new ImageInfo();
                        result.title = result.id = id;
                        result.fileName = file.Name;
                        result.width = width;
                        result.height = height;
                        yield return result;
                    }
                }
            }
        }

        internal static ImageInfo Import(Image image, FileInfo file)
        {
            ImageInfo result = new ImageInfo();
            result.title = Path.GetFileNameWithoutExtension(file.Name);
            result.fileName = file.Name;
            result.width = image.Width;
            result.height = image.Height;
            return result;
        }
    }

    public class ImageFolder
    {
        private string _name = "";
        private Collection<ImageFolder> _folders = null;
        private Collection<ImageInfo> _images = null;

        public string name { get { return _name; } set { _name = (value == null) ? "" : value; } }
        public Collection<ImageFolder> folders
        {
            get
            {
                Collection<ImageFolder> f = _folders;
                if (f == null)
                    _folders = f = new Collection<ImageFolder>();
                return f;
            }
            set { _folders = value; }
        }
        public Collection<ImageInfo> images
        {
            get
            {
                Collection<ImageInfo> i = _images;
                if (i == null)
                    _images = i = new Collection<ImageInfo>();
                return i;
            }
            set { _images = value; }
        }

        public bool HasImage()
        {
            return (_images != null && _images.Count > 0) || (_folders != null && _folders.Count > 0 && _folders.Any(f => f.HasImage()));
        }

        public static ImageFolder Create(DirectoryInfo directory)
        {
            ImageFolder result = new ImageFolder();
            result.name = directory.Name;
            result._folders = new Collection<ImageFolder>(directory.GetDirectories().Select(d => Create(d)).Where(d => d.HasImage()).ToList());
            foreach (FileInfo file in directory.GetFiles())
            {
                switch (file.Extension.ToLower())
                {
                    case ".svg":
                        XmlDocument document = new XmlDocument();
                        document.LoadXml(string.Join(Environment.NewLine, File.ReadAllLines(file.FullName).SkipWhile(l =>
                        {
                            string s = l.Trim();
                            return s.Length == 0 || s.StartsWith("<!DOCTYPE") || s.StartsWith("<?");
                        }).ToArray()));
                        foreach (ImageInfo i in ImageInfo.Import(document, file))
                            result.images.Add(i);
                        break;
                    case ".png":
                    case ".gif":
                    case ".ico":
                    case ".jpg":
                    case ".jpeg":
                        using (Image image = Image.FromFile(file.FullName))
                            result.images.Add(ImageInfo.Import(image, file));
                            break;
                }
            }
            return result;
        }
    }
}
