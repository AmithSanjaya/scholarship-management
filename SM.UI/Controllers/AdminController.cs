using SM.UserObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SM.DataAccess;
using System.IO;

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
            for (int i = 0; i < Request.Files.Count; i++)
            {
                HttpPostedFileBase file = Request.Files[i];

                int fileSize = file.ContentLength;
                string fileName = file.FileName;
                string UploadType = Request["UploadType"].ToString();
                string strPath = "";

                fileName = Request["FileID"].ToString();
                string mimeType = file.ContentType;
                System.IO.Stream fileContent = file.InputStream;
                var InputFileName = Path.GetFileName(file.FileName);

                if (UploadType == "Student")
                {
                    strPath = "~/Uploads/Student/";
                    InputFileName = fileName + ".jpg";
                }
                else if (UploadType == "StudentProgress")
                {
                    strPath = "~/Uploads/StudentProgress/";
                    InputFileName = fileName + ".pdf";
                }                

                var ServerSavePath = Path.Combine(Server.MapPath(strPath) + InputFileName);
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