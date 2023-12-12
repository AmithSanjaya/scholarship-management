using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

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
        public string SubHeading { get; set; }
    }

    public class StudentBankReport
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public string SubHeading { get; set; }
    }

    public class StudentPaymentReport
    {
        public int SponserID { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public string SubHeading { get; set; }
    }

    public class PaymentDueSponserListReport
    {
        public string SponserName { get; set; }
        public string Country { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string ContactNo { get; set; }
        public string PaymentScheme { get; set; }
        public decimal DueAmount { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime LastPaidDate { get; set; }
        public string SubHeading { get; set; }
    }

    public class StudentAnnualProgressReport
    {
        public string StudentName { get; set; }
        public string SponserName { get; set; }
        public string Country { get; set; }
        public string District { get; set; }
        public string Address { get; set; }
        public string School { get; set; }
        public string ContactNo { get; set; }        
        public DateTime LastSubmissionDate { get; set; }
        public DateTime NextSubmissionDate { get; set; }
        public string SubHeading { get; set; }
    }
}
