using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.DataAccess
{
    public class DBConnection
    {
        public static SqlConnection ERP;

        public static SqlConnection OpenConnectiion()
        {
            ERP = null;
            if (ERP == null)
                ERP = new SqlConnection(ConfigurationManager.ConnectionStrings["SM"].ConnectionString);
            if (ERP.State == ConnectionState.Closed)
                ERP.Open();
            else
                ERP.Close();
            return ERP;
        }
    }
}
