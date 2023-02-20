using SM.UserObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SM.DataAccess;

namespace SM.UI.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CreateUser()
        {
            return View();
        }

        /// <summary>
        /// Menu
        /// </summary>
        /// <returns></returns>
        public ActionResult SideMenu()
        {
            //int id = UserDetail.UserID;
            List<Menu> lstMenu = new List<Menu>();
            Menu obj = new Menu { userID = 0 };
            lstMenu = new AdminDataAccess().GetUserAllowedMenu(obj);
            return PartialView("SideMenu", lstMenu);
        }

        /// <summary>
        /// User Right
        /// </summary>
        /// <returns></returns>
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
            return RedirectToAction("Index", "Home");
        }
    }
}