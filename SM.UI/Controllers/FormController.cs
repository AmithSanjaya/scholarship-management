using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SM.UI.Controllers
{
    public class FormController : Controller
    {
        // GET: Form
        public ActionResult Index()
        {
            return View();
        }

        #region Student Details
        public ActionResult StudentDetail()
        {
            return View();
        }

        public ActionResult AddEditStudentDetails()
        {
            return View();
        }
        #endregion
    }
}