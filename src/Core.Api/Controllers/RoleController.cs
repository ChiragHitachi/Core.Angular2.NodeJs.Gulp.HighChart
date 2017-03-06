using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Core.Api.Models;
using Core.AngularJS2.Gulp.Demo.Helper;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Core.Api.Controllers
{
    [Route("api/[controller]")]
    public class RoleController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Role> Get()
        {
            return ImageHandler.GetMyRoles();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Role Get(int id)
        {
            return ImageHandler.GetMyRoles().FirstOrDefault(x=>x.RoleId == id);
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
