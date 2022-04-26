using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QAPAPI.ViewModels
{
    public class WritersModel
    {
        public string uId { get; set; }
        public string mail { get; set; }
        public string password { get; set; }
        public string username { get; set; }

        public int role { get; set; }
    }
}