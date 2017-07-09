using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CMS.Models;

namespace CMS.API
{
    public class ItemAlbumAPIController : ApiController
    {
        private CMSEntities db = new CMSEntities();

        // GET: api/ItemAlbumAPI
        public IQueryable<ItemAlbum> GetItemAlbums()
        {
            return db.ItemAlbums;
        }

        // GET: api/ItemAlbumAPI/5
        [ResponseType(typeof(ItemAlbum))]
        public IHttpActionResult GetItemAlbum(int id)
        {
            ItemAlbum itemAlbum = db.ItemAlbums.Find(id);
            if (itemAlbum == null)
            {
                return NotFound();
            }

            return Ok(itemAlbum);
        }

        // GET: api/ItemAlbumAPI?att=...&&value=...
        [ResponseType(typeof(ItemAlbum))]
        public IQueryable<ItemAlbum> GetItemAlbum(string att, string value)
        {
            if(att == "idAlbum")
            {
                int idAlbum;
                if(int.TryParse(value, out idAlbum))
                {
                    var items = db.ItemAlbums.Where(p => p.idAlbum == idAlbum);
                    return items;
                }
            }

            return null;
        }

        // PUT: api/ItemAlbumAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutItemAlbum(int id, ItemAlbum itemAlbum)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != itemAlbum.id)
            {
                return BadRequest();
            }

            db.Entry(itemAlbum).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemAlbumExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ItemAlbumAPI
        [ResponseType(typeof(ItemAlbum))]
        public IHttpActionResult PostItemAlbum(ItemAlbum itemAlbum)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ItemAlbums.Add(itemAlbum);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = itemAlbum.id }, itemAlbum);
        }

        // DELETE: api/ItemAlbumAPI/5
        [ResponseType(typeof(ItemAlbum))]
        public IHttpActionResult DeleteItemAlbum(int id)
        {
            ItemAlbum itemAlbum = db.ItemAlbums.Find(id);
            if (itemAlbum == null)
            {
                return NotFound();
            }

            db.ItemAlbums.Remove(itemAlbum);
            db.SaveChanges();

            return Ok(itemAlbum);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ItemAlbumExists(int id)
        {
            return db.ItemAlbums.Count(e => e.id == id) > 0;
        }
    }
}