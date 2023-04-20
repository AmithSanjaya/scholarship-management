using SM.UserObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SM.DataAccess;
using System.IO;
using System.Configuration;

namespace SM.UI.Controllers
{
    public class AdminController : Controller
    {
        AjaxResponse ajaxResponse;
        DBUpdate dBUpdate;
        // GET: Admin

        public AdminController()
        {
            
        }

        public ActionResult Index()
        {
            ClearCookies();
            System.Web.HttpContext.Current.Session["SM"] = null;
            return RedirectToAction("Index", "Home");
        }

        public ActionResult CreateUser()
        {
            return View();
        }

        public ActionResult SideMenu()
        {
            int id = UserDetail.UserID;
            List<Menu> lstMenu = new List<Menu>();
            Menu obj = new Menu { userID = id };
            lstMenu = new AdminDataAccess().GetUserAllowedMenu(obj);
            return PartialView("SideMenu", lstMenu);
        }

        public ActionResult FormButton()
        {
            return PartialView("FormButton");
        }

        #region DashBoard
        public ActionResult TopWidget()
        {
            return PartialView("TopWidget");
        }

        public ActionResult MiddleWidget()
        {
            return PartialView("MiddleWidget");
        }

        public ActionResult Right1Widget()
        {
            return PartialView("Right1Widget");
        }

        public ActionResult Right2Widget()
        {
            return PartialView("Right2Widget");
        }

