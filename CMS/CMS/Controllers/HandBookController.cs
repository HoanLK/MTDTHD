using CMS.Models;
using CMS.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("cam-nang")]
    public class HandBookController : Controller
    {
        // GET: HandBook
        [Route]
        public ActionResult Index()
        {
            using (CMSEntities db = new CMSEntities())
            {
                HandBookViewModel model = new HandBookViewModel();
                model.Posts = db.Posts.Where(p => p.idCategory == 8 && p.published == true).OrderByDescending(p => p.id).ToList();

                return View(model);
            }
        }

        [Route("{alias}-{id:int}")]
        public ActionResult Show(string alias, int id)
        {
            using (CMSEntities db = new CMSEntities())
            {
                ShowHandBookViewModel model = new ShowHandBookViewModel();
                model.Post = db.Posts.Find(id);
                model.RelatePosts = db.Posts.Where(p => p.idCategory == model.Post.idCategory && p.id != model.Post.id).OrderByDescending(p => p.id).Take(6).ToList();

                return View(model);
            }
        }
    }
}