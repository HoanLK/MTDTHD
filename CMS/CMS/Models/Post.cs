//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CMS.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Post
    {
        public int id { get; set; }
        public Nullable<int> idCategory { get; set; }
        public string idUserCreated { get; set; }
        public string title { get; set; }
        public string alias { get; set; }
        public string content { get; set; }
        public string description { get; set; }
        public bool published { get; set; }
        public Nullable<System.DateTime> timePublished { get; set; }
        public string image { get; set; }
        public string tags { get; set; }
        public int version { get; set; }
        public bool featured { get; set; }
        public string metaDescription { get; set; }
        public string metaKewords { get; set; }
        public string author { get; set; }
        public string robots { get; set; }
        public string imageBanner { get; set; }
        public string colorBackgroundBanner { get; set; }
        public string colorTitleBanner { get; set; }
        public string colorTextBanner { get; set; }
        public string note { get; set; }
    }
}
