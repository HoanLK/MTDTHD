using CMS.Areas.Admin.Models;
using CMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Areas.Admin.Controllers
{
    public class CategoryDocumentController : Controller
    {
        // GET: Admin/CategoryDocument
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
                    from p in db.CategoryDocuments
                    select new AltCategory()
                    {
                        id = p.id,
                        title = p.title,
                        alias = p.alias,
                        published = p.published,
                        note = p.note
                    }
                ).ToList();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
    }
}