using CgTest.CategorySupport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CgTest.Controllers
{
    public class CategoryController : Controller
    {
        public ActionResult Index(string category)
        {
            var item = CategoryRepository.GetAll().FirstOrDefault(c => c.UrlSegment == category);

            return View(item);
        }
    }
}