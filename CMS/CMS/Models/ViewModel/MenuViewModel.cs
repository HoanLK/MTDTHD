using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Models.ViewModel
{
    public class MenuViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ItemMenuViewModel> Items { get; set; }
    }

    public class ItemMenuViewModel
    {
        public string Title { get; set; }
        public string Url { get; set; }
        public List<ItemMenuViewModel> Childs { get; set; }
    }
}