using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.UserObjects
{
    public class AjaxResponse
    {
        string _SucessMessage;
        string _ErrorMessage;

        public AjaxResponse()
        {
            IsValid = false;
        }

        public bool IsValid { get; set; }
        public string SucessMessage { get { return _SucessMessage; } set { IsValid = true; _SucessMessage = value; } }
        public string ErrorMessage { get { return _ErrorMessage; } set { IsValid = false; _ErrorMessage = value; } }

        public int ReturnID { get; set; }

    }
}
