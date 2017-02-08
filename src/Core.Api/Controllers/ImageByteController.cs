using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Core.AngularJS2.Gulp.Demo.Helper;
using Core.Api.Models;
using System.Net.Http;
using System.IO;
using System.Net;
using System.Net.Http.Headers;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Core.Api.Controllers
{
    [Route("api/[controller]")]
    public class ImageByteController : Controller
    {
        // GET: api/values
        [HttpGet]
        public HttpResponseMessage Get()
        {
            var imagePath = @"http://localhost:61662/app/images/201210170023050017S.tiff";


            var stream = new FileStream(imagePath, FileMode.Open);
            var content = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StreamContent(stream)
            };

            content.Content.Headers.ContentType = new MediaTypeHeaderValue("image/tiff");
            return content;
        }
    }
}
