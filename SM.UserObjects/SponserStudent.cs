using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.UserObjects
{
    public class SponserStudent : User
    {
        public int SponserStudentApplicationID { get; set; }
        public int SponserID { get; set; }
        public int StudentID { get; set; }
        public List<SponserStudent> lstStudents { get; set; }
        public string LinkedOn { get; set; }
    }
}
