using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.UserObjects
{
    public class Dashboard
    {

    }

    public class TopWidget
    {
        public int StudentCount { get; set; }
        public int SponsorsCount { get; set; }
        public int BirthDayCount { get; set; }
    }

    public class MiddleWidget
    {
        public int SponserCount { get; set; }
        public int StudentCount { get; set; }
        public int Month { get; set; }
        public string MonthName { get; set; }
        public int TotalSponserCount { get; set; }
        public int TotalStudentCount { get; set; }
        public string SponserPercentage { get; set; }
        public string StudentPercentage { get; set; }
    }

    public class Right1Widget
    {
        public int SponserStudentNotLinkCount { get; set; }
        public int SponserDueCount { get; set; }
        public int EmailtobeSendSponserCount { get; set; }
        public int StudentPhotoCount { get; set; }
    }
}
