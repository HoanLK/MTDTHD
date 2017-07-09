using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Models.ViewModel
{
    public class AlbumViewModel
    {
        public Album Album { get; set; }
        public List<ItemAlbum> Items { get; set; }
    }
}