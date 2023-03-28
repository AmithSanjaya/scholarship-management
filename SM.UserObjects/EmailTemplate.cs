using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.UserObjects
{
    public class EmailTemplate : User
    {
        public int EmailTemplateID { get; set; }
        public string EmailTypeName { get; set; }
        public string EmailSubject { get; set; }
        public string EmailBody { get; set; }
        public int Mode { get; set; }
    }
}
