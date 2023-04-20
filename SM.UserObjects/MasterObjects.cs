using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.UserObjects
{
    public class MasterObjects
    {

    }

    public class EffectiveYears
    {
        public int Year { get; set; }
    }

    public class Currency
    {
        public int CurrencyID { get; set; }
        public string CurrencyName { get; set; }
    }

    public class Document : User
    {
        public int DocumentID { get; set; }
        public string DocumentTitle { get; set; }
        public string DocumentDescription { get; set; }
        public string Attachment { get; set; }
        public string AddedDateName { get; set; }
    }
}
