using SM.UserObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using static SM.UserObjects.Enums;

namespace SM.DataAccess
{
    public class EmailDataAccess
    {
        private Execute exe;

        public bool SendEmail(MailSendingAddress Emailmodel)
        {
            try
            {
                EmailConfig model = new EmailConfig();

                List<EmailConfig> lstEmailConfig = new List<EmailConfig>();
                lstEmailConfig = new Execute().SpExecutesSelect<EmailConfig, EmailConfig>("spEmailConfig", model, false);

                foreach (var item in lstEmailConfig)
                {
                    model.EmailUserName = item.EmailUserName;
                    model.FromEmailAddress = item.FromEmailAddress;
                    model.Emailpassword = item.Emailpassword;
                    model.SMTPClient = item.SMTPClient;
                }

                SmtpClient smtpClient = new SmtpClient(model.SMTPClient);
                smtpClient.Port = 587;
                smtpClient.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.EnableSsl = true;
                smtpClient.Credentials = new System.Net.NetworkCredential(model.EmailUserName, model.Emailpassword);
                MailMessage mailMessage = new MailMessage();

                foreach (MailSendingAddress emailAddress in Emailmodel.lstEmail)
                {
                    if (emailAddress.SendTypeID == Convert.ToInt32(MailSendTypeID.To))
                        mailMessage.To.Add(emailAddress.EmailAddress);
                    else if (emailAddress.SendTypeID == Convert.ToInt32(MailSendTypeID.CC))
                        mailMessage.CC.Add(emailAddress.EmailAddress);
                    else if (emailAddress.SendTypeID == Convert.ToInt32(MailSendTypeID.BCC))
                        mailMessage.Bcc.Add(emailAddress.EmailAddress);

                    mailMessage.Subject = emailAddress.EmailSubject;
                    mailMessage.Body = emailAddress.EmailBody;
                }
               
                mailMessage.IsBodyHtml = true;
                mailMessage.From = new MailAddress(model.FromEmailAddress);
                smtpClient.Send(mailMessage);

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
