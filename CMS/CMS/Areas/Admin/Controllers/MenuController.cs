using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CMS.Models;

namespace CMS.Areas.Admin.Controllers
{
    public class MenuController : Controller
    {
        // GET: Admin/Menu
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ItemMenu()
        {
            return View();
        }

        //API Support
        public ActionResult GetItemByMenu(int id)
        {
            using(CMSEntities db = new CMSEntities())
            {
                var model = db.ItemMenus.Where(p => p.idMenu == id).ToList();
                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }

        
    }
}