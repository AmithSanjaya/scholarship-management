using SM.UserObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace SM.DataAccess
{
    public class MasterDataAccess
    {
        private Execute exe;
        public DBUpdate dBUpdate;

        public MasterDataAccess()
        {
            exe = new Execute();
        }

        public List<Currency> Currency(Currency model)
        {
            List<Currency> lst = new List<Currency>();
            lst = exe.SpExecutesSelect<Currency, Currency>("spGetCurrency", model, false);
            return lst;
        }

        public List<PayType> PayType(PayType model)
        {
            List<PayType> lst = new List<PayType>();
            lst = exe.SpExecutesSelect<PayType, PayType>("spGetPayType", model, false);
            return lst;
        }

        #region Email Templete
        public List<EmailTemplate> EmailTemplateDetail(EmailTemplate model)
        {
            List<EmailTemplate> lst = new List<EmailTemplate>();

            lst = exe.SpExecutesSelect<EmailTemplate, EmailTemplate>("spEmailTemplateDetail", model, false);

            return lst;
        }

        public DBUpdate UpdateEmailTemplate(EmailTemplate model)
        {
            dBUpdate = new DBUpdate();

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    if (model.Mode == 1)
                    {
                        exe.SpExecutes<EmailTemplate>("spSaveEmailTemplate", model, false);
                    }
                    else if (model.Mode == 2)
                    {
                        exe.SpExecutes<EmailTemplate>("spEditEmailTemplate", model, false);
                    }

                    dBUpdate.Update = true;

                    scope.Complete();
                }
                catch (Exception ex)
                {
                    dBUpdate.Update = false;
                    scope.Dispose();
                }
            }

            return dBUpdate;
        }
        #endregion
    }
}
