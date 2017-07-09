using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Models.AltModel
{
    public class AltModel
    {
    }

    public class AltPost
    {
        public int id { get; set; }
        public string title { get; set; }
        public string alias { get; set; }
        public string description { get; set; }
        public string image { get; set; }
        public DateTime? timePublished { get; set; }
    }

    public class AltCategoryPost
    {
        public int id { get; set; }
        public string title { get; set; }
        public string alias { get; set; }
        public string description { get; set; }
        public string imageBanner { get; set; }
        public string image { get; set; }
    }

}