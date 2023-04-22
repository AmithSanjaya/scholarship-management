using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.UserObjects
{
    public class Enums
    {
        public enum ReturnType
        {
            DataTable = 1,
            DataSet = 2,
            DataRow = 3
        }

        public enum ReportName
        {
            StudentDetailReport =1,
            PaymentDueSponserListReport = 2,
            StudentAnnualProgressReport = 3,
            StudentBankReport=4,
            StudentBankReportDownload=5
        }
    }
}
