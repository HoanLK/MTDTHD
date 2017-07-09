using CMS.Models;
using CMS.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("video")]
    public class VideoFrontController : Controller
    {
        // GET: VideoFront
        [Route]
        public ActionResult Index()
        {
            using(CMSEntities db = new CMSEntities())
            {
                VideoViewModel model = new VideoViewModel();
                model.Video = db.Videos.Where(p => p.published == true && p.featured == true).FirstOrDefault();
                model.Videos = db.Videos.Where(p => p.published == true && p.id != model.Video.id).ToList();

                return View(model);
            }
        }
    }
}