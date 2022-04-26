using QAPAPI.Models;
using QAPAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace QAPAPI.Controllers
{
   
    public class ServisController : ApiController
    {
        DBQAPEntities db = new DBQAPEntities();
        ResponseModel resp = new ResponseModel();

        #region Questions

        [HttpGet]
        [Route("api/questionslist")]
        public List<QuestionsModel> QuestionsList()
        {
            List<QuestionsModel> list = db.Questions.Select(x => new QuestionsModel()
            {
                qId = x.qId,
                qDesc = x.qDesc,
                qTitle = x.qTitle,
                category = x.category,
                uid = x.uid,
                username = x.Writers.username,
                date = x.date
            }).ToList();

            return list;
        }

        [HttpGet]
        [Route("api/questionbyid/{qId}")]
        public QuestionsModel QuestionById(int qId)
        {
            QuestionsModel record = db.Questions.Where(q=>q.qId==qId).Select(x => new QuestionsModel()
            {
                qId = x.qId,
                qDesc = x.qDesc,
                qTitle = x.qTitle,
                category = x.category,
                uid = x.uid,
                username = x.Writers.username,
                date = x.date
            }).SingleOrDefault();

            return record;
        }

        [HttpPost]
        [Route("api/addquestion")]
        public ResponseModel AddQuestion(QuestionsModel model)
        {
            Questions ques = new Questions();
            ques.qTitle = model.qTitle;
            ques.qDesc = model.qDesc;
            ques.category = model.category;
            ques.uid = model.uid;
            ques.date = model.date;

            db.Questions.Add(ques);
            db.SaveChanges();

            resp.job = true;
            resp.message = "Sorunuz Başarıyla Eklendi";

            return resp;
        }

        [HttpPost]
        [Route("api/editquestion")]
        public ResponseModel EditQuestion(QuestionsModel model)
        {
            Questions ques = db.Questions.Where(q => q.qId == model.qId).SingleOrDefault();

            if (ques == null)
            {
                resp.job = false;
                resp.message = "Soru Bulunamadı!";
                return resp;
            }

            ques.qTitle = model.qTitle;
            ques.qDesc = model.qDesc;
            ques.category = model.category;
            ques.uid = model.uid;
            ques.date = model.date;

            db.SaveChanges();

            resp.job = true;
            resp.message = "Sorunuz Başarıyla Güncellendi";

            return resp;
        }

        [HttpDelete]
        [Route("api/deletequestion/{qId}")]
        public ResponseModel DeleteQuestion(int qId)
        {
            Questions ques = db.Questions.Where(q => q.qId == qId).SingleOrDefault();

            if (ques == null)
            {
                resp.job = false;
                resp.message = "Soru Bulunamadı!";
                return resp;
            }

            if (db.Comments.Count(q => q.qid == qId) > 0)
            {
                resp.job = false;
                resp.message = "Bu Soru Yorumları Silinmeden Silinemez!";
                return resp;
            }

            db.Questions.Remove(ques);
            db.SaveChanges();

            resp.job = true;
            resp.message = "Soru Başarıyla Silinmiştir";

            return resp;
        }

        #endregion

        #region Writers
        [Authorize]
        [HttpGet]
        [Route("api/writerlist")]
        public List<WritersModel> WritersList()
        {
            List<WritersModel> list = db.Writers.Select(x => new WritersModel()
            {
                uId = x.uId,
                username = x.username,
                password = x.password,
                mail = x.mail,
                role=x.role           
            }).ToList();

            return list;
        }

        [HttpGet]
        [Route("api/writerbyid/{uid}")]
        public WritersModel WriterById(string uid)
        {
            WritersModel record = db.Writers.Where(q => q.uId == uid).Select(x => new WritersModel()
            {
                uId = x.uId,
                username = x.username,
                password = x.password,
                mail = x.mail,
                role = x.role
            }).SingleOrDefault();

            return record;
        }

        [HttpPost]
        [Route("api/addwriter")]
        public ResponseModel AddWriter(WritersModel model)
        {
            if(db.Writers.Count(q=>q.username == model.username || q.mail==model.mail)>0)
            {
                resp.job = false;
                resp.message = "Girdiğiniz Kullanıcı Adı veya E-Posta Adresi Kullanılmaktadır!";
                return resp;
            }

            Writers user = new Writers();
            user.uId = Guid.NewGuid().ToString();
            user.username = model.username;
            user.password = model.password;
            user.mail = model.mail;
            user.role = model.role;

            db.Writers.Add(user);
            db.SaveChanges();

            resp.job = true;
            resp.message = "Kullanıcı Kaydınız Başarıyla Oluşturulmuştur! Giriş Yapabilirsiniz.";

            return resp;
        }
        [Authorize]
        [HttpPost]
        [Route("api/editwriter")]
        public ResponseModel EditWriter(WritersModel model)
        {
            Writers user = db.Writers.Where(q => q.uId == model.uId).SingleOrDefault();

            if (user == null)
            {
                resp.job = false;
                resp.message = "Yazar Bulunamadı!";
                return resp;
            }

            user.username = model.username;
            user.password = model.password;
            user.mail = model.mail;
            user.role = model.role;

            db.SaveChanges();

            resp.job = true;
            resp.message = "Yazar Bilgileri Başarıyla Güncellendi";

            return resp;
        }
        [Authorize]
        [HttpDelete]
        [Route("api/deletewriter/{uid}")]
        public ResponseModel DeleteWriter(string uid)
        {
            Writers user = db.Writers.Where(q => q.uId == uid).SingleOrDefault();

            if (user == null)
            {
                resp.job = false;
                resp.message = "Yazar Bulunamadı!";
                return resp;
            }

            if (db.Comments.Count(q => q.uid == uid) > 0)
            {
                resp.job = false;
                resp.message = "Bu Yazar Yorumları Silinmeden Silinemez!";
                return resp;
            }

            if (db.Questions.Count(q => q.uid == uid) > 0)
            {
                resp.job = false;
                resp.message = "Bu Yazar Soruları Silinmeden Silinemez!";
                return resp;
            }

            db.Writers.Remove(user);
            db.SaveChanges();

            resp.job = true;
            resp.message = "Kullanıcı Başarıyla Silinmiştir";

            return resp;
        }

        #endregion

        #region Comments

        [HttpGet]
        [Route("api/commentslist")]
        public List<CommentsModel> CommentsList()
        {
            List<CommentsModel> list = db.Comments.Select(x => new CommentsModel()
            {
                cId = x.cId,
                comment = x.comment,
                date = x.date,
                uid = x.uid,
                qid=x.qid,
                username=x.Writers.username,
            }).ToList();

            return list;
        }

        [HttpGet]
        [Route("api/commentslistbyquestionid/{qId}")]
        public List<CommentsModel> CommentsListByQuestionId(int qId)
        {
            List<CommentsModel> list = db.Comments.Where(q => q.qid == qId).Select(x => new CommentsModel()
            {
                cId = x.cId,
                comment = x.comment,
                date = x.date,
                uid = x.uid,
                qid = x.qid,
                username = x.Writers.username,
            }).ToList();

            return list;
        }

        [Authorize]
        [HttpPost]
        [Route("api/addcomment")]
        public ResponseModel AddComment(CommentsModel model)
        {
            
            Comments comment = new Comments();
            comment.comment = model.comment;
            comment.date = model.date;
            comment.qid = model.qid;
            comment.uid = model.uid;

            db.Comments.Add(comment);
            db.SaveChanges();

            resp.job = true;
            resp.message = "Yorumunuz Başarıyla Oluşturulmuştur!";

            return resp;
        }
        [Authorize]
        [HttpPost]
        [Route("api/editcomment")]
        public ResponseModel EditComment(CommentsModel model)
        {
            Comments comment = db.Comments.Where(q => q.cId == model.cId).SingleOrDefault();

            if (comment == null)
            {
                resp.job = false;
                resp.message = "Yorum Bulunamadı!";
                return resp;
            }

            comment.comment = model.comment;
            comment.date = model.date;
            comment.qid = model.qid;
            comment.uid = model.uid;

            db.SaveChanges();

            resp.job = true;
            resp.message = "Yorumunuz Başarıyla Güncellendi";

            return resp;
        }

        [HttpDelete]
        [Route("api/deletecomment/{cId}")]
        public ResponseModel DeleteComment(int cId)
        {
            Comments comment = db.Comments.Where(q => q.cId == cId).SingleOrDefault();

            if (comment == null)
            {
                resp.job = false;
                resp.message = "Yorum Bulunamadı!";
                return resp;
            }           

            db.Comments.Remove(comment);
            db.SaveChanges();

            resp.job = true;
            resp.message = "Yorum Başarıyla Silinmiştir";

            return resp;
        }

        #endregion
    }
}
