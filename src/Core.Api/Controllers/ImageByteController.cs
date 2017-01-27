using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Core.AngularJS2.Gulp.Demo.Helper;
using Core.Api.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Core.Api.Controllers
{
    [Route("api/[controller]")]
    public class ImageByteController : Controller
    {
        // GET: api/values
        [HttpGet]
        public ContainerDetail Get()
        {
            return ImageHandler.GetContainerDetails();
        }
    }
}
