using CMS.Models;
using CMS.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    public class MenuFrontController : Controller
    {
        // GET: MenuFront
        public ActionResult Index()
        {
            return View();
        }

        //---SUPPORT API---
        public JsonResult GetMenu2LvById(int id)
        {
            using (CMSEntities db = new CMSEntities())
            {
                MenuViewModel model = new MenuViewModel();
                var menu = db.Menus.Find(id);
                model.Id = menu.id;
                model.Name = menu.name;
                model.Items = new List<ItemMenuViewModel>();

                var itemMenus = db.ItemMenus.Where(p => p.idMenu == id).ToList();
                foreach (var itemMenu in itemMenus)
                {
                    //Bài viết
                    if(itemMenu.idType == 1 && itemMenu.idComponent != null)
                    {
                        ItemMenuViewModel item = new ItemMenuViewModel();
                        item.Title = itemMenu.title;
                        var post = db.Posts.Find(itemMenu.idComponent);
                    }

                    //Danh sách sản phẩm
                    if (itemMenu.idType == 4 && itemMenu.idComponent != null)
                    {
                        ItemMenuViewModel item = new ItemMenuViewModel();

                        item.Title = itemMenu.title;

                        var categoryProduct = db.CategoryProducts.Find(itemMenu.idComponent);
                        item.Url = "/san-pham/" + categoryProduct.alias + "-" + categoryProduct.id;
                        item.Childs = (
                            from p in db.Products
                            where p.idCategory == categoryProduct.id
                            select new ItemMenuViewModel()
                            {
                                Title = p.title,
                                Url = "/san-pham/" + categoryProduct.alias + "/" + p.alias + "-" + p.id
                            }
                        ).ToList();

                        model.Items.Add(item);
                    }
                }

                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
    }
}