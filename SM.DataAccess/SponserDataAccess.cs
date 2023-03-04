using SM.UserObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace SM.DataAccess
{
    public class SponserDataAccess
    {
        private Execute exe;
        public DBUpdate dBUpdate;

        public SponserDataAccess()
        {
            exe = new Execute();
        }

        public List<PaymentScheme> PaymentSchemes(PaymentScheme model)
        {
            List<PaymentScheme> lstPaymentScheme = new List<PaymentScheme>();
            lstPaymentScheme = exe.SpExecutesSelect<PaymentScheme, PaymentScheme>("spGetPaymentSchemes", model, false);
            return lstPaymentScheme;
        }

        public DBUpdate UpdateSponser(Sponser model)
        {
            int ReturnID = 0;
            dBUpdate = new DBUpdate();

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    if (model.Mode == 1)
                    {
                        ReturnID = (int)exe.SpExecutesGetIdentity<Sponser>("spSaveSponser", model, false);
                    }
                    else if (model.Mode == 2)
                    {
                        ReturnID = model.SponserID;
                        exe.SpExecutes<Sponser>("spEditSponser", model, false);
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

        public List<SponserVM> SponsersData(SponserVM model)
        {
            List<SponserVM> lstSponserData = new List<SponserVM>();

            if (model.ViewTypeID == 1)
            {
                lstSponserData = exe.SpExecutesSelect<SponserVM, SponserVM>("spSponserData", model, false);
            }
            else if (model.ViewTypeID == 2)
            {
                lstSponserData = exe.SpExecutesSelect<SponserVM, SponserVM>("spSponserData", model, false);
            }

            return lstSponserData;
        }

        public DBUpdate DeleteSponser(Sponser model)
        {
            int ReturnID = 0;
            dBUpdate = new DBUpdate();

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    ReturnID = model.SponserID;
                    exe.SpExecutes<Sponser>("spDeleteSponser", model, false);

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
    }
}
