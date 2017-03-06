using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Api.Models
{
    public class LoginDetail
    {
        public string UserName { get; set; }
        public string AccessToken { get; set; }
        public DateTime Expires { get; set; }
    }
    public class UserRole
    {
        public int RoleId { get; set; }
        public string Name { get; set; }

    }
    public class Application
    {
        public int AppId { get; set; }
        public string Name { get; set; }

    }
    public  class UserAccess
    {
        public string UserName { get; set; }
        public UserRole Role { get; set; }
        public IList<Application> Applications { get; set; }
    }
}
