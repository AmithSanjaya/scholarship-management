﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.UserObjects
{
    public class Student : User
    {
        public int StudentID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
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

        public int DistictID { get; set; }
        public int RaceID { get; set; }
        public int ReligionID { get; set; }
        public int Age { get; set; }
        public string PollingDivision { get; set; }
        public string DivisionalSecretariatDivision { get; set; }
        public decimal DistancetoSchool { get; set; }
        public string ParentsAlive { get; set; }
        public int NoOfBrothersStudying { get; set; }
        public int NoOfSistersStudying { get; set; }
        public bool AreAnyBrotherEmployed { get; set; }
        public bool AreAnySisterEmployed { get; set; }
        public bool Photographpublished { get; set; }
        public string AccountName { get; set; }
        public int BankBranchID { get; set; }
        public string AccountNo { get; set; }

        public string DescribeWhyScholarship { get; set; }
        public string DescribeScholarshipFund { get; set; }
        public string DescribeFutureIntend { get; set; }

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
        public bool bIsActive { get; set; }
        public string InactiveReason { get; set; }
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

    public class Distict
    {
        public int DistictID { get; set; }
        public string DistrictName { get; set; }
    }

    public class Religion
    {
        public int ReligionID { get; set; }
        public string ReligionName { get; set; }
    }

    public class Race
    {
        public int RaceID { get; set; }
        public string RaceName { get; set; }
    }

    public class BankBranch
    {
        public int BankBranchID { get; set; }
        public string BankCode { get; set; }
        public string BranchCode { get; set; }
        public string BankName { get; set; }
        public string BranchName { get; set; }
        public string BankBranchName { get; set; }
    }

    public class StudentVM : User
    {
        public int StudentID { get; set; }
        public string StudentName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Status { get; set; }
        public string GenderName { get; set; }
        public string ImageName { get; set; }
        public DateTime BirthDate { get; set; }
        public bool IsMale { get; set; }
        public string Address { get; set; }
        public int DistictID { get; set; }
        public int CountryID { get; set; }
        public int RaceID { get; set; }
        public int ReligionID { get; set; }
        public int Age { get; set; }
        public string PollingDivision { get; set; }
        public string DivisionalSecretariatDivision { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string NICNo { get; set; }
        public string Photo { get; set; }
        public string Grade { get; set; }
        public string SchoolName { get; set; }
        public string SchoolAddress { get; set; }
        public decimal DistancetoSchool { get; set; }
        public string HighestGradeInSchool { get; set; }
        public string HighestEduAchievement { get; set; }
        public int AchievementMon { get; set; }
        public int AchievementYear { get; set; }
        public string AchievementYearMonth { get; set; }
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
        public string ParentsAlive { get; set; }

        public int NoOfBrothers { get; set; }
        public int NoOfSisters { get; set; }
        public int NoOfBrothersStudying { get; set; }
        public int NoOfSistersStudying { get; set; }
        public bool AreAnyBrotherEmployed { get; set; }
        public bool AreAnySisterEmployed { get; set; }
        public decimal BrotherIncomeAmount { get; set; }
        public decimal SisterIncomeAmount { get; set; }
        public int Mode { get; set; }
        public int StudentExamTypeID { get; set; }
        public string Subject { get; set; }
        public int GradeID { get; set; }
        public string ExamTypeName { get; set; }
        public string GradeName { get; set; }
        public string CountryName { get; set; }
        public string DistrictName { get; set; }
        public string BankBranchName { get; set; }
        public string ReligionName { get; set; }
        public string RaceName { get; set; }
        public int TypeID { get; set; }
        public int ViewTypeID { get; set; }
        public string HaveOtherSchol { get; set; }
        public string DateOfBirth { get; set; }
        public string RegisterFullDate { get; set; }
        public string CurrentDate { get; set; }
        public bool bIsActive { get; set; }
        public string InactiveReason { get; set; }

        public bool Photographpublished { get; set; }
        public string AccountName { get; set; }
        public int BankBranchID { get; set; }
        public string AccountNo { get; set; }

        public string DescribeWhyScholarship { get; set; }
        public string DescribeScholarshipFund { get; set; }
        public string DescribeFutureIntend { get; set; }

        public decimal PaidAmount { get; set; }
        public decimal DueAmount { get; set; }
        public int BeforeDays { get; set; }
        public int ProgressSend { get; set; }
        public int ProgressNotification { get; set; }
        public int ProgressYear { get; set; }

        public int ViewMode { get; set; }
    }

    public class StudentAchievement : User
    {
        public int StudentAchievementID { get; set; }
        public int StudentID { get; set; }
        public string AchievementTitle { get; set; }
        public string AchievementName { get; set; }
        public DateTime EffectiveDate { get; set; }
        public string strEffectiveDate { get; set; }
        public bool EmailSend { get; set; }
        public List<StudentAchievement> lstStudentAchievements { get; set; }
    }

    public class StudentAchievementVM
    {
        public int StudentAchievementID { get; set; }
        public int StudentID { get; set; }
        public string StudentName { get; set; }
        public int SponserID { get; set; }
        public string SponserName { get; set; }
        public string AchievementTitle { get; set; }
        public string AchievementName { get; set; }
        public bool EmailSend { get; set; }

        public string EmailSendName { get; set; }

        public string EffectiveDateName { get; set; }
        //Push
    }

    public class StudentProgress : User
    {
        public int StudentProgressID { get; set; }
        public int StudentID { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public string ProgressTitle { get; set; }
        public string ProgressFileName { get; set; }
        public bool EmailSend { get; set; }
        public string EmailSendName { get; set; }        
        public List<StudentProgress> lstStudentProgress { get; set; }        
        public string FilePath { get; set; }
        public string EffectiveMonth { get; set; }
        
    }

    public class StudentProgressNotification : User
    {
        public int StudentProgressNotificationID { get; set; }
        public int EffectiveYear { get; set; }
        public int StudentID { get; set; }
        public int ProgressSend { get; set; }
        public int ProgressNotification { get; set; }

        public List<StudentProgressNotification> lstStudentProgressNotification { get; set; }
    }

    public class StudentPaymentVM : User
    {
        public int StudentID { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public decimal PaidAmount { get; set; }

        public List<StudentPaymentVM> lstStudentPay { get; set; }
    }
}
