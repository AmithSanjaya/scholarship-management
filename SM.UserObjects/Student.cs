using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.UserObjects
{
    public class Student : User
    {
        public int StudentID { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public bool IsMale { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public int CountryID { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string NICNo { get; set; }
        public string Photo { get; set; }
        public string Grade { get; set; }
        public string SchoolName { get; set; }
        public string SchoolAddress { get; set; }
        public string HighestGradeInSchool { get; set; }
        public string HighestEduAchievement { get; set; }
        public int AchievementMon { get; set; }
        public int AchievementYear { get; set; }
        public DateTime RegisterDate { get; set; }
        public bool IsHaveOtherSchol { get; set; }
        public string NameOfFund { get; set; }
        public decimal FundAmount { get; set; }

        public List<StudentSubject> lstSubject { get; set; }

        public string FatherName { get; set; }
        public string FatherOccupation { get; set; }
        public decimal FatherIncomeAmount { get; set; }
        public string MotherName { get; set; }
        public string MotherOccupation { get; set; }
        public decimal MotherIncomeAmount { get; set; }
        public int NoOfBrothers { get; set; }
        public int NoOfSisters { get; set; }
        public decimal BrotherIncomeAmount { get; set; }
        public decimal SisterIncomeAmount { get; set; }
        public int Mode { get; set; }
    }

    public class StudentSubject
    {
        public int StudentID { get; set; }
        public int StudentExamTypeID { get; set; }
        public string Subject { get; set; }
        public int GradeID { get; set; }
    }

    public class StudentExamType
    {
        public int StudentExamTypeID { get; set; }
        public string ExamTypeName { get; set; }
    }

    public class SubjectGrade
    {
        public int GradeID { get; set; }
        public string GradeName { get; set; }
    }

    public class Country
    {
        public int CountryID { get; set; }
        public string CountryName { get; set; }
    }

    public class StudentVM : User
    {
        public int StudentID { get; set; }
        public string StudentName { get; set; }
        public string LastName { get; set; }
        public string Status { get; set; }
        public string GenderName { get; set; }
        public string ImageName { get; set; }
        public DateTime BirthDate { get; set; }
        public bool IsMale { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public int CountryID { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string NICNo { get; set; }
        public string Photo { get; set; }
        public string Grade { get; set; }
        public string SchoolName { get; set; }
        public string SchoolAddress { get; set; }
        public string HighestGradeInSchool { get; set; }
        public string HighestEduAchievement { get; set; }
        public int AchievementMon { get; set; }
        public int AchievementYear { get; set; }
        public DateTime RegisterDate { get; set; }
        public bool IsHaveOtherSchol { get; set; }
        public string NameOfFund { get; set; }
        public decimal FundAmount { get; set; }
        public string FatherName { get; set; }
        public string FatherOccupation { get; set; }
        public decimal FatherIncomeAmount { get; set; }
        public string MotherName { get; set; }
        public string MotherOccupation { get; set; }
        public decimal MotherIncomeAmount { get; set; }
        public int NoOfBrothers { get; set; }
        public int NoOfSisters { get; set; }
        public decimal BrotherIncomeAmount { get; set; }
        public decimal SisterIncomeAmount { get; set; }
        public int Mode { get; set; }
        public int StudentExamTypeID { get; set; }
        public string Subject { get; set; }
        public int GradeID { get; set; }
        public string ExamTypeName { get; set; }
        public string GradeName { get; set; }
        public string CountryName { get; set; }
        public int TypeID { get; set; }
        public int ViewTypeID { get; set; }
    }
}
