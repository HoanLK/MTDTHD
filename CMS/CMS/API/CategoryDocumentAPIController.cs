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
    public class CategoryDocumentAPIController : ApiController
    {
        private CMSEntities db = new CMSEntities();

        // GET: api/CategoryDocumentAPI
        public IQueryable<CategoryDocument> GetCategoryDocuments()
        {
            return db.CategoryDocuments;
        }

        // GET: api/CategoryDocumentAPI/5
        [ResponseType(typeof(CategoryDocument))]
        public IHttpActionResult GetCategoryDocument(int id)
        {
            CategoryDocument categoryDocument = db.CategoryDocuments.Find(id);
            if (categoryDocument == null)
            {
                return NotFound();
            }

            return Ok(categoryDocument);
        }

        // PUT: api/CategoryDocumentAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCategoryDocument(int id, CategoryDocument categoryDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != categoryDocument.id)
            {
                return BadRequest();
            }

            db.Entry(categoryDocument).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryDocumentExists(id))
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

        // POST: api/CategoryDocumentAPI
        [ResponseType(typeof(CategoryDocument))]
        public IHttpActionResult PostCategoryDocument(CategoryDocument categoryDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CategoryDocuments.Add(categoryDocument);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = categoryDocument.id }, categoryDocument);
        }

        // DELETE: api/CategoryDocumentAPI/5
        [ResponseType(typeof(CategoryDocument))]
        public IHttpActionResult DeleteCategoryDocument(int id)
        {
            CategoryDocument categoryDocument = db.CategoryDocuments.Find(id);
            if (categoryDocument == null)
            {
                return NotFound();
            }

            db.CategoryDocuments.Remove(categoryDocument);
            db.SaveChanges();

            return Ok(categoryDocument);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoryDocumentExists(int id)
        {
            return db.CategoryDocuments.Count(e => e.id == id) > 0;
        }
    }
}