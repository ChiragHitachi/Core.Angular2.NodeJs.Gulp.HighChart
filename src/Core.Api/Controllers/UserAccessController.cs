using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Core.Api.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Core.Api.Controllers
{
    [Route("api/[controller]")]
    public class UserAccessController : Controller
    {
        // GET: api/values
        [HttpGet]
        public UserAccess Get(string userName)
        {
            return new UserAccess()
            {
                UserName = "Chirag Gupta",
                Applications = new List<Application>()
                {
                    new Application() { Name = "Image Analyzer", AppId = 1 },
                    new Application() { Name = "Dashboard", AppId =2 },
                },
                Role = new UserRole() { RoleId = 1, Name ="Supervisor" }
            };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
