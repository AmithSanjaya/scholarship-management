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
        public string FirstName { get; set; }
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
        public int Mode { get; set; }
    }
}
