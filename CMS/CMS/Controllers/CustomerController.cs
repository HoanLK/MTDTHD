using CMS.Models;
using CMS.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("khach-hang")]
    public class CustomerController : Controller
    {
        // GET: Customer
        [Route]
        public ActionResult Index()
        {
            using (CMSEntities db = new CMSEntities())
            {
                CustomerViewModel model = new CustomerViewModel();
                model.Customers = db.Posts.Where(p => p.idCategory == 16 || p.idCategory == 17).ToList();

                return View(model);
            }
        }

        [Route("{alias}")]
        public ActionResult Show(string alias)
        {
            using(CMSEntities db = new CMSEntities())
            {
                CustomerViewModel model = new CustomerViewModel();
                model.CategoryCustomer = db.CategoryPosts.Where(p => p.alias == alias).FirstOrDefault();
                if(model.CategoryCustomer != null)
                {
                    model.Customers = db.Posts.Where(p => p.idCategory == model.CategoryCustomer.id).ToList();
                }

                return View(model);
            }
        }

        [Route("{alias}-{id:int}")]
        public ActionResult Detail(string alias, int id)
        {
            using (CMSEntities db = new CMSEntities())
            {
                ShowCustomerViewModel model = new ShowCustomerViewModel();
                model.Customer = db.Posts.Find(id);
                model.CategoryCustomer = db.CategoryPosts.Find(model.Customer.idCategory);
                model.RelateCustomers = db.Posts.Where(p => p.idCategory == model.Customer.idCategory && p.id != model.Customer.id).ToList();

                return View(model);
            }
        }
    }
}