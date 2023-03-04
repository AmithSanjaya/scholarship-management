using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.UserObjects
{
    public class Sponser : User
    {
        public int SponserID { get; set; }
        public string SponserName { get; set; }
        public string SponserAddress { get; set; }
        public string Email { get; set; }
        public string ContactNo { get; set; }
        public int PaymentSchemeID { get; set; }
        public int CountryID { get; set; }
        public int Mode { get; set; }
        public int ViewTypeID { get; set; }
        public string Status { get; set; }
    }

    public class SponserVM : User
    {
        public int SponserID { get; set; }
        public string SponserName { get; set; }
        public string SponserAddress { get; set; }
        public string Email { get; set; }
        public string ContactNo { get; set; }
        public int PaymentSchemeID { get; set; }
        public string PaymentSchemeName { get; set; }
        public int CountryID { get; set; }
        public string CountryName { get; set; }
        public int Mode { get; set; }
        public int ViewTypeID { get; set; }
        public int TypeID { get; set; }
        public string Status { get; set; }
    }
}


