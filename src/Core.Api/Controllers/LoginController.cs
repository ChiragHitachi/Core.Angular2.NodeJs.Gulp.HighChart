using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Core.Api.Models;
using System.Net.Http;
using System.Net;
using System.Text;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Core.Api.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IActionResult Get(string userName, string password)
        {
            //Get from repository
            var data = new LoginDetail { AccessToken = "qkkbaodsbowfbpQNWDpsldmpQOasas",UserName = userName, Expires = DateTime.Now.AddMinutes(30) };

            if (data == null) //not found in DB
                return NotFound();

            //return NotFound(); //404 not found

            //return BadRequest(); //400 - Bad Request - invalid username / password

            //return Unauthorized(); //returns 401 unauthorized;
            
            //return new NoContentResult(); //on successful save/update return 204 status?

            //return new ForbidResult(); //403 - Forbidded, 

            return new ObjectResult(data);

        }

         
    }
}
