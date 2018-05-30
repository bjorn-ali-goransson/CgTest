using CgTest.CategorySupport;
using CgTest.ProductSupport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CgTest.RoutingSupport
{
    public static class UrlProvider
    {
        public static string GetUrl(Category category)
        {
            return $"/{category.UrlSegment}";
        }

        public static string GetUrl(Product product)
        {
            var category = CategoryRepository.Get(product.CategoryId);

            return $"/{category.UrlSegment}/{product.ArticleNo}";
        }
    }
}