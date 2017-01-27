using Core.Api.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.AngularJS2.Gulp.Demo.Helper
{
    public static class ImageHandler
    {
        public static Byte[] ImageAsByteArray(string imagePath)
        {
            return File.ReadAllBytes(imagePath);
        }

        public static string ImageAsBase64(string imagePath)
        {
            var imageBytes = ImageAsByteArray(imagePath);
            string base64String = Convert.ToBase64String(imageBytes);
            return base64String;
        }

        public static ContainerDetail GetContainerDetails()
        {
            return new ContainerDetail()
            {
                ContainerId = 1,
                ContainerImage = @"https://www.dreamstime.com//royalty-free-stock-image-eurasian-dotterel-resting-hortobagy-image83879826",
                ContainerImageBase64 = ImageHandler.ImageAsBase64(@"~\Images\201210170023050017S.tiff"),
                //ContainerImageAsBytes = ImageHandler.ImageAsByteArray(@"C:\Users\CGupta\Source\Repos\Core.Angular2.NodeJs.Gulp.HighChart\src\Core.Api\Images\201210170023050017S.tiff")
            };
        }
    }
}
