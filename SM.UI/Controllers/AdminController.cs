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
            //int id = UserDetail.UserID;
            List<Menu> lstMenu = new List<Menu>();
            Menu obj = new Menu { userID = 0 };
            lstMenu = new AdminDataAccess().GetUserAllowedMenu(obj);
            return PartialView("SideMenu", lstMenu);
        }

        public ActionResult UserRight()
        {
            return View();
        }

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
                FullName.Value = lstUser[0].FullName.ToString();
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

                if (UploadType == "Student")
                {
                    strPath = "~/Uploads/Student/";
                }

                fileName = Request["StudentID"].ToString();
                string mimeType = file.ContentType;
                System.IO.Stream fileContent = file.InputStream;
                var InputFileName = Path.GetFileName(file.FileName);
                InputFileName = fileName + ".jpg";

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
    }
}