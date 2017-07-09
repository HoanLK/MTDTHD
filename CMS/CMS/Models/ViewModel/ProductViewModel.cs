using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Models.ViewModel
{
    public class ProductViewModel
    {
    }

    public class ShowCategoryProductViewModel
    {
        public CategoryProduct CategoryProduct { get; set; }
        public List<CategoryProduct> CategoryParents { get; set; }
        public IEnumerable<CategoryProduct> SubCategory { get; set; }
        public IEnumerable<Product> Products { get; set; }
    }

    public class ShowProductViewModel
    {
        public CategoryProduct CategoryProduct { get; set; }
        public IEnumerable<Product> RelateProduct { get; set; }
        public Product Product { get; set; }
    }
}