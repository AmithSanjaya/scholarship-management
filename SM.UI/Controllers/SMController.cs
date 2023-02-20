using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SM.UI.Controllers
{
    public class SMController : Controller
    {
        // GET: SM
        public ActionResult Index()
        {
            return View();
        }

        #region Master Files
        public ActionResult SponsershipDetails()
        {
            return View();
        }
        #endregion
    }
}