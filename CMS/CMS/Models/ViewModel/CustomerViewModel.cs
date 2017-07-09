using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Models.ViewModel
{
    public class CustomerViewModel
    {
        public CategoryPost CategoryCustomer { get; set; }
        public List<Post> Customers { get; set; }
    }

    public class ShowCustomerViewModel
    {
        public CategoryPost CategoryCustomer { get; set; }
        public Post Customer { get; set; }
        public List<Post> RelateCustomers { get; set; }
    }
}