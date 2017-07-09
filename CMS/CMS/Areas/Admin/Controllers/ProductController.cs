using CMS.Areas.Admin.Models;
using CMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Areas.Admin.Controllers
{
    public class ProductController : Controller
    {
        // GET: Admin/Product
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Modify()
        {
            return View();
        }

        //SUPPORT API
        public JsonResult GetAll()
        {
            using (CMSEntities db = new CMSEntities())
            {
                var model = (
                    from p in db.Products
                    select new AltProduct()
                    {
                        id = p.id,
                        title = p.title,
                        alias = p.alias,
                        idCategory = p.idCategory,
                        published = p.published,
                        featured = p.featured,
                        note = p.note
                    }
                ).ToList();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetList()
        {
            using(CMSEntities db = new CMSEntities())
            {
                var model = (
                    from p in db.Products
                    where p.published == true
                    select new ListComponentMenuModel()
                    {
                        id = p.id,
                        title = p.title
                    }
                ).ToList();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetListByCategory(int id)
        {
            using(CMSEntities db = new CMSEntities())
            {
                var model = (
                    from p in db.Products
                    where   p.published == true &&
                            p.idCategory == id
                    select new ListComponentMenuModel()
                    {
                        id = p.id,
                        title = p.title
                    }
                ).ToList();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
    }
}