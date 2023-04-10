using SM.DataAccess;
using SM.UserObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SM.UI.Controllers
{
    public class MasterController : Controller
    {
        AjaxResponse ajaxResponse;
        DBUpdate dBUpdate;

        // GET: Master
        public ActionResult Index()
        {
            return View();
        }

        #region Master Files
        public ActionResult EmailTemplate()
        {
            return View();
        }

        public JsonResult Currency()
        {
            Currency model = new Currency();
            List<Currency> lst = new List<Currency>();
            lst = new MasterDataAccess().Currency(model);

            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PayType()
        {
            PayType model = new PayType();
            List<PayType> lst = new List<PayType>();
            lst = new MasterDataAccess().PayType(model);

            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EmailTemplateDetail(EmailTemplate model)
        {
            List<EmailTemplate> lst = new List<EmailTemplate>();
            lst = new MasterDataAccess().EmailTemplateDetail(model);
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateEmailTemplate(EmailTemplate model)
        {
            ajaxResponse = new AjaxResponse();
            dBUpdate = new DBUpdate();
            model.EnteredBy = UserDetail.UserID;

            dBUpdate = new MasterDataAccess().UpdateEmailTemplate(model);

            if (dBUpdate.Update)
            {
                ajaxResponse.IsValid = true;
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

        #region Document Detail
        public ActionResult AddDocument()
        {
            return View();
        }

        public JsonResult UpdateDocument(Document model)
        {
            ajaxResponse = new AjaxResponse();
            dBUpdate = new DBUpdate();
            model.EnteredBy = UserDetail.UserID;

            dBUpdate = new MasterDataAccess().UpdateDocument(model);

            if (dBUpdate.Update)
            {
                ajaxResponse.IsValid = true;
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
    }
}