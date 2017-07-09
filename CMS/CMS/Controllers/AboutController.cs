using CMS.Models;
using CMS.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("gioi-thieu")]
    public class AboutController : Controller
    {
        // GET: About
        [Route]
        public ActionResult Index()
        {
            using (CMSEntities db = new CMSEntities())
            {
                var model = db.Posts.Where(p => p.idCategory == (db.CategoryPosts.Where(c => c.alias == "gioi-thieu").FirstOrDefault().id)).FirstOrDefault();

                return View(model);
            }
        }

        [Route("{alias}-{id:int}")]
        public ActionResult Show(string alias, int id)
        {
            using(CMSEntities db = new CMSEntities())
            {
                AboutViewModel model = new AboutViewModel();
                model.Post = db.Posts.Find(id);
                model.RelatePosts = db.Posts.Where(p => p.idCategory == model.Post.idCategory && p.id != model.Post.id).ToList();

                return View(model);
            }
        }
    }
}