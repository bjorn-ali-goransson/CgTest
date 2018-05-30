using Poetry.UI.AppSupport;
using Poetry.UI.ScriptSupport;
using Poetry.UI.TranslationSupport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CgTest.ProductSupport
{
    [App("Product")]
    [Script("/ProductSupport/Scripts/product.js")]
    [Translations("/ProductSupport/translations.xml")]
    public class ProductApp
    {
    }
}