using CapSavvy.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CapSavvInator.Models
{
    public class ApiResult
    {
        public string ISP { get; set; }
        public bool Success { get; set; }
        public bool TracksOffPeak { get; set; }
        public bool TracksUploads { get; set; }
        public UsageData Usage { get; set; }

        public ApiResult(UsageData usage)
        {
            ISP = "Invalid Username / API Key";
            Success = false;
            this.Usage = usage;
        }
    }
}