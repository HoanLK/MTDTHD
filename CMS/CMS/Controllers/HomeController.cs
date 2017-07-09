using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CMS.Models;
using CMS.Models.AltModel;
using CMS.Models.ViewModel;

namespace CMS.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            using (CMSEntities db = new CMSEntities())
            {
                HomeViewModel model = new HomeViewModel();

                model.Banners = db.Banners.ToList();
                model.Customers = db.Posts.Where(p => p.idCategory == 16 || p.idCategory == 17).ToList();
                model.News = db.Posts.Where(p => p.idCategory == 6).OrderByDescending(p => p.id).Take(4).ToList();
                model.CategoryDmCLine = db.CategoryProducts.Find(2);
                model.DmCLineProducts = db.Products.Where(p => p.idCategory == 2).ToList();
                model.CategoryTramTronBeTong = db.CategoryProducts.Find(10);
                model.TramTronBeTongs = db.Products.Where(p => p.idCategory == 10).ToList();
                model.CategoryDmCBlock = db.CategoryProducts.Where(p => p.idParentCategory == 1).ToList();
                model.DmCBlockProducts = db.Products.Where(p => p.idCategory != 2).ToList();

                return View(model);
            }
        }


    }
}
