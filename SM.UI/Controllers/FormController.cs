using SM.DataAccess;
using SM.UserObjects;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace SM.UI.Controllers
{
    public class FormController : Controller
    {
        AjaxResponse ajaxResponse;
        DBUpdate dBUpdate;

        public FormController()
        {
            
        }

        // GET: Form
        public ActionResult Index()
        {
            return View();
        }

        #region Student Details
        public JsonResult StudentExamType()
        {
            StudentExamType model = new StudentExamType();
            List<StudentExamType> lst = new List<StudentExamType>();
            lst = new StudentDataAccess().StudentExamType(model);

            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Country()
        {
            Country model = new Country();
            List<Country> lst = new List<Country>();
            lst = new StudentDataAccess().Country(model);

            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SubjectGrade()
        {
            SubjectGrade model = new SubjectGrade();
            List<SubjectGrade> lst = new List<SubjectGrade>();
            lst = new StudentDataAccess().SubjectGrade(model);

            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public ActionResult StudentDetail()
        {
            StudentVM model = new StudentVM();

            List<StudentVM> lstStudent = new List<StudentVM>();

            model.StudentID = 0;
            model.ViewTypeID = 1;

            lstStudent = new StudentDataAccess().StudentData(model);
            return View(lstStudent);
        }

        public ActionResult StudentView()
        {
            List<StudentVM> lst = new List<StudentVM>();
            StudentVM model = new StudentVM {};
            lst = new StudentDataAccess().StudentData(model);

            return PartialView("StudentView", lst);
        }

        public ActionResult AddEditStudentDetails()
        {
            return View();
        }

        public JsonResult StudentData(StudentVM model)
        {
            List<StudentVM> lst = new List<StudentVM>();
            lst = new StudentDataAccess().StudentData(model);

            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ValidateStudent(StudentVM model)
        {
            List<FormValidate> lst = new List<FormValidate>();
            lst = new StudentDataAccess().ValidateStudent(model);

            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateStudent (Student model)
        {
            ajaxResponse = new AjaxResponse();
            dBUpdate = new DBUpdate();
            model.EnteredBy = UserDetail.UserID;

            dBUpdate = new StudentDataAccess().UpdateStudent(model);

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

        #region Common Model
        public ActionResult CommonView()
        {
            return PartialView("CommonView");
        }
        #endregion

        #region Send Application to Sponser
        public ActionResult SendApplicationtoSponser()
        {
            StudentVM model = new StudentVM();

            List<StudentVM> lst = new List<StudentVM>();

            model.StudentID = 0;
            model.ViewTypeID = 1;

            lst = new StudentDataAccess().StudentData(model);

            return View(lst);
        }

        public JsonResult SaveSponserApplication(SponserStudent model)
        {
            ajaxResponse = new AjaxResponse();
            dBUpdate = new DBUpdate();
            model.EnteredBy = UserDetail.UserID;

            model.lstStudents.ForEach(x => x.EnteredBy.Equals(UserDetail.UserID));
            dBUpdate = new StudentSponserDataAccess().SaveSponserApplication(model);

            if (dBUpdate.Update)
            {
                ajaxResponse.IsValid = true;
                ajaxResponse.ReturnID = dBUpdate.ReturnID;
                ajaxResponse.SucessMessage = "Saved Successfully..!";
            }
            else
            {
                ajaxResponse.IsValid = false;
                ajaxResponse.ErrorMessage = "Error in Data Saving..!";
            }

            return Json(ajaxResponse, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteStudentFromSponserApplication(SponserStudent model)
        {
            ajaxResponse = new AjaxResponse();
            dBUpdate = new DBUpdate();
            model.EnteredBy = UserDetail.UserID;
            
            dBUpdate = new StudentSponserDataAccess().DeleteStudentFromSponserApplication(model);

            if (dBUpdate.Update)
            {
                ajaxResponse.IsValid = true;
                ajaxResponse.ReturnID = dBUpdate.ReturnID;
                ajaxResponse.SucessMessage = "Deleted Successfully..!";
            }
            else
            {
                ajaxResponse.IsValid = false;
                ajaxResponse.ErrorMessage = "Error in Data Deleting..!";
            }

            return Json(ajaxResponse, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SponsersApplicationStudentData(SponserStudent model)
        {
            List<SponserStudent> lst = new List<SponserStudent>();
            lst = new StudentSponserDataAccess().SponsersApplicationStudentData(model);
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllStudents()
        {
            StudentVM model = new StudentVM();
            List<StudentVM> lst = new List<StudentVM>();
            model.StudentID = 0;
            model.ViewTypeID = 1;
            lst = new StudentDataAccess().StudentData(model);
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Link Sponser Student
        public ActionResult LinkSponserStudent()
        {
            StudentVM model = new StudentVM();

            List<StudentVM> lst = new List<StudentVM>();

            model.StudentID = 0;
            model.ViewTypeID = 1;

            lst = new StudentDataAccess().SponserNotLinkedStudentData(model);

            return View(lst);
        }

        public JsonResult SaveSponserLinkedStudents(SponserStudent model)
        {
            ajaxResponse = new AjaxResponse();
            dBUpdate = new DBUpdate();
            model.EnteredBy = UserDetail.UserID;

            foreach (SponserStudent obj in model.lstStudents)
            {               
                obj.EnteredBy = UserDetail.UserID;
            }
            dBUpdate = new StudentSponserDataAccess().SaveSponserLinkedStudents(model);

            if (dBUpdate.Update)
            {
                ajaxResponse.IsValid = true;
                ajaxResponse.ReturnID = dBUpdate.ReturnID;
                ajaxResponse.SucessMessage = "Saved Successfully..!";
            }
            else
            {
                ajaxResponse.IsValid = false;
                ajaxResponse.ErrorMessage = "Error in Data Saving..!";
            }

            return Json(ajaxResponse, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteStudentFromSponser(SponserStudent model)
        {
            ajaxResponse = new AjaxResponse();
            dBUpdate = new DBUpdate();
            model.EnteredBy = UserDetail.UserID;

            dBUpdate = new StudentSponserDataAccess().DeleteStudentFromSponser(model);

            if (dBUpdate.Update)
            {
                ajaxResponse.IsValid = true;
                ajaxResponse.ReturnID = dBUpdate.ReturnID;
                ajaxResponse.SucessMessage = "Deleted Successfully..!";
            }
            else
            {
                ajaxResponse.IsValid = false;
                ajaxResponse.ErrorMessage = "Error in Data Deleting..!";
            }

            return Json(ajaxResponse, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSponserNotLinkedStudents()
        {
            StudentVM model = new StudentVM();
            List<StudentVM> lst = new List<StudentVM>();
            model.StudentID = 0;
            model.ViewTypeID = 1;
            lst = new StudentDataAccess().SponserNotLinkedStudentData(model);
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SponsersLinkedStudentData(SponserStudent model)
        {
            List<SponserStudent> lst = new List<SponserStudent>();
            lst = new StudentSponserDataAccess().SponsersLinkedStudentData(model);
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult StudentDataofSponserLinked(SponserStudent model)
        {
            List<SponserStudent> lst = new List<SponserStudent>();
            lst = new StudentSponserDataAccess().StudentDataofSponserLinked(model);
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Send Payment Notification
        public ActionResult SendPaymentNotification()
        {
            StudentVM model = new StudentVM();

            List<StudentVM> lst = new List<StudentVM>();

            return View(lst);
        }
        #endregion

        #region Payment of Sponser
        public ActionResult SponserPayment()
        {
            return View();
        }

        public JsonResult SponsersStudentData(SponserStudent model)
        {
            List<StudentVM> lst = new List<StudentVM>();
            lst = new StudentSponserDataAccess().SponsersStudentData(model);
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveSponserPaymentDetails(SponserStudent model)
        {
            ajaxResponse = new AjaxResponse();
            dBUpdate = new DBUpdate();
            model.EnteredBy = UserDetail.UserID;
            int year = Convert.ToInt32(model.EffectiveMonth.Substring(0, 4));
            int month = Convert.ToInt32(model.EffectiveMonth.Substring(5, 2));

            foreach (SponserStudent obj in model.lstStudents)
            {
                obj.Year = year;
                obj.Month = month;
                obj.EnteredBy = UserDetail.UserID;
            }
            
            dBUpdate = new StudentSponserDataAccess().SaveSponserPaymentDetails(model);

            if (dBUpdate.Update)
            {
                ajaxResponse.IsValid = true;
                ajaxResponse.ReturnID = dBUpdate.ReturnID;
                ajaxResponse.SucessMessage = "Saved Successfully..!";
            }
            else
            {
                ajaxResponse.IsValid = false;
                ajaxResponse.ErrorMessage = "Error in Data Saving..!";
            }

            return Json(ajaxResponse, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteStudentPaymentFromSponser(SponserStudent model)
        {
            ajaxResponse = new AjaxResponse();
            dBUpdate = new DBUpdate();
            model.EnteredBy = UserDetail.UserID;

            dBUpdate = new StudentSponserDataAccess().DeleteStudentPaymentFromSponser(model);

            if (dBUpdate.Update)
            {
                ajaxResponse.IsValid = true;
                ajaxResponse.ReturnID = dBUpdate.ReturnID;
                ajaxResponse.SucessMessage = "Deleted Successfully..!";
            }
            else
            {
                ajaxResponse.IsValid = false;
                ajaxResponse.ErrorMessage = "Error in Data Deleting..!";
            }

            return Json(ajaxResponse, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SponserPaidStudentByYearandMonth(SponserStudent model)
        {
            List<SponserStudent> lst = new List<SponserStudent>();
            int year = Convert.ToInt32(model.EffectiveMonth.Substring(0, 4));
            int month = Convert.ToInt32(model.EffectiveMonth.Substring(5, 2));
            model.Year = year;
            model.Month = month;
            lst = new StudentSponserDataAccess().SponserPaidStudentByYearandMonth(model);
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SponserPaidStudentHistoryData(SponserStudent model)
        {
            List<SponserStudent> lst = new List<SponserStudent>();           
            
            lst = new StudentSponserDataAccess().SponserPaidStudentHistoryData(model);
            return Json(lst, JsonRequestBehavior.AllowGet);
        }


        #endregion
    }
}