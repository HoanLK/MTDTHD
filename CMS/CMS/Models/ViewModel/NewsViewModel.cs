using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Models.ViewModel
{
    public class NewsViewModel
    {
        public IEnumerable<Post> Posts { get; set; }
    }

    public class ShowNewsViewModel
    {
        public Post News { get; set; }
        public IEnumerable<Post> RelateNews { get; set; }
    }
}