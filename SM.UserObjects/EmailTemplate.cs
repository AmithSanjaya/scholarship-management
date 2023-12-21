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

    public class EmailConfig
    {
        public int EmaiConfigID { get; set; }
        public string EmailUserName { get; set; }
        public string FromEmailAddress { get; set; }
        public string Emailpassword { get; set; }
        public string SMTPClient { get; set; }
        public int PortNo { get; set; }
    }

    public class MailSendingAddress
    {
        public int SendTypeID { get; set; }
        public string EmailAddress { get; set; }
        public string EmailSubject { get; set; }
        public string EmailBody { get; set; }
        public List<MailSendingAddress> lstEmail { get; set; }
    }
}
