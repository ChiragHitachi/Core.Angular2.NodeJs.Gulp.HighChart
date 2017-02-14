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
using System.Text;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Core.Api.Controllers
{
    [Route("api/[controller]")]
    public class ImageByteController : Controller
    {
        // GET: api/values
        [HttpGet]
        public HttpResponseMessage Get(string id)
        {
            var imagePath = @"C:/Users/CGupta/Source/Repos/Core.Angular2.NodeJs.Gulp.HighChart/src/Core.Api/Images/container2.tiff";
            byte[] bytes = System.IO.File.ReadAllBytes(imagePath);
            using (var memoryStream = new MemoryStream())
            {
                memoryStream.Write(bytes, 0, bytes.Length);

                var content = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ByteArrayContent(memoryStream.ToArray())
                };
                content.Content.Headers.ContentType = new MediaTypeHeaderValue("image/tiff");
                var base64 = Convert.ToBase64String(memoryStream.ToArray());
                return content;
                //?convert to base 64?
            }
        /*  
           using (var stream = new FileStream(imagePath, FileMode.Open))
            {
                var content = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StreamContent(stream)
                };
                //Stream imageStreamSource = new FileStream("tulipfarm.tif", FileMode.Open, FileAccess.Read, FileShare.Read);
                //TiffBitmapDecoder decoder = new TiffBitmapDecoder(imageStreamSource, BitmapCreateOptions.PreservePixelFormat, BitmapCacheOption.Default);
                //BitmapSource bitmapSource = decoder.Frames[0];

                content.Content.Headers.ContentType = new MediaTypeHeaderValue("image/tiff");
                return content;
            }
            */
        }

        // GET: api/values
        //[HttpGet]
        //public HttpResponseMessage Get()
        //{
        //    var imagePath = @"C:/Users/CGupta/Source/Repos/Core.Angular2.NodeJs.Gulp.HighChart/src/Core.Api/Images/container.tiff";

        //    using (var fs = new FileStream(imagePath, FileMode.Open))
        //    {
        //        var request = (HttpWebRequest)WebRequest.Create("address");
        //        request.Method = "POST";
        //        request.ContentLength = fs.Length;

        //        using (Stream postStream = request.GetRequestStream())
        //        {
        //            // Write the other contents you wanted to write here
        //            // ...

        //            // CopyTo uses a buffer of 4096 bytes by default, so it will
        //            // only read 4096 bytes into memory at a time.
        //            fs.CopyTo(postStream);
        //            postStream.Close(); // Not sure if necessary since we're in a using block
        //        }

        //        using (HttpWebResponse response = request.GetResponse()) // might need to cast to HttpWebRequest
        //        using (Stream responseStream = response.GetResponseStream())
        //        using (var streamReader = new StreamReader(responseStream))
        //        {
        //            string response = Encoding.UTF8.GetString(streamReader.ReadToEnd());
        //            // Stuff with the response
        //        }
        //    }

        }
    }
