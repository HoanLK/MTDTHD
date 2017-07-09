using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Models.ViewModel
{
    public class HomeViewModel
    {
        public List<Banner> Banners { get; set; }
        public IEnumerable<Post> Customers { get; set; }
        public IEnumerable<Post> News { get; set; }
        public CategoryProduct CategoryDmCLine { get; set; }
        public IEnumerable<Product> DmCLineProducts { get; set; }
        public CategoryProduct CategoryTramTronBeTong { get; set; }
        public IEnumerable<Product> TramTronBeTongs { get; set; }
        public IEnumerable<CategoryProduct> CategoryDmCBlock { get; set; }
        public IEnumerable<Product> DmCBlockProducts { get; set; }

    }
}