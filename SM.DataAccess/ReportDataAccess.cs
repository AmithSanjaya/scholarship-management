using SM.UserObjects;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.DataAccess
{
    public class ReportDataAccess
    {
        private Execute exe;
        public DBUpdate dBUpdate;
        DataTable dt;

        public ReportDataAccess()
        {
            exe = new Execute();
        }

        public DataTable StudentDetailReport(StudentReport model)
        {
            dt = exe.SpExecutesSelectDatatable<StudentReport>("spStudentReport", model, false);
            return dt;
        }

        public DataTable StudentBankReport(StudentBankReport model)
        {
            dt = exe.SpExecutesSelectDatatable<StudentBankReport>("spStudentPaymentBankProcess", model, false);
            return dt;
        }
    }
}
