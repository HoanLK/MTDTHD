using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Models.ViewModel
{
    public class HandBookViewModel
    {
        public IEnumerable<Post> Posts { get; set; }
    }
    public class ShowHandBookViewModel
    {
        public Post Post { get; set; }
        public IEnumerable<Post> RelatePosts { get; set; }
    }
}