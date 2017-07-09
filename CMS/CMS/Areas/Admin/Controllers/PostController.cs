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
    public class PostController : Controller
    {
        // GET: Admin/Post
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
                    from p in db.Posts
                    select new AltPost()
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
                    from p in db.Posts
                    where p.published == true
                    orderby p.idCategory
                    select new ListComponentMenuModel()
                    {
                        id = p.id,
                        title = p.title.Trim()
                    }
                ).ToList();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
    }
}