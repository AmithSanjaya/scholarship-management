using CrystalDecisions.CrystalReports.Engine;
using SM.UserObjects;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SM.UI.Controllers
{
    public class ReportController : Controller
    {
        // GET: Report
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult StudentDetailReport()
        {
            return View();
        }

        public ActionResult PaymentDueSponsers()
        {
            return View();
        }

        public ActionResult AnnualProgressPending()
        {
            return View();
        }

        public ActionResult StudentPaymentReport()
        {
            return View();
        }

        #region Report Model
        public JsonResult StudentDetailReportModel(StudentReport model)
        {
            AjaxResponse ar = new AjaxResponse();
            Session["StudentDetailReport"] = model;
            ar.SucessMessage = "Success";
            ar.IsValid = true;
            return Json(ar, JsonRequestBehavior.AllowGet);
        }

        public JsonResult StudentBankReportModel(StudentBankReport model)
        {
            AjaxResponse ar = new AjaxResponse();
            Session["StudentBankReport"] = model;
            ar.SucessMessage = "Success";
            ar.IsValid = true;
            return Json(ar, JsonRequestBehavior.AllowGet);
        }

        public JsonResult StudentPaymentReportModel(StudentPaymentReport model)
        {
            AjaxResponse ar = new AjaxResponse();
            Session["StudentPaymentReport"] = model;
            ar.SucessMessage = "Success";
            ar.IsValid = true;
            return Json(ar, JsonRequestBehavior.AllowGet);
        }

        #endregion
    }
}