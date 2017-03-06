using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Api.Models
{
    public class Role
    {
        public int RoleId { get; set; }
        public string RoleText { get; set; }

        public DateTime RoleGivenTime { get; set; }

        public bool IsValid { get; set; }
        
    }
}
