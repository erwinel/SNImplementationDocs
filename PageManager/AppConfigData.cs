using HtmlAgilityPack;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace PageManager
{
    public class AppConfigData
    {
    }

    public class NavigationItem
    {
        public static Uri SplitPathQueryAndFragment(Uri uri, out string query, out string fragment)
        {
            if (uri == null)
            {
                query = fragment = null;
                return null;
            }
            if (uri.IsAbsoluteUri)
            {
                query = (string.IsNullOrEmpty(uri.Query)) ? null : (uri.Query == "?") ? "" : ((uri.Query.StartsWith("?")) ? uri.Query.Substring(1) : uri.Query);
                fragment = (string.IsNullOrEmpty(uri.Fragment)) ? null : (uri.Fragment == "#") ? "" : ((uri.Fragment.StartsWith("#")) ? uri.Fragment.Substring(1) : uri.Fragment);
                return new Uri(uri.AbsolutePath, UriKind.Relative);
            }
            return SplitPathQueryAndFragment(uri.ToString(), out query, out fragment);
        }

        public static Uri SplitPathQueryAndFragment(string uriString, out string query, out string fragment)
        {
            if (string.IsNullOrEmpty(uriString))
                query = fragment = null;
            else
            {
                int index = uriString.IndexOf("#");
                if (index < 0)
                    fragment = null;
                else
                {
                    fragment = uriString.Substring(index + 1);
                    uriString = uriString.Substring(0, index);
                }
                index = uriString.IndexOf("?");
                if (index < 0)
                    query = null;
                else
                {
                    query = uriString.Substring(index + 1);
                    uriString = uriString.Substring(0, index);
                }
            }
            if (Uri.TryCreate(uriString, UriKind.RelativeOrAbsolute, out Uri uri) || Uri.TryCreate(Uri.EscapeUriString(uriString), UriKind.RelativeOrAbsolute, out uri))
                return uri;

            return new Uri(uriString, UriKind.Relative);
            
        }

        public static Uri Combine(Uri baseUri, Uri targetUri)
        {
            Uri targetPath = SplitPathQueryAndFragment(targetUri, out string targetQuery, out string targetFragment);
            Uri basePath = SplitPathQueryAndFragment(targetUri, out string baseQuery, out string baseFragment);

            if (targetPath.IsAbsoluteUri)
            {
                if (string.IsNullOrEmpty(baseQuery) && string.IsNullOrEmpty(baseFragment))
                    return targetUri;
                UriBuilder uriBuilder = new UriBuilder(targetUri);
                if (!string.IsNullOrEmpty(baseQuery))
                    uriBuilder.Query = baseQuery;
                if (!string.IsNullOrEmpty(baseFragment))
                    uriBuilder.Fragment = baseFragment;
                return uriBuilder.Uri;
            }
            if (baseUri.IsAbsoluteUri)
            {
                string path = targetPath.ToString();
                if ((string.IsNullOrEmpty(baseQuery) || !string.IsNullOrEmpty(targetQuery)) && (string.IsNullOrEmpty(baseFragment) || !string.IsNullOrEmpty(targetFragment)))
                {
                    if (!(path.StartsWith("/") || basePath.SplitUriPath
                }
                    return targetUri;
                if (path.Length == 0 || path == "/")
                {
                    if (baseUri.AbsolutePath.Length > 0 && baseUri.AbsolutePath != "/")
                    {
                        UriBuilder uriBuilder = new UriBuilder(targetUri);
                        if (!string.IsNullOrEmpty(targetQuery))
                            uriBuilder.Query = targetQuery;
                        if (!string.IsNullOrEmpty(targetFragment))
                            uriBuilder.Fragment = targetFragment;
                        return uriBuilder.Uri;
                    }
                }
                if (!baseUri.AbsolutePath.EndsWith("/"))
                {
                    UriBuilder uriBuilder = new UriBuilder(baseUri);
                    uriBuilder.Path += "/";
                    baseUri = uriBuilder.Uri;
                }
                if (targetUri.IsAbsoluteUri)
                    return baseUri
            }
        }
        public NavigationItem(Uri baseUri, Uri targetUri)
        {
            Uri effectiveUri;
            if (targetUri.IsAbsoluteUri)
                effectiveUri = baseUri.MakeRelativeUri(targetUri);
            else
                effectiveUri = new Uri(baseUri, targetUri);

        }
    }
}
