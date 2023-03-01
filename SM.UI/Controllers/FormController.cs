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

        public ActionResult AddEditStudentDetails()
        {
            int StudentID=0, TypeID=0;

            if (!string.IsNullOrEmpty(Request["StudentID"]) && Request["StudentID"].ToString() != "")
            {
                StudentID = Convert.ToInt32(Request["StudentID"].ToString());
            }
            if (!string.IsNullOrEmpty(Request["TypeID"]) && Request["TypeID"].ToString() != "")
            {
                TypeID = Convert.ToInt32(Request["TypeID"].ToString());
            }

            StudentVM model = new StudentVM();

            model.StudentID = StudentID;
            model.TypeID = TypeID;
            model.ViewTypeID = 2;

            List<StudentVM> lstStudent = new List<StudentVM>();
            lstStudent = new StudentDataAccess().StudentData(model);

            return View(lstStudent);
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

    }
}