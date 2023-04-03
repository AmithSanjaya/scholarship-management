using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.UserObjects
{
    public class SponserStudent : User
    {
        public int SponserStudentApplicationID { get; set; }
        public int SponserID { get; set; }
        public int StudentID { get; set; }
        public int PaymentSchemeID { get; set; }
        public string PaymentSchemeName { get; set; }
        public List<SponserStudent> lstStudents { get; set; }
        public string LinkedOn { get; set; }
        public decimal PaidAmount { get; set; }
        public string PaidDate { get; set; }
        public string EffectiveMonth { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
    }

    public class SponserRecievePayment : User
    {
        public int SponserPaymentHeaderID { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string InvoiceDateName { get; set; }
        public int SponserID { get; set; }
        public int CurrencyID { get; set; }
        public string CurrencyName { get; set; }
        public string SponserName { get; set; }
        public decimal PaidAmount { get; set; }
        public string PaidAmountName { get; set; }
        public string InvoiceEmail { get; set; }
    }
}
