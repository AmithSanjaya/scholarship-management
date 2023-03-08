using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.UserObjects
{
    public class FormValidate
    {
        public int MenuID { get; set; }
        public string RequiredTypeID { get; set; }
        public string FieldName { get; set; }
        public string Message { get; set; }
    }

    public class FormDBValidate
    {
        public int MenuID { get; set; }
        public string TypeID { get; set; }
        public string FieldName { get; set; }
        public string DBFieldName { get; set; }
        public string Message { get; set; }
    }
}
