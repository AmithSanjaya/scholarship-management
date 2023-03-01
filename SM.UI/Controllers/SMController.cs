using SM.DataAccess;
using SM.UserObjects;
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
        #region Sponsers
        public ActionResult SponsershipDetails()
        {
            SponserVM model = new SponserVM();

            List<SponserVM> lst = new List<SponserVM>();
            return View(lst);
        }

        public ActionResult AddEditSponserDetails()
        {
            SponserVM model = new SponserVM();

            List<SponserVM> lst = new List<SponserVM>();

            return View(lst);
        }
        #endregion
        #endregion
    }
}