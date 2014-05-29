using CapSavvInator.Models;
using CapSavvy.Data;
using CapSavvy.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;

namespace CapSavvInator.Controllers
{
    public class CapSavvyController : ApiController
    {
        private mod_base[] loadedModules;
        private UsageData usage = new UsageData();
        private mod_base usageInfo;

        [HttpPost]
        public ApiResult GetUsage([FromBody]string id)
        {
            ApiResult Result = new ApiResult(usage);

            // Define the modules, order counts! If one does't match it falls through to the next, teksavvy is the catchall.
            loadedModules = new mod_base[] {
                new mod_ebox_res_dsl(usage),
                new mod_ebox_bus_dsl(usage),
                new mod_videotron_tpia(usage),
                new mod_caneris_dsl(usage),
                new mod_start_fdsl(usage),
                new mod_start_fcable(usage),
                new mod_start_fwireless(usage),
                new mod_start_wdsl(usage),
                new mod_start_wcable(usage),
                new mod_start_wwireless(usage),
                new mod_teksavvy(usage)
            };

            if (ValidateUsername(id))
            {
                usageInfo.GetUsage();
                switch (usageInfo.Error)
                {
                    case mod_base.ErrorState.HTTP:
                        Result.ISP = usageInfo.moduleName + " (HTTP Error)";
                        break;
                    case mod_base.ErrorState.Match:
                        Result.ISP = usageInfo.moduleName + " (Parse Error)";
                        break;
                    case mod_base.ErrorState.OK:
                        Result.ISP = usageInfo.moduleName;
                        Result.Success = true;
                        break;
                    case mod_base.ErrorState.Startup:
                        Result.ISP = usageInfo.moduleName + " (Error)";
                        break;
                    case mod_base.ErrorState.Username:
                        Result.ISP = "Invalid Username / API Key";
                        break;
                }
            }
            else
            {
                Result.ISP = "Invalid Username / API Key";
            }

            return Result;
        }

        private bool ValidateUsername(string id)
        {
            foreach (mod_base usageModule in loadedModules)
            {
                Match match = Regex.Match(id, usageModule.validUsernameRegex, RegexOptions.IgnoreCase);
                if (match.Success)
                {
                    usageInfo = usageModule;
                    usageInfo.Username = id;
                    return true;
                }
            }

            // TODO If we get here, it's not a valid username / api key
            usageInfo = new mod_default(usage);
            return false;
        }
    }
}