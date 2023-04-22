﻿using SM.UserObjects;
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

        public List<Distict> District(Distict model)
        {
            List<Distict> lst = new List<Distict>();
            lst = exe.SpExecutesSelect<Distict, Distict>("spStudentDistrict", model, false);

            return lst;
        }

        public List<Religion> Religion(Religion model)
        {
            List<Religion> lst = new List<Religion>();
            lst = exe.SpExecutesSelect<Religion, Religion>("spStudentReligion", model, false);

            return lst;
        }

        public List<Race> Race(Race model)
        {
            List<Race> lst = new List<Race>();
            lst = exe.SpExecutesSelect<Race, Race>("spStudentRace", model, false);

            return lst;
        }

        public List<BankBranch> BankBranch(BankBranch model)
        {
            List<BankBranch> lst = new List<BankBranch>();
            lst = exe.SpExecutesSelect<BankBranch, BankBranch>("spStudentBankBranch", model, false);

            return lst;
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
                    }
                    else if(model.Mode == 2)
                    {
                        ReturnID = model.StudentID;
                        exe.SpExecutes<Student>("spUpdateStudent", model, false);
                    }

                    if (model.lstSubject != null)
                    {
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
            else if (model.ViewTypeID == 10)
            {
                lstStudentData = exe.SpExecutesSelect<StudentVM, StudentVM>("spStudentPendingProgressData", model, false);
            }

            return lstStudentData;
        }

        public List<FormValidate> ValidateStudent(StudentVM model)
        {
            List<FormValidate> lst = new List<FormValidate>();

            lst = exe.SpExecutesSelect<FormValidate, StudentVM>("spValidateStudent", model, false);

            return lst;
        }

        public List<StudentVM> SponserNotLinkedStudentData(StudentVM model)
        {
            List<StudentVM> lstStudentData = new List<StudentVM>();
            lstStudentData = exe.SpExecutesSelect<StudentVM, StudentVM>("spSponserNotLinkedStudentData", model, false);
            return lstStudentData;
        }

        public List<StudentAchievementVM> StudentAchievementData(StudentAchievementVM model)
        {
            List<StudentAchievementVM> lst = new List<StudentAchievementVM>();

            lst = exe.SpExecutesSelect<StudentAchievementVM, StudentAchievementVM>("spStudentAchievementData", model, false);

            return lst;
        }

        public DBUpdate SaveStudentAchievements(StudentAchievement model)
        {
            int ReturnID = 0;
            dBUpdate = new DBUpdate();

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    StudentAchievement studentAchievement = new StudentAchievement();
                    studentAchievement = model.lstStudentAchievements[0];
                    exe.SpExecutes<StudentAchievement>("spInActiveStudentAchievementsBeforeSave", studentAchievement, false);  

                    ReturnID = model.lstStudentAchievements[0].StudentID;
                    foreach (StudentAchievement obj in model.lstStudentAchievements)
                    {
                        exe.SpExecutes<StudentAchievement>("spSaveStudentAchievements", obj, false);
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

        public List<StudentProgress> StudentProgressData(StudentProgress model)
        {
            List<StudentProgress> lst = new List<StudentProgress>();
            lst = exe.SpExecutesSelect<StudentProgress, StudentProgress>("spStudentProgressData", model, false);
            return lst;
        }

        public DBUpdate SaveStudentProgress(StudentProgress model)
        {
            dBUpdate = new DBUpdate();

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    exe.SpExecutes<StudentProgress>("spSaveStudentProgress", model, false);

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

        public DBUpdate SaveStudentProgressNotification(StudentProgressNotification model)
        {
            dBUpdate = new DBUpdate();

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    foreach (StudentProgressNotification obj in model.lstStudentProgressNotification)
                    {
                        obj.EnteredBy = model.EnteredBy;
                        exe.SpExecutes<StudentProgressNotification>("spSaveStudentProgressNotification", obj, false);
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

        public DBUpdate SaveStudentPaymentDetails(StudentPaymentVM model)
        {
            int ReturnID = 0;

            dBUpdate = new DBUpdate();
            SponserStudentVM modelVM = new SponserStudentVM();

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, new System.TimeSpan(0, 15, 0)))
            {
                try
                {
                    exe.SpExecutes<StudentPaymentVM>("spUpdateStudentPayment", model, false);

                    foreach (StudentPaymentVM obj in model.lstStudentPay)
                    {
                        obj.EnteredBy = model.EnteredBy;
                        obj.Year = model.Year;
                        obj.Month = model.Month;
                        exe.SpExecutes<StudentPaymentVM>("spSaveStudentPayment", obj, false);
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

        public List<StudentPaymentVM> StudentPaymentData(StudentPaymentVM model)
        {
            List<StudentPaymentVM> lst = new List<StudentPaymentVM>();
            lst = exe.SpExecutesSelect<StudentPaymentVM, StudentPaymentVM>("spStudentPaymentData", model, false);
            return lst;
        }
    }
}
