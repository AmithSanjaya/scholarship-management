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
        public DBUpdate dBUpdate;

        public StudentDataAccess()
        {
            exe = new Execute();
        }

        public List<StudentExamType> StudentExamType(StudentExamType model)
        {
            List<StudentExamType> lstExamType = new List<StudentExamType>();
            lstExamType = exe.SpExecutesSelect<StudentExamType, StudentExamType>("spStudentExamType", model, false);

            return lstExamType;
        }

        public List<Country> Country(Country model)
        {
            List<Country> lstCountry = new List<Country>();
            lstCountry = exe.SpExecutesSelect<Country, Country>("spStudentCountry", model, false);

            return lstCountry;
        }

        public List<SubjectGrade> SubjectGrade(SubjectGrade model)
        {
            List<SubjectGrade> lstGrade = new List<SubjectGrade>();
            lstGrade = exe.SpExecutesSelect<SubjectGrade, SubjectGrade>("spSubjectGrade", model, false);

            return lstGrade;
        }

        public DBUpdate UpdateStudent(Student model)
        {
            int ReturnID = 0;
            dBUpdate = new DBUpdate();

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    if (model.Mode == 1)
                    {
                        ReturnID = (int)exe.SpExecutesGetIdentity<Student>("spSaveStudent", model, false);

                        if (model.lstSubject.Count > 0)
                        {
                            foreach (var item in model.lstSubject)
                            {
                                StudentSubject submodel = new StudentSubject();
                                submodel.StudentID = ReturnID;
                                submodel.StudentExamTypeID = item.StudentExamTypeID;
                                submodel.Subject = item.Subject;
                                submodel.GradeID = item.GradeID;

                                exe.SpExecutes<StudentSubject>("spSaveStudentSubject", submodel, false);
                            }
                        }
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

        public List<StudentVM> StudentData(StudentVM model)
        {
            List<StudentVM> lstStudentData = new List<StudentVM>();

            if (model.ViewTypeID == 1)
            {
                lstStudentData = exe.SpExecutesSelect<StudentVM, StudentVM>("spStudentData", model, false);
            }
            else if (model.ViewTypeID == 2)
            {
                lstStudentData = exe.SpExecutesSelect<StudentVM, StudentVM>("spStudentAllData", model, false);
            }

            return lstStudentData;
        }
    }
}
