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
    }
}
