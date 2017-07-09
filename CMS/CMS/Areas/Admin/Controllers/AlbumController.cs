using CMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Areas.Admin.Controllers
{
    public class AlbumController : Controller
    {
        // GET: Admin/Album
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Modify()
        {
            return View();
        }

        //SUPPORT API
        public int DeleteItemByAlbum(int id)
        {
            using(CMSEntities db = new CMSEntities())
            {
                var items = db.ItemAlbums.Where(p => p.idAlbum == id).ToList();
                if(items != null)
                {
                    db.ItemAlbums.RemoveRange(items);
                    db.SaveChanges();
                    return 1;
                }

                return 0;
            }
        }
    }
}