using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CMS.Areas.Admin.Models;
using CMS.Models;

namespace CMS.Areas.Admin.Controllers
{
    [Authorize]
    public class CategoryPostController : Controller
    {
        // GET: Admin/CategoryPost
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
            using(CMSEntities db = new CMSEntities())
            {
                var model = (
                    from cp in db.CategoryPosts
                    select new AltCategory()
                    {
                        id = cp.id,
                        idParentCategory = cp.idParentCategory,
                        title = cp.title,
                        alias = cp.alias,
                        published = cp.published,
                        note = cp.note
                    }
                ).ToList();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetList()
        {
            using (CMSEntities db = new CMSEntities())
            {
                var model = (
                    from cp in db.CategoryPosts
                    select new ListComponentMenuModel()
                    {
                        id = cp.id,
                        title = cp.title
                    }
                ).ToList();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
    }
}