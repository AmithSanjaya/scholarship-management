using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using static SM.UserObjects.Enums;

namespace SM.DataAccess
{
    public class Execute
    {
        #region Private Varibles

        private SqlCommand SqlCmd;

        #endregion

        public List<T> SpExecutesSelect<T, M>(string cmdText, M paramn, bool ignoreModelParrameterCase) where T : new()
        {
            DataSet ds = new DataSet();
            SqlDataAdapter ad = new SqlDataAdapter();
            SqlCmd = new SqlCommand();
            SqlConnection conn = null;
            try
            {
                conn = DBConnection.OpenConnectiion();
                SqlCmd.Connection = conn;
                SqlCmd.CommandText = cmdText;
                SqlCmd.CommandType = CommandType.StoredProcedure;
                SqlCmd.CommandTimeout = 10000;

                if (SqlCmd.Connection.State != ConnectionState.Open)
                    return null;

                SqlCommandBuilder.DeriveParameters(SqlCmd);
                PropertyInfo[] Props = typeof(M).GetProperties(BindingFlags.Public | BindingFlags.Instance);

                foreach (SqlParameter prr in SqlCmd.Parameters)
                {
                    bool found = false;
                    if (prr.ParameterName.ToUpper() == "@RETURN_VALUE")
                        continue;
                    for (int i = 0; i < Props.Length && !found; i++)
                    {
                        string prName = "@" + Props[i].Name;

                        if (ignoreModelParrameterCase)
                        {
                            if (prr.ParameterName.ToUpper() == prName.ToUpper())
                            {
                                prr.Value = Props[i].GetValue(paramn, null);
                                found = true;
                            }
                        }
                        else
                        {
                            if (prr.ParameterName == prName)
                            {
                                PropertyInfo px = Props[i];
                                prr.Value = Props[i].GetValue(paramn, null);
                                found = true;
                            }
                        }
                    }
                }
                ad = new SqlDataAdapter(SqlCmd);
                ad.Fill(ds);
                ad.Dispose();
                conn.Close();
                List<T> list = new List<T>();

                DataTable datatable = ds.Tables[0];
                List<string> columnsNames = new List<string>();

                foreach (DataColumn DataColumn in datatable.Columns)
                    columnsNames.Add(DataColumn.ColumnName);

                list = datatable.AsEnumerable().ToList().ConvertAll<T>(row => GetObject<T>(row, columnsNames));

                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (conn != null && conn.State == ConnectionState.Open)
                    conn.Close();
                if (conn != null)
                    conn.Dispose();
                SqlCmd = null;
            }
        }

