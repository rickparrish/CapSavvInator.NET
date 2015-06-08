using System;
using System.Web.Mvc;
using System.Linq;

namespace CapSavvInator
{
    /// <summary>
    /// Same as the standard RequireHttps attribute, except the redirect is permanent, 
    /// and it doesn't throw exceptions for a HEAD request
    /// </summary>
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, Inherited = true, AllowMultiple = false)]
    public class RequireHttpsPermanentAttribute : RequireHttpsAttribute
    {
        private static String[] _allowedMethods = new[] { "GET", "HEAD" };
        protected override void HandleNonHttpsRequest(AuthorizationContext filterContext)
        {
            if (!_allowedMethods.Contains(filterContext.HttpContext.Request.HttpMethod, StringComparer.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException("The requested resource can only be accessed via SSL.");
            }
            string url = "https://" + filterContext.HttpContext.Request.Url.Host + filterContext.HttpContext.Request.RawUrl;
            filterContext.Result = new RedirectResult(url, true);
        }
    }
}