        public JsonResult GetTopWidget()
        {
            List<TopWidget> lst = new List<TopWidget>();
            TopWidget model = new TopWidget { };

            lst = new AdminDataAccess().GetTopWidget(model);
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMiddleWidget()
        {
            List<MiddleWidget> lst = new List<MiddleWidget>();
            MiddleWidget model = new MiddleWidget { };

            lst = new AdminDataAccess().GetMiddleWidget(model);
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetRight1Widget()
        {
            List<Right1Widget> lst = new List<Right1Widget>();
            Right1Widget model = new Right1Widget { };

            lst = new AdminDataAccess().GetRight1Widget(model);
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetRight2Widget()
        {
            List<StudentVM> lst = new List<StudentVM>();
            StudentVM model = new StudentVM { };

            lst = new AdminDataAccess().GetRight2Widget(model);
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetWidgetInterval()
        {
            List<WidgetInterval> lst = new List<WidgetInterval>();
            WidgetInterval model = new WidgetInterval { };

            lst = new AdminDataAccess().GetWidgetInterval(model);
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region User Details

        public JsonResult UsersData(UserVM model)
        {
            List<UserVM> lst = new List<UserVM>();
            lst = new AdminDataAccess().GetUsersData(model);
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UserRoles()
        {
            List<UserRolde> lst = new List<UserRolde>();
            lst = new AdminDataAccess().GetUserRoles();
            return Json(lst, JsonRequestBehavior.AllowGet);
        }         
        public ActionResult AddEditUser()
        {
            return View();
        }

        public ActionResult UserView()
        {
            List<UserVM> lst = new List<UserVM>();
            UserVM model = new UserVM { };
            lst = new AdminDataAccess().GetUsersData(model);
            return PartialView("UserView", lst);
        }

        public ActionResult UserList()
        {
            UserVM model = new UserVM();
            model.UserID = 0;            
            List<UserVM> lst = new AdminDataAccess().GetUsersData(model);
            return View(lst);
        }

        public JsonResult UpdateUser(User model)
        {
            ajaxResponse = new AjaxResponse();
            dBUpdate = new DBUpdate();
            model.EnteredBy = UserDetail.UserID;
            model.FacebookUrl = String.IsNullOrEmpty(model.FacebookUrl) ? "" : model.FacebookUrl;
            model.Photo = String.IsNullOrEmpty(model.Photo) ? "" : model.Photo;
            dBUpdate = new AdminDataAccess().UpdateUser(model);

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


        public ActionResult UserRight()
        {
            return View();
        }

        public JsonResult GetSystemAllMenus()
        {
            List<Menu> lstMenu = new List<Menu>();
            Menu obj = new Menu {};
            lstMenu = new AdminDataAccess().GetUserAllowedMenu(obj);
            return Json(lstMenu, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUserAllowedMenu(Menu model)
        {
            List<Menu> lstMenu = new List<Menu>();

            lstMenu = new AdminDataAccess().GetUserAllowedMenu(model);
            return Json(lstMenu, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveUserAccessRights(UserMenu model)
        {
            ajaxResponse = new AjaxResponse();
            dBUpdate = new DBUpdate();
            model.EnteredBy = UserDetail.UserID;

            foreach (UserMenu obj in model.lstMenu)
            {
                obj.EnteredBy = UserDetail.UserID;
                
            }
            dBUpdate = new AdminDataAccess().SaveUserAccessRights(model);

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

        public JsonResult DeleteUserAccessRights(UserMenu model)
        {
            ajaxResponse = new AjaxResponse();
            dBUpdate = new DBUpdate();
            model.EnteredBy = UserDetail.UserID;
            
            dBUpdate = new AdminDataAccess().DeleteUserAccessRights(model);

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

        #endregion

        /// <summary>
        /// Logout
        /// </summary>
        /// <returns></returns>
        public ActionResult LogOut()
        {
            ClearCookies();

            System.Web.HttpContext.Current.Session["SM"] = null;
            return RedirectToAction("Index", "Home");
        }

        public JsonResult UserLogin(User model)
        {
            List<User> lstUser = new List<User>();
            ajaxResponse = new AjaxResponse();

            lstUser = new AdminDataAccess().UserLogin(model);

            if (lstUser.Count>0)
            {
                ajaxResponse.IsValid = true;

                Random rnd = new Random();
                int num = rnd.Next();

                System.Web.HttpContext.Current.Session["SM"] = num.ToString();

                HttpCookie UserName = new HttpCookie("UserName");
                UserName.Value = lstUser[0].UserName.ToString();
                this.ControllerContext.HttpContext.Response.Cookies.Add(UserName);

                HttpCookie UserID = new HttpCookie("UserID");
                UserID.Value = lstUser[0].UserID.ToString();
                this.ControllerContext.HttpContext.Response.Cookies.Add(UserID);

                HttpCookie FullName = new HttpCookie("FullName");
                FullName.Value = lstUser[0].UserFullName.ToString();
                this.ControllerContext.HttpContext.Response.Cookies.Add(FullName);
            }
            else
            {
                ajaxResponse.IsValid = false;
                ajaxResponse.ErrorMessage = "Incorrect Login Details!";
            }

            return Json(ajaxResponse, JsonRequestBehavior.AllowGet);
        }

        void ClearCookies()
        {
            HttpCookie UserName = this.ControllerContext.HttpContext.Request.Cookies["UserName"];
            UserName.Value = "";
            this.ControllerContext.HttpContext.Response.Cookies.Add(UserName);

            HttpCookie UserID = this.ControllerContext.HttpContext.Request.Cookies["UserID"];
            UserID.Value = "";
            this.ControllerContext.HttpContext.Response.Cookies.Add(UserID);

            HttpCookie FullName = this.ControllerContext.HttpContext.Request.Cookies["FullName"];
            FullName.Value = "";
            this.ControllerContext.HttpContext.Response.Cookies.Add(FullName);

        }

        public JsonResult CheckSession()
        {
            ajaxResponse = new AjaxResponse();

            if ((System.Web.HttpContext.Current.Session["SM"] != null) && (Request.Cookies["UserID"].Value != null || Request.Cookies["UserID"].Value != ""))
            {
                ajaxResponse.SucessMessage = "Sucess";
            }
            else
            {
                ajaxResponse.SucessMessage = "Fail";
            }

            return Json(ajaxResponse.SucessMessage, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Upload()
        {
            string UploadURL = ConfigurationManager.AppSettings["Uploads"];

            for (int i = 0; i < Request.Files.Count; i++)
            {
                HttpPostedFileBase file = Request.Files[i];

                int fileSize = file.ContentLength;
                string fileName = file.FileName;
                string UploadType = Request["UploadType"].ToString();
                string FileType = Request["FileType"].ToString();
                string strPath = UploadURL;

                fileName = Request["FileID"].ToString();
                string mimeType = file.ContentType;
                System.IO.Stream fileContent = file.InputStream;
                var InputFileName = Path.GetFileName(file.FileName);

                if (UploadType == "Student")
                {
                    strPath += "Student\\";
                    InputFileName = fileName + ".jpg";
                }
                else if (UploadType == "StudentProgress")
                {
                    strPath += "StudentProgress\\";
                    InputFileName = fileName + ".pdf";
                }
                else if (UploadType == "User")
                {
                    strPath += "User\\";
                    InputFileName = fileName + ".jpg";
                }
                else if (UploadType == "Document")
                {
                    strPath += "Document\\";
                    InputFileName = fileName + "." + FileType;
                }

                string ServerSavePath = Path.Combine(strPath + InputFileName);
                file.SaveAs(ServerSavePath);
            }

            return Json("Uploaded " + Request.Files.Count + " files");
        }

        public JsonResult FormValidate(FormValidate model)
        {
            List<FormValidate> lst = new List<FormValidate>();
            lst = new AdminDataAccess().FormValidate(model);

            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult FormDBValidate(FormDBValidate model)
        {
            List<FormDBValidate> lst = new List<FormDBValidate>();
            lst = new AdminDataAccess().FormDBValidate(model);

            return Json(lst, JsonRequestBehavior.AllowGet);
        }
    }
}