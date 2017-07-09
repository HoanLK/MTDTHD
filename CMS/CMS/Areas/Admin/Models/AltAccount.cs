using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Areas.Admin.Models
{
    public class AltAccount
    {
        public string id { get; set; }
        public string email { get; set; }
        public bool emailConfirmed { get; set; }
        public bool twoFactor { get; set; }
    }
}