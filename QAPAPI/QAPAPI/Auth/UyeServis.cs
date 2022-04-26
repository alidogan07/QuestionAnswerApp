using QAPAPI.Models;
using QAPAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QAPAPI.Auth
{
    public class UyeServis
    {
        DBQAPEntities db = new DBQAPEntities();

        public WritersModel Login(string username,string password)
        {
            WritersModel writer = db.Writers.Where(s => s.username == username && s.password == password).Select(x =>
                new WritersModel() {
                    username=x.username,
                    mail=x.mail,
                    password=x.password,
                    uId=x.uId,
                    role = x.role
                }).SingleOrDefault();

            return writer;
        }
    }
}