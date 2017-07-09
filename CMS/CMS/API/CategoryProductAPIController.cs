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
    public class CategoryProductAPIController : ApiController
    {
        private CMSEntities db = new CMSEntities();

        // GET: api/CategoryProductAPI
        public IQueryable<CategoryProduct> GetCategoryProducts()
        {
            return db.CategoryProducts;
        }

        // GET: api/CategoryProductAPI/5
        [ResponseType(typeof(CategoryProduct))]
        public IHttpActionResult GetCategoryProduct(int id)
        {
            CategoryProduct categoryProduct = db.CategoryProducts.Find(id);
            if (categoryProduct == null)
            {
                return NotFound();
            }

            return Ok(categoryProduct);
        }

        // PUT: api/CategoryProductAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCategoryProduct(int id, CategoryProduct categoryProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != categoryProduct.id)
            {
                return BadRequest();
            }

            db.Entry(categoryProduct).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryProductExists(id))
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

        // POST: api/CategoryProductAPI
        [ResponseType(typeof(CategoryProduct))]
        public IHttpActionResult PostCategoryProduct(CategoryProduct categoryProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CategoryProducts.Add(categoryProduct);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CategoryProductExists(categoryProduct.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = categoryProduct.id }, categoryProduct);
        }

        // DELETE: api/CategoryProductAPI/5
        [ResponseType(typeof(CategoryProduct))]
        public IHttpActionResult DeleteCategoryProduct(int id)
        {
            CategoryProduct categoryProduct = db.CategoryProducts.Find(id);
            if (categoryProduct == null)
            {
                return NotFound();
            }

            db.CategoryProducts.Remove(categoryProduct);
            db.SaveChanges();

            return Ok(categoryProduct);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoryProductExists(int id)
        {
            return db.CategoryProducts.Count(e => e.id == id) > 0;
        }
    }
}