using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.UserObjects
{
    public class Menu
    {
        public int SystemID { get; set; }
        public int MenuID { get; set; }
        public string MenuName { get; set; }
        public string DisplayName { get; set; }
        public int OrderID { get; set; }
        public string Controller { get; set; }
        public string Action { get; set; }
        public int ID { get; set; }
        public string View { get; set; }
        public string CSSClass { get; set; }
        public List<Menu> ChildMenus { get; set; }
        public int userID { get; set; }
        public int EnteredBy { get; set; }
        public List<Menu> lstMenu { get; set; }
    }
}
