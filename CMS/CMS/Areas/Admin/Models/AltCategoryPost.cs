using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Areas.Admin.Models
{
    public class AltCategory
    {
        public int id { get; set; }
        public int? idParentCategory { get; set; }
        public string title { get; set; }
        public string alias { get; set; }
        public bool published { get; set; }
        public bool isService { get; set; }
        public string note { get; set; }
        public string description { get; set; }
    }
}