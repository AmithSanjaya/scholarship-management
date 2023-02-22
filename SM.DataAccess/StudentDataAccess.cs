using SM.UserObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace SM.DataAccess
{
    public class StudentDataAccess
    {
        private Execute exe;

        public StudentDataAccess()
        {
            exe = new Execute();
        }

        public bool UpdateStudent(Student model)
        {
            bool Update = false;

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    if (model.Mode == 1)
                    {
                        exe.SpExecutes<Student>("", model, false);
                    }

                    Update = true;
                    scope.Complete();
                }
                catch (Exception ex)
                {
                    Update = false;
                    scope.Dispose();
                }
            }

            return Update;
        }
    }
}
