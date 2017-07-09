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
    public class AccountUserController : Controller
    {
        // GET: Admin/AccountUser
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAll()
        {
            using(CMSEntities db = new CMSEntities())
            {
                var model = (
                    from ac in db.AspNetUsers
                    select new AltAccount()
                    {
                        id = ac.Id,
                        email = ac.Email,
                        emailConfirmed = ac.EmailConfirmed,
                        twoFactor = ac.TwoFactorEnabled
                    }
                ).ToList();

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
    }
}