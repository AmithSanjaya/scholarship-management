using SM.UserObjects;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.DataAccess
{
    public class AdminDataAccess
    {
        private Execute exe;

        public AdminDataAccess()
        {
            exe = new Execute();
        }

        public List<Menu> GetUserAllowedMenu(Menu obj)
        {
            List<SqlParameter> list = new List<SqlParameter>();

            list.Add(new SqlParameter("@UserID", obj.userID));

            DataTable dt = exe.SpEXecuteSelectQuery("[spGetUserAllowLevel1Menu]", list, CommandType.StoredProcedure);
            List<Menu> lstMenu = new List<Menu>();
            Menu tempMenu;
            foreach (DataRow item in dt.Rows)
            {
                tempMenu = new Menu();
                tempMenu.MenuID = Convert.ToInt32(item["MenuID"]);
                tempMenu.MenuName = item["MenuName"].ToString();
                tempMenu.DisplayName = item["DisplayName"].ToString();
                tempMenu.OrderID = Convert.ToInt32(item["OrderID"]);
                tempMenu.ID = 0;

                if (item["Controller"] != DBNull.Value)
                {
                    tempMenu.Controller = item["Controller"].ToString();
                }
                else
                {
                    tempMenu.Controller = string.Empty;
                }

                if (item["Action"] != DBNull.Value)
                {
                    tempMenu.Action = item["Action"].ToString();
                }
                else
                {
                    tempMenu.Action = string.Empty;
                }

                if (item["ID"] != DBNull.Value)
                {
                    if (item["ID"].ToString() != "")
                    {
                        tempMenu.ID = Convert.ToInt32(item["ID"]);
                    }
                }

                if (item["CSSClass"] != DBNull.Value)
                {
                    tempMenu.CSSClass = item["CSSClass"].ToString();
                }
                else
                {
                    tempMenu.CSSClass = string.Empty;
                }

                tempMenu.ChildMenus = GetUserAllowedMenu(obj.userID, Convert.ToInt32(item["MenuID"]));
                lstMenu.Add(tempMenu);

            }
            return lstMenu;
        }

        private List<Menu> GetUserAllowedMenu(int userid, int menuid)
        {
            List<SqlParameter> list = new List<SqlParameter>();

            list.Add(new SqlParameter("@UserID", userid));
            list.Add(new SqlParameter("@MenuID", menuid));

            DataTable dt = exe.SpEXecuteSelectQuery("[spGetUserAllowLevel2Menu]", list, CommandType.StoredProcedure);
            List<Menu> lstMenu = new List<Menu>();
            Menu tempMenu;
            foreach (DataRow item in dt.Rows)
            {
                tempMenu = new Menu();
                tempMenu.MenuID = Convert.ToInt32(item["MenuID"]);
                tempMenu.MenuName = item["MenuName"].ToString();
                tempMenu.DisplayName = item["DisplayName"].ToString();
                tempMenu.OrderID = Convert.ToInt32(item["OrderID"]);
                tempMenu.ID = 0;

                if (item["Controller"] != DBNull.Value)
                {
                    tempMenu.Controller = item["Controller"].ToString();
                }
                else
                {
                    tempMenu.Controller = string.Empty;
                }

                if (item["Action"] != DBNull.Value)
                {
                    tempMenu.Action = item["Action"].ToString();
                }
                else
                {
                    tempMenu.Action = string.Empty;
                }

                if (item["ID"] != DBNull.Value)
                {
                    if (item["ID"].ToString() != "")
                    {
                        tempMenu.ID = Convert.ToInt32(item["ID"]);
                    }
                }

                if (item["CSSClass"] != DBNull.Value)
                {
                    tempMenu.CSSClass = item["CSSClass"].ToString();
                }
                else
                {
                    tempMenu.CSSClass = string.Empty;
                }

                tempMenu.ChildMenus = GetUserAllowedMenu(userid, Convert.ToInt32(item["MenuID"]));

                lstMenu.Add(tempMenu);
            }
            return lstMenu;
        }
    }
}
