using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Areas.Admin.Controllers
{
    [Authorize]
    public class InfoCompanyController : Controller
    {
        // GET: Admin/InfoCompany
        public ActionResult Index()
        {
            return View();
        }
    }
}