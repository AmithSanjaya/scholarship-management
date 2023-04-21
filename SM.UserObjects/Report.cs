using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.UserObjects
{
    public class ReportVM
    {
        public string ParameterName { get; set; }
        public string ParameterValue { get; set; }
        public DataTable dt { get; set; }
    }

    public class StudentReport
    {
        public int StudentID { get; set; }
        public int CountryID { get; set; }
        public int DistrictID { get; set; }
    }
}