        public void SpExecutes<M>(string cmdText, M paramn, bool ignoreModelParrameterCase)
        {
            DataSet ds = new DataSet();
            SqlDataAdapter ad = new SqlDataAdapter();
            SqlCmd = new SqlCommand();
            SqlConnection conn = null;
            try
            {
                conn = DBConnection.OpenConnectiion();
                SqlCmd.Connection = conn;
                SqlCmd.CommandText = cmdText;
                SqlCmd.CommandType = CommandType.StoredProcedure;
                SqlCmd.CommandTimeout = 20000;

                SqlCommandBuilder.DeriveParameters(SqlCmd);
                PropertyInfo[] Props = typeof(M).GetProperties(BindingFlags.Public | BindingFlags.Instance);

                foreach (SqlParameter prr in SqlCmd.Parameters)
                {
                    bool found = false;
                    if (prr.ParameterName.ToUpper() == "@RETURN_VALUE")
                        continue;
                    for (int i = 0; i < Props.Length && !found; i++)
                    {
                        string prName = "@" + Props[i].Name;
                        if (ignoreModelParrameterCase)
                        {
                            if (prr.ParameterName.ToUpper() == prName.ToUpper())
                            {
                                prr.Value = Props[i].GetValue(paramn, null);
                                if (prr.Value == null)
                                {
                                    prr.Value = DBNull.Value;
                                }
                                found = true;
                            }
                        }
                        else
                        {
                            if (prr.ParameterName == prName)
                            {
                                prr.Value = Props[i].GetValue(paramn, null);
                                if (prr.Value == null)
                                {
                                    prr.Value = DBNull.Value;
                                }
                                found = true;
                            }
                        }
                    }
                }
                ad = new SqlDataAdapter(SqlCmd);
                ad.Fill(ds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (conn != null && conn.State == ConnectionState.Open)
                    conn.Close();
                if (conn != null)
                    conn.Dispose();
                SqlCmd = null;
            }
        }

        public int SpExecutesGetIdentity<M>(string cmdText, M paramn, bool ignoreModelParrameterCase)
        {
            DataSet ds = new DataSet();
            SqlDataAdapter ad = new SqlDataAdapter();
            SqlCmd = new SqlCommand();
            SqlConnection conn = null;
            int id = 0;

            try
            {
                conn = DBConnection.OpenConnectiion();
                SqlCmd.Connection = conn;
                SqlCmd.CommandText = cmdText;
                SqlCmd.CommandType = CommandType.StoredProcedure;
                SqlCmd.CommandTimeout = 20000;

                SqlCommandBuilder.DeriveParameters(SqlCmd);
                PropertyInfo[] Props = typeof(M).GetProperties(BindingFlags.Public | BindingFlags.Instance);

                foreach (SqlParameter prr in SqlCmd.Parameters)
                {
                    bool found = false;
                    if (prr.ParameterName.ToUpper() == "@RETURN_VALUE")
                        continue;
                    for (int i = 0; i < Props.Length && !found; i++)
                    {
                        string prName = "@" + Props[i].Name;
                        if (ignoreModelParrameterCase)
                        {
                            if (prr.ParameterName.ToUpper() == prName.ToUpper())
                            {
                                prr.Value = Props[i].GetValue(paramn, null);
                                if (prr.Value == null)
                                {
                                    prr.Value = DBNull.Value;
                                }
                                found = true;
                            }
                        }
                        else
                        {
                            if (prr.ParameterName == prName)
                            {
                                prr.Value = Props[i].GetValue(paramn, null);
                                if (prr.Value == null)
                                {
                                    prr.Value = DBNull.Value;
                                }
                                found = true;
                            }
                        }
                    }
                }
                ad = new SqlDataAdapter(SqlCmd);
                ad.Fill(ds);
                id = Convert.ToInt32(ds.Tables[0].Rows[0][0]);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (conn != null && conn.State == ConnectionState.Open)
                    conn.Close();
                if (conn != null)
                    conn.Dispose();
                SqlCmd = null;
            }
            return id;
        }

        private T GetObject<T>(DataRow row, List<string> columnsName) where T : new()
        {
            T obj = new T();
            try
            {
                string columnname = "";
                string value = "";
                PropertyInfo[] Properties;
                Properties = typeof(T).GetProperties();
                foreach (PropertyInfo objProperty in Properties)
                {
                    columnname = columnsName.Find(name => name.ToLower().Trim() == objProperty.Name.ToLower().Trim());

                    if (!string.IsNullOrEmpty(columnname))
                    {
                        if (objProperty.PropertyType.FullName.ToUpper().Contains("BYTE[]"))
                        {
                            byte[] a = (byte[])row[columnname];
                            objProperty.SetValue(obj, a);
                        }
                        else
                        {
                            value = row[columnname].ToString();
                            if (!string.IsNullOrEmpty(value))
                            {
                                if (Nullable.GetUnderlyingType(objProperty.PropertyType) != null)
                                {
                                    value = row[columnname].ToString().Replace("$", "").Replace(",", "");
                                    objProperty.SetValue(obj, Convert.ChangeType(value, Type.GetType(Nullable.GetUnderlyingType(objProperty.PropertyType).ToString())), null);
                                }
                                else
                                {
                                    value = row[columnname].ToString().Replace("%", "");
                                    objProperty.SetValue(obj, Convert.ChangeType(value, Type.GetType(objProperty.PropertyType.ToString())), null);
                                }
                            }
                        }

                    }
                }
                return obj;
            }
            catch { return obj; }
        }

        public object SpExecutesSelectNew<T, M>(string cmdText, M paramn, bool ignoreModelParrameterCase, ReturnType returnType) where T : new()
        {
            Object objValue = new object();
            DataSet ds = new DataSet();
            SqlDataAdapter ad = new SqlDataAdapter();
            SqlCmd = new SqlCommand();
            SqlConnection conn = null;
            try
            {
                conn = DBConnection.OpenConnectiion();
                SqlCmd.Connection = conn;
                SqlCmd.CommandText = cmdText;
                SqlCmd.CommandType = CommandType.StoredProcedure;
                SqlCmd.CommandTimeout = 10000;

                if (SqlCmd.Connection.State != ConnectionState.Open)
                    return null;

                SqlCommandBuilder.DeriveParameters(SqlCmd);
                PropertyInfo[] Props = typeof(M).GetProperties(BindingFlags.Public | BindingFlags.Instance);

                foreach (SqlParameter prr in SqlCmd.Parameters)
                {
                    bool found = false;
                    if (prr.ParameterName.ToUpper() == "@RETURN_VALUE")
                        continue;
                    for (int i = 0; i < Props.Length && !found; i++)
                    {
                        string prName = "@" + Props[i].Name;

                        if (ignoreModelParrameterCase)
                        {
                            if (prr.ParameterName.ToUpper() == prName.ToUpper())
                            {
                                prr.Value = Props[i].GetValue(paramn, null);
                                found = true;
                            }
                        }
                        else
                        {
                            if (prr.ParameterName == prName)
                            {
                                PropertyInfo px = Props[i];
                                prr.Value = Props[i].GetValue(paramn, null);
                                found = true;
                            }
                        }
                    }
                }
                ad = new SqlDataAdapter(SqlCmd);
                ad.Fill(ds);
                ad.Dispose();
                conn.Close();
                List<T> list = new List<T>();

                DataTable datatable = ds.Tables[0];

                switch (returnType)
                {
                    case (ReturnType.DataTable):
                        {
                            objValue = datatable;
                        }
                        break;

                    case (ReturnType.DataSet):
                        {
                            objValue = ds;
                        }
                        break;

                    case (ReturnType.DataRow):
                        {
                            objValue = datatable.Rows.Count == 0 ? null : datatable.Rows[0];
                        }
                        break;
                }

                return objValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (conn != null && conn.State == ConnectionState.Open)
                    conn.Close();
                if (conn != null)
                    conn.Dispose();
                SqlCmd = null;
            }
        }


        public DataTable SpEXecuteSelectQuery(string query, List<SqlParameter> Params, CommandType cmdType)
        {
            DataSet ds = new DataSet();
            SqlDataAdapter ad = new SqlDataAdapter();
            SqlCmd = new SqlCommand();
            SqlConnection conn = null;
            try
            {

                conn = DBConnection.OpenConnectiion();
                SqlCmd.Connection = conn;
                SqlCmd.CommandText = query;
                SqlCmd.CommandType = cmdType;
                SqlCmd.CommandTimeout = 20000;
                SqlCmd.Parameters.AddRange(Params.ToArray());
                ad = new SqlDataAdapter(SqlCmd);
                ad.Fill(ds);
                return ds.Tables[0];
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (conn != null && conn.State == ConnectionState.Open)
                    conn.Close();
                if (conn != null)
                    conn.Dispose();
                SqlCmd = null;
            }


        }
    }
}
