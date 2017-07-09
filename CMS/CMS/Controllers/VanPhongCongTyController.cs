﻿using CMS.Models;
using CMS.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("van-phong-cong-ty")]
    public class VanPhongCongTyController : Controller
    {
        [Route]
        // GET: ActionCompany
        // GET: News
        public ActionResult Index()
        {
            using (CMSEntities db = new CMSEntities())
            {
                NewsViewModel model = new NewsViewModel();
                model.Posts = db.Posts.Where(p => p.idCategory == (db.CategoryPosts.Where(c => c.alias == "van-phong-cong-ty").FirstOrDefault().id) && p.published == true).OrderByDescending(p => p.id).ToList();

                return View(model);
            }
        }

        [Route("{alias}-{id:int}")]
        public ActionResult Show(string alias, int id)
        {
            using (CMSEntities db = new CMSEntities())
            {
                ShowNewsViewModel model = new ShowNewsViewModel();
                model.News = db.Posts.Find(id);
                model.RelateNews = db.Posts.Where(p => p.idCategory == model.News.idCategory && p.id != model.News.id).OrderByDescending(p => p.id).Take(6).ToList();

                return View(model);
            }
        }
    }
}