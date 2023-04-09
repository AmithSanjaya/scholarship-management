using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.UserObjects
{
    public class UserMenu
    {
        public int MenuID { get; set; }
        public int UserID { get; set; }
        public int EnteredBy { get; set; }
        public List<UserMenu> lstMenu { get; set; }
    }
}
