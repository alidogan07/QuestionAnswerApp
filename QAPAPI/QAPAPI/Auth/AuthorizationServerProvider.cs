using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace QAPAPI.Auth
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // OAuthAuthorizationServerProvider sınıfının client erişimine izin verebilmek için ilgili ValidateClientAuthentication metotunu override ediyoruz.
            context.Validated();
        }

        // OAuthAuthorizationServerProvider sınıfının kaynak erişimine izin verebilmek için ilgili GrantResourceOwnerCredentials metotunu override ediyoruz.
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            // CORS ayarlarını set ediyoruz. -- Cross Domain yazım dan konu ile alakalı detaylı bilgi alabilirsiniz.
            //context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "http://localhost:4200" });

            var userService = new UyeServis();
            var user = userService.Login(context.UserName, context.Password);
            List<string> userRoles = new List<string>();

            //validation işlemlerini ve kontrollerini bu kısımda yapıyoruz , örnek olması için sabit değerler verildi ,
            //bu kısmı db den okuyacak şekilde bir yapı kurgulanabilir.
            if (user != null)
            {

                string role = "";
                if (user.role == 1)
                {
                    role = "admin";
                }
                else
                {
                    role = "user";
                }

                userRoles.Add(role);
                //eğer başarılı ise ClaimsIdentity (Kimlik oluşturuyoruz)
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));//Identity özelliklerini ekliyoruz.
                identity.AddClaim(new Claim(ClaimTypes.Role, role));
                identity.AddClaim(new Claim(ClaimTypes.PrimarySid, user.uId));

                AuthenticationProperties prop = new AuthenticationProperties(new
                    Dictionary<string, string>
                { 
                    {"uId",user.uId },
                    {"username",user.username },
                    {"userRoles",Newtonsoft.Json.JsonConvert.SerializeObject(userRoles) }
                });

                AuthenticationTicket ticket = new AuthenticationTicket(identity, prop);

                context.Validated(ticket);//Doğrulanmış olan kimliği context e ekliyoruz.
            }
            else
            {
                //eğer hata var ise bir hata mesajı gönderiyoruz. hata ve açıklaması şeklinde.
                context.SetError("Oturum Hatası", "Kullanıcı adı ve şifre hatalıdır");
            }
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string,string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }
    }
}