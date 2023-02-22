using SM.DataAccess;
using SM.UserObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SM.UI.Controllers
{
    public class FormController : Controller
    {
        AjaxResponse ajaxResponse;

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

        public JsonResult UpdateStudent (Student model)
        {
            model.EnteredBy = UserDetail.UserID;

            bool isSuccess = new StudentDataAccess().UpdateStudent(model);

            if (isSuccess)
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