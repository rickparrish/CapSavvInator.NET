using CapSavvy.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CapSavvInator.Controllers
{
    public class CapSavvyController : ApiController
    {
        [AcceptVerbs("GET")]
        public string Test()
        {
            return "test";
        }

        [AcceptVerbs("GET")]
        public UsageData GetUsage(string id)
        {
            // TODO
            UsageData UD = new UsageData();
            UD.All.Down = 1;
            UD.All.Total = 2;
            UD.All.Up = 3;
            UD.OffPeak.Down = 4;
            UD.OffPeak.Total = 5;
            UD.OffPeak.Up = 6;
            UD.Peak.Down = 7;
            UD.Peak.Total = 8;
            UD.Peak.Up = 9;

            return UD;
        }
    }
}