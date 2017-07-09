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
    public class CategoryPostAPIController : ApiController
    {
        private CMSEntities db = new CMSEntities();

        // GET: api/CategoryPostAPI
        public IQueryable<CategoryPost> GetCategoryPosts()
        {
            return db.CategoryPosts;
        }

        // GET: api/CategoryPostAPI/5
        [ResponseType(typeof(CategoryPost))]
        public IHttpActionResult GetCategoryPost(int id)
        {
            CategoryPost categoryPost = db.CategoryPosts.Find(id);
            if (categoryPost == null)
            {
                return NotFound();
            }

            return Ok(categoryPost);
        }

        // PUT: api/CategoryPostAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCategoryPost(int id, CategoryPost categoryPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != categoryPost.id)
            {
                return BadRequest();
            }

            db.Entry(categoryPost).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryPostExists(id))
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

        // POST: api/CategoryPostAPI
        [ResponseType(typeof(CategoryPost))]
        public IHttpActionResult PostCategoryPost(CategoryPost categoryPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CategoryPosts.Add(categoryPost);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = categoryPost.id }, categoryPost);
        }

        // DELETE: api/CategoryPostAPI/5
        [ResponseType(typeof(CategoryPost))]
        public IHttpActionResult DeleteCategoryPost(int id)
        {
            CategoryPost categoryPost = db.CategoryPosts.Find(id);
            if (categoryPost == null)
            {
                return NotFound();
            }

            db.CategoryPosts.Remove(categoryPost);
            db.SaveChanges();

            return Ok(categoryPost);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoryPostExists(int id)
        {
            return db.CategoryPosts.Count(e => e.id == id) > 0;
        }
    }
}