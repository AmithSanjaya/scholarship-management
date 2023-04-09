using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.UserObjects
{
    public class SponserStudent : User
    {
        public int SponserPaymentHeaderID { get; set; }
        public int SponserStudentApplicationID { get; set; }
        public int SponserID { get; set; }
        public int StudentID { get; set; }
        public int PaymentSchemeID { get; set; }
        public string PaymentSchemeName { get; set; }
        public List<SponserStudent> lstStudents { get; set; }
        public string LinkedOn { get; set; }
        public decimal PaidAmount { get; set; }
        public string PaidDate { get; set; }
        public decimal DueAmount { get; set; }
        public string EffectivePeriod { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
    }

    public class SponserRecievePayment : User
    {
        public int SponserPaymentHeaderID { get; set; }
        public string InvoiceNo { get; set; }
        public string ReferenceNo { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string InvoiceDateName { get; set; }
        public int SponserID { get; set; }
        public int CurrencyID { get; set; }
        public int PayTypeID { get; set; }
        public string CurrencyName { get; set; }
        public string PayTypeName { get; set; }
        public string SponserName { get; set; }
        public decimal PaidAmount { get; set; }
        public string PaidAmountName { get; set; }
        public string InvoiceEmail { get; set; }
    }

    public class SponserStudentVM : User
    {
        public int SponserPaymentID { get; set; }
        public int SponserID { get; set; }
        public int SponserPaymentHeaderID { get; set; }
        public string InvoiceNo { get; set; }
        public string ReferenceNo { get; set; }
        public DateTime InvoiceDate { get; set; }
        public int CurrencyID { get; set; }
        public int PayTypeID { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal DueAmount { get; set; }
        public List<SponserStudent> lstStudentSponser { get; set; }
        public string InvoiceEmail { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public string EffectivePeriod { get; set; }
    }

    public class PayType
    {
        public int PayTypeID { get; set; }
        public string PayTypeName { get; set; }
    }
}
