using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace SM.UserObjects
{
    public class User
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserFullName { get; set; }
        public int UserRoleID { get; set; }
        public string FacebookUrl { get; set; }
        public string Photo { get; set; }
        public string Address { get; set; }
        public int CountryID { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
        public DateTime EnteredOn { get; set; }
        public int EnteredBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public int ModifiedBy { get; set; }
        public int Mode { get; set; }
    }

    public class UserVM
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string Password { get; set; }
        public string LastName { get; set; }
        public string UserFullName { get; set; }
        public int UserRoleID { get; set; }
        public string UserRoleName { get; set; }
        public string FacebookUrl { get; set; }
        public string Photo { get; set; }
        public string Address { get; set; }
        public int CountryID { get; set; }
        public string CountryName { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string UserImage { get; set; }
        public bool IsActive { get; set; }
        public string UserStatus { get; set; }
        public string EnteredDate { get; set; }
        public int ViewTypeID { get; set; }
        public int Mode { get; set; }
    }

    public class UserRolde
    {
        public int UserRoleID { get; set; }
        public string UserRoleName { get; set; }
    }

    public class UserDetail
    {
        public static int UserID { get { return GetLoggedUser(); } }
        public static string UserName { get { return GetLoggedUserName(); } }
        public static string Password { get; set; }
        public static string FirstName { get { return GetLoggedUserFirstName(); } }
        public static string FullName { get { return GetLoggedUserFullName(); } }
        public static int PermissionID { get { return GetLoggedPermissionID(); } }

        private static int GetLoggedUser()
        {
            int value = 0;
            HttpCookie cookie = HttpContext.Current.Request.Cookies["UserID"];

            if (cookie != null && !String.IsNullOrEmpty(cookie.Value))
            {
                value = Convert.ToInt32(cookie.Value);
            }
            return value;
        }

        private static string GetLoggedUserName()
        {
            string value = "";
            HttpCookie cookie = HttpContext.Current.Request.Cookies["UserName"];

            if (cookie != null && !String.IsNullOrEmpty(cookie.Value))
            {
                value = cookie.Value;
            }
            return value;
        }

        private static string GetLoggedUserFullName()
        {
            string value = "";
            HttpCookie cookie = HttpContext.Current.Request.Cookies["FullName"];

            if (cookie != null && !String.IsNullOrEmpty(cookie.Value))
            {
                value = cookie.Value;
            }
            return value;
        }

        private static string GetLoggedUserFirstName()
        {
            string value = "";
            HttpCookie cookie = HttpContext.Current.Request.Cookies["FirstName"];

            if (cookie != null && !String.IsNullOrEmpty(cookie.Value))
            {
                value = cookie.Value;
            }
            return value;
        }

        private static int GetLoggedPermissionID()
        {
            int value = 0;
            HttpCookie cookie = HttpContext.Current.Request.Cookies["PermissionID"];

            if (cookie != null && !String.IsNullOrEmpty(cookie.Value))
            {
                value = Convert.ToInt32(cookie.Value);
            }
            return value;
        }
    }
}
