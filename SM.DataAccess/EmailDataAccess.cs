using SM.UserObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using static SM.UserObjects.Enums;

namespace SM.DataAccess
{
    public class EmailDataAccess
    {
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

                SmtpClient smtpClient = new SmtpClient(model.SMTPClient, 465);               
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                NetworkCredential basicCredential = new NetworkCredential(model.EmailUserName, model.Emailpassword);
                smtpClient.UseDefaultCredentials = false;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                ServicePointManager.ServerCertificateValidationCallback = delegate (object s, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) { return true; };


                smtpClient.Credentials = basicCredential;               
                smtpClient.EnableSsl = true;
                

                MailMessage mailMessage = new MailMessage();
                mailMessage.Subject = Emailmodel.lstEmail[0].EmailSubject;
                mailMessage.Body = "TEST";
                mailMessage.From = new MailAddress(model.FromEmailAddress, "Lak Saviya Foundation");

                foreach (MailSendingAddress emailAddress in Emailmodel.lstEmail)
                {
                    if (emailAddress.SendTypeID == Convert.ToInt32(MailSendTypeID.To))
                        mailMessage.To.Add(emailAddress.EmailAddress);
                    else if (emailAddress.SendTypeID == Convert.ToInt32(MailSendTypeID.CC))
                        mailMessage.CC.Add(emailAddress.EmailAddress);
                    else if (emailAddress.SendTypeID == Convert.ToInt32(MailSendTypeID.BCC))
                        mailMessage.Bcc.Add(emailAddress.EmailAddress);

                    
                    
                }
               
                mailMessage.IsBodyHtml = true;
               
                smtpClient.Send(mailMessage);   

     
                

                //System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                //ServicePointManager.ServerCertificateValidationCallback = delegate (object s, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) { return true; };

              

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
