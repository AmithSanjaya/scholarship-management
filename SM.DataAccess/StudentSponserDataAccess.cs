using SM.UserObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace SM.DataAccess
{
    public class StudentSponserDataAccess
    {
        private Execute exe;
        public DBUpdate dBUpdate;

        public StudentSponserDataAccess()
        {
            exe = new Execute();
        }

        public DBUpdate SaveSponserApplication(SponserStudent model)
        {
            int ReturnID = 0;
            dBUpdate = new DBUpdate();

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    ReturnID = model.lstStudents[0].SponserID;
                    foreach (SponserStudent obj in model.lstStudents)
                    {
                        exe.SpExecutes<SponserStudent>("spSaveSponserApplication", obj, false);
                    }

                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = true;

                    scope.Complete();
                }
                catch (Exception ex)
                {
                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = false;
                    scope.Dispose();
                }
            }

            return dBUpdate;
        }

        public List<SponserStudent> SponsersApplicationStudentData(SponserStudent model)
        {
            List<SponserStudent> lstSponserStudentData = new List<SponserStudent>();
            lstSponserStudentData = exe.SpExecutesSelect<SponserStudent, SponserStudent>("spSponserApplicationStudentData", model, false);
            return lstSponserStudentData;
        }

        public DBUpdate DeleteStudentFromSponserApplication(SponserStudent model)
        {
            int ReturnID = 0;
            dBUpdate = new DBUpdate();

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    ReturnID = model.SponserID;
                    exe.SpExecutes<SponserStudent>("spDeleteStudentFromSponserApplication", model, false);
                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = true;
                    scope.Complete();
                }
                catch (Exception ex)
                {
                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = false;
                    scope.Dispose();
                }
            }

            return dBUpdate;
        }

        public DBUpdate SaveSponserLinkedStudents(SponserStudent model)
        {
            int ReturnID = 0;
            dBUpdate = new DBUpdate();

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    ReturnID = model.lstStudents[0].SponserID;
                    foreach (SponserStudent obj in model.lstStudents)
                    {
                        exe.SpExecutes<SponserStudent>("spSaveSponserLinkedStudents", obj, false);
                    }

                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = true;

                    scope.Complete();
                }
                catch (Exception ex)
                {
                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = false;
                    scope.Dispose();
                }
            }

            return dBUpdate;
        }

        public DBUpdate DeleteStudentFromSponser(SponserStudent model)
        {
            int ReturnID = 0;
            dBUpdate = new DBUpdate();

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    ReturnID = model.SponserID;
                    exe.SpExecutes<SponserStudent>("spDeleteStudentFromSponser", model, false);
                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = true;
                    scope.Complete();
                }
                catch (Exception ex)
                {
                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = false;
                    scope.Dispose();
                }
            }

            return dBUpdate;
        }

        public List<SponserStudent> SponsersLinkedStudentData(SponserStudent model)
        {
            List<SponserStudent> lstSponserStudentData = new List<SponserStudent>();
            lstSponserStudentData = exe.SpExecutesSelect<SponserStudent, SponserStudent>("spSponserLinkedStudentData", model, false);
            return lstSponserStudentData;
        }

        public List<StudentVM> SponsersStudentData(SponserStudent model)
        {
            List<StudentVM> lstSponserStudentData = new List<StudentVM>();
            lstSponserStudentData = exe.SpExecutesSelect<StudentVM, SponserStudent>("spSponserLinkedStudentData", model, false);
            return lstSponserStudentData;
        }

        public List<SponserStudent> StudentDataofSponserLinked(SponserStudent model)
        {
            List<SponserStudent> lstSponserStudentData = new List<SponserStudent>();
            lstSponserStudentData = exe.SpExecutesSelect<SponserStudent, SponserStudent>("spStudentDataofSponserLinked", model, false);
            return lstSponserStudentData;
        }

        public List<SponserPaymentNotification> SponserPaymentNotification(SponserPaymentNotification model)
        {
            List<SponserPaymentNotification> lst = new List<SponserPaymentNotification>();
            lst = exe.SpExecutesSelect<SponserPaymentNotification, SponserPaymentNotification>("spGetSponsorsForNotification", model, false);
            return lst;
        }

        public DBUpdate SaveSponserPaymentNotification(SponserPaymentNotification model)
        {
            int ReturnID = 0;

            dBUpdate = new DBUpdate();
            SponserPaymentNotification modelVM = new SponserPaymentNotification();

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    foreach (SponserPaymentNotification obj in model.lstSponserPaymentNotification)
                    {
                        obj.Year = model.Year;
                        obj.Month = model.Month;
                        obj.EnteredBy = model.EnteredBy;

                        exe.SpExecutes<SponserPaymentNotification>("spSaveSponserPaymentNotification", obj, false);
                    }

                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = true;

                    scope.Complete();
                }
                catch (Exception ex)
                {
                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = false;
                    scope.Dispose();
                }
            }

            return dBUpdate;
        }

        public DBUpdate SaveSponserPaymentDetails(SponserStudentVM model)
        {
            int ReturnID = 0;

            dBUpdate = new DBUpdate();
            SponserStudentVM modelVM = new SponserStudentVM();

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    int PaymentHeaderID = (int)exe.SpExecutesGetIdentity<SponserStudentVM>("spSaveSponserPaymentHeader", model, false);

                    ReturnID = PaymentHeaderID;
                    foreach (SponserStudent obj in model.lstStudentSponser)
                    {
                        obj.SponserPaymentHeaderID = PaymentHeaderID;
                        exe.SpExecutes<SponserStudent>("spSaveSponserPayment", obj, false);
                    }

                    SponserStudentVM modelHeader = new SponserStudentVM();
                    modelHeader.SponserPaymentHeaderID = ReturnID;

                    exe.SpExecutes<SponserStudentVM>("spUpdateInvoicetoSponserPayment", modelHeader, false);

                    //Send Email
                    List<MailSendingAddress> lstEmailData = new List<MailSendingAddress>();
                    lstEmailData = exe.SpExecutesSelect<MailSendingAddress, SponserStudentVM>("spGetEmailSponserPayment", modelHeader, false);

                    MailSendingAddress modelEmail = new MailSendingAddress();
                    modelEmail.lstEmail = lstEmailData;

                    if (!new EmailDataAccess().SendEmail(modelEmail))
                    {
                        dBUpdate.ReturnID = ReturnID;
                        dBUpdate.Update = false;
                        scope.Dispose();
                    }

                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = true;

                    scope.Complete();
                }
                catch (Exception ex)
                {
                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = false;
                    scope.Dispose();
                }
            }

            return dBUpdate;
        }

        public DBUpdate DeleteStudentPaymentFromSponser(SponserStudent model)
        {
            int ReturnID = 0;
            dBUpdate = new DBUpdate();

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    ReturnID = model.SponserID;
                    exe.SpExecutes<SponserStudent>("spDeleteStudentPaymentFromSponser", model, false);
                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = true;
                    scope.Complete();
                }
                catch (Exception ex)
                {
                    dBUpdate.ReturnID = ReturnID;
                    dBUpdate.Update = false;
                    scope.Dispose();
                }
            }

            return dBUpdate;
        }

        public List<SponserRecievePayment> SponserPaymentInvoicesData(SponserRecievePayment model)
        {
            List<SponserRecievePayment> lst = new List<SponserRecievePayment>();
            lst = exe.SpExecutesSelect<SponserRecievePayment, SponserRecievePayment>("spSponserPaymentInvoicesData", model, false);
            return lst;
        }

        public List<SponserStudent> SponserPaidStudentByYearandMonth(SponserStudent model)
        {
            List<SponserStudent> lstSponserStudentData = new List<SponserStudent>();
            lstSponserStudentData = exe.SpExecutesSelect<SponserStudent, SponserStudent>("spSponserPaidStudentByYearandMonth", model, false);
            return lstSponserStudentData;
        }

        public List<SponserStudent> SponserPaidStudentHistoryData(SponserStudent model)
        {
            List<SponserStudent> lstSponserStudentData = new List<SponserStudent>();
            lstSponserStudentData = exe.SpExecutesSelect<SponserStudent, SponserStudent>("spSponserPaidStudentHistoryData", model, false);
            return lstSponserStudentData;
        }

        
    }
}
