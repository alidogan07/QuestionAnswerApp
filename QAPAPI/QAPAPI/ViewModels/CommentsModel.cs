using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QAPAPI.ViewModels
{
    public class CommentsModel
    {
        public int cId { get; set; }
        public string comment { get; set; }
        public DateTime date { get; set; }
        public int qid { get; set; }
        public string uid { get; set; }
        public string username { get; set; }
    }
}