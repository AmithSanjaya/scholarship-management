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
        AjaxResponse ajaxResponse;
        DBUpdate dBUpdate;

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
            model.SponserID = 0;
            model.ViewTypeID = 1;
            List<SponserVM> lst = new SponserDataAccess().SponsersData(model);
            return View(lst);
        }

        public ActionResult SponserView()
        {
            List<SponserVM> lst = new List<SponserVM>();
            SponserVM model = new SponserVM { };
            lst = new SponserDataAccess().SponsersData(model);

            return PartialView("SponserView", lst);
        }

        public JsonResult PaymentSchems()
        {
            PaymentScheme model = new PaymentScheme();
            List<PaymentScheme> lst = new List<PaymentScheme>();
            lst = new SponserDataAccess().PaymentSchemes(model);
           
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddEditSponserDetails()
        {
            SponserVM model = new SponserVM();
            List<SponserVM> lst = new List<SponserVM>();
            return View(lst);
        }

        public JsonResult UpdateSponser(Sponser model)
        {
            ajaxResponse = new AjaxResponse();
            dBUpdate = new DBUpdate();
            model.EnteredBy = UserDetail.UserID;

            dBUpdate = new SponserDataAccess().UpdateSponser(model);

            if (dBUpdate.Update)
            {
                ajaxResponse.IsValid = true;
                ajaxResponse.ReturnID = dBUpdate.ReturnID;
                ajaxResponse.SucessMessage = "Updated Successfully..!";
            }
            else
            {
                ajaxResponse.IsValid = false;
                ajaxResponse.ErrorMessage = "Error in Data Updating..!";
            }

            return Json(ajaxResponse, JsonRequestBehavior.AllowGet);
        }

        #endregion
        #endregion
    }
}