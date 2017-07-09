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
    public class ItemMenuAPIController : ApiController
    {
        private CMSEntities db = new CMSEntities();

        // GET: api/ItemMenuAPI
        public IQueryable<ItemMenu> GetItemMenus()
        {
            return db.ItemMenus;
        }

        // GET: api/ItemMenuAPI/5
        [ResponseType(typeof(ItemMenu))]
        public IHttpActionResult GetItemMenu(int id)
        {
            ItemMenu itemMenu = db.ItemMenus.Find(id);
            if (itemMenu == null)
            {
                return NotFound();
            }

            return Ok(itemMenu);
        }

        // PUT: api/ItemMenuAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutItemMenu(int id, ItemMenu itemMenu)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != itemMenu.id)
            {
                return BadRequest();
            }

            db.Entry(itemMenu).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemMenuExists(id))
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

        // POST: api/ItemMenuAPI
        [ResponseType(typeof(ItemMenu))]
        public IHttpActionResult PostItemMenu(ItemMenu itemMenu)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ItemMenus.Add(itemMenu);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = itemMenu.id }, itemMenu);
        }

        // DELETE: api/ItemMenuAPI/5
        [ResponseType(typeof(ItemMenu))]
        public IHttpActionResult DeleteItemMenu(int id)
        {
            ItemMenu itemMenu = db.ItemMenus.Find(id);
            if (itemMenu == null)
            {
                return NotFound();
            }

            db.ItemMenus.Remove(itemMenu);
            db.SaveChanges();

            return Ok(itemMenu);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ItemMenuExists(int id)
        {
            return db.ItemMenus.Count(e => e.id == id) > 0;
        }
    }
}