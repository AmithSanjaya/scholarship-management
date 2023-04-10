﻿using SM.UserObjects;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace SM.DataAccess
{
    public class AdminDataAccess
    {
        private Execute exe;
        public DBUpdate dBUpdate;

        public AdminDataAccess()
        {
            exe = new Execute();
        }

        #region Dashboard
        public List<TopWidget> GetTopWidget(TopWidget model)
        {
            List<TopWidget> lst = new List<TopWidget>();
            lst = exe.SpExecutesSelect<TopWidget, TopWidget>("spDashBoardTopWidget", model, false);

            return lst;
        }

        public List<MiddleWidget> GetMiddleWidget(MiddleWidget model)
        {
            List<MiddleWidget> lst = new List<MiddleWidget>();
            lst = exe.SpExecutesSelect<MiddleWidget, MiddleWidget>("spDashBoardMiddleWidget", model, false);

            return lst;
        }

        public List<Right1Widget> GetRight1Widget(Right1Widget model)
        {
            List<Right1Widget> lst = new List<Right1Widget>();
            lst = exe.SpExecutesSelect<Right1Widget, Right1Widget>("spDashBoardRight1Widget", model, false);

            return lst;
        }

        public List<StudentVM> GetRight2Widget(StudentVM model)
        {
            List<StudentVM> lst = new List<StudentVM>();
            lst = exe.SpExecutesSelect<StudentVM, StudentVM>("spDashBoardRight2Widget", model, false);

            return lst;
        }

        public List<WidgetInterval> GetWidgetInterval(WidgetInterval model)
        {
            List<WidgetInterval> lst = new List<WidgetInterval>();
            lst = exe.SpExecutesSelect<WidgetInterval, WidgetInterval>("spGetDashboardWidgetInterval", model, false);

            return lst;
        }
        #endregion

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

        public List<User> UserLogin(User model)
        {
            List<User> lstUser = null;

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    lstUser = exe.SpExecutesSelect<User, User>("spUserLogin", model, false);
                    scope.Complete();
                }
                catch (Exception ex)
                {
                    lstUser = null;
                    scope.Dispose();
                }
            }

            return lstUser;
        }

        public List<FormValidate> FormValidate(FormValidate model)
        {
            List<FormValidate> lsFormValidate = null;

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    lsFormValidate = exe.SpExecutesSelect<FormValidate, FormValidate>("spValidateForm", model, false);
                    scope.Complete();
                }
                catch (Exception ex)
                {
                    lsFormValidate = null;
                    scope.Dispose();
                }
            }

            return lsFormValidate;
        }

        public List<FormDBValidate> FormDBValidate(FormDBValidate model)
        {
            List<FormDBValidate> lsFormValidate = null;

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    lsFormValidate = exe.SpExecutesSelect<FormDBValidate, FormDBValidate>("spValidateForm", model, false);
                    scope.Complete();
                }
                catch (Exception ex)
                {
                    lsFormValidate = null;
                    scope.Dispose();
                }
            }

            return lsFormValidate;
        }

        public List<UserVM> GetUsersData(UserVM model)
        {
            List<UserVM> lstUserData = new List<UserVM>();
            lstUserData = exe.SpExecutesSelect<UserVM, UserVM>("spGetUserData", model, false);
            return lstUserData;
        }

        public List<UserRolde> GetUserRoles()
        {
            UserRolde model = new UserRolde();
            List<UserRolde> lstUserRolde = new List<UserRolde>();
            lstUserRolde = exe.SpExecutesSelect<UserRolde, UserRolde>("spGetUserRoles", model, false);
            return lstUserRolde;
        }

        public DBUpdate UpdateUser(User model)
        {
            int ReturnID = 0;
            dBUpdate = new DBUpdate();

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    if (model.Mode == 1)
                    {
                        ReturnID = (int)exe.SpExecutesGetIdentity<User>("spSaveUser", model, false);
                    }
                    else if (model.Mode == 2)
                    {
                        ReturnID = model.UserID;
                        exe.SpExecutes<User>("spEditUser", model, false);
                    }

                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = true;

                    scope.Complete();
                }
                catch (Exception ex)
                {
                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = false;
                    scope.Dispose();
                }
            }

            return dBUpdate;
        }

        public DBUpdate SaveUserAccessRights(UserMenu model)
        {
            int ReturnID = 0;
            dBUpdate = new DBUpdate();
            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    UserMenu userMenu = new UserMenu();
                    userMenu = model.lstMenu[0];
                    exe.SpExecutes<UserMenu>("spRemoveExistingUserRights", userMenu, false);

                    ReturnID = model.lstMenu[0].UserID;
                    foreach (UserMenu obj in model.lstMenu)
                    {
                        exe.SpExecutes<UserMenu>("spSaveUserRights", obj, false);
                    }

                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = true;

                    scope.Complete();
                }
                catch (Exception ex)
                {
                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = false;
                    scope.Dispose();
                }
            }

            return dBUpdate;
        }

        public DBUpdate DeleteUserAccessRights(UserMenu model)
        {
            int ReturnID = 0;
            dBUpdate = new DBUpdate();
            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    exe.SpExecutes<UserMenu>("spRemoveExistingUserRights", model, false);
                    ReturnID = model.UserID;                  
                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = true;
                    scope.Complete();
                }
                catch (Exception ex)
                {
                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = false;
                    scope.Dispose();
                }
            }

            return dBUpdate;
        }
    }
}
