using CMS.Models;
using CMS.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("thu-vien-anh")]
    public class AlbumFrontController : Controller
    {
        // GET: AlbumFront
        [Route]
        public ActionResult Index()
        {
            using(CMSEntities db = new CMSEntities())
            {
                List<AlbumViewModel> model = new List<AlbumViewModel>();

                var albums = db.Albums.Where(p => p.published == true).ToList();
                if(albums != null)
                {
                    foreach (var item in albums)
                    {
                        AlbumViewModel album = new AlbumViewModel();
                        album.Album = item;
                        album.Items = db.ItemAlbums.Where(p => p.idAlbum == item.id).ToList();

                        model.Add(album);
                    }
                }

                return View(model);
            }
        }
    }
}