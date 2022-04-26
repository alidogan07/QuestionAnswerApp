using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QAPAPI.ViewModels
{
    public class QuestionsModel
    {
        public int qId { get; set; }
        public string qDesc { get; set; }
        public string qTitle { get; set; }
        public string category { get; set; }
        public string uid { get; set; }
        public string username { get; set; }
        public DateTime date { get; set; }
    }
}