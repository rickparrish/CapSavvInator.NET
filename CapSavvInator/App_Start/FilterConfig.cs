using System.Diagnostics;
using System.Web;
using System.Web.Mvc;

namespace CapSavvInator
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());

            // Force https (unless we're debugging locally, which doens't support https)
            if (!Debugger.IsAttached) {
                filters.Add(new RequireHttpsPermanentAttribute());
            }
        }
    }
}
